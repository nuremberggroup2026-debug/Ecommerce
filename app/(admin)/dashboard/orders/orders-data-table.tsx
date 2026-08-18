"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";

import { columns } from "./columns";

import {
  adminDeleteOrder,
} from "@/features/orders/api/orders.client.api";

import type { Order } from "@/features/orders/types";

interface OrderDataTableProps {
  data: Order[];
}

export function OrderDataTable({
  data,
}: OrderDataTableProps) {
  return (
    <DataTable
      columns={columns({
        onDelete: adminDeleteOrder,
      })}
      data={data}
      title="Orders"
      description="Manage your orders"
      deleteSuccessMessage="Orders deleted successfully"
    />
  );
}