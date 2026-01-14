"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { formatDate } from "@/lib/utils";

// status pill
function StatusPill({ status, trackingId }) {
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
      <span className={`${base} bg-blue-50 text-blue-700 border-blue-200`}>
        Posted {trackingId ? `• ${trackingId}` : ""}
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
}

export default function AppointmentOrdersTable({ orders = [] }) {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState("ALL"); // ✅ NOT empty

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <div className='font-medium'>{row.getValue("id")}</div>
        ),
      },
      {
        accessorKey: "medicineName",
        header: "Medicine",
        cell: ({ row }) => (
          <div className='capitalize'>{row.getValue("medicineName")}</div>
        ),
      },
      {
        accessorKey: "trackingId",
        header: "Tracking ID",
        cell: ({ row }) => (
          <div className='font-mono text-xs'>{row.getValue("trackingId")}</div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        filterFn: (row, id, value) => {
          if (!value || value === "ALL") return true;
          return String(row.getValue(id)) === String(value);
        },
        cell: ({ row }) => (
          <StatusPill
            status={row.getValue("status")}
            trackingId={row.getValue("trackingId")}
          />
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatDate(new Date(row.getValue("createdAt"))),
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
    },
  });

  return (
    <div className='space-y-3'>
      {/* toolbar */}
      <div className='flex flex-col lg:flex-row lg:items-end gap-3'>
        <div className='flex flex-col sm:flex-row sm:items-end gap-3'>
          {/* tracking search */}
          <div>
            <label className='block text-xs text-gray-600 mb-1'>
              Search (Tracking ID)
            </label>
            <Input
              className='sm:w-[260px] bg-white/50'
              placeholder='e.g. XH45333A...'
              value={table.getColumn("trackingId")?.getFilterValue() ?? ""}
              onChange={(e) =>
                table.getColumn("trackingId")?.setFilterValue(e.target.value)
              }
            />
          </div>

          {/* status filter */}
          <div>
            <label className='block text-xs text-gray-600 mb-1'>Status</label>
            <Select
              value={statusFilter}
              onValueChange={(val) => {
                setStatusFilter(val);
                table.getColumn("status")?.setFilterValue(val); // "ALL" or actual
              }}
            >
              <SelectTrigger className='w-[220px] bg-white/50'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ALL'>All</SelectItem>
                <SelectItem value='clinicalreview'>Clinical Review</SelectItem>
                <SelectItem value='posted'>Posted</SelectItem>
                <SelectItem value='delivered'>Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* clear */}
          <div className='sm:pb-[2px]'>
            <Button
              variant='outline'
              onClick={() => {
                table.getColumn("trackingId")?.setFilterValue("");
                table.getColumn("status")?.setFilterValue("ALL");
                setStatusFilter("ALL");
              }}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* pagination buttons */}
        <div className='lg:ml-auto flex items-center gap-2'>
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

      {/* table */}
      <div className='overflow-hidden rounded-md border bg-white'>
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
            {table.getRowModel().rows.length ? (
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
                  className='h-24 text-center'
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
