import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CartComponent from "@/features/cart/components/CartComponent";
import { cartQueryKey } from "@/features/cart/hooks/cart.query-key";
import { getCart } from "@/features/cart/api/cart.client.api";
import type { Locale } from "@/types";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: cartQueryKey({ locale }),
    queryFn: () => getCart(locale),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CartComponent locale={locale} />
      </HydrationBoundary>
    </div>
  );
}