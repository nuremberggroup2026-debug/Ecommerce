"use client";

import Image from "next/image";

import type { ProductByLocale } from "../../types";
import { toastResponse } from "@/lib/toast";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/features/wishlist/api/wishlist.api";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  product: ProductByLocale;
  activeImage: string;
  setActiveImage: (img: string) => void;

  handleVariantChange: (
    variant: ProductByLocale["productData"]["productVariants"][number],
  ) => void;
};

export default function ProductGallery({
  product,
  activeImage,
  setActiveImage,
  handleVariantChange,
}: Props) {
  const allImages = [
    ...product.productData.productImages.map((img) => ({
      image: img,
      variant: null,
    })),

    ...product.productData.productVariants.map((variant) => ({
      image: variant.variantImage,
      variant,
    })),
  ];

  const [inWishist, setInWishist] = useState(product.isInWishlist);

  const t = useTranslations();

  const [loading, setLoading] = useState(false);

  const handleWishlist = async () => {
    if (loading) return;

    const previous = inWishist;

    setLoading(true);
    setInWishist(!previous);

    try {
      if (previous) {
        await toastResponse(
          removeItemFromWishlist(product.productData.id),
          t,
          "DELETING_ITEM",
        );
      } else {
        await toastResponse(
          addItemToWishlist(product.productData.id),
          t,
          "CART_ITEM_ADDING",
        );
      }
    } catch {
      setInWishist(previous);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-[32px] border border-neutral-100 bg-neutral-50 shadow-sm">
        <Image
          src={activeImage}
          alt={product.productData.productName}
          fill
          priority
          className="object-cover transition-all duration-500"
        />

        <button
          disabled={loading}
          onClick={() => handleWishlist()}
          className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/40 shadow-sm"
        >
          <svg
            className={`h-5 w-5 ${
              inWishist ? "fill-red-500 stroke-red-500" : "text-neutral-600"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="flex gap-4">
        {allImages.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveImage(item.image!);

              if (item.variant) {
                handleVariantChange(item.variant);
              }
            }}
            className={`relative aspect-4/5 w-20 overflow-hidden rounded-2xl border ${
              activeImage === item.image
                ? "border-black ring-1 ring-black"
                : "border-neutral-200 opacity-60"
            }`}
          >
            <Image
              src={item.image!}
              alt={`${product.productData.productName} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
