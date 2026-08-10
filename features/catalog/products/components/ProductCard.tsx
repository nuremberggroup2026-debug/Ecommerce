"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import defaultImage from "@/app/defaultImage.jpg";
import { theme } from "@/themes";
import type { GetProductType } from "@/types/index";
import { toastResponse } from "@/lib/toast";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/features/wishlist/api/wishlist.client.api";
import { useTranslations } from "next-intl";
import { addItemToCart } from "@/features/cart/api/cart.client.api";

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
  const isOutOfStock = product.variants[0].stock <= 0;
  const [inWishist, setInWishist] = useState(isInWishlist);
  const [inCart, setInCart] = useState(isInCart);
  const [loading, setLoading] = useState(false);
  const t = useTranslations();

  const handleWishlist = async () => {
    if (loading) return;

    const previous = inWishist;

    setLoading(true);
    setInWishist(!previous);

    try {
      if (previous) {
        await toastResponse(
          removeItemFromWishlist(product.id),
          t,
          "DELETING_ITEM",
        );
      } else {
        await toastResponse(
          addItemToWishlist(product.id),
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

  const handleAddItem = async () => {
    await toastResponse(
      addItemToCart(product.variants[0].id, 1),
      t,
      "CART_ITEM_ADDING",
    );
    setInCart(true);
  };

  return (
    <div className={theme.productCard.container}>
      <div className={theme.productCard.imageWrapper}>
        <Link href={`/products/${product.id}`}>
          <Image
            src={defaultImage}
            alt={product.productName}
            fill
            sizes="(max-w-7xl) 33vw, 50vw"
            className={theme.productCard.image}
          />
        </Link>

        <button
          className={theme.productCard.wishlistButton}
          aria-label="Add to wishlist"
          onClick={() => {
            handleWishlist();
          }}
        >
          <svg
            className={theme.productCard.wishlistIcon}
            fill={inWishist ? "red" : "none"}
            stroke={inWishist ? "red" : "currentColor"}
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <div className={theme.productCard.addCartWrapper}>
          <button
            onClick={() => {
              handleAddItem();
            }}
            disabled={isOutOfStock}
            className={`${theme.productCard.addCartButton} ${
              inCart
                ? "bg-green-600"
                : isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : ""
            }`}
          >
            {isOutOfStock ? "Out Of Stock" : inCart ? "Added ✓" : "Add To Cart"}
          </button>
        </div>
      </div>

      <div className={theme.productCard.info}>
        <div className="space-y-0.5">
          <span className={theme.productCard.meta}>
            {product.productName} • {product.categoryName}
          </span>

          <Link href={`/products/${product.id}`}>
            <h3 className={theme.productCard.title}>{product.productName}</h3>
          </Link>
        </div>

        <p className={theme.productCard.price}>
          ${Number(product.variants[0].finalPrice)}
        </p>
      </div>
    </div>
  );
}
