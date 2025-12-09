"use server";

import { prisma } from "@/lib/client/prisma";
import { revalidatePath } from "next/cache";

/* ------------------ helpers ------------------ */

// For reading (client sends "YYYY-MM-DD")
function parseYMDtoDate(ymd) {
  // "2025-12-06" -> Date(2025-12-06T00:00:00.000Z)
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

// For creating (admin form sends "DD-MM-YYYY")
function parseDMYtoDate(dmy) {
  // "12-12-2025" -> Date(2025-12-12T00:00:00.000Z)
  const [d, m, y] = dmy.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function roundUpToNext10(mins) {
  return Math.ceil(mins / 10) * 10;
}

/* ------------------ CREATE SLOTS (admin form) ------------------ */
/**
 * FormData keys expected:
 *  - date  -> "12-12-2025"  (DD-MM-YYYY)
 *  - times -> JSON string:
 *      [
 *        { "fromTime": "09:00", "toTime": "00:00" },
 *        { "fromTime": "02:59", "toTime": "06:00" }
 *      ]
 */
export async function createBookingSlotsFromClient(formData) {
  try {
    if (!(formData instanceof FormData)) {
      return {
        success: false,
        msg: "Invalid form submission.",
        data: null,
      };
    }

    const date = formData.get("date"); // "12-12-2025"
    const timesRaw = formData.get("times"); // JSON string

    if (!date || !timesRaw) {
      return {
        success: false,
        msg: "Date or time ranges missing.",
        data: null,
      };
    }

    let times;
    try {
      times = JSON.parse(timesRaw);
    } catch {
      return {
        success: false,
        msg: "Invalid times JSON format.",
        data: null,
      };
    }

    if (!Array.isArray(times)) {
      return {
        success: false,
        msg: "Times must be an array.",
        data: null,
      };
    }

    const baseDate = parseDMYtoDate(date);
    const slotsToInsert = [];

    for (const range of times) {
      if (!range.fromTime || !range.toTime) continue;

      let startMin = timeToMinutes(range.fromTime);
      let endMin = timeToMinutes(range.toTime);

      // "00:00" means end of same day
      if (range.toTime === "00:00" && range.fromTime !== "00:00") {
        endMin = 24 * 60;
      }

      if (endMin <= startMin) continue;

      // snap to 10-min boundary (02:59 -> 03:00)
      let current = roundUpToNext10(startMin);

      while (current + 10 <= endMin) {
        const slotStart = minutesToTime(current);
        const slotEnd = minutesToTime(current + 10);

        slotsToInsert.push({
          slotDate: baseDate, // always same calendar day
          startTime: slotStart,
          endTime: slotEnd,
          isBooked: false,
        });

        current += 10;
      }
    }

    if (!slotsToInsert.length) {
      return {
        success: true,
        msg: "No valid booking slots found.",
        data: [],
      };
    }

    const result = await prisma.bookingSlot.createMany({
      data: slotsToInsert,
      skipDuplicates: true,
    });

    return {
      success: true,
      msg: "Booking slots created successfully.",
      data: {
        createdCount: result.count,
        slots: slotsToInsert,
      },
    };
  } catch (error) {
    console.error("createBookingSlotsFromClient:", error);

    return {
      success: false,
      msg: "Server error while creating booking slots.",
      data: error.message,
    };
  }
}

/* ------------------ GET SLOTS FOR ONE DATE ------------------ */
/**
 * Accepts:
 *  - "2025-12-06" (string, YYYY-MM-DD)
 *  OR
 *  - FormData with "date" = "2025-12-06"
 */
export async function getBookingSlots(formDataOrDate) {
  try {
    let dateStr;

    if (formDataOrDate instanceof FormData) {
      dateStr = formDataOrDate.get("date");
    } else {
      dateStr = formDataOrDate;
    }

    if (!dateStr) {
      return {
        success: false,
        msg: "Date is required.",
        data: null,
      };
    }

    const slotDate = parseYMDtoDate(dateStr);

    const rows = await prisma.bookingSlot.findMany({
      where: {
        slotDate,
        isBooked: false,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    const slots = rows.map((row) => ({
      id: row.id,
      label: `${row.startTime} - ${row.endTime}`,
      startTime: row.startTime,
      endTime: row.endTime,
      slotDate: dateStr,
    }));

    return {
      success: true,
      msg: slots.length
        ? "Booking slots fetched successfully."
        : "No booking slots found for this date.",
      data: slots,
    };
  } catch (error) {
    console.error("getBookingSlots:", error);

    return {
      success: false,
      msg: "Failed to fetch booking slots.",
      data: error.message,
    };
  }
}

/* ------------------ GET ALL BOOKABLE DATES ------------------ */

export async function getBookableDates() {
  try {
    const rows = await prisma.bookingSlot.findMany({
      where: {
        isBooked: false,
      },
      select: {
        slotDate: true,
      },
      distinct: ["slotDate"],
      orderBy: {
        slotDate: "asc",
      },
    });

    // Convert JS Date -> "YYYY-MM-DD" using UTC parts
    const dateStrings = rows.map((row) => {
      const d = row.slotDate;
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    });

    return {
      success: true,
      msg: "Bookable dates fetched successfully.",
      data: dateStrings,
    };
  } catch (error) {
    console.error("getBookableDates:", error);

    return {
      success: false,
      msg: "Failed to fetch bookable dates.",
      data: error.message,
    };
  }
}

export const deleteBookingSlot = async (formDataOrObj) => {
  // Read inputs
  let slotIdRaw;
  let slotDateRaw;

  if (formDataOrObj && typeof formDataOrObj.get === "function") {
    slotIdRaw = formDataOrObj.get("slotId");
    slotDateRaw = formDataOrObj.get("slotDate"); // optional when numeric id, required when label
  } else if (formDataOrObj) {
    slotIdRaw = formDataOrObj.slotId;
    slotDateRaw = formDataOrObj.slotDate;
  }

  if (slotIdRaw === undefined || slotIdRaw === null || slotIdRaw === "") {
    return { success: false, msg: "No slotId provided" };
  }

  // Helper: parse YYYY-MM-DD -> Date (local midnight)
  const parseYMDToDate = (ymd) => {
    const parts = String(ymd).split("-").map(Number);
    if (parts.length !== 3 || parts.some((p) => Number.isNaN(p))) return null;
    const [y, mo, d] = parts;
    return new Date(y, mo - 1, d);
  };

  // If numeric -> treat as DB id
  const maybeNum = Number(slotIdRaw);
  if (!Number.isNaN(maybeNum) && Number.isInteger(maybeNum) && maybeNum > 0) {
    const slotId = maybeNum;

    const slot = await prisma.bookingSlot.findUnique({
      where: { id: slotId },
      select: {
        id: true,
        isBooked: true,
        slotDate: true,
        startTime: true,
        endTime: true,
      },
    });

    if (!slot) return { success: false, msg: "Slot not found" };
    if (slot.isBooked)
      return { success: false, msg: "Cannot delete a booked slot" };

    await prisma.bookingSlot.delete({ where: { id: slotId } });

    revalidatePath("/admin/booking-slots");
    return {
      success: true,
      msg: "Slot deleted",
      slot: {
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        slotDate: slot.slotDate,
      },
    };
  }

  // Otherwise treat slotIdRaw as a label like "09:00-09:10" or "09:00 - 09:10".
  const label = String(slotIdRaw).trim();
  // accept both "09:00-09:10" and "09:00 - 09:10"
  const parts = label.split("-").map((s) => s.trim());
  if (parts.length !== 2)
    return {
      success: false,
      msg: "Invalid slot label format; expected 'HH:MM-HH:MM'.",
    };

  const [startTime, endTime] = parts;
  if (!/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime)) {
    return { success: false, msg: "Invalid time format in slot label." };
  }

  if (!slotDateRaw) {
    return {
      success: false,
      msg: "slotDate (YYYY-MM-DD) is required when slotId is a label.",
    };
  }

  const slotDateObj = parseYMDToDate(slotDateRaw);
  if (!slotDateObj)
    return {
      success: false,
      msg: "Invalid slotDate format; expected YYYY-MM-DD.",
    };

  // find the slot row by date + startTime + endTime
  const slotRow = await prisma.bookingSlot.findFirst({
    where: {
      slotDate: slotDateObj,
      startTime,
      endTime,
    },
    select: {
      id: true,
      isBooked: true,
      startTime: true,
      endTime: true,
      slotDate: true,
    },
  });

  if (!slotRow) {
    // return friendly message
    return {
      success: false,
      msg: "Slot not found for that date and time range.",
    };
  }

  if (slotRow.isBooked) {
    return { success: false, msg: "Cannot delete a booked slot" };
  }

  await prisma.bookingSlot.delete({ where: { id: slotRow.id } });

  revalidatePath("/profile/bookings");
  return {
    success: true,
    msg: "Slot deleted",
    slot: {
      id: slotRow.id,
      startTime: slotRow.startTime,
      endTime: slotRow.endTime,
      slotDate: slotRow.slotDate,
    },
  };
};

export const deleteBookingSlotsByDate = async (formDataOrObj) => {
  // Read input
  let slotDateRaw;
  if (formDataOrObj && typeof formDataOrObj.get === "function") {
    slotDateRaw = formDataOrObj.get("slotDate");
  } else if (formDataOrObj && formDataOrObj.slotDate !== undefined) {
    slotDateRaw = formDataOrObj.slotDate;
  }

  if (!slotDateRaw) return { success: false, msg: "No slotDate provided" };

  // parse YYYY-MM-DD into year/month/day integers
  const parts = String(slotDateRaw).split("-").map(Number);
  if (parts.length !== 3 || parts.some((p) => Number.isNaN(p))) {
    return {
      success: false,
      msg: "Invalid slotDate format (expected YYYY-MM-DD)",
    };
  }
  const [y, mo, d] = parts;

  // Build startOfDay and startOfNextDay as UTC midnight to be safe.
  // Using Date.UTC ensures a consistent instant regardless of server TZ.
  const startOfDay = new Date(Date.UTC(y, mo - 1, d, 0, 0, 0, 0));
  const startOfNextDay = new Date(Date.UTC(y, mo - 1, d + 1, 0, 0, 0, 0));

  // Debugging log (remove in production)
  // console.debug("deleteBookingSlotsByDate: startOfDay", startOfDay.toISOString(), "next", startOfNextDay.toISOString());

  // fetch slots in the half-open interval [startOfDay, startOfNextDay)
  const slots = await prisma.bookingSlot.findMany({
    where: {
      slotDate: {
        gte: startOfDay,
        lt: startOfNextDay,
      },
    },
    select: { id: true, startTime: true, endTime: true, isBooked: true },
    orderBy: { startTime: "asc" },
  });

  if (!slots || slots.length === 0) {
    return { success: false, msg: "No slots found for that date" };
  }

  const booked = slots.filter((s) => s.isBooked);
  if (booked.length > 0) {
    return {
      success: false,
      msg: "Cannot delete slots for this date: some slots are already booked",
      booked: booked.map((b) => ({
        id: b.id,
        startTime: b.startTime,
        endTime: b.endTime,
      })),
    };
  }

  const idsToDelete = slots.map((s) => s.id);
  await prisma.bookingSlot.deleteMany({ where: { id: { in: idsToDelete } } });

  revalidatePath("/admin/booking-slot");

  return {
    success: true,
    msg: `Deleted ${idsToDelete.length} slot(s) for ${slotDateRaw}`,
    deletedCount: idsToDelete.length,
  };
};
