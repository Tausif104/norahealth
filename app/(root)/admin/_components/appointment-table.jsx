"use client";

import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

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

import { MoreHorizontal, PanelLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { deleteBooking, getAllBookingsAction } from "@/actions/booking.action";
import { useAdmin } from "@/lib/adminContext";

// -----------------------
// TABLE COLUMNS
// -----------------------
const columns = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "serviceName",
    header: "Service",
  },
  {
    accessorKey: "providerName",
    header: "Provider",
  },
  {
    accessorKey: "appointment",
    header: "Appointment",
    cell: ({ row }) => formatDate(row.getValue("appointment")),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const booking = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(booking.id))}
            >
              Copy ID
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => row.options.meta.onDelete(booking.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// -----------------------
// MAIN COMPONENT
// -----------------------
export default function AppointmentTable() {
  const { setMenuOpen } = useAdmin();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch bookings
  async function fetchBookings() {
    setLoading(true);
    try {
      const res = await getAllBookingsAction({
        year: year || undefined,
        month: month || undefined,
        day: day || undefined,
      });

      setBookings(res?.bookings || []);
    } catch (err) {
      console.error(err);
      setBookings([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBookings();
  }, [year, month, day]);

  // Table pagination + actions
  const table = useReactTable({
    data: bookings,
    columns,
    meta: {
      onDelete: async (id) => {
        if (!confirm("Delete booking?")) return;

        const res = await deleteBooking({ bookingId: id });
        if (res?.success) fetchBookings();
        else alert("Delete failed");
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  // Options
  const now = new Date();
  const currentYear = now.getFullYear();
  // first two preferred years (e.g. 2024, 2025)
  const preferredYears = [currentYear, currentYear + 1];
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

  return (
    <div className='w-full p-6'>
      {/* HEADER */}
      <div className='flex items-center gap-4 mb-4'>
        <button
          onClick={() => setMenuOpen(true)}
          className='lg:hidden w-[40px] h-[40px] bg-[#d67b0e] text-white flex justify-center items-center rounded-full'
        >
          <PanelLeft />
        </button>
        <h2 className='text-xl font-semibold'>Appointments</h2>
      </div>

      {/* FILTERS */}
      <div className='flex items-center gap-3 mb-4'>
        <div>
          <label className='block text-xs text-gray-600 mb-1'>Year</label>
          <Select value={year} onValueChange={setYear}>
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
          <Select value={month} onValueChange={setMonth}>
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
          <Select value={day} onValueChange={setDay}>
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

      {/* TABLE */}
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='text-center h-24'
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='text-center h-24'
                >
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION FOOTER */}
      <div className='flex items-center justify-end gap-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>

        <Button
          variant='outline'
          size='sm'
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
