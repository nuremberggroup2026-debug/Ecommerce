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
    <div className="container max-w-[90%] lg:max-w-7xl mx-auto pb-10">
     

      <OrdersFilter />

      <OrderDataTableServer
        data={orders}
        pageCount={pagination?.totalPages || 1}
        route="/dashboard/orders/view"
      />
    </div>
  );
}
