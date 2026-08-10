"use client";

import Image from "next/image";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";

import type { AdminCategories } from "@/features/catalog/categories/types";

import { DeleteConfirmation } from "@/components/test/DeleteConfirmation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "@/app/(admin)/dashboard/products/data-table-column-header";

interface CategoryColumnsProps {
  onDelete: (id: string) => Promise<unknown>;
}

export const columns = ({
  onDelete,
}: CategoryColumnsProps): ColumnDef<AdminCategories>[] => [
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
            alt={row.original.categoryNameEn}
            fill
            className="object-cover"
          />
        </div>
      );
    },

    enableSorting: false,
  },

  {
    accessorKey: "categoryNameEn",

    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name (EN)"
      />
    ),
  },

  {
    accessorKey: "categoryNameAr",

    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name (AR)"
      />
    ),
  },

  /*
  {
    accessorKey: "slug",

    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Slug"
      />
    ),
  },

  {
    accessorKey: "categoryDescriptionEn",

    header: "Description (EN)",

    cell: ({ row }) => (
      <span className="line-clamp-2">
        {row.original.categoryDescriptionEn}
      </span>
    ),
  },

  {
    accessorKey: "categoryDescriptionAr",

    header: "Description (AR)",

    cell: ({ row }) => (
      <span className="line-clamp-2">
        {row.original.categoryDescriptionAr}
      </span>
    ),
  },
  */

  {
    accessorKey: "isFeatured",

    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Featured"
      />
    ),

    cell: ({ row }) => (
      <span
        className={
          row.original.isFeatured
            ? "font-medium text-green-600"
            : "text-muted-foreground"
        }
      >
        {row.original.isFeatured ? "Yes" : "No"}
      </span>
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

    cell: ({ row }) =>
      new Date(
        row.original.createdAt
      ).toLocaleDateString("en-GB"),
  },

  {
    id: "actions",

    header: () => "Actions",

    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md hover:bg-muted"
          >
            <Link
              href={`/dashboard/categories/edit/${category.id}`}
            >
              <SquarePen className="h-4 w-4" />

              <span className="sr-only">
                Edit category
              </span>
            </Link>
          </Button>

          <DeleteConfirmation
            id={category.id}
            onConfirm={onDelete}
          />
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
];