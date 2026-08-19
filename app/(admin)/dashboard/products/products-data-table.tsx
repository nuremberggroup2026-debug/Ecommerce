"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";

import { columns } from "./columns";

import {
  adminDeleteProduct,
  deleteManyProducts,
} from "@/features/products/api/products.client.api";

import type { Product } from "@/features/products/types";

interface ProductDataTableProps {
  data: Product[];
}

export function ProductDataTable({
  data,
}: ProductDataTableProps) {
  return (
    <DataTable
      columns={columns({
        onDelete: adminDeleteProduct,
      })}
      data={data}
      title="Products"
      description="Manage your products"
      addHref="/dashboard/products/add"
      addLabel="Add Product"
      onDeleteSelected={deleteManyProducts}
      deleteSuccessMessage="Products deleted successfully"
    />
  );
}
