"use client";

import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // basic calendar styling (you can override)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBookingSlots } from "@/actions/booking.action";
import { toast } from "sonner";

export default function CreateSlotsPanel() {
  const [date, setDate] = useState(new Date()); // selected date (Date object)
  const [ranges, setRanges] = useState([
    { id: Date.now(), startTime: "09:00", endTime: "12:00" },
  ]);
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

  // Helper to format date as YYYY-MM-DD
  function formatDateYYYYMMDD(d) {
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${mo}-${day}`;
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

  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  function isSameDay(a, b) {
    if (!a || !b) return false;
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function tileDisabled({ date, view }) {
    if (view !== "month") return false;
    //  Disable all past dates
    if (date < today) return true;

    //  Allow today even if not in bookableDates (optional)
    if (isSameDay(date, today)) return false;
  }

  async function handleSubmit(e) {
    e?.preventDefault?.();
    setLoading(true);
    setResult(null);

    // prepare payload
    const payload = {
      slotDate: formatDateYYYYMMDD(date),
      ranges: ranges.map(({ startTime, endTime }) => ({ startTime, endTime })),
    };

    try {
      // call server action (project style used earlier)
      const res = await createBookingSlots(payload);
      setResult(res);
      toast.success("Slots created successfully");
      // optionally refresh or clear
      setRanges([{ id: Date.now(), startTime: "09:00", endTime: "10:00" }]);
    } catch (err) {
      console.error("createBookingSlots error", err);
      setResult({ success: false, msg: "Failed to create slots" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='grid grid-cols-12 gap-6 p-6 bg-white rounded-lg shadow'>
      {/* Left: calendar (col-span 7) */}
      <div className='col-span-7'>
        <h3 className='text-lg font-medium mb-3'>Select date</h3>
        <Calendar
          tileDisabled={tileDisabled}
          onChange={setDate}
          value={date}
          // tileDisabled / tileClassName can be used to show booked dates if desired
        />
        <div className='mt-3 text-sm text-muted-foreground'>
          Selected: {formatDateDDMMMYYYY(date)}
        </div>
      </div>

      {/* Right: ranges (col-span 5) */}
      <div className='col-span-5'>
        <h3 className='text-lg font-medium mb-3'>Available hours</h3>

        <div className='space-y-3 mb-4'>
          {ranges.map((r, idx) => (
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

              <div className='flex items-end'>
                <button
                  type='button'
                  className='text-red-500 cursor-pointer! mb-1.5'
                  onClick={() => removeRange(r.id)}
                  aria-label='Remove range'
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='flex items-end gap-2 mb-4'>
          <Button variant='outline' onClick={addRange}>
            + Add range
          </Button>
        </div>

        <p className='text-xs text-muted-foreground mb-4'>
          Each slot is 1 hour and allows up to 6 bookings.
        </p>

        <div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className='bg-theme cursor-pointer!'
          >
            {loading ? "Creating…" : "Create slots"}
          </Button>
        </div>

        {/* result summary */}
        {result && (
          <div className='mt-4 p-3 bg-muted rounded'>
            {result.success ? (
              <div>
                <div className='font-medium'>Slots created</div>
                <div className='text-sm'>
                  Candidates: {result.summary?.candidateCount} • Created:{" "}
                  {result.summary?.createdCount} • Skipped:{" "}
                  {result.summary?.existingCount}
                </div>
              </div>
            ) : (
              <div className='text-sm text-red-600'>
                {result.msg || "Failed"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
