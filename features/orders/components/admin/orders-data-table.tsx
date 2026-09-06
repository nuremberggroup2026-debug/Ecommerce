"use client";

import { DataTable } from "@/app/(admin)/dashboard/components/data-table";

import { columns } from "./columns";

import type { AdminOrder } from "@/features/orders/services/orders.service";

interface OrderDataTableProps {
  data: AdminOrder[];
}

export function OrderDataTable({ data }: OrderDataTableProps) {
  return (
    <DataTable
      columns={columns("/dashboard/orders/view")}
      data={data}
      title="Orders"
      description="Manage your orders"
    />
  );
}
