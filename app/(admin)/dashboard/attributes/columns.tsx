"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";

import type { AdminAttribute } from "@/features/catalog/attributes/types";

import { DeleteConfirmation } from "@/components/test/DeleteConfirmation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "@/app/(admin)/dashboard/products/data-table-column-header";

interface AttributeColumnsProps {
  onDelete: (id: string) => Promise<unknown>;
}

export const columns = ({
  onDelete,
}: AttributeColumnsProps): ColumnDef<AdminAttribute>[] => [
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
    accessorKey: "attributeNameEn",
    meta: "Name (EN)",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name (EN)" />
    ),
  },

  {
    accessorKey: "attributeNameAr",
    meta: "Name (AR)",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name (AR)" />
    ),
  },

  {
    accessorKey: "createdAt",
    meta: "Created At",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),

    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-GB"),
  },

  {
    id: "actions",

    header: () => "Actions",

    cell: ({ row }) => {
      const attribute = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md"
          >
            <Link href={`/dashboard/attributes/edit/${attribute.id}`}>
              <SquarePen className="h-4 w-4" />

              <span className="sr-only">Edit attribute</span>
            </Link>
          </Button>

          <DeleteConfirmation id={attribute.id} onConfirm={onDelete} />
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
];
