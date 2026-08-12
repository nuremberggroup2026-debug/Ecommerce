"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, FileText } from "lucide-react";

import type { CareerApplication } from "@/features/applications/types";
import type {deleteResponseType} from "@/types"


import { DeleteConfirmation } from "@/components/test/DeleteConfirmation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/app/(admin)/dashboard/products/data-table-column-header";

interface ApplicationColumnsProps {
  onDelete: (id: string) => Promise<deleteResponseType>;
}

export const columns = ({
  onDelete,
}: ApplicationColumnsProps): ColumnDef<CareerApplication, unknown>[] => [
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
        aria-label="Select all applications"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select application"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "applicant",
    meta: "Applicant",
    accessorFn: (row) =>
      `${row.firstName} ${row.lastName ?? ""}`.trim(),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant" />
    ),
    cell: ({ row }) => {
      const application = row.original;
      const fullName = `${application.firstName} ${
        application.lastName ?? ""
      }`.trim();
      const initials = application.firstName
        ?.charAt(0)
        ?.toUpperCase();

      return (
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            {initials || "?"}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">
              {fullName || "Unknown Applicant"}
            </p>
            <p className="truncate text-xs text-gray-500">
              Applicant
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    meta: "Email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email = row.original.email;

      return (
        <a
          href={`mailto:${email}`}
          className="block max-w-[280px] truncate text-sm text-gray-700 transition hover:text-black hover:underline"
        >
          {email}
        </a>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    meta: "Phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      const phone = row.original.phoneNumber;

      return (
        <a
          href={`tel:${phone}`}
          className="whitespace-nowrap text-sm text-gray-700 transition hover:text-black hover:underline"
        >
          {phone}
        </a>
      );
    },
  },
  {
    accessorKey: "major",
    meta: "Major",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Major" />
    ),
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">
        {row.original.major || "—"}
      </span>
    ),
  },
  {
    accessorKey: "appliedAt",
    meta: "Applied At",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applied At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.appliedAt);

      return (
        <div className="whitespace-nowrap">
          <p className="text-sm font-medium text-gray-900">
            {date.toLocaleDateString("en-GB")}
          </p>
          <p className="text-xs text-gray-500">
            {date.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      );
    },
  },
  {
    id: "cv",
    meta: "CV",
    header: "CV",
    cell: ({ row }) => {
      const cv = row.original.cv;

      if (!cv) {
        return (
          <span className="text-sm text-gray-400">
            No CV
          </span>
        );
      }

      return (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-8 rounded-lg border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
        >
          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="mr-2 h-4 w-4" />
            View CV
          </a>
        </Button>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "isShown",
    meta: "Viewed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Viewed" />
    ),
    cell: ({ row }) => {
      const isShown = row.original.isShown;

      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            isShown
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isShown ? "Viewed" : "New"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => "Actions",
    cell: ({ row }) => {
      const application = row.original;

      return (
        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-gray-100"
          >
            <Link
              href={`/dashboard/applications/${application.careerId}/view/${application.id}`}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">
                View application
              </span>
            </Link>
          </Button>

          <DeleteConfirmation
            id={application.id}
            onConfirm={onDelete}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];