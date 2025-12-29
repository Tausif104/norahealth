"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import Link from "next/link";
import { toast } from "sonner";
import { PanelLeft, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  getBookableDates,
  getBookingSlots,
  deleteBookingSlot,
  deleteBookingSlotsByDate,
} from "@/actions/bookingSlot.action";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAdmin } from "@/lib/adminContext";

/**
 * Reusable confirm dialog hook (uses shadcn AlertDialog)
 * Usage:
 *   const { confirm, ConfirmDialog } = useConfirmDialog();
 *   // await confirm({ title, description }) -> boolean
 *   // render <ConfirmDialog />
 */
function useConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [resolver, setResolver] = useState(null);
  const [title, setTitle] = useState("Are you sure?");
  const [description, setDescription] = useState("");

  const confirm = ({ title: t = "Are you sure?", description: d = "" } = {}) =>
    new Promise((resolve) => {
      setTitle(t);
      setDescription(d);
      setResolver(() => resolve);
      setOpen(true);
    });

  const handleConfirm = () => {
    resolver?.(true);
    setOpen(false);
  };

  const handleCancel = () => {
    resolver?.(false);
    setOpen(false);
  };

  const ConfirmDialog = () => (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} className='cursor-pointer!'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className='bg-theme cursor-pointer!'
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return { confirm, ConfirmDialog };
}

