"use client";

import Link from "next/link";
import Image from "next/image";
import type { Locale, TransalatedCategories } from "@/types";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";
import defaultImage from "@/app/defaultImage.jpg";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export default function CategoriesListComponent({
  categories,
  locale,
}: {
  categories: TransalatedCategories[];
  locale: Locale;
}) {
  const t = useTranslations("Categories.CategoriesList");
  const isAr = locale === "ar";

  const getCategoryImage = (image: string | null | undefined) => {
    if (!image) return defaultImage;
    const trimmed = image.trim();
    if (
      !trimmed ||
      trimmed === "null" ||
      trimmed === "undefined" ||
      trimmed === "pending-image"
    ) {
      return defaultImage;
    }
    return trimmed;
  };

  return (
    <main className={theme.categoriesList.main} dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <section className={theme.categoriesList.heroSection}>
        <div className={theme.categoriesList.heroContent}>
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1 text-xs font-semibold text-neutral-700">
            <Sparkles className="h-3.5 w-3.5 text-neutral-500" />
            <span>
              {isAr
                ? `${categories.length} مجموعات أزياء مختارة`
                : `${categories.length} Curated Apparel Collections`}
            </span>
          </div>

          <h1 className={theme.categoriesList.title}>{t("TITLE")}</h1>

          <p className={theme.categoriesList.description}>{t("DESCRIPTION")}</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className={theme.categoriesList.gridSection}>
        {categories.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200 p-12 text-center text-neutral-500">
            <p className="text-lg font-medium">
              {isAr
                ? "لا توجد فئات متاحة حالياً"
                : "No collections available at this time."}
            </p>
          </div>
        ) : (
          <div className={theme.categoriesList.grid}>
            {categories.map((cat) => {
              const imageSrc = getCategoryImage(cat.image);

              return (
                <Link
                  key={cat.id || cat.slug}
                  href={`/products?page=1&categories=${encodeURIComponent(cat.id)}`}
                  className={theme.categoriesList.card}
                >
                  {/* Category Image */}
                  <Image
                    src={imageSrc}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={theme.categoriesList.image}
                  />

                  {/* Elegant Gradient Overlay */}
                  <div className={theme.categoriesList.overlay} />

                  {/* Card Content */}
                  <div className={theme.categoriesList.content}>
                    <h2 className={theme.categoriesList.cardTitle}>{cat.name}</h2>

                    {cat.description && (
                      <p className="mt-1 text-xs text-white/70 line-clamp-1 font-light">
                        {cat.description}
                      </p>
                    )}

                    <div className={theme.categoriesList.exploreLink(isAr)}>
                      <span>{t("EXPLORE_COLLECTION")}</span>
                      {isAr ? (
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}