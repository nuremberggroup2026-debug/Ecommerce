"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Locale, WishlistItemsType } from "../types/index";
import defaultImage from "@/app/defaultImage.jpg";
interface Prop {
  locale: Locale;
  wishlistItems: WishlistItemsType[];
}
export default function WishlistComponent({ locale, wishlistItems }: Prop) {
  const t = useTranslations("Wishlist");
  const isArabic = locale === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-black"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-20 lg:px-10">
        {/* Header */}
        <header
          className={`mb-16 border-b border-neutral-100 pb-6 ${isArabic ? "text-right" : "text-left"}`}
        >
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-xs font-light text-gray-400">
            {wishlistItems.length === 0
              ? t("emptyTitle")
              : t("savedItems", { count: wishlistItems.length })}
          </p>
        </header>
        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (
          <div className="flex min-h-100 flex-1 flex-col items-center justify-center space-y-6 text-center">
            <p className="max-w-md text-sm font-light leading-relaxed text-gray-400">
              {t("emptyDescription")}
            </p>
            <Link
              href="/products"
              className="rounded-full bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.98]"
            >
              {t("explore")}
            </Link>
          </div>
        ) : (
          /* Wishlist Products */ <div className="flex w-full flex-1 justify-center">
            <div className="grid w-full max-w-5xl grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((item) => (
                <div
                  key={item.itemId}
                  className="group flex flex-col space-y-4"
                >
                  {/* Product Image */}
                  <div className=" relative aspect-4/5 w-full overflow-hidden rounded-[32px] border border-neutral-100 bg-neutral-50 transition-all duration-500 group-hover:border-neutral-200/50 group-hover:shadow-md ">
                    <Image
                      src={item.productCardImage || defaultImage}
                      alt={item.productName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className=" rounded-[28px] object-cover p-2 transition duration-700 ease-out group-hover:scale-[1.03] "
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      aria-label={t("remove")}
                      className=" absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/40 bg-white/95 text-neutral-400 shadow-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black active:scale-90 "
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Product Information */}
                  <div className="space-y-2 px-1">
                    {/* Category */}
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                      {item.categoryName}
                    </p>
                    {/* Product Name */}
                    <Link href={`/products/${item.productId}`}>
                      <h3 className=" line-clamp-1 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-500 ">
                        {item.productName}
                      </h3>
                    </Link>
                    {/* Description */}
                    <p className=" line-clamp-2 text-xs font-light leading-relaxed text-gray-400 ">
                      {item.productDescription}
                    </p>
                    {/* Price */}
                    <p className="pt-1 text-sm font-bold text-neutral-900">
                      ${Number(item.finalPrice).toFixed(2)}
                    </p>
                    {/* View Product Button */}
                    <div className="pt-1">
                      <Link
                        href={`/products/${item.productId}`}
                        className=" block w-full rounded-xl bg-neutral-900 py-3 text-center text-[11px] font-medium uppercase tracking-widest text-white shadow-sm transition-all duration-300 hover:bg-black active:scale-[0.98] "
                      >
                        {t("viewProduct")}
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
