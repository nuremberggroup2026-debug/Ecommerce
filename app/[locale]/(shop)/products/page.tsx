"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { useProductsQuery } from "@/features/catalog/products/hooks/useProducts";
import { useCategoriesQuery } from "@/features/catalog/categories/hooks/useCategories";

import ProductCard from "@/features/catalog/products/components/ProductCard";

import { applyPremiumPricing } from "@/features/catalog/products/services/products.services";

import CategoryFilterWrapper from "@/features/catalog/filters/CategoryFilter";
import SecondPaginationComponent from "@/features/catalog/pagination/SecondPaginationComponent";
import SortFilter from "@/features/catalog/filters/SortFilter";
import PriceFilter from "@/features/catalog/filters/PriceFilter";

import { Locale, SortType } from "@/types";
import { theme } from "@/themes";
import { generateStaticMetadata } from "@/lib/constants/metadata";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const locale = (await params).locale;
  return generateStaticMetadata("products", locale);
};

export default function ProductsPage() {
  const t = useTranslations("Product");

  const params = useParams<{ locale: Locale }>();
  const searchParams = useSearchParams();

  const locale = params.locale;

  const page = searchParams.get("page") ?? "1";
  const categories = searchParams.get("categories") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const sort = searchParams.get("sort") as SortType | undefined;
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

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
  } = useCategoriesQuery(locale);

  // =====================================================
  // Loading
  // =====================================================

  if (isLoading) {
    return (
      <main className={theme.productsPage.main}>
        <section className={theme.productsPage.heroSection}>
          <div className={theme.productsPage.heroSpace}>
            <h1 className={theme.productsPage.title}>
              {t("TITLE")}
            </h1>

            <p className={theme.productsPage.description}>
              {t("DESCRIPTION")}
            </p>
          </div>
        </section>

        <section className={theme.productsPage.contentSection}>
          <div className={theme.productsPage.productsCol}>
            <div className={theme.productsPage.productsGrid}>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  {/* ضع Skeleton component تبعك هنا */}
                  <div className="h-80 animate-pulse rounded-lg bg-gray-200" />
                </div>
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

  const {
    products,
    pagination,
    productsIdsInCart,
    productsIdsInWishlist,
  } = productsData.data;

  let premium = applyPremiumPricing(products);

  // =====================================================
  // Price filtering
  // =====================================================

  if (minPrice) {
    premium = premium.filter(
      (product) => product.price >= Number(minPrice),
    );
  }

  if (maxPrice) {
    premium = premium.filter(
      (product) => product.price <= Number(maxPrice),
    );
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
          <span className={theme.productsPage.itemsCount}>
            {t("ITEMS_COUNT", {
              count: premium.length,
            })}
          </span>

          <div className={theme.productsPage.sortWrapper}>
            <span className={theme.productsPage.sortLabel}>
              {t("SORT_BY")}
            </span>

            <SortFilter />
          </div>
        </div>
      </section>

      <section className={theme.productsPage.contentSection}>
        <aside className={theme.productsPage.aside}>
          <div className={theme.productsPage.searchBox}>
            <h3 className={theme.productsPage.searchTitle}>{t("SEARCH")}</h3>

            <form>
              <input
                name="search"
                defaultValue={search}
                placeholder={t("SEARCH_PLACEHOLDER")}
                className={theme.productsPage.searchInput}
              />
            </form>
          </div>

          {!isCategoriesLoading && categoriesData && (
            <CategoryFilterWrapper
              categoriesData={categoriesData}
            />
          )}

          <PriceFilter />
        </aside>

        <div className={theme.productsPage.productsCol}>
          {isFetching && (
            <div className="mb-3 text-sm opacity-60">
              Loading...
            </div>
          )}

          <div className={theme.productsPage.productsGrid}>
            {premium.map((product) => {
              const isInWishlist =
                productsIdsInWishlist?.includes(product.id) ?? false;

              const isInCart =
                productsIdsInCart?.includes(product.id) ?? false;

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
            searchParams={Object.fromEntries(
              searchParams.entries(),
            )}
          />
        </div>
      </section>
    </main>
  );
}
