import * as React from "react";
import {
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
import { getUsers, User, UserPaginationResponse } from "@/lib/api/userApi";
import { useFetchData } from "@/hooks/useFetchData";
import TableLoadingSkeleton from "@/components/ui/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import { DataTablePagination } from "@/components/ui/data-table/DataTablePagination";
import { DataTableViewOptions } from "@/components/ui/data-table/DataTableViewOptions";
import { DataTableFacetedFilter } from "@/components/ui/data-table/DataTableFacetedFilter";

import { Cross2Icon } from "@radix-ui/react-icons";
import { columns } from "./columns";
import { bloodTypeOptions, gender } from "./filter-options";

export function UserListDataTablePage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

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
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "auto",
  });
  const isFiltered = table.getState().columnFilters.length > 0;

  if (loading)
    return (
      <div>
        <TableLoadingSkeleton />
      </div>
    );
  if (error) return <div>{error}</div>;
  //apply the fuzzy sort if the fullName column is being filtered

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-3">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter"
            // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            value={globalFilter}
            onChange={(event) => {
              setGlobalFilter(event.target.value);
            }}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("gender") && (
            <DataTableFacetedFilter
              column={table.getColumn("gender")}
              title="Gender"
              options={gender}
            />
          )}
          {table.getColumn("bloodGroup") && (
            <DataTableFacetedFilter
              column={table.getColumn("bloodGroup")}
              title="Blood Group"
              options={bloodTypeOptions}
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
      <div className="space-x-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
