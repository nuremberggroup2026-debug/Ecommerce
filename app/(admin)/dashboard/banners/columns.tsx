"use client";

import Image from "next/image";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";

import type { AdminBanner } from "@/features/banner/types";

import { DeleteConfirmation } from "@/components/test/DeleteConfirmation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "@/app/(admin)/dashboard/products/data-table-column-header";

interface BannerColumnsProps {
  onDelete: (id: string) => Promise<unknown>;
}

export const columns = ({
  onDelete,
}: BannerColumnsProps): ColumnDef<AdminBanner>[] => [
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
        aria-label="Select all"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "image",

    header: "Image",

    cell: ({ row }) => {
      const image = row.original.image;

      return (
        <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-muted">
          <Image
            src={image}
            alt={row.original.nameEn}
            fill
            className="object-cover"
          />
        </div>
      );
    },

    enableSorting: false,
  },

  {
    accessorKey: "nameEn",

    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name (EN)"
      />
    ),
  },

  {
    accessorKey: "nameAr",

    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name (AR)"
      />
    ),
  },

  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created At"
      />
    ),

    cell: ({ row }) => {
      return new Date(
        row.original.createdAt
      ).toLocaleDateString("en-GB");
    },
  },

  {
    id: "actions",

    header: () => "Actions",

    cell: ({ row }) => {
      const banner = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md"
          >
            <Link
              href={`/dashboard/banners/edit/${banner.id}`}
            >
              <SquarePen className="h-4 w-4" />

              <span className="sr-only">
                Edit banner
              </span>
            </Link>
          </Button>

          <DeleteConfirmation
            id={banner.id}
            onConfirm={onDelete}
          />
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
];