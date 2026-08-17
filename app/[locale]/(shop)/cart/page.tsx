import React from "react";
import CartComponent from "@/features/cart/components/CartComponent";
import { Locale } from "@/types";
import { getCart } from "@/features/cart/api/cart.server.api";

interface Props {
  params: Promise<{ locale: Locale }>;
}
export default async function page({ params }: Props) {
  const { locale } = await params;
  const data = (await getCart(locale)).data;
  console.log("cart data: ", data);

  return (
    <div>
      <CartComponent cartData={data} locale={locale} />
    </div>
  );
}
