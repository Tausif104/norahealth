"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";

export default function OrdersTable({ data }) {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "medicineName",
        header: "Medicine",
        cell: ({ row }) => row.original.medicineName || "—",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data?.length) return <p>No orders yet.</p>;

  return (
    <div className='overflow-x-auto rounded-lg border'>
      <table className='min-w-full text-sm'>
        <thead className='bg-gray-50'>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-4 py-3 text-left font-semibold text-gray-700'
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='border-t'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='px-4 py-3'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
