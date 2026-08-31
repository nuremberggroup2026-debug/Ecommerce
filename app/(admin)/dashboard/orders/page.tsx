import { getAdminOrders } from "@/features/orders/services/orders.service";
import { OrderDataTable } from "@/features/orders/components/admin/orders-data-table";

export default async function OrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="container  mx-auto py-10">
      <OrderDataTable data={orders} />
    </div>
  );
}
