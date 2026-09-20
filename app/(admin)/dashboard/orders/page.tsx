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
    <div className="w-full min-w-0 pb-10">
      <div className="mb-6 flex  w-full flex-col gap-4 lg:flex-col lg:items-end lg:justify-between">
        <OrdersFilter />

        <div className="w-full flex items-end justify-end lg:w-auto">
          <GenerateOrdersReport />
        </div>
      </div>

      <OrderDataTableServer
        data={orders}
        pageCount={pagination?.totalPages || 1}
        route="/dashboard/orders/view"
      />
    </div>
  );
}
