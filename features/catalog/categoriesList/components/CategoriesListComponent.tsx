import Link from "next/link";
import type { Locale, TransalatedCategories } from "@/types";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";

export default function CategoriesListComponent({
  categories,
  locale,
}: {
  categories: TransalatedCategories[];
  locale: Locale;
}) {
  const t = useTranslations("Categories.CategoriesList");
  const isAr = locale === "ar";

  return (
    <main className={theme.categoriesList.main}>
      {/* Hero */}
      <section className={theme.categoriesList.heroSection}>
        <div className={theme.categoriesList.heroContent}>
          <h1 className={theme.categoriesList.title}>
            {t("TITLE")}
          </h1>

          <p className={theme.categoriesList.description}>
            {t("DESCRIPTION")}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className={theme.categoriesList.gridSection}>
        <div className={theme.categoriesList.grid}>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?page=1&categories=${encodeURIComponent(cat.id)}`}
              className={theme.categoriesList.card}
            >
              {/* Image */}
              <img
                src={`https://picsum.photos/seed/${cat.slug}/900/900`}
                alt={cat.name}
                className={theme.categoriesList.image}
              />

              {/* Overlay */}
              <div className={theme.categoriesList.overlay} />

              {/* Content */}
              <div className={theme.categoriesList.content}>
                <h2 className={theme.categoriesList.cardTitle}>
                  {cat.name}
                </h2>

                <div className={theme.categoriesList.exploreLink(isAr)}>
                  {t("EXPLORE_COLLECTION")} {isAr ? "←" : "→"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}