export default function BookingSlots() {
  const router = useRouter();
  const { setMenuOpen } = useAdmin();

  // parse "YYYY-MM-DD" from server into Date object for calendar
  function parseYMD(ymd) {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  // format Date -> "YYYY-MM-DD" (for server)
  function formatYMD(date) {
    if (!date) return null;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // bookable dates from DB
  const [bookableDateStrings, setBookableDateStrings] = useState([]);
  const bookableDates = useMemo(
    () => bookableDateStrings.map((s) => parseYMD(s)),
    [bookableDateStrings]
  );

  // helper functions to fetch data (used after deletes to refresh)
  const fetchBookableDates = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchBookableDates();
  }, [fetchBookableDates]);

  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  const [value, setValue] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState(null);

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
    () => bookableDates.some((d) => isSameDay(d, value)),
    [bookableDates, value]
  );

  useEffect(() => {
    if (!selectedDateIsBookable) {
      setSelectedSlot(null);
      setTimeSlots([]);
    }
  }, [selectedDateIsBookable]);

  function tileDisabled({ date, view }) {
    if (view !== "month") return false;
    if (date < today) return true;

    //  Allow today even if not in bookableDates (optional)
    if (isSameDay(date, today)) return false;
    const isBookable = bookableDates.some((d) => isSameDay(d, date));
    if (isSameDay(date, today)) return false;
    return !isBookable;
  }

  function onDateChange(d) {
    setValue(d);
    setSelectedSlot(null);
  }

  // fetch slots from DB when date changes & is bookable
  const fetchSlotsForDate = useCallback(
    async (dateObj) => {
      if (!dateObj) {
        setTimeSlots([]);
        return;
      }
      if (!bookableDates.some((d) => isSameDay(d, dateObj))) {
        setTimeSlots([]);
        return;
      }

      setLoadingSlots(true);
      try {
        const ymd = formatYMD(dateObj); // "2025-12-06"
        const res = await getBookingSlots(ymd);

        if (!res.success) {
          toast.error(res.msg || "Failed to load slots");
          setTimeSlots([]);
          return;
        }

        // res.data expected to be array of slots: { id, startTime, endTime, label, isBooked }
        setTimeSlots(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Could not load time slots.");
        setTimeSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    },
    [bookableDates]
  );

  useEffect(() => {
    fetchSlotsForDate(value);
  }, [value, selectedDateIsBookable, fetchSlotsForDate]);

  // ---------- Confirm dialog hook ----------
  const { confirm, ConfirmDialog } = useConfirmDialog();

  // ---------- Delete handlers ----------

  // delete single slot by id (uses shadcn confirm)
  async function handleDeleteSlot(slotId) {
    if (!slotId) return;

    const slotDate = formatYMD(value);
    const proceed = await confirm({
      title: "Delete Slot",
      description: `Delete this slot (${slotDate})? This action cannot be undone.`,
    });
    if (!proceed) return;

    try {
      const res = await deleteBookingSlot({ slotId, slotDate });

      if (!res || !res.success) {
        toast.error(res?.msg || "Failed to delete slot");
        return;
      }

      toast.success(res.msg || "Slot deleted");
      await fetchSlotsForDate(value);
      await fetchBookableDates();
      setSelectedSlot(null);
    } catch (err) {
      console.error("deleteBookingSlot error", err);
      toast.error("Delete failed");
    }
  }

  // delete all slots for selected date (uses shadcn confirm)
  async function handleDeleteSlotsForDate() {
    const ymd = formatYMD(value); // "YYYY-MM-DD"
    if (!ymd) return;

    const proceed = await confirm({
      title: `Delete ALL slots for ${ymd}?`,
      description: "This action cannot be undone. Do you want to continue?",
    });
    if (!proceed) return;

    try {
      const res = await deleteBookingSlotsByDate({ slotDate: ymd });

      if (!res) {
        toast.error("Delete failed (no response).");
        return;
      }

      if (!res.success) {
        if (res.booked && Array.isArray(res.booked) && res.booked.length > 0) {
          const times = res.booked
            .map((b) => `${b.startTime}` + (b.endTime ? `-${b.endTime}` : ""))
            .join(", ");
          toast.error(`${res.msg}. Booked slots: ${times}`);
        } else {
          toast.error(res.msg || "Failed to delete slots for date");
        }
        return;
      }

      toast.success(res.msg || "Slots deleted for date");

      await fetchBookableDates();
      await fetchSlotsForDate(value);
      setSelectedSlot(null);
    } catch (err) {
      console.error("deleteBookingSlotsByDate error", err);
      toast.error("Delete failed");
    }
  }

  return (
    <div className='bg-[#f4e7e1] rounded-2xl overflow-hidden flex flex-col md:flex-row h-full'>
      {/* Left: react-calendar */}
      <div className='max-w-[730px] w-full p-6 bg-[#faf9f8] rounded-2xl'>
        {/* HEADER */}
        <div className='flex items-center gap-4 mb-4'>
          <button
            onClick={() => setMenuOpen(true)}
            className='lg:hidden w-[40px] h-[40px] bg-[#d67b0e] text-white flex justify-center items-center rounded-full'
          >
            <PanelLeft />
          </button>
          <h2 className='text-xl font-semibold'>Appointment Slots</h2>
        </div>
        <Link
          href='/admin/booking-slot/create-slot'
          className=' bg-[#d67b0e] hover:bg-black px-3 py-2 w-fit rounded-lg flex items-center justify-center text-white text-[12px] md:text-[16px] font-medium  tracking-widest'
        >
          Add Slot
        </Link>
        <div className='calendar-wrapper'>
          <Calendar
            onChange={onDateChange}
            value={value}
            tileDisabled={tileDisabled}
            className='react-calendar-custom w-full border-0'
          />
        </div>
      </div>

      {/* Right: Time slots */}
      <aside className='max-w-[330px] w-full bg-[#f4e7e1] p-[24px_16px] lg:p-[40px_50px]'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-[14px] font-medium text-[#2B3244] text-center'>
            {value.toLocaleDateString(undefined, {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </div>

          {/* Delete all button (only show when date is bookable) */}
          {selectedDateIsBookable && (
            <button
              onClick={handleDeleteSlotsForDate}
              title='Delete all slots for this date'
              className='ml-2 text-sm text-red-600 border px-2 py-1 rounded hover:bg-red-50'
            >
              Delete all
            </button>
          )}
        </div>

        {!selectedDateIsBookable ? (
          <div className='text-left p-4 '>
            <div className='text-sm mb-2'>
              Sorry, no availability on this date. Try another day.
            </div>
            <div className='text-sm hidden'>
              You can also contact us by phone at{" "}
              <a href='tel:02086797198' className='underline'>
                020 8679 7198
              </a>
              .
            </div>
          </div>
        ) : (
          <div className='space-y-2 max-h-[480px] overflow-y-scroll custom-scrollbar pr-3'>
            {loadingSlots && (
              <div className='text-sm mb-2'>Loading time slots...</div>
            )}

            {!loadingSlots && timeSlots.length === 0 && (
              <div className='text-sm mb-2'>
                No time slots available for this date.
              </div>
            )}

            {timeSlots.map((slot) => {
              const isActive = selectedSlot === slot.id;
              return (
                <div key={slot.id} className='relative'>
                  <button
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`w-full cursor-pointer text-center p-3 rounded-md border transition focus:outline-none flex items-center justify-center text-base font-medium text-black
                      ${
                        isActive
                          ? "bg-[#D6866B] text-white border-[#D6866B]"
                          : "border border-[#DFCAB0] hover:shadow-sm"
                      }`}
                  >
                    <div className='text-sm'>{slot.label}</div>
                  </button>

                  {/* delete icon; only show if slot is NOT booked */}
                  {!slot.isBooked ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSlot(slot.id);
                      }}
                      title='Delete slot'
                      className='absolute right-2 top-1/2 -translate-y-1/2 text-red-600 p-1'
                    >
                      <Trash className='w-4 h-4' />
                    </button>
                  ) : (
                    <div
                      title='Cannot delete booked slot'
                      className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-1'
                    >
                      <Trash className='w-4 h-4' />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </aside>

      {/* Confirm Dialog (render once) */}
      <ConfirmDialog />
    </div>
  );
}
