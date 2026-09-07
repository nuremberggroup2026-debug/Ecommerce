import Link from "next/link";
import Image from "next/image";
import { Locale, TransalatedCategories } from "@/types";
import { theme } from "@/themes";

export default function CategoriesSection({
  categories,
  locale,
}: {
  categories: TransalatedCategories[];
  locale: Locale;
}) {
  const isAr = locale === "ar";
  const count = categories.length;

  return (
    <section className={theme.categories.section}>
      <div className={theme.categories.container}>
       

        <div className={theme.categories.grid}>
          {count === 1 && (
            <div className="md:col-span-4 md:row-span-2">
              <CategoryCard cat={categories[0]} isAr={isAr} />
            </div>
          )}

          {count === 2 && (
            <>
              <div className="md:col-span-2 md:row-span-2">
                <CategoryCard cat={categories[0]} isAr={isAr} />
              </div>
              <div className="md:col-span-2 md:row-span-2">
                <CategoryCard cat={categories[1]} isAr={isAr} />
              </div>
            </>
          )}

          {count === 3 && (
            <>
              <div className="md:col-span-2 md:row-span-2">
                <CategoryCard cat={categories[0]} isAr={isAr} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[1]} isAr={isAr} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[2]} isAr={isAr} />
              </div>
            </>
          )}

          {count === 4 && (
            <>
              <div className="md:col-span-2 md:row-span-2">
                <CategoryCard cat={categories[0]} isAr={isAr} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[1]} isAr={isAr} />
              </div>
              <div className="md:col-span-1 md:row-span-1">
                <CategoryCard cat={categories[2]} isAr={isAr} />
              </div>
              <div className="md:col-span-1 md:row-span-1">
                <CategoryCard cat={categories[3]} isAr={isAr} />
              </div>
            </>
          )}

          {count >= 5 && (
            <>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[0]} isAr={isAr} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[1]} isAr={isAr} />
              </div>
              <div className="md:col-span-1 md:row-span-1">
                <CategoryCard cat={categories[2]} isAr={isAr} />
              </div>
              <div className="md:col-span-2 md:row-span-1">
                <CategoryCard cat={categories[3]} isAr={isAr} />
              </div>
              <div className="md:col-span-1 md:row-span-1">
                <CategoryCard cat={categories[4]} isAr={isAr} />
              </div>
              {categories.slice(5).map((cat) => (
                <div key={cat.id} className="md:col-span-1 md:row-span-1">
                  <CategoryCard cat={cat} isAr={isAr} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function CategoryCard({
  cat,
  isAr,
}: {
  cat: TransalatedCategories;
  isAr: boolean;
}) {
  return (
    <Link
      href={`/products?page=1&categories=${encodeURIComponent(cat.id)}`}
      className={theme.categories.cardContainer}
    >
      <Image
        src={cat.image}
        alt={cat.name}
        fill
        className={theme.categories.cardImage}
      />

      <div className={theme.categories.cardOverlay} />

      <div className={theme.categories.cardContentWrapper}>
        <div className={theme.categories.cardContentInner}>
          <h3 className={theme.categories.cardTitle}>
            {cat.name}
          </h3>
          <span className={theme.categories.cardAction}>
            {isAr ? "استكشف الفئة" : "Explore Category"}
          </span>
        </div>
      </div>
    </Link>
  );
}