"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";
import type { AllPromoCodes } from "@/features/promocodes/types/index";
import { DeleteConfirmation } from "@/components/test/DeleteConfirmation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/app/(admin)/dashboard/components/data-table-column-header";

interface PromoCodeColumnsProps {
  onDelete?: (id: string) => Promise<unknown>;
}

export const columns = (
  route: string,
  { onDelete }: PromoCodeColumnsProps | undefined = {},
): ColumnDef<AllPromoCodes>[] => [
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
    accessorKey: "code",
    meta: "Code",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },

  {
    accessorKey: "discountPercentage",
    meta: "Discount Percentage",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount Percentage" />
    ),
  },
  {
    accessorKey: "maxUsage",
    meta: "Max Usage",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Usage" />
    ),
  },
  {
    accessorKey: "usedCount",
    meta: "Used Count",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Used Count" />
    ),
  },
  {
    accessorKey: "isActive",
    meta: "Is Active",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Active" />
    ),

    cell: ({ row }) => (row.getValue("isActive") ? "Yes" : "No"),
  },

  {
    accessorKey: "expiresAt",
    meta: "Expires At",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expires At" />
    ),

    cell: ({ row }) =>
      row.original.expiresAt
        ? new Date(row.original.expiresAt).toLocaleDateString("en-GB")
        : "No expiration",
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
      const promoCode = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md hover:bg-muted"
          >
            <Link href={`${route}/${promoCode.id}`}>
              <SquarePen className="h-4 w-4" />

              <span className="sr-only">Edit PromoCode</span>
            </Link>
          </Button>

          {onDelete && (
            <DeleteConfirmation id={promoCode.id} onConfirm={onDelete} />
          )}
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
];
