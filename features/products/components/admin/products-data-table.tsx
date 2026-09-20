"use client";
import { columns } from "./columns";
import {
  adminDeleteProduct,
  deleteManyProducts,
} from "@/features/products/api/products.client.api";
import type { AdminProductsData } from "@/features/products/types";
import { DataTableServer } from "@/app/(admin)/dashboard/components/data-table-server";

interface ProductDataTableProps {
  data: AdminProductsData;
}

export function ProductDataTable({ data }: ProductDataTableProps) {
  return (
    <DataTableServer
      columns={columns({
        onDelete: adminDeleteProduct,
      })}
      pageCount={data.pagination.totalPages?data.pagination.totalPages:1}
      data={data.products}
      title="Products"
      description="Manage your products"
      addHref="/dashboard/products/add"
      addLabel="Add Product"
      onDeleteSelected={deleteManyProducts}
    />
  );
}
