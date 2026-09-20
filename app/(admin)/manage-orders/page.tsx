import Link from "next/link";

import { getAdminOrders } from "@/features/orders/services/orders.service";
import { OrderDataTableServer } from "@/features/orders/components/admin/orders-data-table-server";
import { OrdersFilter } from "@/features/orders/components/admin/orders-filter";
import { OrderStatus, OrdersFilteration } from "@/features/orders/types";
import GenerateOrdersReport from "@/features/orders/components/admin/generate-orders-report";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<OrdersFilteration>;
}) {
  const searchParamsData = await searchParams;
  const page = searchParamsData.page || 1;
  const take = searchParamsData.take || 15;
  const customerEmail = searchParamsData.customerEmail;
  const status = searchParamsData.status as OrderStatus | undefined;
  const orderNumber = searchParamsData.orderNumber;

  const { orders, pagination } = await getAdminOrders({
    page,
    take,
    customerEmail,
    status,
    orderNumber,
  });

  return (
    <div className="container mx-auto max-w-[90%] py-6 sm:py-8 lg:max-w-7xl lg:py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Manage Orders</h1>

        <Link
          href="/"
          className="inline-flex w-fit items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Go to Home
        </Link>
      </div>

      <div className="mb-6 flex  w-full flex-col gap-4 lg:flex-col lg:items-end lg:justify-between">
        <OrdersFilter />

        <div className="w-full flex items-end justify-end lg:w-auto">
          <GenerateOrdersReport />
        </div>
      </div>

      <OrderDataTableServer
        data={orders}
        pageCount={pagination?.totalPages || 1}
        route="manage-orders/view"
      />
    </div>
  );
}
