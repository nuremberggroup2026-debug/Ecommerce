import { Locale } from "@/types";
import { generateStaticMetadata } from "@/lib/constants/metadata";
import ProductsPageClient from "../../../../features/catalog/products/components/ProductsPageClient";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const locale = (await params).locale;
  return generateStaticMetadata("products", locale);
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <ProductsPageClient locale={locale} />;
}