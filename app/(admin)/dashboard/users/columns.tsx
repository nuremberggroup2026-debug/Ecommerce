"use client";

import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import type { User } from "@/features/users/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/app/(admin)/dashboard/products/data-table-column-header";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    meta: "Name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border bg-muted">
            {user.image ? (
              <Image src={user.image} alt={user.name} fill sizes="36px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
                {user.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
            )}
          </div>
          <span className="font-medium">{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    meta: "Email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span className="text-sm">{row.original.email}</span>,
  },
  {
    accessorKey: "role",
    meta: "Role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const role = String(row.original.role ?? "").toLowerCase();
      const roleStyles: Record<string, string> = {
        admin: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
        user: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50",
        customer: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50",
      };
      const roleLabels: Record<string, string> = {
        admin: "Admin",
        user: "User",
        customer: "Customer",
      };
      return (
        <Badge variant="outline" className={roleStyles[role] ?? "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-50"}>
          {roleLabels[role] ?? row.original.role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    meta: "Created At",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-md hover:bg-muted">
          <Link href={`/dashboard/users/view/${row.original.id}`}>
            <Eye className="h-4 w-4" />
            <span className="sr-only">View user</span>
          </Link>
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
