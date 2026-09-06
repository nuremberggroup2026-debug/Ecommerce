"use client";

import { DataTableServer } from "@/app/(admin)/dashboard/components/data-table-server";

import { columns } from "./columns";

import type { AdminOrder } from "@/features/orders/services/orders.service";
import { routeModule } from "next/dist/build/templates/pages";

interface OrderDataTableServerProps {
  data: AdminOrder[];
  pageCount: number;
  route: string;
}

export function OrderDataTableServer({
  data,
  pageCount,
  route,
}: OrderDataTableServerProps) {
  return (
    <DataTableServer
      columns={columns(route)}
      data={data}
      pageCount={pageCount}
      title="Orders"
      description="Manage your orders"
    />
  );
}
