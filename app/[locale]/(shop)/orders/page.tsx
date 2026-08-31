import OrdersComponent from "@/features/orders/components/shop/OrdersComponent";
import { Locale } from "@/types";
import { fetchAllOrdersByUser } from "@/features/orders/api/orders.server.api";
import { generateStaticMetadata } from "@/lib/constants/metadata";
interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;
  return generateStaticMetadata("orders", locale);
};

export default async function page({ params }: Props) {
  const { locale } = await params;

  const ordersByUser = (await fetchAllOrdersByUser()).data;

  return (
    <div>
      <OrdersComponent orders={ordersByUser} locale={locale} />
    </div>
  );
}
