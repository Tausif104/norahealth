"use server";

import { prisma } from "@/lib/client/prisma";
import { createCalendarEvent } from "@/lib/googleCalendar";
import { revalidatePath } from "next/cache";

function parseYMDtoDate(ymd) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function combineDateTime(ymd, time) {
  const [y, m, d] = ymd.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh, mm, 0, 0));
}

// assume each slot is 10 minutes like before
function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export async function createBooking(formData) {
  try {
    if (!(formData instanceof FormData)) {
      return {
        success: false,
        msg: "Invalid form submission.",
        data: null,
      };
    }

    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phoneNumber = formData.get("phoneNumber")?.toString().trim();
    const notes = formData.get("notes")?.toString().trim() || null;

    const ocRequest = formData.get("ocRequest")?.toString(); // "SAME_OC" | "DIFFERENT_OC"
    const serviceName = formData.get("serviceName")?.toString().trim();
    const providerName = formData.get("providerName")?.toString().trim();
    const nhsService = formData.get("nhsService")?.toString().trim();

    const bookingdate = formData.get("bookingdate")?.toString(); // "YYYY-MM-DD"
    const bookingtime = formData.get("bookingtime")?.toString(); // "HH:MM"

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !serviceName ||
      !providerName ||
      !nhsService ||
      !bookingdate ||
      !bookingtime ||
      !ocRequest
    ) {
      return {
        success: false,
        msg: "Please fill in all required fields.",
        data: null,
      };
    }

    if (!["SAME_OC", "DIFFERENT_OC"].includes(ocRequest)) {
      return {
        success: false,
        msg: "Invalid OC request value.",
        data: null,
      };
    }

    const slotDate = parseYMDtoDate(bookingdate);
    const appointmentStart = combineDateTime(bookingdate, bookingtime);
    const appointmentEnd = addMinutes(appointmentStart, 10); // 10-minute slot

    const slot = await prisma.bookingSlot.findFirst({
      where: {
        slotDate,
        startTime: bookingtime,
      },
    });

    if (!slot) {
      return {
        success: false,
        msg: "Selected time is no longer available.",
        data: null,
      };
    }

    if (slot.isBooked) {
      return {
        success: false,
        msg: "This time slot has already been booked.",
        data: null,
      };
    }

    const [updatedSlot, booking] = await prisma.$transaction([
      prisma.bookingSlot.update({
        where: { id: slot.id },
        data: { isBooked: true },
      }),
      prisma.booking.create({
        data: {
          fullName,
          email,
          phoneNumber,
          notes,
          ocRequest,
          serviceName,
          providerName,
          nhsService,
          appointment: appointmentStart,
          slot: { connect: { id: slot.id } },
        },
      }),
    ]);

    // 👉 Try to create Google Calendar event, but don't break booking if it fails
    try {
      const calendarId = process.env.GOOGLE_CALENDAR_ID;

      if (calendarId) {
        const summary = `${serviceName} - ${fullName}`;
        const description = [
          `Provider: ${providerName}`,
          `NHS Service: ${nhsService}`,
          `Phone: ${phoneNumber}`,
          `OC Request: ${ocRequest}`,
          notes ? `Notes: ${notes}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        await createCalendarEvent({
          calendarId,
          start: appointmentStart,
          end: appointmentEnd,
          summary,
          description,
          location: "Manor Chemist & Clinic, 341 Tamworth Ln, Mitcham CR4 1DL",
          email,
          name: fullName,
        });
      } else {
        console.warn("GOOGLE_CALENDAR_ID not set; skipping calendar event");
      }
    } catch (calendarError) {
      console.error("Failed to create Google Calendar event:", calendarError);
      // we don't fail the booking for this
    }

    return {
      success: true,
      msg: "Booking created successfully.",
      data: {
        bookingId: booking.id,
        slotId: updatedSlot.id,
        appointment: appointmentStart,
      },
    };
  } catch (error) {
    console.error("createBooking error:", error);
    return {
      success: false,
      msg: "Server error while creating booking.",
      data: error.message,
    };
  }
}

export async function getAllBookingsAction({ year, month, day } = {}) {
  // Fetch all bookings (ordered by appointment as baseline)
  let bookings = await prisma.booking.findMany({
    orderBy: { appointment: "asc" },
  });

  // Parse filters
  const y = year ? Number(year) : null; // e.g. 2024
  const m = month ? Number(month) : null; // 1..12
  const d = day ? Number(day) : null; // 1..31

  // Filter according to combos, covering all cases:
  bookings = bookings.filter((b) => {
    const dt = new Date(b.appointment);
    const by = dt.getFullYear();
    const bm = dt.getMonth() + 1;
    const bd = dt.getDate();

    // Exact combos:
    if (y && m && d) return by === y && bm === m && bd === d;
    if (y && m && !d) return by === y && bm === m;
    if (y && !m && !d) return by === y;
    if (!y && m && !d) return bm === m; // month across years
    if (!y && !m && d) return bd === d; // day-of-month across months/years
    if (!y && m && d) return bm === m && bd === d; // month+day across years

    // no filters => keep
    return true;
  });

  // Sort result by year -> month -> day (ascending)
  bookings.sort((a, b) => {
    const A = new Date(a.appointment);
    const B = new Date(b.appointment);

    const Ay = A.getFullYear(),
      By = B.getFullYear();
    if (Ay !== By) return Ay - By;

    const Am = A.getMonth() + 1,
      Bm = B.getMonth() + 1;
    if (Am !== Bm) return Am - Bm;

    const Ad = A.getDate(),
      Bd = B.getDate();
    return Ad - Bd;
  });

  return { success: true, msg: "OK", bookings };
}

/**
 * Delete booking (server action) — kept for table delete button usage.
 * Accepts FormData or { bookingId }.
 */
export const deleteBooking = async (formDataOrObj) => {
  let bookingId;
  if (formDataOrObj && typeof formDataOrObj.get === "function") {
    bookingId = formDataOrObj.get("bookingId");
  } else if (formDataOrObj && formDataOrObj.bookingId) {
    bookingId = formDataOrObj.bookingId;
  } else {
    return { success: false, msg: "No bookingId" };
  }

  const b = await prisma.booking.findUnique({
    where: { id: Number(bookingId) },
  });
  if (!b) return { success: false, msg: "Booking not found" };

  await prisma.booking.delete({ where: { id: Number(bookingId) } });

  if (b.slotId) {
    await prisma.bookingSlot.update({
      where: { id: b.slotId },
      data: { isBooked: false },
    });
  }

  // revalidate bookings page
  revalidatePath("/profile/bookings");

  return { success: true, msg: "Booking deleted" };
};

export const createBookingSlots = async (formOrObj) => {
  // allow FormData (from <form action={createBookingSlots}>) or plain object

  let slotDate;
  let ranges;
  let intervalMinutes = 10;

  if (formOrObj && typeof formOrObj.get === "function") {
    // formData path
    slotDate = formOrObj.get("slotDate"); // expected "YYYY-MM-DD"
    const rangesJson = formOrObj.get("ranges"); // if you send ranges as JSON string
    intervalMinutes = Number(formOrObj.get("intervalMinutes") || 10);
    try {
      ranges = rangesJson ? JSON.parse(rangesJson) : [];
    } catch (e) {
      ranges = [];
    }
  } else if (formOrObj) {
    slotDate = formOrObj.slotDate;
    ranges = formOrObj.ranges || [];
    intervalMinutes = formOrObj.intervalMinutes || 10;
  } else {
    return { success: false, msg: "No input provided" };
  }

  if (!slotDate || !Array.isArray(ranges) || ranges.length === 0) {
    return {
      success: false,
      msg: "Please provide a slotDate and at least one time range",
    };
  }

  // simple time format checker HH:MM
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  // function to convert "YYYY-MM-DD" + "HH:MM" into Date object (local)
  const toDateTime = (dateStr, timeStr) => {
    // dateStr: "YYYY-MM-DD", timeStr: "HH:MM"
    const [y, mo, d] = dateStr.split("-").map(Number);
    const [hh, mm] = timeStr.split(":").map(Number);
    return new Date(y, mo - 1, d, hh, mm, 0, 0);
  };

  // Expand ranges into startTimes (HH:MM strings) for the given interval
  const expandRangeToStarts = (startTime, endTime, interval) => {
    // returns array of startTimes like "09:00", "09:10", ... where slot end is <= endTime
    const arr = [];
    const start = startTime;
    const end = endTime;

    // To compare, convert to minutes since midnight
    const toMins = (t) => {
      const [hh, mm] = t.split(":").map(Number);
      return hh * 60 + mm;
    };

    const sMin = toMins(start);
    const eMin = toMins(end);

    if (sMin >= eMin) return arr; // invalid range

    for (let t = sMin; t + interval <= eMin; t += interval) {
      const hh = Math.floor(t / 60)
        .toString()
        .padStart(2, "0");
      const mm = (t % 60).toString().padStart(2, "0");
      arr.push(`${hh}:${mm}`);
    }
    return arr;
  };

  // collect all candidate startTimes (avoid duplicates in the candidate list)
  const candidateSet = new Set();
  for (const r of ranges) {
    const s = (r.startTime || "").trim();
    const e = (r.endTime || "").trim();
    if (!timeRegex.test(s) || !timeRegex.test(e)) {
      return {
        success: false,
        msg: `Invalid time format in range ${s} - ${e}`,
      };
    }
    if (s >= e) {
      return {
        success: false,
        msg: `startTime must be before endTime for range ${s} - ${e}`,
      };
    }

    const starts = expandRangeToStarts(s, e, Number(intervalMinutes));
    for (const st of starts) candidateSet.add(st);
  }

  const candidateStarts = Array.from(candidateSet).sort(); // sorted ascending

  if (candidateStarts.length === 0) {
    return {
      success: false,
      msg: "No slots generated from given ranges (check interval and range lengths)",
    };
  }

  // Convert slotDate to Date object for comparison with DB
  const slotDateObj = new Date(slotDate); // note: stored as Date with 00:00 time in DB per @db.Date
  // We will query existing slots for that slotDate and those startTimes to avoid duplicates.

  // Find existing slots for that date with overlapping startTimes
  const existing = await prisma.bookingSlot.findMany({
    where: {
      slotDate: slotDateObj,
      startTime: { in: candidateStarts },
    },
    select: { startTime: true },
  });

  const existingStartSet = new Set(existing.map((e) => e.startTime));

  // filter out already existing starts
  const toCreate = candidateStarts.filter((st) => !existingStartSet.has(st));

  // prepare create payload
  const createData = toCreate.map((st) => ({
    slotDate: slotDateObj,
    startTime: st,
    // compute endTime by adding intervalMinutes to st
    endTime: (() => {
      const [hh, mm] = st.split(":").map(Number);
      let total = hh * 60 + mm + Number(intervalMinutes);
      const eh = Math.floor(total / 60)
        .toString()
        .padStart(2, "0");
      const em = (total % 60).toString().padStart(2, "0");
      return `${eh}:${em}`;
    })(),
    isBooked: false,
  }));

  let created = [];
  if (createData.length > 0) {
    // Use createMany for efficiency
    // Prisma createMany doesn't return created rows; returns count
    try {
      await prisma.bookingSlot.createMany({
        data: createData,
        skipDuplicates: true, // skip if unique constraint exists (won't hurt if not)
      });

      // optionally fetch created rows for details (if you need them)
      // But we can return counts summary
    } catch (err) {
      // fallback: attempt individual creates (rare)
      for (const item of createData) {
        try {
          const c = await prisma.bookingSlot.create({ data: item });
          created.push(c);
        } catch (e) {
          // skip on error
        }
      }
    }
  }

  // Revalidate the page that lists slots (adjust path as needed)
  revalidatePath("/admin/booking-slot");

  return {
    success: true,
    msg: "Slots processed",
    summary: {
      candidateCount: candidateStarts.length,
      existingCount: existingStartSet.size,
      createdCount: createData.length,
      createdStarts: createData.map((c) => c.startTime),
      skippedStarts: Array.from(existingStartSet),
    },
  };
};
