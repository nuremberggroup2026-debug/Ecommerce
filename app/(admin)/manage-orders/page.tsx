import Link from "next/link";

import { getAdminOrders } from "@/features/orders/services/orders.service";
import { OrderDataTableServer } from "@/features/orders/components/admin/orders-data-table-server";
import { OrdersFilter } from "@/features/orders/components/admin/orders-filter";
import { OrdersFilteration } from "@/types";
import { OrderStatus } from "@/features/orders/types";


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
    <div className="container max-w-[90%] lg:max-w-7xl mx-auto py-10">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold"></h1>
        <Link
          href="/"
          className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Go to Home
        </Link>
      </div>

      <OrdersFilter />

      <OrderDataTableServer
        data={orders}
        pageCount={pagination?.totalPages || 1}
        route="manage-orders/view"
      />
    </div>
  );
}
