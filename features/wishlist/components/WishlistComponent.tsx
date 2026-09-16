"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { WishlistItemsType } from "../types/index";
import { Locale } from "@/types";
import defaultImage from "@/app/defaultImage.jpg";
import { toastResponse } from "@/lib/toast";
import { removeItemFromWishlist } from "../api/wishlist.client.api";
import { useState } from "react";
import { Trash2, ExternalLink, HeartOff } from "lucide-react";

interface Prop {
  locale: Locale;
  wishlistItems: WishlistItemsType[];
}

export default function WishlistComponent({ locale, wishlistItems }: Prop) {
  const [items, setItems] = useState(wishlistItems);
  const t = useTranslations("");
  const isArabic = locale === "ar";

  const handleRemoveItem = async (id: string) => {
    const result = await toastResponse(removeItemFromWishlist(id), t, "");

    if (result.success) setItems(items.filter((item) => item.productId !== id));
  };

  console.log("wishh", wishlistItems);

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-16 lg:px-10">
        {/* Header */}
        <header
          className={`mb-12 border-b border-neutral-200/60 dark:border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t("Wishlist.title")}
            </h1>
            <p className="mt-2 text-xs font-light text-neutral-500 dark:text-neutral-400">
              {items.length === 0
                ? t("Wishlist.emptyTitle")
                : t("Wishlist.savedItems", { count: items.length })}
            </p>
          </div>
          {items.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 px-3.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300 w-fit">
              {items.length} {isArabic ? "منتجات" : "items"}
            </span>
          )}
        </header>

        {/* Empty Wishlist */}
        {items.length === 0 ? (
          <div className="flex min-h-96 flex-1 flex-col items-center justify-center space-y-5 text-center p-8 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
              <HeartOff className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {t("Wishlist.emptyTitle")}
              </h2>
              <p className="max-w-md text-xs font-light leading-relaxed text-neutral-500 dark:text-neutral-400">
                {t("Wishlist.emptyDescription")}
              </p>
            </div>
            <Link
              href="/products"
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white dark:text-neutral-900 shadow-sm transition hover:bg-neutral-800 dark:hover:bg-white active:scale-[0.98]"
            >
              {t("Wishlist.explore")}
            </Link>
          </div>
        ) : (
          /* Wishlist Products */
          <div className="w-full flex-1">
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.itemId}
                  className="group flex flex-col justify-between h-full rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700"
                >
                  {/* Top Image Section */}
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={item.productCardImage || defaultImage}
                      alt={item.productName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover  transition duration-500 ease-out group-hover:scale-105"
                    />
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      type="button"
                      aria-label={t("Wishlist.remove")}
                      title={t("Wishlist.remove")}
                      className="absolute top-3 inset-e-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200/60 bg-white/90 dark:bg-neutral-900/90 text-neutral-400 dark:text-neutral-500 shadow-xs transition-all duration-200 hover:scale-110 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400 active:scale-95"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Product Information - flex-1 with fixed description height */}
                  <div className="mt-4 flex flex-1 flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      {/* Category */}
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        {item.categoryName}
                      </p>
                      {/* Product Name */}
                      <Link
                        href={`/products/${item.productId}`}
                        className="block"
                      >
                        <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300 wrap-break-word [word-break:break-word]">
                          {item.productName}
                        </h3>
                      </Link>
                      {/* Description with word-break and fixed line-clamp space */}
                      <p className="line-clamp-2 min-h-9 text-xs font-normal leading-relaxed text-neutral-500 dark:text-neutral-400 wrap-break-word [word-break:break-word] overflow-hidden">
                        {item.productDescription}
                      </p>
                    </div>

                    {/* Price & Action Button at the bottom */}
                    <div className="space-y-3 pt-2 mt-auto border-t border-neutral-100 dark:border-neutral-800/80">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-neutral-400 font-medium">
                          Price
                        </span>
                        <span className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                          ${Number(item.finalPrice).toFixed(2)}
                        </span>
                      </div>

                      <Link
                        href={`/products/${item.productId}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 py-2.5 text-center text-xs font-semibold text-white dark:text-neutral-900 shadow-xs transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-white active:scale-[0.98]"
                      >
                        <span>{t("Wishlist.viewProduct")}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
