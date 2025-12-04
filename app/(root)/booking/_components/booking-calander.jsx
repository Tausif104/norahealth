"use client";
import { useBooking } from "@/lib/BookingContext";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import { toast } from "sonner";

// Single-file React component using react-calendar + TailwindCSS
// Install: npm install react-calendar

export default function BookingCalander() {
  const router = useRouter();
  const { bookingData, setBookingData } = useBooking();
  // --- helper: parse YYYY-MM-DD -> local Date (avoids UTC parse issues) ---
  function parseYMD(ymd) {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  // ---------- Configure bookable dates here ----------
  // Replace these example strings with your actual available dates
  const bookableDateStrings = [
    "2025-12-16",
    "2025-12-19",
    "2025-12-20",
    "2025-12-21",
    "2025-12-22",
    "2025-12-25",
    "2025-12-26",
    "2025-12-27",
    "2025-12-28",
    "2025-12-31",
  ];
  const bookableDates = useMemo(
    () => bookableDateStrings.map((s) => parseYMD(s)),
    []
  );
  // ---------------------------------------------------

  const today = useMemo(() => {
    const t = new Date();
    // zero out time for consistent comparisons
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  // --- Always default to today (per your request) ---
  const initialDate = today;

  const [value, setValue] = useState(initialDate);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // sample time slots for the selected day
  // Generate 10-minute time slots for the selected day
  const timeSlots = useMemo(() => {
    const slots = [];
    const startHour = 9; // first hour
    const endHour = 22; // last hour

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const start = new Date(value);
        start.setHours(hour, minute, 0, 0);

        const end = new Date(start.getTime() + 10 * 60 * 1000); // +10 minutes

        const startLabel = `${String(start.getHours()).padStart(
          2,
          "0"
        )}:${String(start.getMinutes()).padStart(2, "0")}`;

        const endLabel = `${String(end.getHours()).padStart(2, "0")}:${String(
          end.getMinutes()
        ).padStart(2, "0")}`;

        slots.push({
          id: `${startLabel}-${endLabel}`,
          label: `${startLabel} - ${endLabel}`,
        });
      }
    }

    return slots;
  }, [value]);

  // utility to compare same local day
  function isSameDay(a, b) {
    if (!a || !b) return false;
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  // check if currently selected date is in the bookable list
  const selectedDateIsBookable = useMemo(
    () => bookableDates.some((d) => isSameDay(d, value)),
    [bookableDates, value]
  );

  // If user picks a date that isn't bookable, clear slot (defensive)
  useEffect(() => {
    if (!selectedDateIsBookable) {
      setSelectedSlot(null);
    }
  }, [selectedDateIsBookable]);

  // disable all calendar tiles that are NOT in bookableDates
  // BUT keep today enabled (not disabled), per your request
  function tileDisabled({ date, view }) {
    if (view !== "month") return false;
    const isBookable = bookableDates.some((d) => isSameDay(d, date));
    // allow today's tile even if not bookable
    if (isSameDay(date, today)) return false;
    return !isBookable;
  }

  // handle date change: only changes when the clicked date is not disabled (react-calendar prevents clicks on disabled tiles)
  function onDateChange(d) {
    setValue(d);
    setSelectedSlot(null);
  }

  // format Date -> "YYYY-MM-DD"
  function formatYMD(date) {
    if (!date) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // given a slot id like "09:00-09:10" return "09:00"
  function extractStartTime(slotId) {
    if (!slotId) return "";
    return slotId.split("-")[0]; // "09:00"
  }

  function handleSlotSelect(slotId) {
    // Protect: don't allow selecting a slot for an unbookable date
    if (!selectedDateIsBookable) {
      toast.error("That date has no availability. Please choose another day.");
      return;
    }

    if (!value) {
      toast.error("Please select a date first.");
      return;
    }

    setSelectedSlot(slotId);

    // write into context bookingData with the exact keys you want
    const booking = {
      ...(bookingData ?? {}), // preserve any existing fields
      bookingdate: formatYMD(value), // "YYYY-MM-DD"
      bookingtime: extractStartTime(slotId), // "HH:MM"
    };

    setBookingData(booking);
    router.push("/booking/confirm");
  }

  return (
    <div className='bg-[#f4e7e1] rounded-2xl overflow-hidden flex flex-col md:flex-row h-full'>
      {/* Left: react-calendar */}
      <div className='max-w-[730px] w-full p-6 bg-[#faf9f8]  rounded-2xl'>
        <div className='calendar-wrapper'>
          {/* react-calendar default styles are CSS-based; we wrap to apply Tailwind spacing */}
          <Calendar
            onChange={onDateChange}
            showNeighboringMonth={false}
            value={value}
            tileDisabled={tileDisabled}
            className='react-calendar-custom w-full border-0'
          />
        </div>
      </div>

      {/* Right: Time slots */}
      <aside className='max-w-[330px] w-full bg-[#f4e7e1] p-[24px_16px] lg:p-[40px_50px]'>
        <div className='mb-4'>
          <div className='text-[18px] font-medium text-[#2B3244] text-center'>
            {value.toLocaleDateString(undefined, {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </div>
        </div>

        {/* If date has no availability, show friendly message + phone */}
        {!selectedDateIsBookable ? (
          <div className='text-left p-4 '>
            <div className='text-sm mb-2'>
              Sorry, no availability on this date. Try another day.
            </div>
            <div className='text-sm'>
              You can also contact us by phone at{" "}
              <a href='tel:02086797198' className='underline'>
                020 8679 7198
              </a>
              .
            </div>
          </div>
        ) : (
          <div className='space-y-2 max-h-[480px] overflow-y-scroll custom-scrollbar pr-3'>
            {timeSlots.map((slot) => {
              const isActive = selectedSlot === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => handleSlotSelect(slot.id)}
                  className={`w-full cursor-pointer text-center p-3 rounded-md border transition focus:outline-none flex items-center justify-center text-base font-medium text-black
                    ${
                      isActive
                        ? "bg-[#D6866B] text-white border-[#D6866B]"
                        : "  border border-[#DFCAB0] hover:shadow-sm"
                    }`}
                >
                  <div className='text-sm'>{slot.label}</div>
                </button>
              );
            })}
          </div>
        )}
      </aside>
    </div>
  );
}
