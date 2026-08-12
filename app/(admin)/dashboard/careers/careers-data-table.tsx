
"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";

import { columns } from "./columns";

import {
  adminDeleteCareer,
  deleteManyCareers,
} from "@/features/careers/api/careers.client.api";

import type { AdminCareers } from "@/features/careers/types";






interface CareerDataTableProps {
  data: AdminCareers[];
}

export function CareerDataTable({
  data,
}: CareerDataTableProps) {
  return (
    <DataTable
      columns={columns({
        onDelete: adminDeleteCareer,
      })}
      data={data}
      title="Careers"
      description="Manage your careers"
      addHref="/dashboard/careers/add"
      addLabel="Add Career"
      onDeleteSelected={deleteManyCareers}
      deleteSuccessMessage="Careers deleted successfully"
    />
  );
}