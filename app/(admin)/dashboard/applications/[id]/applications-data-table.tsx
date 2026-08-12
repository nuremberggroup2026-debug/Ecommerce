
"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";

import { columns } from "./columns";

import {
  adminDeleteApplication,
  deleteManyApplications,
} from "@/features/applications/api/applications.client.api";

import type { CareerApplication } from "@/features/applications/types";

interface ApplicationDataTableProps {
  data: CareerApplication[];
}

export function ApplicationDataTable({
  data,
}: ApplicationDataTableProps) {
  return (
    <DataTable
      columns={columns({
        onDelete: adminDeleteApplication,
      })}
      data={data}
      title="Applications"
      description="Manage career applications"
      onDeleteSelected={deleteManyApplications}
      deleteSuccessMessage="Applications deleted successfully"
    />
  );
}

