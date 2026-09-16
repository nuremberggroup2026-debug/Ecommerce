import Link from "next/link";
import Image from "next/image";
import type { Locale  } from "@/types";
import type {TransalatedCategories} from "@/features/categories/types"
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
  const count = categories.length;

  return (
    <main className={theme.categoriesList.main} dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Header */}
    

      {/* Featured Bento Categories Grid */}
      <section className={theme.categoriesList.gridSection}>
        <div className={theme.categoriesList.grid}>
          {count === 1 && (
            <div className="md:col-span-4 md:row-span-2">
              <CategoryCard cat={categories[0]} isAr={isAr} t={t} />
            </div>
          )}

          {count === 2 && (
            <>
              <div className="md:col-span-2 md:row-span-2">
                <CategoryCard cat={categories[0]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-2 md:row-span-2">
                <CategoryCard cat={categories[1]} isAr={isAr} t={t} />
              </div>
            </>
          )}

          {count === 3 && (
            <>
              <div className="md:col-span-2 md:row-span-2">
                <CategoryCard cat={categories[0]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[1]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[2]} isAr={isAr} t={t} />
              </div>
            </>
          )}

          {count === 4 && (
            <>
              <div className="md:col-span-2 md:row-span-2">
                <CategoryCard cat={categories[0]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[1]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-1 md:row-span-1">
                <CategoryCard cat={categories[2]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-1 md:row-span-1">
                <CategoryCard cat={categories[3]} isAr={isAr} t={t} />
              </div>
            </>
          )}

          {count >= 5 && (
            <>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[0]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[1]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-1 md:row-span-1">
                <CategoryCard cat={categories[2]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[3]} isAr={isAr} t={t} />
              </div>
              <div className="md:col-span-1 md:row-span-1">
                <CategoryCard cat={categories[4]} isAr={isAr} t={t} />
              </div>
              {categories.slice(5).map((cat) => (
                <div key={cat.id} className="md:col-span-1 md:row-span-1">
                  <CategoryCard cat={cat} isAr={isAr} t={t} />
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function CategoryCard({
  cat,
  isAr,
  t,
}: {
  cat: TransalatedCategories;
  isAr: boolean;
  t: any;
}) {
  return (
    <Link
      href={`/products?page=1&categories=${encodeURIComponent(cat.id)}`}
      className={theme.categoriesList.card}
    >
      <Image
        src={cat.image}
        alt={cat.name}
        fill
        className={theme.categoriesList.image}
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      <div className={theme.categoriesList.overlay} />

      <div className={theme.categoriesList.content}>
        <div>
          <h2 className={theme.categoriesList.cardTitle}>{cat.name}</h2>
          <span className={theme.categoriesList.exploreLink(isAr)}>
            {t("EXPLORE_COLLECTION")} {isAr ? "←" : "→"}
          </span>
        </div>
      </div>
    </Link>
  );
}