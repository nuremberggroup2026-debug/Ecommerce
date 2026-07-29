import React from "react";
import Link from "next/link";
import type { Locale, TransalatedCategories } from "@/types";

export default function CategoriesListComponent({
  categories,
  locale,
}: {
  categories: TransalatedCategories[];
  locale: Locale;
}) {
  const isAr = locale === "ar";
  return (
    <main className="bg-white text-black">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            {isAr ? "الفئات" : "Categories"}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-neutral-500">
            {isAr
              ? "استكشف مجموعاتنا المختارة واكتشف المنتجات المصممة لتناسب أسلوب حياتك."
              : "Explore our curated collections and discover products designed around your lifestyle."}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?page=1&category=${encodeURIComponent(cat.slug)}`}
              className="
          group relative overflow-hidden rounded-3xl
          aspect-square
          border border-neutral-100
          shadow-sm
          transition-all duration-500
          hover:shadow-xl
        "
            >
              {/* Image */}
              <img
                src={`https://picsum.photos/seed/${cat.slug}/900/900`}
                alt={cat.name}
                className="
            absolute inset-0 h-full w-full object-cover
            transition duration-700
            group-hover:scale-110
          "
              />

              {/* Overlay */}
              <div
                className="
            absolute inset-0
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
          "
              />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h2
                  className="
              text-2xl font-medium
              tracking-tight
              text-white
            "
                >
                  {cat.name}
                </h2>

                <div
                  className="
              mt-2 flex items-center gap-2
              text-sm text-white/80
              opacity-0
              transition-all duration-500
              group-hover:translate-x-1
              group-hover:opacity-100
            "
                >
                  Explore Collection →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
