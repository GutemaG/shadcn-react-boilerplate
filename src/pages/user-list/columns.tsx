import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/lib/api/userApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

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
    enableGlobalFilter: true,
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
    enableGlobalFilter: true,
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
    enableGlobalFilter: true,
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

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "bloodGroup",
    header: "Blood Group",

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <>
          <NavLink
            to={`/users/${row.original.id}`}
            className={"underline text-blue-700"}
          >
            Detail
          </NavLink>
        </>
      );
    },
  },
];
