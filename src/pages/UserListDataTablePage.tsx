import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpDown,
  ArrowUpIcon,
  CircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers, User, UserPaginationResponse } from "@/lib/api/userApi";
import { useFetchData } from "@/hooks/useFetchData";
import TableLoadingSkeleton from "@/components/ui/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { DataTablePagination } from "@/components/ui/data-table/DataTablePagination";
import { DataTableViewOptions } from "@/components/ui/data-table/DataTableViewOptions";
import { DataTableFacetedFilter } from "@/components/ui/data-table/DataTableFacetedFilter";
import { Cross2Icon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "username",
    enableResizing: true,
    header: "UserName",
    enableSorting: true,
    sortingFn: "alphanumeric",
    cell: ({ row }) => (
      <div className="flex gap-1 capitalize items-center">
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full h-max"
        >
          <Avatar>
            <AvatarImage src={row.original.image} alt={row.original.username} />
            <AvatarFallback>
              {row.original.firstName[0]}
              {row.original.lastName[1]}
            </AvatarFallback>
          </Avatar>
        </Button>
        {row.getValue("username")}
      </div>
    ),
  },
  {
    header: "Full Name",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <span>{row.original.firstName}</span>
          <span>{row.original.lastName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <>
          <NavLink to={"/"} className={"underline text-blue-700"}>
            Detail {row.original.username}
          </NavLink>
        </>
      );
    },
  },
];
export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const gender = [
  {
    value: "male",
    label: "Male",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "female",
    label: "Female",
    icon: CircleIcon,
  },
];
export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export function UserListDataTablePage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [users, setUsers] = useState<User[]>([]);

  const { data, loading, error } =
    useFetchData<UserPaginationResponse<User>>(getUsers);

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data?.users]);

  const table = useReactTable({
    data: users,
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
  });
  const isFiltered = table.getState().columnFilters.length > 0;

  if (loading)
    return (
      <div>
        <TableLoadingSkeleton />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-3">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("username") && (
            <DataTableFacetedFilter
              column={table.getColumn("gender")}
              title="Gender"
              options={gender}
            />
          )}
          {table.getColumn("email") && (
            <DataTableFacetedFilter
              column={table.getColumn("email")}
              title="Email"
              options={priorities}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
