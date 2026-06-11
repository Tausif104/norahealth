"use client";

import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createBookingSlots } from "@/actions/booking.action"; // <-- your existing action

function toYMD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function formatDateDDMMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isWeekend(d) {
  const day = d.getDay(); // 0=Sun, 6=Sat
  return day === 0 || day === 6;
}

function eachDayInclusive(start, end) {
  const out = [];
  let cur = startOfDay(start);
  const last = startOfDay(end);

  while (cur <= last) {
    out.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

export default function BulkCreateSlotsPanel() {
  const today = useMemo(() => {
    const t = new Date();
    return startOfDay(t);
  }, []);

  // Calendar range value: [start, end]
  const [rangeValue, setRangeValue] = useState([today, today]);

  const [ranges, setRanges] = useState([
    { id: Date.now(), startTime: "09:00", endTime: "12:00" },
    { id: Date.now() + 1, startTime: "15:00", endTime: "18:00" },
  ]);

  const [skipWeekends, setSkipWeekends] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function addRange() {
    setRanges((r) => [
      ...r,
      { id: Date.now() + Math.random(), startTime: "09:00", endTime: "10:00" },
    ]);
  }

  function removeRange(id) {
    setRanges((r) => r.filter((x) => x.id !== id));
  }

  function updateRange(id, key, value) {
    setRanges((r) => r.map((x) => (x.id === id ? { ...x, [key]: value } : x)));
  }

  function tileDisabled({ date, view }) {
    if (view !== "month") return false;
    if (startOfDay(date) < today) return true; // past disable
    return false; // weekend disable করবেন না — range select smooth থাকে
  }

  async function handleSubmit() {
    const start = Array.isArray(rangeValue) ? rangeValue[0] : null;
    const end = Array.isArray(rangeValue) ? rangeValue[1] : null;

    if (!start || !end) return toast.error("Please select start & end date");

    const cleanRanges = ranges
      .map((r) => ({
        startTime: (r.startTime || "").trim(),
        endTime: (r.endTime || "").trim(),
      }))
      .filter((r) => r.startTime && r.endTime);

    if (!cleanRanges.length)
      return toast.error("Please add at least 1 time range");

    setLoading(true);
    setResult(null);

    try {
      const days = eachDayInclusive(start, end);

      let dateCount = 0;
      let skippedWeekendDates = 0;

      let totalCreated = 0;
      let totalExisting = 0;
      let failedDates = [];

      for (const d of days) {
        if (skipWeekends && isWeekend(d)) {
          skippedWeekendDates++;
          continue;
        }

        const slotDate = toYMD(d);
        dateCount++;

        // ✅ call your existing single-day action
        const res = await createBookingSlots({
          slotDate, // <-- IMPORTANT
          ranges: cleanRanges,
        });

        if (!res?.success) {
          failedDates.push(slotDate);
          continue;
        }

        // adapt to your server response fields
        totalCreated += Number(
          res?.summary?.createdCount ??
            res?.data?.createdCount ??
            res?.createdCount ??
            0,
        );
        totalExisting += Number(
          res?.summary?.existingCount ??
            res?.data?.existingCount ??
            res?.existingCount ??
            0,
        );
      }

      const summary = {
        success: failedDates.length === 0,
        dateCount,
        skippedWeekendDates,
        totalCreated,
        totalExisting,
        failedDates,
      };

      setResult(summary);

      if (failedDates.length) {
        toast.error(
          `Some dates failed: ${failedDates.slice(0, 3).join(", ")}${
            failedDates.length > 3 ? "..." : ""
          }`,
        );
      } else {
        toast.success("Bulk slots created successfully");
      }
    } catch (e) {
      console.error(e);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  const startStr =
    Array.isArray(rangeValue) && rangeValue[0]
      ? formatDateDDMMMYYYY(rangeValue[0])
      : "";
  const endStr =
    Array.isArray(rangeValue) && rangeValue[1]
      ? formatDateDDMMMYYYY(rangeValue[1])
      : "";

  return (
    <div className='grid grid-cols-12 gap-6 p-6 bg-white rounded-2xl'>
      {/* Left */}
      <div className='col-span-7'>
        <h3 className='text-lg font-semibold mb-2'>Select date range</h3>

        <label className='flex items-center gap-2 text-sm mb-3'>
          <input
            type='checkbox'
            checked={skipWeekends}
            onChange={(e) => setSkipWeekends(e.target.checked)}
          />
          Skip weekends (Sat/Sun)
        </label>

        <Calendar
          selectRange
          value={rangeValue}
          onChange={setRangeValue}
          tileDisabled={tileDisabled}
        />

        <div className='mt-3 text-sm text-muted-foreground'>
          Selected:{" "}
          <span className='font-medium'>
            {startStr} → {endStr}
          </span>
        </div>
      </div>

      {/* Right */}
      <div className='col-span-5'>
        <h3 className='text-lg font-semibold mb-3'>Available hours</h3>

        <div className='space-y-3 mb-4'>
          {ranges.map((r) => (
            <div key={r.id} className='flex items-end gap-2'>
              <div className='flex-1'>
                <label className='block text-xs'>Start</label>
                <Input
                  type='time'
                  value={r.startTime}
                  onChange={(e) =>
                    updateRange(r.id, "startTime", e.target.value)
                  }
                />
              </div>

              <div className='flex-1'>
                <label className='block text-xs'>End</label>
                <Input
                  type='time'
                  value={r.endTime}
                  onChange={(e) => updateRange(r.id, "endTime", e.target.value)}
                />
              </div>

              <button
                type='button'
                className='text-red-500 mb-2 px-2'
                onClick={() => removeRange(r.id)}
                title='Remove range'
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className='flex items-end gap-2 mb-4'>
          <Button type='button' variant='outline' onClick={addRange}>
            + Add range
          </Button>
        </div>

        <p className='text-xs text-muted-foreground mb-4'>
          Each slot is 1 hour and allows up to 6 bookings.
        </p>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className='bg-[#d67b0e] hover:bg-[#b97622]'
        >
          {loading ? "Creating…" : "Create bulk slots"}
        </Button>

        {result && (
          <div className='mt-4 p-3 rounded bg-muted text-sm'>
            <div className='font-medium'>
              {result.failedDates?.length ? "Completed with errors" : "Success"}
            </div>
            <div>
              Days processed: {result.dateCount} • Weekend skipped:{" "}
              {result.skippedWeekendDates}
            </div>
            <div>
              Created: {result.totalCreated} • Existing: {result.totalExisting}
            </div>
            {!!result.failedDates?.length && (
              <div className='text-red-600 mt-2'>
                Failed dates: {result.failedDates.join(", ")}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
