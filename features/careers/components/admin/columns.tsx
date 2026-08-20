"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";
import type {deleteResponseType} from "@/types"

import type { AdminCareers } from "@/features/careers/types";

import { DeleteConfirmation } from "@/components/test/DeleteConfirmation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/app/(admin)/dashboard/components/data-table-column-header";

interface CareerColumnsProps {
  onDelete: (id: string) =>  Promise<deleteResponseType>;
}

export const columns = ({
  onDelete,
}: CareerColumnsProps): ColumnDef<AdminCareers>[] => [
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
    meta: "Image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.image;

      return (
        <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-muted">
          <Image
            src={image}
            alt={row.original.positionEn}
            fill
            className="object-cover"
          />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "positionEn",
    meta: "Position (EN)",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position (EN)" />
    ),
  },
  {
    accessorKey: "positionAr",
    meta: "Position (AR)",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position (AR)" />
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
      const career = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-md hover:bg-muted"
          >
            <Link href={`/dashboard/careers/edit/${career.id}`}>
              <SquarePen className="h-4 w-4" />
              <span className="sr-only">Edit career</span>
            </Link>
          </Button>

          <DeleteConfirmation
            id={career.id}
            onConfirm={onDelete}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

