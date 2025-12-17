"use client";

import * as React from "react";
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
  BadgeCheckIcon,
  ChevronDown,
  Edit,
  MoreHorizontal,
  PanelLeft,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { CreateUserForm } from "./create-user-form";
import { useAdmin } from "@/lib/adminContext";
import { updateUserRoleAction } from "@/actions/admin.action";
import { toast } from "sonner";
const formatRole = (role) =>
  role.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());

export function UserTable({ users, admin }) {
  const { setMenuOpen } = useAdmin();
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  console.log(users, "userTable");
  const handleRoleChange = async (userId, newRole) => {
    const res = await updateUserRoleAction({ userId, newRole });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
  };
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
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className='capitalize'>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div>
          <Link href='/' className='hover:underline'>
            {row.getValue("email")}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row, table }) => {
        const role = row.getValue("role");
        const userId = row.getValue("id");
        const id = row.getValue("id").toString();
        const currentUserId = table?.options?.admin?.admin?.id.toString();

        const actor = table?.options?.admin?.admin;
        const actorRole = actor?.role;
        const actorId = actor?.id;

        const isSelf = actorId === userId;

        // Permission rules
        const canEdit =
          !isSelf &&
          (actorRole === "SUPERADMIN" ||
            (actorRole === "ADMIN" && role !== "SUPERADMIN"));

        const allowedRoles = (() => {
          if (!canEdit) return [];

          // ADMIN → PATIENT ↔ AUTHOR
          if (actorRole === "ADMIN") {
            return ["PATIENT", "AUTHOR"].filter((r) => r !== role);
          }

          // SUPERADMIN → ANY except self
          if (actorRole === "SUPERADMIN") {
            return ["PATIENT", "AUTHOR", "ADMIN"].filter((r) => r !== role);
          }

          return [];
        })();

        return (
          <div className='flex items-center gap-3'>
            {/* Role Badge */}
            <Badge
              className={`${
                role === "ADMIN" || role === "SUPERADMIN"
                  ? "bg-green-400 text-white dark:bg-blue-600"
                  : ""
              }`}
              variant={`${
                role === "ADMIN" || role === "SUPERADMIN"
                  ? "secondary"
                  : "outline"
              }`}
            >
              {id === currentUserId && <BadgeCheckIcon />}
              {formatRole(role)}
            </Badge>

            {/* Edit button */}
            {canEdit && allowedRoles.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-7 px-2 text-xs'
                  >
                    <Edit />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end'>
                  {allowedRoles.map((r) => (
                    <DropdownMenuItem
                      key={r}
                      onClick={async () => {
                        const res = await updateUserRoleAction({
                          userId,
                          newRole: r,
                        });

                        if (!res.success) {
                          toast.error(res.message);
                        } else {
                          toast.success(`Role updated to ${formatRole(r)}`);
                        }
                      }}
                    >
                      {formatRole(r)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
          {formatDate(row.getValue("createdAt"))}{" "}
        </div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const userId = row.getValue("id");

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href={`/admin/${userId}/records`}>Records </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/admin/${userId}/history`}>Medical History</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/admin/${userId}/medications`}>Medications</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/admin/${userId}/orders`}>Orders</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data: users || [],
    admin: admin,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
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
      <div className='flex justify-between items-center'>
        {" "}
        {/* HEADER */}
        <div className='flex items-center gap-4 mb-4'>
          <button
            onClick={() => setMenuOpen(true)}
            className='lg:hidden w-[40px] h-[40px] bg-[#d67b0e] text-white flex justify-center items-center rounded-full'
          >
            <PanelLeft />
          </button>
          <h2 className='text-xl font-semibold'>
            {" "}
            Users{" "}
            <Badge variant='primary' className='bg-white'>
              {table?.options?.data.length}
            </Badge>
          </h2>
        </div>
      </div>
      <div className='flex items-center py-4'>
        <CreateUserForm />
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
