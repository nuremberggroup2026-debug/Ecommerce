import Link from "next/link";
import Image from "next/image";
import { Locale, TransalatedCategories } from "@/types";

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
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <header className="mb-10">
          <h2 className="text-4xl font-semibold tracking-tight">
            {isAr ? "الفئات" : "Categories"}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-6 md:h-137.5">
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
      className="group relative block h-full w-full overflow-hidden rounded-3xl border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-md"
    >
      <Image
        src={`https://picsum.photos/seed/${Math.random()}/600/800`}
        alt={cat.name}
        fill
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

      <div className="absolute inset-0 flex items-end p-6 md:p-8">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
          <h3 className="text-xl font-medium text-white md:text-2xl tracking-tight">
            {cat.name}
          </h3>
          <span className="mt-1.5 inline-flex items-center text-xs font-medium text-white/80 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
            {isAr ? "استكشف الفئة" : "Explore Category"}
          </span>
        </div>
      </div>
    </Link>
  );
}
