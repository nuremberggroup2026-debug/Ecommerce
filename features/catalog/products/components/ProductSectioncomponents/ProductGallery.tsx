"use client";

import Image from "next/image";
import type { ProductByLocale } from "../../types";
import { toastResponse } from "@/lib/toast";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/features/wishlist/api/wishlist.client.api";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { theme } from "@/themes";

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
    <div className={theme.productGallery.container}>
      <div className={theme.productGallery.mainImageWrapper}>
        <Image
          src={activeImage}
          alt={product.productData.productName}
          fill
          priority
          className={theme.productGallery.mainImage}
        />

        <button
          disabled={loading}
          onClick={() => handleWishlist()}
          className={theme.productGallery.wishlistButton}
        >
          <svg
            className={theme.productGallery.wishlistIcon(inWishist)}
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

      <div className={theme.productGallery.thumbnailsContainer}>
        {allImages.map((item, idx) => {
          const isActive = activeImage === item.image;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveImage(item.image!);

                if (item.variant) {
                  handleVariantChange(item.variant);
                }
              }}
              className={theme.productGallery.thumbnailButton(isActive)}
            >
              <Image
                src={item.image!}
                alt={`${product.productData.productName} ${idx + 1}`}
                fill
                className={theme.productGallery.thumbnailImage}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}