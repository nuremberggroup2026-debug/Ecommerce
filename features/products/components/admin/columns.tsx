"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";
import type { deleteResponseType } from "@/types";

import type { Product } from "@/features/products/types";

import { DeleteConfirmation } from "@/components/test/DeleteConfirmation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/app/(admin)/dashboard/components/data-table-column-header";

interface ProductColumnsProps {
  onDelete: (id: string) => Promise<deleteResponseType>;
}

export const columns = ({
  onDelete,
}: ProductColumnsProps): ColumnDef<Product>[] => [
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
    accessorKey: "productCardImage",
    meta: "Image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.productCardImage;

      return (
        <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-muted">
          <Image
            src={image}
            alt={row.original.productNameEn}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "productNameEn",
    meta: "Product Name (EN)",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name (EN)" />
    ),
  },

  {
    accessorKey: "productNameAr",
    meta: "Product Name (AR)",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name (AR)" />
    ),
  },

  {
    accessorKey: "startingPrice",
    meta: "Starting Price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Starting Price" />
    ),
    cell: ({ row }) => {
      const price = Number(row.original.startingPrice);

      return <span className="font-medium">{price.toFixed(2)}</span>;
    },
  },

  {
    accessorKey: "isFeatured",
    meta: "Featured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: ({ row }) => <span>{row.original.isFeatured ? "Yes" : "No"}</span>,
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
      const product = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md hover:bg-muted"
          >
            <Link href={`/dashboard/products/edit/${product.id}`}>
              <SquarePen className="h-4 w-4" />
              <span className="sr-only">Edit product</span>
            </Link>
          </Button>

          <DeleteConfirmation id={product.id} onConfirm={onDelete} />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
