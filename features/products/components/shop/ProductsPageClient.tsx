"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useProductsQuery } from "@/features/products/hooks/useProducts";
import { useCategoriesQuery } from "@/features/categories/hooks/useCategories";
import ProductCard from "@/features/products/components/shop/ProductCard";
import { applyPremiumPricing } from "@/features/products/services/products.services";
import CategoryFilterWrapper from "@/features/filters/CategoryFilter";
import SecondPaginationComponent from "@/features/pagination/SecondPaginationComponent";
import SortFilter from "@/features/filters/SortFilter";
import PriceFilter from "@/features/filters/PriceFilter";
import { Locale } from "@/types";
import { SortTypeFront } from "@/features/products/types";
import { theme } from "@/themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X } from "lucide-react";

function ProductCardSkeleton() {
  return (
    <div className={theme.productCard.container}>
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse">
        <div className="absolute top-3.5 right-3.5 z-10 size-9 rounded-full bg-neutral-300 dark:bg-neutral-700 animate-pulse" />
      </div>

      <div className={theme.productCard.info}>
        <div className="min-w-0 pe-2 space-y-2 flex-1">
          <div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
        </div>
        <div className="flex flex-col items-end shrink-0 pt-0.5">
          <div className="h-4 w-12 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function FilterSidebarContent({
  t,
  search,
  searchParams,
  router,
  pathname,
  categoriesData,
  isCategoriesLoading,
}: {
  t: ReturnType<typeof useTranslations>;
  search?: string;
  searchParams: ReturnType<typeof useSearchParams>;
  router: ReturnType<typeof useRouter>;
  pathname: string;
  categoriesData: any;
  isCategoriesLoading: boolean;
}) {
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = (formData.get("search") as string)?.trim();
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(searchParams.get("categories")) ||
    Boolean(searchParams.get("minPrice")) ||
    Boolean(searchParams.get("maxPrice"));

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 p-3 rounded-2xl">
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
            {t("FILTER")}
          </span>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
          >
            <X className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      )}

      <div className={theme.productsPage.searchBox}>
        <h3 className={theme.productsPage.searchTitle}>{t("SEARCH")}</h3>

        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center"
        >
          <input
            key={search ?? "empty-search"}
            name="search"
            defaultValue={search ?? ""}
            placeholder={t("SEARCH_PLACEHOLDER")}
            className={`${theme.productsPage.searchInput} pe-9`}
          />
          <button
            type="submit"
            className="absolute inset-y-0 inset-e-0 flex items-center pe-3 text-neutral-400 hover:text-neutral-900"
            aria-label={t("SEARCH")}
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {!isCategoriesLoading && categoriesData && (
        <CategoryFilterWrapper categoriesData={categoriesData} />
      )}

      <PriceFilter />
    </div>
  );
}

