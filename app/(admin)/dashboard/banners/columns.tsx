"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";

import type { AdminBanner } from "@/features/banner/types/index";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/app/(admin)/dashboard/products/data-table-column-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<AdminBanner>[] = [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt={row.original.nameEn}
        width={80}
        height={50}
        className="h-12 w-20 rounded-md object-cover"
      />
    ),
    enableSorting: false,
  },

  {
    accessorKey: "nameEn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name (EN)" />
    ),
  },

  {
    accessorKey: "nameAr",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name (AR)" />
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString("en-GB");
    },
  },

  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
 <Link
  href={`/dashboard/banners/edit/${row.original.id}`}
  className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
>
  <SquarePen className="h-4 w-4" />
</Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Delete:", row.original.id)}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
