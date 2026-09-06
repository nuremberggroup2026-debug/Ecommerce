import { adminOrderById } from "@/features/orders/api/orders.server.api";
import ViewOrder from "@/features/orders/components/admin/ViewOrder";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = (await adminOrderById(id)).data;

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="p-6">
      <ViewOrder order={order} />
    </div>
  );
}
