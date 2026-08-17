import OrdersComponent from "@/features/orders/components/OrdersComponent";
import { Locale } from "@/types";
import { fetchAllOrdersByUser } from "@/features/orders/api/orders.server.api";
interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function page({ params }: Props) {
  const { locale } = await params;

  const ordersByUser = (await fetchAllOrdersByUser()).data;

  return (
    <div>
      <OrdersComponent orders={ordersByUser} locale={locale} />
    </div>
  );
}
