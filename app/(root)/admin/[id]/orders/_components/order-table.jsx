"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  PanelLeft,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateOrderForm } from "./create-order-form";
import { formatDate } from "@/lib/utils";
import { deleteMedicationByAdmin } from "@/actions/medication.action";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/lib/adminContext";
import { deleteOrder, updateOrderStatus } from "@/actions/order.action";
import AdminNavigation from "../../_components/admin-navigation";

export function OrderTable({ orders, userId }) {
  const { setMenuOpen } = useAdmin();
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [status, setStatus] = React.useState("");

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

    {
      accessorKey: "medicineName",
      header: "Medicine Name",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("medicineName")}</div>
      ),
    },

    {
      accessorKey: "trackingId",
      header: "Tracking ID",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("trackingId")}</div>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const orderStatus = row.getValue("status");

        return (
          <div>
            {orderStatus === "clinicalreview" ? (
              <Badge className='bg-yellow-500 text-white'>
                Under Clinical Review
              </Badge>
            ) : orderStatus === "delivered" ? (
              <Badge className='bg-blue-500 text-white'>Delivered</Badge>
            ) : (
              <Badge className='bg-green-500 text-white'>
                Posted via Royal Mail.
              </Badge>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className='capitalize'>
          {formatDate(row.getValue("createdAt"))}
        </div>
      ),
    },

    {
      id: "actions",
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

              {/* UPDATE BUTTON opens dialog */}
              <DropdownMenuItem
                onClick={() => table.options.meta.openDialog(order)}
              >
                Update Status
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* DELETE */}
              <DropdownMenuItem asChild>
                <form action={deleteOrder} className='w-full'>
                  <input type='hidden' name='orderId' value={order.id} />
                  <Button
                    type='submit'
                    variant='destructive'
                    className='w-full'
                  >
                    Delete Order
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orders || [],
    userId,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    meta: {
      openDialog: (order) => {
        setSelectedOrder(order);
        setStatus(order.status);
        setOpen(true);
      },
      status,
      setStatus,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },

    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className='w-full p-10'>
      {/* HEADER */}
      <div className='flex items-center gap-4 mb-4'>
        <AdminNavigation userId={userId} />
      </div>
      <div className='flex items-center gap-4 mb-4'>
        <button
          onClick={() => setMenuOpen(true)}
          className='lg:hidden w-[40px] h-[40px] bg-[#d67b0e] text-white flex justify-center items-center rounded-full'
        >
          <PanelLeft />
        </button>
        <h2 className='text-xl font-semibold'>Orders</h2>
      </div>

      <div className='flex items-center py-4'>
        <CreateOrderForm />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className='bg-white' key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className='bg-white'
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
            </DialogHeader>

            <form
              action={updateOrderStatus}
              onSubmit={() => setOpen(false)}
              className='space-y-4'
            >
              <input type='hidden' name='orderId' value={selectedOrder?.id} />

              <div>
                <label className='mb-2 block font-medium'>Tracking ID</label>
                <Input
                  type='text'
                  name='trackingId'
                  value={selectedOrder?.trackingId}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      trackingId: e.target.value,
                    })
                  }
                />
              </div>

              <Select
                name='status'
                value={status}
                onValueChange={(val) => setStatus(val)}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='clinicalreview'>
                    Under Clinical Review
                  </SelectItem>
                  <SelectItem value='posted'>Posted via Royal Mail</SelectItem>
                  <SelectItem value='delivered'>Delivered</SelectItem>
                </SelectContent>
              </Select>

              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit' className='bg-theme'>
                  Update
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
