"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/client/prisma";
import { createCalendarEvent } from "@/lib/googleCalendar";
import { revalidatePath } from "next/cache";
import { sendBookingConfirmationEmail } from "./sendBookingConfirmation.action";

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

    console.log(
      fullName,
      email,
      phoneNumber,
      serviceName,
      providerName,
      nhsService,
      bookingdate,
      bookingtime,
      "booking action"
    );

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !serviceName ||
      !providerName ||
      !nhsService ||
      !bookingdate ||
      !bookingtime
    ) {
      return {
        success: false,
        msg: "Please fill in all required fields.",
        data: null,
      };
    }

    // if (!["SAME_OC", "DIFFERENT_OC"].includes(ocRequest)) {
    //   return {
    //     success: false,
    //     msg: "Invalid OC request value.",
    //     data: null,
    //   };
    // }

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

    const bookingType = "Booking";

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
          // ocRequest,
          bookingType,
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
          // `OC Request: ${ocRequest}`,
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

    sendBookingConfirmationEmail({
      to: email,
      fullName,
      serviceName,
      providerName,
      nhsService,
      appointment: appointmentStart,
      notes,
    });

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
export async function createBookingOrder(formData) {
  try {
    if (!(formData instanceof FormData)) {
      return { success: false, msg: "Invalid form submission.", data: null };
    }

    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phoneNumber = formData.get("phoneNumber")?.toString().trim();
    const notes = formData.get("notes")?.toString().trim() || null;

    const ocRequest = formData.get("ocRequest")?.toString();
    const appointmentRequest = formData.get("appointmentRequest") === "true";

    const serviceName = formData.get("serviceName")?.toString().trim();
    const providerName = formData.get("providerName")?.toString().trim();
    const nhsService = formData.get("nhsService")?.toString().trim();

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !serviceName ||
      !providerName ||
      !nhsService
    ) {
      return {
        success: false,
        msg: "Please fill in all required fields.",
        data: null,
      };
    }

    if (
      !["SAME_OC", "DIFFERENT_OC", "MORNING_AFTER_PILL"].includes(ocRequest)
    ) {
      return { success: false, msg: "Invalid OC request value.", data: null };
    }

    // ✅ Find user (needed for Order.userId)
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    // If orders must be tied to a user, stop here if user not found
    if (!user) {
      return {
        success: false,
        msg: "No account found with this email. Please login or use your registered email.",
        data: null,
      };
    }

    let recreatedOrder = null;

    // ✅ If SAME_OC -> recreate last order under clinicalreview
    if (ocRequest === "SAME_OC") {
      const lastOrder = await prisma.order.findFirst({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          medicineName: true,
        },
      });

      if (!lastOrder) {
        return {
          success: false,
          msg: "You have no previous order to repeat.",
          data: null,
        };
      }

      recreatedOrder = await prisma.order.create({
        data: {
          userId: user.id,
          medicineName: lastOrder.medicineName,
          trackingId: crypto.randomUUID(), // or your tracking generator
          status: "clinicalreview", // ✅ force review
        },
      });
    }

    // ✅ Your existing booking creation (optional: always create booking)
    const now = new Date();
    const bookingType = "Order";
    const booking = await prisma.booking.create({
      data: {
        fullName,
        email,
        phoneNumber,
        notes,
        ocRequest,
        appointmentRequest,
        serviceName,
        providerName,
        nhsService,
        appointment: now,
        bookingType,
      },
    });

    return {
      success: true,
      msg:
        ocRequest === "SAME_OC"
          ? "Previous order repeated successfully (under clinical review)."
          : "Contraceptive order placed successfully.",
      data: {
        bookingId: booking.id,
        recreatedOrderId: recreatedOrder?.id || null,
      },
    };
  } catch (error) {
    console.error("createBookingOrder error:", error);
    return {
      success: false,
      msg: "Server error while creating order.",
      data: error.message,
    };
  }
}

// export async function getAllBookingsAction({ year, month, day } = {}) {
//   // Fetch all bookings (ordered by appointment as baseline)
//   let bookings = await prisma.booking.findMany({
//     orderBy: { createdAt: "desc" },
//   });

//   // Parse filters
//   const y = year ? Number(year) : null; // e.g. 2024
//   const m = month ? Number(month) : null; // 1..12
//   const d = day ? Number(day) : null; // 1..31

//   // Filter according to combos, covering all cases:
//   bookings = bookings.filter((b) => {
//     const dt = new Date(b.appointment);
//     const by = dt.getFullYear();
//     const bm = dt.getMonth() + 1;
//     const bd = dt.getDate();

