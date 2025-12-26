"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { toggleCommentApproval, deleteComment } from "@/actions/blog.actions";

export default function CommentTable({
  comments = [],
  postId = null,
  postTitle = "",
}) {
  const router = useRouter();

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  // details dialog state
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedComment, setSelectedComment] = React.useState(null);

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState(null);

  const columns = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span>{row.original.name}</span>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <span>{row.original.email}</span>,
      },
      {
        id: "postTitle",
        header: "Post",
        cell: ({ row }) => <span>{row.original?.post?.title || "-"}</span>,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const approved = !!row.original.approved;
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                approved
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {approved ? "Approved" : "Pending"}
            </span>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const approved = !!row.original.approved;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onClick={async () => {
                    const res = await toggleCommentApproval(
                      row.original.id,
                      true
                    );
                    if (res?.success) {
                      toast.success(res.msg);
                      router.refresh();
                    } else toast.error(res?.msg || "Failed");
                  }}
                  disabled={approved}
                >
                  {approved ? "Approved" : "Approve"}
                </DropdownMenuItem>

                <DropdownMenuItem
                  className='text-red-600'
                  onClick={async () => {
                    const res = await toggleCommentApproval(
                      row.original.id,
                      false
                    );
                    if (res?.success) {
                      toast.success(res.msg);
                      router.refresh();
                    } else toast.error(res?.msg || "Failed");
                  }}
                  disabled={!approved && row.original.approved === false}
                >
                  Reject
                </DropdownMenuItem>

                <DropdownMenuItem
                  className='text-red-600'
                  onClick={() => {
                    setDeleteTarget(row.original);
                    setDeleteOpen(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    setSelectedComment(row.original);
                    setDetailsOpen(true);
                  }}
                >
                  View details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [router]
  );

  const table = useReactTable({
    data: comments,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h2 className='text-xl font-semibold'>Comments</h2>
          {postId ? (
            <p className='text-sm text-muted-foreground'>
              Showing comments for post:{" "}
              <span className='font-mono'>{postTitle}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className='flex items-center py-4 gap-3'>
        <Input
          placeholder='Filter name...'
          value={table.getColumn("name")?.getFilterValue() || ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className='max-w-sm'
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='overflow-hidden rounded-md border w-full'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
                <TableRow
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

      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
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

      {/* DETAILS DIALOG */}
      <AlertDialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Comment details</AlertDialogTitle>
          </AlertDialogHeader>

          <div className='space-y-2 text-sm'>
            <div>
              <span className='font-semibold'>Name:</span>{" "}
              {selectedComment?.name || "-"}
            </div>
            <div>
              <span className='font-semibold'>Email:</span>{" "}
              {selectedComment?.email || "-"}
            </div>
            <div>
              <span className='font-semibold'>Post:</span>{" "}
              {selectedComment?.post?.title || "-"}
            </div>
            <div>
              <span className='font-semibold'>Status:</span>{" "}
              {selectedComment?.approved ? "Approved" : "Pending"}
            </div>
            <div>
              <span className='font-semibold'>Comment:</span>
              <div className='mt-1 p-3 rounded-md border bg-muted/30 whitespace-pre-wrap'>
                {selectedComment?.content || "-"}
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* DELETE CONFIRM DIALOG */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The comment will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className='text-sm space-y-1'>
            <div>
              <span className='font-semibold'>Name:</span>{" "}
              {deleteTarget?.name || "-"}
            </div>
            <div className='truncate'>
              <span className='font-semibold'>Email:</span>{" "}
              {deleteTarget?.email || "-"}
            </div>
            <div className='line-clamp-2'>
              <span className='font-semibold'>Content:</span>{" "}
              {deleteTarget?.content || "-"}
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!deleteTarget?.id) return;

                const res = await deleteComment(deleteTarget.id);

                if (res?.success) {
                  toast.success(res.msg);
                  setDeleteOpen(false);
                  setDeleteTarget(null);
                  router.refresh();
                } else {
                  toast.error(res?.msg || "Delete failed");
                }
              }}
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
