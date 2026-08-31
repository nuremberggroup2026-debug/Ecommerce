import NotFound from "@/app/not-found";
import { getProductBySlug } from "@/features/catalog/products/api/products.api";
import ProductSection from "@/features/catalog/products/components/ProductSectioncomponents/ProductSection";
import { generateDynamicMetadata } from "@/lib/constants/metadata";
import { Locale } from "@/types";

interface Prop {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateMetadata({ params }: Prop) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(locale, slug);
  if (!product) return NotFound();
  return generateDynamicMetadata.page({
    type: "products",
    name: product.productData.productName,
    description: product.productData.productDescription,
    itemPath: slug,
    imageUrl: product.productData.productCardImage,
    locale,
  });
}

export default async function ProductDetailsPage({ params }: Prop) {
  const { slug, locale } = await params;

  const product = await getProductBySlug(locale, slug);
  if (!product) return NotFound();
  return <ProductSection key={product.productData.id} product={product} />;
}
