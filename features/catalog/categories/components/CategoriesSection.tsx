import Link from "next/link";
import Image from "next/image";
import { Locale, TransalatedCategories } from "@/types";
import { theme } from "@/themes";
import defaultImage from "@/app/defaultImage.jpg";

export default function CategoriesSection({
  categories,
  locale,
}: {
  categories: TransalatedCategories[];
  locale: Locale;
}) {
  const isAr = locale === "ar";

  return (
    <section className={theme.categories.section} dir={isAr ? "rtl" : "ltr"}>
      <div className={theme.categories.container}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id || cat.slug} cat={cat} isAr={isAr} />
          ))}
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
  const imageSrc =
    cat.image && cat.image.trim() !== "" && cat.image !== "null"
      ? cat.image.trim()
      : defaultImage;

  return (
    <Link
      href={`/products?page=1&categories=${encodeURIComponent(cat.id)}`}
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl border border-neutral-200/60 bg-neutral-100 shadow-xs transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
    >
      <Image
        src={imageSrc}
        alt={cat.name}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end text-start">
        <h3 className="text-base sm:text-xl font-bold text-white tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5">
          {cat.name}
        </h3>
        <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white/85 transition-all duration-300">
          <span>{isAr ? "استكشف الفئة" : "Explore Category"}</span>
          <span
            className={`transition-transform duration-300 ${
              isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
            }`}
          >
            {isAr ? "←" : "→"}
          </span>
        </span>
      </div>
    </Link>
  );
}