"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import type { ProductByLocale } from "../../types";
import { useTranslations } from "next-intl";

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
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20 lg:px-10">
        <nav className="mb-8 text-xs font-light text-gray-400 tracking-tight">
          <Link href="/products" className="hover:text-black transition">
            {t("Product.products")}
          </Link>

          <span className="mx-2">•</span>

          <span className="text-gray-300">
            {product.productData.categoryName}
          </span>

          <span className="mx-2">•</span>

          <span className="text-neutral-900 font-medium">
            {product.productData.productName}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <ProductGallery
              product={product}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              handleVariantChange={handleVariantChange}
            />
          </div>

          <div className="lg:col-span-5 space-y-8">
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
