"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Locale } from "../types";

import defaultImage from "@/app/defaultImage.jpg";
import { theme } from "@/themes";
import type { GetProductType } from "@/types/index";

import { toastResponse } from "@/lib/toast";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";

import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/features/wishlist/api/wishlist.client.api";

import { useAddToCart } from "@/features/cart/hooks/useAddToCart";

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
  const locale = useLocale()as Locale;

  const [inWishist, setInWishist] =
    useState(isInWishlist);

  const [inCart, setInCart] =
    useState(isInCart);

  const [loading, setLoading] =
    useState(false);

  const addToCartMutation =
    useAddToCart();

  const variant = product.variants[0];

  const isOutOfStock =
    variant.stock <= 0;

  const getProductImage = (
    image: string | null | undefined,
  ): string | typeof defaultImage => {
    if (!image) {
      return defaultImage;
    }

    const trimmedImage = image.trim();

    if (!trimmedImage) {
      return defaultImage;
    }

    if (trimmedImage === "pending-image") {
      return defaultImage;
    }

    if (
      trimmedImage === "null" ||
      trimmedImage === "undefined" ||
      trimmedImage === "default-image"
    ) {
      return defaultImage;
    }

    if (trimmedImage.startsWith("/")) {
      return trimmedImage;
    }

    try {
      const url = new URL(trimmedImage);

      if (
        url.protocol === "http:" ||
        url.protocol === "https:"
      ) {
        return trimmedImage;
      }

      return defaultImage;
    } catch {
      return defaultImage;
    }
  };

  const productImage =
    getProductImage(
      product.productCardImage,
    );

  /**
   * Handle API errors.
   */
  const handleApiError = (status: number) => {
    switch (status) {
      case HTTP_STATUS_MAP.UNAUTHORIZED:
        router.push("/login");
        return;

      case HTTP_STATUS_MAP.PAYMENT_REQUIRED:
        router.replace("/checkout/payment");
        return;

      case HTTP_STATUS_MAP.FORBIDDEN:
        router.replace("/forbidden");
        return;

      case HTTP_STATUS_MAP.NOT_FOUND:
        router.replace("/not-found");
        return;

      case HTTP_STATUS_MAP.TOO_MANY_REQUESTS:
        router.replace(
          "/too-many-requests",
        );
        return;

      case HTTP_STATUS_MAP.INTERNAL_ERROR:
      case HTTP_STATUS_MAP.SERVICE_UNAVAILABLE:
        router.replace("/server-error");
        return;

      case HTTP_STATUS_MAP.BAD_REQUEST:
      case HTTP_STATUS_MAP.CONFLICT:
      case HTTP_STATUS_MAP.UNPROCESSABLE_ENTITY:
        return;

      default:
        return;
    }
  };

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
        previous
          ? "DELETING_ITEM"
          : "CART_ITEM_ADDING",
      );
    } catch (error) {
      // Rollback optimistic update
      setInWishist(previous);

      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        typeof error.status === "number"
      ) {
        handleApiError(error.status);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add product to cart.
   */
  const handleAddItem = async () => {
    if (
      loading ||
      isOutOfStock ||
      addToCartMutation.isPending
    ) {
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
      console.error(
        "Failed to add item to cart:",
        error,
      );

      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        typeof error.status === "number"
      ) {
        handleApiError(error.status);
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
            src={productImage}
            alt={product.productName}
            fill
            sizes="(max-width: 1280px) 33vw, 50vw"
            className={
              theme.productCard.image
            }
          />
        </Link>

        <button
          type="button"
          className={
            theme.productCard.wishlistButton
          }
          aria-label={t(
            "Product.ProductCard.ADD_TO_WISHLIST",
          )}
          onClick={handleWishlist}
          disabled={loading}
        >
          <svg
            className={
              theme.productCard.wishlistIcon
            }
            fill={
              inWishist
                ? "red"
                : "none"
            }
            stroke={
              inWishist
                ? "red"
                : "currentColor"
            }
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364l-5.318-5.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <div
          className={
            theme.productCard.addCartWrapper
          }
        >
          <button
            type="button"
            onClick={handleAddItem}
            disabled={
              isOutOfStock ||
              loading ||
              addToCartMutation.isPending
            }
            className={`${
              theme.productCard.addCartButton
            } ${
              inCart
                ? "bg-green-600"
                : isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : ""
            }`}
          >
            {isOutOfStock
              ? t(
                  "Product.ProductCard.OUT_OF_STOCK",
                )
              : inCart
                ? t(
                    "Product.ProductCard.ADDED",
                  )
                : t(
                    "Product.ProductCard.ADD_TO_CART",
                  )}
          </button>
        </div>
      </div>

      <div
        className={
          theme.productCard.info
        }
      >
        <div className="space-y-0.5">
          <span
            className={
              theme.productCard.meta
            }
          >
            {product.productName} •{" "}
            {product.categoryName}
          </span>

          <Link
            href={`/products/${product.id}`}
          >
            <h3
              className={
                theme.productCard.title
              }
            >
              {product.productName}
            </h3>
          </Link>
        </div>

        <p
          className={
            theme.productCard.price
          }
        >
          {t(
            "Product.ProductCard.CURRENCY_SYMBOL",
          )}
          {Number(variant.finalPrice)}
        </p>
      </div>
    </div>
  );
}
