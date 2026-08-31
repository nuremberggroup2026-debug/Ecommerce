import ProductSection from "@/features/catalog/products/components/ProductSectioncomponents/ProductSection";
import { Locale } from "@/types";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}) {
  const { id, locale } = await params;

  return <ProductSection id={id} locale={locale} />;
}