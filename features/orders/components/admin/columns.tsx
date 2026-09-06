"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import type { AdminOrder } from "@/features/orders/services/orders.service";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/app/(admin)/dashboard/components/data-table-column-header";
export const columns = (route: string): ColumnDef<AdminOrder>[] => [
  {
    accessorKey: "orderNumber",
    meta: "Order Number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Number" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.orderNumber}</span>
    ),
  },
  {
    accessorKey: "customerEmail",
    meta: "Customer Email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Email" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.customerEmail}</span>
    ),
  },

  {
    accessorKey: "totalAmount",
    meta: "Total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        {Number(row.original.totalAmount).toFixed(2) + " JOD"}
      </span>
    ),
  },

  {
    accessorKey: "paymentMethodLabel",
    meta: "Payment Method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.paymentMethodLabel}</Badge>
    ),
  },

  {
    accessorKey: "status",
    meta: "Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = String(row.original.status ?? "").toLowerCase();

      const statusStyles: Record<string, string> = {
        pending:
          "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-50",

        confirmed: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50",

        processing:
          "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-50",

        shipped:
          "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-50",

        delivered:
          "border-green-200 bg-green-50 text-green-700 hover:bg-green-50",

        cancelled: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",

        canceled: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
      };

      const defaultStyle =
        "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-50";

      return (
        <Badge
          variant="outline"
          className={statusStyles[status] ?? defaultStyle}
        >
          {row.original.status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAtRelative",
    meta: "Created At",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.createdAtRelative}
      </span>
    ),
  },

  {
    accessorKey: "updatedAtRelative",
    meta: "Updated At",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.updatedAtRelative}
      </span>
    ),
  },

  {
    id: "actions",
    header: () => "Actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md hover:bg-muted"
          >
            <Link href={`${route}/${order.id}`}>
              <Eye className="h-4 w-4" />

              <span className="sr-only">View order</span>
            </Link>
          </Button>
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
];
