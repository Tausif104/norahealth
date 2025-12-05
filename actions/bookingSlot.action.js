"use server";

import { prisma } from "@/lib/client/prisma";

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
      id: `${row.startTime}-${row.endTime}`,
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
