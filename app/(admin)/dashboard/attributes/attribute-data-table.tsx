
"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";

import { columns } from "./columns";

import {
  adminDeleteAttribute,
  deleteManyAttributes,
} from "@/features/catalog/attributes/api/attributes.client.api";

import type { AdminAttribute } from "@/features/catalog/attributes/types";

interface AttributeDataTableProps {
  data: AdminAttribute[];
}

export function AttributeDataTable({
  data,
}: AttributeDataTableProps) {
  return (
    <DataTable
      columns={columns({
        onDelete: adminDeleteAttribute,
      })}
      data={data}
      title="Attributes"
      description="Manage your product attributes"
      addHref="/dashboard/attributes/add"
      addLabel="Add Attribute"
      onDeleteSelected={deleteManyAttributes}
      deleteSuccessMessage="Attributes deleted successfully"
    />
  );
}