export default function ProductsPageClient({ locale }: { locale: Locale }) {
  const t = useTranslations("Product");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") ?? "1";
  const categories = searchParams.get("categories") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const sort = searchParams.get("sort") as SortTypeFront | undefined;
  const minPrice = searchParams.get("minPrice") ?? undefined;
  const maxPrice = searchParams.get("maxPrice") ?? undefined;

  // =====================================================
  // Products
  // =====================================================

  const {
    data: productsData,
    isLoading,
    isFetching,
    isError,
  } = useProductsQuery({
    locale,
    categories,
    search,
    page,
    sort,
    minPrice,
    maxPrice,
  });

  // =====================================================
  // Categories
  // =====================================================

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategoriesQuery(locale);

  // =====================================================
  // Loading
  // =====================================================

  if (isLoading) {
    return (
      <main className={theme.productsPage.main}>
        <section className={theme.productsPage.heroSection}>
          <div className={theme.productsPage.heroSpace}>
            <h1 className={theme.productsPage.title}>{t("TITLE")}</h1>

            <p className={theme.productsPage.description}>{t("DESCRIPTION")}</p>
          </div>

          <div className={theme.productsPage.controlsRow}>
            <div className="flex justify-between w-full items-center">
              <div className="h-9 w-24 rounded-xl bg-neutral-200 dark:bg-neutral-700 animate-pulse lg:hidden" />
              <div className="h-9 w-36 rounded-xl bg-neutral-200 dark:bg-neutral-700 animate-pulse ms-auto" />
            </div>
          </div>
        </section>

        <section className={theme.productsPage.contentSection}>
          <aside className={theme.productsPage.aside}>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                <div className="h-10 w-full rounded-md bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                <div className="h-48 w-full rounded-lg bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
                <div className="h-28 w-full rounded-lg bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
              </div>
            </div>
          </aside>

          <div className={theme.productsPage.productsCol}>
            <div className={theme.productsPage.productsGrid}>
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  // =====================================================
  // Error
  // =====================================================

  if (isError || !productsData) {
    return (
      <main className={theme.productsPage.main}>
        <div className="flex min-h-100 items-center justify-center">
          <p>Something went wrong while loading products.</p>
        </div>
      </main>
    );
  }

  // =====================================================
  // Data
  // =====================================================

  const { products, pagination, productsIdsInCart, productsIdsInWishlist } =
    productsData.data;

  let premium = applyPremiumPricing(products);

  // =====================================================
  // Price filtering
  // =====================================================

  if (minPrice) {
    premium = premium.filter((product) => product.price >= Number(minPrice));
  }

  if (maxPrice) {
    premium = premium.filter((product) => product.price <= Number(maxPrice));
  }

  // =====================================================
  // Render
  // =====================================================

  return (
    <main className={theme.productsPage.main}>
      <section className={theme.productsPage.heroSection}>
        <div className={theme.productsPage.heroSpace}>
          <h1 className={theme.productsPage.title}>{t("TITLE")}</h1>

          <p className={theme.productsPage.description}>{t("DESCRIPTION")}</p>
        </div>

        <div className={theme.productsPage.controlsRow}>
          <div className="flex justify-between w-full items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden flex items-center gap-2 rounded-xl border-neutral-200 text-xs font-medium px-3.5 py-2"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>{t("FILTER")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side={locale === "ar" ? "right" : "left"}
                className="w-80 sm:w-96 overflow-y-auto p-6"
              >
                <SheetHeader className="px-0 pt-0 pb-4 mb-4 border-b border-neutral-100">
                  <SheetTitle className="text-base font-semibold">
                    {t("FILTER")}
                  </SheetTitle>
                </SheetHeader>
                <FilterSidebarContent
                  t={t}
                  search={search}
                  searchParams={searchParams}
                  router={router}
                  pathname={pathname}
                  categoriesData={categoriesData}
                  isCategoriesLoading={isCategoriesLoading}
                />
              </SheetContent>
            </Sheet>

            <SortFilter />
          </div>
        </div>
      </section>

      <section className={theme.productsPage.contentSection}>
        <aside className={theme.productsPage.aside}>
          <FilterSidebarContent
            t={t}
            search={search}
            searchParams={searchParams}
            router={router}
            pathname={pathname}
            categoriesData={categoriesData}
            isCategoriesLoading={isCategoriesLoading}
          />
        </aside>

        <div className={theme.productsPage.productsCol}>
          <div
            className={`${theme.productsPage.productsGrid} ${
              isFetching ? "opacity-60 transition-opacity duration-200" : ""
            }`}
          >
            {premium.map((product) => {
              const isInWishlist =
                productsIdsInWishlist?.includes(product.id) ?? false;

              const isInCart = productsIdsInCart?.includes(product.id) ?? false;

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInCart={isInCart}
                  isInWishlist={isInWishlist}
                />
              );
            })}
          </div>

          <SecondPaginationComponent
            currentPage={Number(page)}
            totalPages={pagination.totalPages}
            searchParams={Object.fromEntries(searchParams.entries())}
            locale={locale}
          />
        </div>
      </section>
    </main>
  );
}
