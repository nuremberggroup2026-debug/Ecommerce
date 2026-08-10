"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";

import { columns } from "./columns";

import {
  adminDeleteCategory,
  deleteManyCategories,
} from "@/features/catalog/categories/api/categories.client.api";

import type { AdminCategories } from "@/features/catalog/categories/types";

interface CategoryDataTableProps {
  data: AdminCategories[];
}

export function CategoryDataTable({
  data,
}: CategoryDataTableProps) {
  return (
    <DataTable
      columns={columns({
        onDelete: adminDeleteCategory,
      })}
      data={data}
      title="Categories"
      description="Manage your categories"
      addHref="/dashboard/categories/add"
      addLabel="Add Category"
      onDeleteSelected={deleteManyCategories}
      deleteSuccessMessage="Categories deleted successfully"
    />
  );
}