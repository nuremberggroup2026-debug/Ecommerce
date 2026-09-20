"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";

import { columns } from "./columns";

import {
  adminDeleteApplication,
  deleteManyApplications,
} from "@/features/applications/api/applications.client.api";

import type { AdminApplicationData } from "@/features/applications/types";
import { DataTableServer } from "@/app/(admin)/dashboard/components/data-table-server";
interface ApplicationDataTableProps {
  data: AdminApplicationData;
}

export function ApplicationDataTable({ data }: ApplicationDataTableProps) {
  return (
    <DataTableServer
      pageCount={data.pagination.totalPages ? data.pagination.totalPages : 1}
      columns={columns({
        onDelete: adminDeleteApplication,
      })}
      data={data.applications}
      title="Applications"
      description="Manage career applications"
      onDeleteSelected={deleteManyApplications}
    />
  );
}
