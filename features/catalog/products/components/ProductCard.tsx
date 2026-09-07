"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Locale } from "../types";
import { theme } from "@/themes";
import type { GetProductType } from "@/types/index";
import { toastResponse } from "@/lib/toast";
import { handleApiError } from "@/lib/helpers/clientSideHelpers";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/features/wishlist/api/wishlist.client.api";

import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { Heart } from "lucide-react";

interface Props {
  product: GetProductType;
  isInWishlist: boolean;
  isInCart: boolean;
}

export default function ProductCard({
  product,
  isInWishlist,
  isInCart,
}: Props) {
  const router = useRouter();
  const t = useTranslations("");
  const locale = useLocale() as Locale;

  const [inWishist, setInWishist] = useState(isInWishlist);

  const [inCart, setInCart] = useState(isInCart);

  const [loading, setLoading] = useState(false);

  const addToCartMutation = useAddToCart();

  const variant = product.variants[0];

  const isOutOfStock = variant.stock <= 0;

  const originalPrice = Number(variant.price);
  const finalPrice = Number(variant.finalPrice);
  const discountPercentage = Number(variant.discountPercentage ?? 0);
  const hasDiscount = discountPercentage > 0 && originalPrice > finalPrice;

  /**
   * Wishlist handler.
   */
  const handleWishlist = async () => {
    if (loading) {
      return;
    }

    const previous = inWishist;

    setLoading(true);
    setInWishist(!previous);

    try {
      await toastResponse(
        previous
          ? removeItemFromWishlist(product.id)
          : addItemToWishlist(product.id),
        t,
        previous ? "DELETING_ITEM" : "CART_ITEM_ADDING",
      );
    } catch (error) {
      setInWishist(previous);

      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        typeof error.status === "number"
      ) {
        handleApiError(error.status, router);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add product to cart.
   */
  const handleAddItem = async () => {
    if (loading || isOutOfStock || addToCartMutation.isPending) {
      return;
    }

    setLoading(true);

    try {
      await toastResponse(
        addToCartMutation.mutateAsync({
          variantId: variant.id,
          quantity: 1,
          locale,
        }),
        t,
        "CART_ITEM_ADDING",
      );

      setInCart(true);
    } catch (error) {
      console.error("Failed to add item to cart:", error);

      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        typeof error.status === "number"
      ) {
        handleApiError(error.status, router);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={theme.productCard.container}>
      <div className={theme.productCard.imageWrapper}>
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.productCardImage}
            alt={product.productName}
            fill
            sizes="(max-width: 1280px) 33vw, 50vw"
            className={theme.productCard.image}
          />
        </Link>

        {hasDiscount && (
          <span className="absolute top-3.5 inset-s-3.5 z-10 inline-flex items-center rounded-full bg-red-600 px-2.5 py-0.5 text-[11px] font-bold tracking-tight text-white shadow-xs">
            {locale === "ar"
              ? `خصم ${Math.round(discountPercentage)}%`
              : `-${Math.round(discountPercentage)}%`}
          </span>
        )}

        <button
          type="button"
          className={`${theme.productCard.wishlistButton} ${
            inWishist
              ? "text-rose-500 shadow-sm"
              : "text-neutral-500 hover:text-rose-500"
          }`}
          aria-label={t("Product.ProductCard.ADD_TO_WISHLIST")}
          onClick={handleWishlist}
          disabled={loading}
        >
          <Heart
            className={`${theme.productCard.wishlistIcon} ${
              inWishist
                ? "fill-rose-500 text-rose-500 scale-105"
                : "fill-none stroke-current"
            }`}
          />
        </button>

        <div className={theme.productCard.addCartWrapper}>
          <button
            type="button"
            onClick={handleAddItem}
            disabled={isOutOfStock || loading || addToCartMutation.isPending}
            className={`${theme.productCard.addCartButton} ${
              inCart
                ? "bg-green-600"
                : isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : ""
            }`}
          >
            {isOutOfStock
              ? t("Product.ProductCard.OUT_OF_STOCK")
              : inCart
                ? t("Product.ProductCard.ADDED")
                : t("Product.ProductCard.ADD_TO_CART")}
          </button>
        </div>
      </div>

      <div className={theme.productCard.info}>
        <div className="min-w-0 pe-2 space-y-0.5">
          <span className={theme.productCard.meta}>
            {product.productName} • {product.categoryName}
          </span>

          <Link href={`/products/${product.slug}`}>
            <h3 className={theme.productCard.title}>{product.productName}</h3>
          </Link>
        </div>

        <div className="flex flex-col items-end shrink-0 pt-0.5 text-end">
          {hasDiscount ? (
            <div className="flex flex-wrap items-baseline justify-end gap-1.5">
              <span className="text-xs text-neutral-400 line-through decoration-neutral-400 font-medium">
                {t("Product.ProductCard.CURRENCY_SYMBOL")}
                {originalPrice}
              </span>
              <span className="text-sm font-bold text-red-600">
                {t("Product.ProductCard.CURRENCY_SYMBOL")}
                {finalPrice}
              </span>
            </div>
          ) : (
            <p className={theme.productCard.price}>
              {t("Product.ProductCard.CURRENCY_SYMBOL")}
              {finalPrice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
