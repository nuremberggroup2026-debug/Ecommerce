import { getProductById } from "@/features/catalog/products/api/products.api";
import ProductSection from "@/features/catalog/products/components/ProductSectioncomponents/ProductSection";
import { Locale } from "@/types";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}) {
  const { id, locale } = await params;

  const product = await getProductById(locale, id);

  return <ProductSection key={product.productData.id} product={product} />;
}
