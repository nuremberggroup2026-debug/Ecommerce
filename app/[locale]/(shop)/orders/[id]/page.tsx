import NotFound from "@/app/not-found";
import { fetchOrderByUserOrderIdAndLocale } from "@/features/orders/api/orders.server.api";
import OrderDetailsComponent from "@/features/orders/components/shop/OrderDetails";
import { generateDynamicMetadata } from "@/lib/constants/metadata";
import { Locale } from "@/types";

interface Props {
  params: Promise<{ locale: Locale; id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  const orderDetails = (await fetchOrderByUserOrderIdAndLocale(locale, id))
    .data;
  if (!orderDetails) return NotFound();
  return generateDynamicMetadata.page({
    type: "orders",
    name: orderDetails.orderNumber,
    locale,
    itemPath: id,
  });
}

async function page({ params }: Props) {
  const { id, locale } = await params;
  const orderDetails = (await fetchOrderByUserOrderIdAndLocale(locale, id))
    .data;
  if (!orderDetails) return NotFound();
  return (
    <div>
      <OrderDetailsComponent order={orderDetails} />
    </div>
  );
}

export default page;
