"use client";

import {
  getBookableDates,
  getBookingSlots,
} from "@/actions/bookingSlot.action";
import React, { useState, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import { toast } from "sonner";

/**
 * Inline appointment slot picker (calendar + 1-hour slots).
 * Calls onSelect({ date: "YYYY-MM-DD", time: "HH:MM", label }) when a slot is chosen.
 */
export default function SlotPicker({ value, onSelect }) {
  const [nowTick, setNowTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNowTick((t) => t + 1), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  function toMinutes(hhmm) {
    if (!hhmm) return 0;
    const [hh, mm] = hhmm.split(":").map(Number);
    return hh * 60 + mm;
  }

  // "09:00" -> "9.00"   |   "09:00 - 10:00" range -> "9.00–10.00"
  function fmtTime(hhmm) {
    if (!hhmm) return "";
    const [hh, mm] = hhmm.split(":");
    return `${Number(hh)}.${mm}`;
  }
  function fmtRange(start, end) {
    return `${fmtTime(start)}–${fmtTime(end)}`;
  }
  function currentMinutes() {
    const n = new Date();
    return n.getHours() * 60 + n.getMinutes();
  }

  function parseYMD(ymd) {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function formatYMD(date) {
    if (!date) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  const [bookableDateStrings, setBookableDateStrings] = useState([]);
  const bookableDates = useMemo(
    () => bookableDateStrings.map((s) => parseYMD(s)),
    [bookableDateStrings]
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await getBookableDates();
        if (!res.success) {
          toast.error(res.msg || "Failed to load available days.");
          return;
        }
        setBookableDateStrings(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Could not load available days.");
      }
    })();
  }, []);

  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  const [calValue, setCalValue] = useState(today);

  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  function isSameDay(a, b) {
    if (!a || !b) return false;
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  const selectedDateIsBookable = useMemo(
    () => bookableDates.some((d) => isSameDay(d, calValue)),
    [bookableDates, calValue]
  );

  function tileDisabled({ date, view }) {
    if (view !== "month") return false;
    if (date < today) return true;
    if (isSameDay(date, today)) return false;
    return !bookableDates.some((d) => isSameDay(d, date));
  }

  function onDateChange(d) {
    setCalValue(d);
  }

  useEffect(() => {
    (async () => {
      if (!calValue || !selectedDateIsBookable) {
        setTimeSlots([]);
        return;
      }
      setLoadingSlots(true);
      try {
        const ymd = formatYMD(calValue);
        const res = await getBookingSlots(ymd);
        if (!res.success) {
          toast.error(res.msg || "Failed to load slots");
          setTimeSlots([]);
          return;
        }
        setTimeSlots(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Could not load time slots.");
        setTimeSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    })();
  }, [calValue, selectedDateIsBookable]);

  const isToday = isSameDay(calValue, today);

  // mark past windows (today only) as unavailable instead of hiding them
  const renderSlots = useMemo(() => {
    const nowMins = currentMinutes();
    return timeSlots.map((slot) => ({
      ...slot,
      isPast: isToday && toMinutes(slot.startTime) <= nowMins,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSlots, isToday, nowTick]);

  function handleSlotSelect(slot) {
    if (!selectedDateIsBookable || !calValue) {
      toast.error("Please pick an available date first.");
      return;
    }
    if (slot.isPast || slot.isFull) return;
    onSelect?.({
      date: formatYMD(calValue),
      time: slot.startTime,
      label: slot.label,
    });
  }

  return (
    <div className='w-full'>
      <h2 className='text-2xl font-semibold text-[#2B3244] mb-5'>
        Pick a date &amp; time
      </h2>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left: calendar + helper */}
        <div className='w-full lg:max-w-[360px] shrink-0'>
          <div className='bg-white rounded-2xl shadow-sm border border-[#EEE0CF] p-3 sm:p-4'>
            <div className='calendar-wrapper text-sm'>
              <Calendar
                onChange={onDateChange}
                value={calValue}
                tileDisabled={tileDisabled}
                className='react-calendar-custom w-full border-0'
              />
            </div>
          </div>

          <p className='text-center text-sm text-[#6B7280] mt-4 px-4'>
            Choose a 1-hour window. Your clinician will call you during that
            time. The call itself only takes a few minutes.
          </p>
        </div>

        {/* Right: available times */}
        <div className='flex-1 min-w-0'>
          <h3 className='text-xs font-semibold tracking-widest text-[#9CA3AF] uppercase mb-4'>
            Available Times
          </h3>

        {!selectedDateIsBookable ? (
          <div className='text-sm text-[#6B7280]'>
            Sorry, no availability on this date. Try another day.
          </div>
        ) : loadingSlots ? (
          <div className='text-sm text-[#6B7280]'>Loading time slots...</div>
        ) : renderSlots.length === 0 ? (
          <div className='text-sm text-[#6B7280]'>
            No time slots available for this date.
          </div>
        ) : (
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              {renderSlots.map((slot) => {
                const unavailable = slot.isPast || slot.isFull;
                const isActive =
                  value &&
                  value.time === slot.startTime &&
                  value.date === formatYMD(calValue);

                if (unavailable) {
                  return (
                    <span
                      key={slot.id}
                      className='text-sm text-center py-2.5 px-3 rounded-full border border-[#EEE0CF] text-[#C7C9CE] line-through cursor-not-allowed select-none'
                      title={slot.isFull ? "Fully booked" : "Time has passed"}
                    >
                      {fmtRange(slot.startTime, slot.endTime)}
                    </span>
                  );
                }

                return (
                  <button
                    type='button'
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot)}
                    className={`text-sm text-center py-2.5 px-3 rounded-full border transition cursor-pointer
                      ${
                        isActive
                          ? "bg-[#D6866B] text-white border-[#D6866B] font-medium"
                          : "bg-white text-[#2B3244] border-[#EEE0CF] hover:border-[#D6866B] hover:text-[#D6866B]"
                      }`}
                  >
                    {fmtRange(slot.startTime, slot.endTime)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
