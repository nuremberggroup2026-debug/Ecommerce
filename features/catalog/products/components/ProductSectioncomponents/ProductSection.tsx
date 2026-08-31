"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import type { ProductByLocale } from "../../types";
import { useProductByIdQuery } from "@/features/catalog/products/hooks/useProductById";
import { Locale } from "@/types";
import { theme } from "@/themes";

export default function ProductSection({
  id,
  locale,
}: {
  id: string;
  locale: Locale;
}) {
  const t = useTranslations();

  const { data: product, isLoading, isError } = useProductByIdQuery(
    locale,
    id,
  );

  const defaultVariant = product?.productData.productVariants[0];

  const [activeImage, setActiveImage] = useState<string | undefined>(
    product?.productData.productCardImage,
  );

  const [selectedVariant, setSelectedVariant] = useState<
    ProductByLocale["productData"]["productVariants"][number] | undefined
  >(defaultVariant);

  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <main className={theme.productSection.main} />;
  }

  if (isError || !product || !defaultVariant) {
    return <main className={theme.productSection.main} />;
  }

  const currentVariant = selectedVariant ?? defaultVariant;

  const currentImage =
    activeImage ??
    currentVariant.variantImage ??
    product.productData.productCardImage;

  const handleVariantChange = (
    variant: ProductByLocale["productData"]["productVariants"][number],
  ) => {
    setSelectedVariant(variant);

    const cartItem = product.cartItems.find(
      (item) => item.variantId === variant.variantId,
    );

    setQuantity(cartItem?.quantity ?? 1);

    if (variant.variantImage) {
      setActiveImage(variant.variantImage);
    }
  };

  return (
    <main className={theme.productSection.main}>
      <div className={theme.productSection.container}>
        <nav className={theme.productSection.nav}>
          <Link href="/products" className={theme.productSection.navLink}>
            {t("Product.products")}
          </Link>

          <span className={theme.productSection.navDot}>•</span>

          <span className={theme.productSection.navCategory}>
            {product.productData.categoryName}
          </span>

          <span className={theme.productSection.navDot}>•</span>

          <span className={theme.productSection.navTitle}>
            {product.productData.productName}
          </span>
        </nav>

        <div className={theme.productSection.grid}>
          <div className={theme.productSection.galleryCol}>
            <ProductGallery
              product={product}
              activeImage={currentImage}
              setActiveImage={setActiveImage}
              handleVariantChange={handleVariantChange}
            />
          </div>

          <div className={theme.productSection.infoCol}>
            <ProductInfo
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              selectedVariant={currentVariant}
              handleVariantChange={handleVariantChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
