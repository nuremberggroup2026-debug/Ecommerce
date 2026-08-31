import React from "react";
import CartComponent from "@/features/cart/components/CartComponent";
import { Locale } from "@/types";
import { getCart } from "@/features/cart/api/cart.server.api";
import { generateStaticMetadata } from "@/lib/constants/metadata";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;
  return generateStaticMetadata("cart", locale);
};
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
