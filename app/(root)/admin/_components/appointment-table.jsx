"use client";

import React, { useEffect, useState } from "react";
import { PanelLeft, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { deleteBooking, getAllBookingsAction } from "@/actions/booking.action";

export default function AppointmentTable() {
  const [year, setYear] = useState(""); // e.g. "2024"
  const [month, setMonth] = useState(""); // "1".."12"
  const [day, setDay] = useState(""); // "1".."31"
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const now = new Date();
  const currentYear = now.getFullYear();

  // first two preferred years (e.g. 2024, 2025)
  const preferredYears = [currentYear, currentYear + 1];

  // build year options: preferred first, then 2020..current+1 (unique)
  const yearOptions = (() => {
    const s = new Set();
    preferredYears.forEach((y) => s.add(y));
    for (let y = 2024; y <= currentYear + 1; y++) s.add(y);
    return Array.from(s).sort((a, b) => a - b);
  })();

  const months = [
    { id: 1, label: "Jan" },
    { id: 2, label: "Feb" },
    { id: 3, label: "Mar" },
    { id: 4, label: "Apr" },
    { id: 5, label: "May" },
    { id: 6, label: "Jun" },
    { id: 7, label: "Jul" },
    { id: 8, label: "Aug" },
    { id: 9, label: "Sep" },
    { id: 10, label: "Oct" },
    { id: 11, label: "Nov" },
    { id: 12, label: "Dec" },
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // fetch bookings from server action
  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await getAllBookingsAction({
        year: year || undefined,
        month: month || undefined,
        day: day || undefined,
      });
      if (res && res.success) {
        setBookings(res.bookings || []);
      } else {
        setBookings([]);
        console.error("Failed to load bookings:", res?.msg);
      }
    } catch (err) {
      console.error("fetchBookings error", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, day]);

  async function handleDelete(id) {
    if (!confirm("Delete this booking?")) return;
    try {
      const res = await deleteBooking({ bookingId: id });
      if (res && res.success) {
        // refresh list
        await fetchBookings();
      } else {
        alert("Delete failed: " + (res?.msg || "unknown"));
      }
    } catch (err) {
      console.error("delete error", err);
      alert("Delete failed");
    }
  }

  return (
    <div className='w-full p-6'>
      <div className='flex items-center gap-4 mb-4'>
        <button className='md:hidden w-[40px] h-[40px] bg-[#d67b0e] text-white flex justify-center items-center rounded-full'>
          <PanelLeft />
        </button>
        <h2 className='text-xl font-semibold'>Bookings</h2>
      </div>

      {/* Filters: Year -> Month -> Day using shadcn Select */}
      <div className='flex items-center gap-3 mb-4'>
        <div>
          <label className='block text-xs text-gray-600 mb-1'>Year</label>
          <Select
            value={year || undefined}
            onValueChange={(val) => setYear(val)}
          >
            <SelectTrigger className='w-[120px]'>
              <SelectValue placeholder='Year' />
            </SelectTrigger>

            <SelectContent>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='block text-xs text-gray-600 mb-1'>Month</label>
          <Select
            value={month || undefined}
            onValueChange={(val) => setMonth(val)}
          >
            <SelectTrigger className='w-[120px]'>
              <SelectValue placeholder='Month' />
            </SelectTrigger>

            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.id} value={String(m.id)}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='block text-xs text-gray-600 mb-1'>Day</label>
          <Select value={day || undefined} onValueChange={(val) => setDay(val)}>
            <SelectTrigger className='w-[80px]'>
              <SelectValue placeholder='Day' />
            </SelectTrigger>

            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='ml-auto'>
          <Button
            variant='outline'
            onClick={() => {
              setYear("");
              setMonth("");
              setDay("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Appointment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className='p-4 text-center'>
                  Loading…
                </TableCell>
              </TableRow>
            ) : bookings.length ? (
              bookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.fullName}</TableCell>
                  <TableCell>{b.email}</TableCell>
                  <TableCell>{b.phoneNumber}</TableCell>
                  <TableCell>{b.serviceName}</TableCell>
                  <TableCell>{b.providerName}</TableCell>
                  <TableCell>{formatDate(b.appointment)}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(String(b.id))
                            }
                          >
                            Copy ID
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(b.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className='text-center h-24'>
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
