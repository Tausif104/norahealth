"use client";

import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";

import { LoaderIcon, MoreHorizontal, PanelLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useAdmin } from "@/lib/adminContext";
import { toast } from "sonner";
import Link from "next/link";
import { deleteOrder, getAllOrdersAction } from "@/actions/order.action";

const statusPill = (status, trackingId) => {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap";

  if (status === "clinicalreview") {
    return (
      <span className={`${base} bg-amber-50 text-amber-700 border-amber-200`}>
        Under clinical review
      </span>
    );
  }

  if (status === "posted") {
    return (
      <span
        className={`${base} bg-blue-50 text-blue-700 border-blue-200 flex flex-col items-start`}
      >
        <span>Posted via Royal Mail</span>
        <span>{trackingId ? `Tracking ID: ${trackingId}` : ""}</span>
      </span>
    );
  }

  if (status === "delivered") {
    return (
      <span className={`${base} bg-green-50 text-green-700 border-green-200`}>
        Delivered
      </span>
    );
  }

  return (
    <span className={`${base} bg-gray-50 text-gray-700 border-gray-200`}>
      {String(status)}
    </span>
  );
};

const TableLoader = ({ colSpan }) => (
  <TableRow>
    <TableCell colSpan={colSpan} className='h-24 text-center'>
      <div className='w-full justify-center items-center h-[30vh] flex'>
        <LoaderIcon className='size-5 animate-spin mx-auto' />
      </div>
    </TableCell>
  </TableRow>
);

// -----------------------
// TABLE COLUMNS (Orders)
// -----------------------
const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "fullName", header: "Full Name" },
  {
    accessorKey: "email",
    header: "Email",
    filterFn: (row, id, value) => {
      const v = (value ?? "").toString().toLowerCase();
      const cell = (row.getValue(id) ?? "").toString().toLowerCase();
      return cell.includes(v);
    },
    cell: ({ row }) => (
      <Link
        href={`/admin/${row.getValue("id")}/orders`}
        className='hover:underline'
      >
        {row.getValue("email")}
      </Link>
    ),
  },
  { accessorKey: "phoneNumber", header: "Phone" },
  { accessorKey: "medicineName", header: "Medicine" },
  { accessorKey: "trackingId", header: "Tracking ID" },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, id, value) => {
      if (!value) return true;
      return String(row.getValue(id)) === String(value);
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      const trackingId = row.getValue("trackingId");
      return statusPill(status, trackingId);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(new Date(row.getValue("createdAt"))),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>
              <Link href={`/admin/orders/${order.id}`}>View Details</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className='text-red-600'
              onClick={() => table.options.meta.onDelete(order.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function AllOrdersTable() {
  const { setMenuOpen } = useAdmin();

  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [day, setDay] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);

  async function fetchOrders() {
    setLoading(true);

    try {
      const toUndef = (v) => (v && v !== "all" ? v : undefined);

      const res = await getAllOrdersAction({
        year: toUndef(year),
        month: toUndef(month),
        day: toUndef(day),
        status: toUndef(statusFilter), // (optional) if you later want server-side status
      });

      if (!res?.success) {
        toast.error(res?.message || "Failed to load orders");
        setOrders([]);
        return;
      }

      setOrders(res?.orders || []);
    } catch (err) {
      console.error(err);
      setOrders([]);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [year, month, day]);

  const table = useReactTable({
    data: orders,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    meta: {
      onDelete: async (id) => {
        const ok = confirm("Delete this order?");
        if (!ok) return;

        const res = await deleteOrder({ orderId: id });
        if (res?.success) {
          toast.success(res?.message || "Order deleted");
          fetchOrders();
        } else {
          toast.error(res?.message || "Delete failed");
        }
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Filter options (same style like your component)
  const now = new Date();
  const currentYear = now.getFullYear();
  const yearOptions = Array.from(new Set([2024, currentYear, currentYear + 1]))
    .sort((a, b) => a - b)
    .map(String);

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

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  return (
    <div className='w-full p-6 overflow-x-auto'>
      {/* HEADER */}
      <div className='flex items-center gap-4 mb-4'>
        <button
          onClick={() => setMenuOpen(true)}
          className='lg:hidden w-[40px] h-[40px] bg-[#d67b0e] text-white flex justify-center items-center rounded-full'
        >
          <PanelLeft />
        </button>
        <h2 className='text-xl font-semibold'>Orders</h2>
      </div>

      {/* FILTERS (simple dropdowns like yours) */}
      {/* FILTERS (shadcn Select) */}
      <div className='flex flex-wrap items-end gap-3'>
        {/* Year */}
        <div>
          <label className='block text-xs text-gray-600 mb-1'>Year</label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className='w-[120px] bg-white/40'>
              <SelectValue placeholder='Year' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Month */}
        <div>
          <label className='block text-xs text-gray-600 mb-1'>Month</label>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className='w-[120px] bg-white/40'>
              <SelectValue placeholder='Month' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {months.map((m) => (
                <SelectItem key={m.id} value={String(m.id)}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Day */}
        <div>
          <label className='block text-xs text-gray-600 mb-1'>Day</label>
          <Select value={day} onValueChange={setDay}>
            <SelectTrigger className='w-[80px] bg-white/40'>
              <SelectValue placeholder='Day' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {days.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <label className='block text-xs text-gray-600 mb-1'>Status</label>
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              table
                .getColumn("status")
                ?.setFilterValue(v === "all" ? undefined : v);
            }}
          >
            <SelectTrigger className='w-[180px] bg-white/40'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='clinicalreview'>Clinical Review</SelectItem>
              <SelectItem value='posted'>Posted</SelectItem>
              <SelectItem value='delivered'>Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear */}
        <div className='ml-auto'>
          <Button
            variant='outline'
            onClick={() => {
              setYear("");
              setMonth("");
              setDay("");
              setStatusFilter("");
              table.getColumn("status")?.setFilterValue(undefined);
              table.getColumn("email")?.setFilterValue("");
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* SEARCH */}
      <div className='flex items-center py-4 w-full max-w-sm'>
        <input
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("email")?.setFilterValue(e.target.value)
          }
          placeholder='Search by email...'
          className='w-[260px] bg-white/40 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200'
        />
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
              <TableLoader colSpan={columns.length} />
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
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
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
