import { fetchOrderByUserOrderIdAndLocale } from "@/features/orders/api/orders.server.api";
import OrderDetailsComponent from "@/features/orders/components/shop/OrderDetails";
import { Locale } from "@/types";

interface Props {
  params: Promise<{ locale: Locale; id: string }>;
}

async function page({ params }: Props) {
  const { id, locale } = await params;
  const orderDetails = (await fetchOrderByUserOrderIdAndLocale(locale, id))
    .data;
  console.log("orderDetails", orderDetails);

  return (
    <div>
      <OrderDetailsComponent order={orderDetails} />
    </div>
  );
}

export default page;
