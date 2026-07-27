import { getProductById } from "@/features/catalog/products/api/products.api";
import ProductSection from "@/features/catalog/products/components/ProductSectioncomponents/ProductSection";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);

  return <ProductSection   key={product.id} product={product} />;
}
