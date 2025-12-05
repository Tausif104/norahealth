"use server";

import { prisma } from "@/lib/client/prisma";
import { createCalendarEvent } from "@/lib/googleCalendar";

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