//     // Exact combos:
//     if (y && m && d) return by === y && bm === m && bd === d;
//     if (y && m && !d) return by === y && bm === m;
//     if (y && !m && !d) return by === y;
//     if (!y && m && !d) return bm === m; // month across years
//     if (!y && !m && d) return bd === d; // day-of-month across months/years
//     if (!y && m && d) return bm === m && bd === d; // month+day across years

//     // no filters => keep
//     return true;
//   });

//   // Sort result by year -> month -> day (ascending)
//   bookings.sort((a, b) => {
//     const A = new Date(a.appointment);
//     const B = new Date(b.appointment);

//     const Ay = A.getFullYear(),
//       By = B.getFullYear();
//     if (Ay !== By) return Ay - By;

//     const Am = A.getMonth() + 1,
//       Bm = B.getMonth() + 1;
//     if (Am !== Bm) return Am - Bm;

//     const Ad = A.getDate(),
//       Bd = B.getDate();
//     return Ad - Bd;
//   });

//   return { success: true, msg: "OK", bookings };
// }
export async function getAllBookingsAction({ year, month, day } = {}) {
  let bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" }, // ✅ newest first
  });

  const y = year ? Number(year) : null;
  const m = month ? Number(month) : null;
  const d = day ? Number(day) : null;

  bookings = bookings.filter((b) => {
    const dt = new Date(b.appointment);
    const by = dt.getFullYear();
    const bm = dt.getMonth() + 1;
    const bd = dt.getDate();

    if (y && m && d) return by === y && bm === m && bd === d;
    if (y && m && !d) return by === y && bm === m;
    if (y && !m && !d) return by === y;
    if (!y && m && !d) return bm === m;
    if (!y && !m && d) return bd === d;
    if (!y && m && d) return bm === m && bd === d;

    return true;
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

  // revalidate admin page
  revalidatePath("/admin/bookings");

  // revalidate admin page
  revalidatePath("/admin/appointments");

  return { success: true, msg: "Booking deleted" };
};

// export const createBookingSlots = async (formOrObj) => {
//   // allow FormData (from <form action={createBookingSlots}>) or plain object

//   let slotDate;
//   let ranges;
//   let intervalMinutes = 10;

//   if (formOrObj && typeof formOrObj.get === "function") {
//     // formData path
//     slotDate = formOrObj.get("slotDate"); // expected "YYYY-MM-DD"
//     const rangesJson = formOrObj.get("ranges"); // if you send ranges as JSON string
//     intervalMinutes = Number(formOrObj.get("intervalMinutes") || 10);
//     try {
//       ranges = rangesJson ? JSON.parse(rangesJson) : [];
//     } catch (e) {
//       ranges = [];
//     }
//   } else if (formOrObj) {
//     slotDate = formOrObj.slotDate;
//     ranges = formOrObj.ranges || [];
//     intervalMinutes = formOrObj.intervalMinutes || 10;
//   } else {
//     return { success: false, msg: "No input provided" };
//   }

//   if (!slotDate || !Array.isArray(ranges) || ranges.length === 0) {
//     return {
//       success: false,
//       msg: "Please provide a slotDate and at least one time range",
//     };
//   }

//   // simple time format checker HH:MM
//   const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

//   // function to convert "YYYY-MM-DD" + "HH:MM" into Date object (local)
//   const toDateTime = (dateStr, timeStr) => {
//     // dateStr: "YYYY-MM-DD", timeStr: "HH:MM"
//     const [y, mo, d] = dateStr.split("-").map(Number);
//     const [hh, mm] = timeStr.split(":").map(Number);
//     return new Date(y, mo - 1, d, hh, mm, 0, 0);
//   };

//   // Expand ranges into startTimes (HH:MM strings) for the given interval
//   const expandRangeToStarts = (startTime, endTime, interval) => {
//     // returns array of startTimes like "09:00", "09:10", ... where slot end is <= endTime
//     const arr = [];
//     const start = startTime;
//     const end = endTime;

//     // To compare, convert to minutes since midnight
//     const toMins = (t) => {
//       const [hh, mm] = t.split(":").map(Number);
//       return hh * 60 + mm;
//     };

//     const sMin = toMins(start);
//     const eMin = toMins(end);

//     if (sMin >= eMin) return arr; // invalid range

//     for (let t = sMin; t + interval <= eMin; t += interval) {
//       const hh = Math.floor(t / 60)
//         .toString()
//         .padStart(2, "0");
//       const mm = (t % 60).toString().padStart(2, "0");
//       arr.push(`${hh}:${mm}`);
//     }
//     return arr;
//   };

//   // collect all candidate startTimes (avoid duplicates in the candidate list)
//   const candidateSet = new Set();
//   for (const r of ranges) {
//     const s = (r.startTime || "").trim();
//     const e = (r.endTime || "").trim();
//     if (!timeRegex.test(s) || !timeRegex.test(e)) {
//       return {
//         success: false,
//         msg: `Invalid time format in range ${s} - ${e}`,
//       };
//     }
//     if (s >= e) {
//       return {
//         success: false,
//         msg: `startTime must be before endTime for range ${s} - ${e}`,
//       };
//     }

//     const starts = expandRangeToStarts(s, e, Number(intervalMinutes));
//     for (const st of starts) candidateSet.add(st);
//   }

//   const candidateStarts = Array.from(candidateSet).sort(); // sorted ascending

//   if (candidateStarts.length === 0) {
//     return {
//       success: false,
//       msg: "No slots generated from given ranges (check interval and range lengths)",
//     };
//   }

//   // Convert slotDate to Date object for comparison with DB
//   const slotDateObj = new Date(slotDate); // note: stored as Date with 00:00 time in DB per @db.Date
//   // We will query existing slots for that slotDate and those startTimes to avoid duplicates.

//   // Find existing slots for that date with overlapping startTimes
//   const existing = await prisma.bookingSlot.findMany({
//     where: {
//       slotDate: slotDateObj,
//       startTime: { in: candidateStarts },
//     },
//     select: { startTime: true },
//   });

//   const existingStartSet = new Set(existing.map((e) => e.startTime));

//   // filter out already existing starts
//   const toCreate = candidateStarts.filter((st) => !existingStartSet.has(st));

//   // prepare create payload
//   const createData = toCreate.map((st) => ({
//     slotDate: slotDateObj,
//     startTime: st,
//     // compute endTime by adding intervalMinutes to st
//     endTime: (() => {
//       const [hh, mm] = st.split(":").map(Number);
//       let total = hh * 60 + mm + Number(intervalMinutes);
//       const eh = Math.floor(total / 60)
//         .toString()
//         .padStart(2, "0");
//       const em = (total % 60).toString().padStart(2, "0");
//       return `${eh}:${em}`;
//     })(),
//     isBooked: false,
//   }));

//   let created = [];
//   if (createData.length > 0) {
//     // Use createMany for efficiency
//     // Prisma createMany doesn't return created rows; returns count
//     try {
//       await prisma.bookingSlot.createMany({
//         data: createData,
//         skipDuplicates: true, // skip if unique constraint exists (won't hurt if not)
//       });

//       // optionally fetch created rows for details (if you need them)
//       // But we can return counts summary
//     } catch (err) {
//       // fallback: attempt individual creates (rare)
//       for (const item of createData) {
//         try {
//           const c = await prisma.bookingSlot.create({ data: item });
//           created.push(c);
//         } catch (e) {
//           // skip on error
//         }
//       }
//     }
//   }

//   // Revalidate the page that lists slots (adjust path as needed)
//   revalidatePath("/admin/booking-slot");

//   return {
//     success: true,
//     msg: "Slots processed",
//     summary: {
//       candidateCount: candidateStarts.length,
//       existingCount: existingStartSet.size,
//       createdCount: createData.length,
//       createdStarts: createData.map((c) => c.startTime),
//       skippedStarts: Array.from(existingStartSet),
//     },
//   };
// };

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

  // helper: convert "HH:MM" => minutes since midnight
  const toMins = (t) => {
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm;
  };

  // helper: convert minutes => "HH:MM"
  const minsToHHMM = (m) => {
    const hh = Math.floor(m / 60)
      .toString()
      .padStart(2, "0");
    const mm = (m % 60).toString().padStart(2, "0");
    return `${hh}:${mm}`;
  };

  // Expand ranges into startTimes (HH:MM strings) for the given interval
  const expandRangeToStarts = (startTime, endTime, interval) => {
    const arr = [];
    const sMin = toMins(startTime);
    const eMin = toMins(endTime);

    if (sMin >= eMin) return arr; // invalid range

    for (let t = sMin; t + interval <= eMin; t += interval) {
      arr.push(minsToHHMM(t));
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
    if (toMins(s) >= toMins(e)) {
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

  // Fetch ALL existing slots for that date (we will check overlap in JS).
  // This is simpler and correct for overlap detection; indexes on slotDate make this efficient.
  const existingSlots = await prisma.bookingSlot.findMany({
    where: {
      slotDate: slotDateObj,
    },
    select: { startTime: true, endTime: true },
  });

  // Build array of existing intervals in minutes
  const existingIntervals = existingSlots.map((s) => {
    return { s: toMins(s.startTime), e: toMins(s.endTime) };
  });

  // function to check overlap: returns true if [aStart, aEnd) overlaps [bStart, bEnd)
  const overlaps = (aStart, aEnd, bStart, bEnd) => {
    return aStart < bEnd && bStart < aEnd;
  };

  // Filter out candidate starts that overlap any existing interval
  const acceptedStarts = [];
  const skippedDueToOverlap = [];

  for (const st of candidateStarts) {
    const cStart = toMins(st);
    const cEnd = cStart + Number(intervalMinutes);

    // check overlap with any existing
    const conflict = existingIntervals.some((iv) =>
      overlaps(cStart, cEnd, iv.s, iv.e)
    );

    if (conflict) {
      skippedDueToOverlap.push(st);
      continue;
    }

    // Also check overlap with already acceptedStarts (defensive, in case ranges produced overlapping candidates)
    const conflictWithAccepted = acceptedStarts.some((as) => {
      const aStart = toMins(as);
      const aEnd = aStart + Number(intervalMinutes);
      return overlaps(cStart, cEnd, aStart, aEnd);
    });

    if (conflictWithAccepted) {
      skippedDueToOverlap.push(st);
      continue;
    }

    acceptedStarts.push(st);
  }

  if (acceptedStarts.length === 0) {
    // Nothing to create
    return {
      success: true,
      msg: "No new slots to create (all candidates overlap existing slots or duplicates).",
      summary: {
        candidateCount: candidateStarts.length,
        existingCount: existingSlots.length,
        createdCount: 0,
        createdStarts: [],
        skippedStarts: skippedDueToOverlap,
      },
    };
  }

  // prepare create payload for acceptedStarts
  const createData = acceptedStarts.map((st) => {
    const [hh, mm] = st.split(":").map(Number);
    let total = hh * 60 + mm + Number(intervalMinutes);
    const eh = Math.floor(total / 60)
      .toString()
      .padStart(2, "0");
    const em = (total % 60).toString().padStart(2, "0");
    return {
      slotDate: slotDateObj,
      startTime: st,
      endTime: `${eh}:${em}`,
      isBooked: false,
    };
  });

  let createdCount = 0;
  let createdStarts = [];

  if (createData.length > 0) {
    try {
      // createMany with skipDuplicates - but skipDuplicates only works for unique constraints; still efficient.
      await prisma.bookingSlot.createMany({
        data: createData,
        skipDuplicates: true,
      });

      createdCount = createData.length;
      createdStarts = createData.map((c) => c.startTime);
    } catch (err) {
      // fallback: attempt individual creates (rare)
      for (const item of createData) {
        try {
          const c = await prisma.bookingSlot.create({ data: item });
          createdCount += 1;
          createdStarts.push(c.startTime);
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
      existingCount: existingSlots.length,
      createdCount,
      createdStarts,
      skippedStarts: skippedDueToOverlap,
    },
  };
};

export async function createOrderFromBooking({
  bookingId,
  medicineName,
  trackingId,
  status,
}) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return { success: false, message: "Booking not found" };
    }

    // 1. Check user by email
    let user = await prisma.user.findUnique({
      where: { email: booking.email },
    });
    const password = "nora123"; // default password for new users
    const hashedPassword = await bcrypt.hash(password, 10);
    // 2. If user does not exist → create user + account
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: booking.email,
          password: hashedPassword, // later reset flow
          role: "PATIENT",
          account: {
            create: {
              firstName: booking.fullName.split(" ")[0],
              lastName: booking.fullName.split(" ").slice(1).join(" "),
              phoneNumber: booking.phoneNumber,
              secondEmail: booking.email,
              dob: new Date("2000-01-01"),
              address: "N/A",
              zipCode: "N/A",
            },
          },
        },
      });
    }

    // 3. Create order
    await prisma.order.create({
      data: {
        medicineName: medicineName || booking.serviceName,
        trackingId: trackingId || `ORD-${Date.now()}`,
        status: status || "clinicalreview",
        userId: user.id,
      },
    });

    revalidatePath("/admin/appointments");
    return { success: true, msg: "Order created successfully" };
  } catch (err) {
    console.error(err);
    return { success: false, msg: "Server error" };
  }
}
