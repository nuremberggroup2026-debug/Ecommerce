"use client";

import { useState } from "react";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import type { ProductByLocale } from "../../types";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";

export default function ProductSection({
  product,
}: {
  product: ProductByLocale;
}) {
  const t = useTranslations();
  const defaultVariant = product.productData.productVariants[0];

  const [activeImage, setActiveImage] = useState(
    product.productData.productCardImage,
  );
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [quantity, setQuantity] = useState(
    product.cartItems.find(
      (item) => item.variantId === defaultVariant.variantId,
    )?.quantity ?? 1,
  );

  const handleVariantChange = (variant: typeof defaultVariant) => {
    setSelectedVariant(variant);
    if (
      product.cartItems.find((item) => item.variantId === variant.variantId)
    ) {
      const quantity = product.cartItems.find(
        (item) => item.variantId === variant.variantId,
      )?.quantity;

      setQuantity(quantity ?? 1);
    } else {
      setQuantity(1);
    }

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
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              handleVariantChange={handleVariantChange}
            />
          </div>

          <div className={theme.productSection.infoCol}>
            <ProductInfo
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
              selectedVariant={selectedVariant}
              handleVariantChange={handleVariantChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}