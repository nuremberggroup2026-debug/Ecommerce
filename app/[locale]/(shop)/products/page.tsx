import { fetchALLCategories } from "@/features/catalog/categories/api/categories.client.api";
import { getProducts } from "@/features/catalog/products/api/products.api";
import ProductCard from "@/features/catalog/products/components/ProductCard";
import { applyPremiumPricing } from "@/features/catalog/products/services/products.services";
import CategoryFilterWrapper from "@/features/catalog/filters/CategoryFilter";
import SecondPaginationComponent from "@/features/catalog/pagination/SecondPaginationComponent";
import SortFilter from "@/features/catalog/filters/SortFilter";
import PriceFilter from "@/features/catalog/filters/PriceFilter";
import { Locale, SortType } from "@/types";
import { getTranslations } from "next-intl/server";
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

export default async function ProductsPage({
  params,
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    categories?: string;
    search?: string;
    sort?: SortType;
    minPrice?: string;
    maxPrice?: string;
  }>;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const searchParamsData = await searchParams;

  const t = await getTranslations("Product");

  const {
    page = "1",
    categories,
    search,
    sort,
    minPrice,
    maxPrice,
  } = searchParamsData;

  const [productsData, categoriesData] = await Promise.all([
    getProducts({
      categories,
      search,
      page,
      sort,
      locale,
      minPrice,
      maxPrice,
    }),
    fetchALLCategories(locale),
  ]);

  const { products, pagination, productsIdsInCart, productsIdsInWishlist } =
    productsData.data;

  let premium = applyPremiumPricing(products);

  if (minPrice) {
    premium = premium.filter((product) => product.price >= Number(minPrice));
  }

  if (maxPrice) {
    premium = premium.filter((product) => product.price <= Number(maxPrice));
  }

  return (
    <main className={theme.productsPage.main}>
      <section className={theme.productsPage.heroSection}>
        <div className={theme.productsPage.heroSpace}>
          <h1 className={theme.productsPage.title}>{t("TITLE")}</h1>

          <p className={theme.productsPage.description}>{t("DESCRIPTION")}</p>
        </div>

        <div className={theme.productsPage.controlsRow}>
          <span className={theme.productsPage.itemsCount}>
            {t("ITEMS_COUNT", { count: premium.length })}
          </span>

          <div className={theme.productsPage.sortWrapper}>
            <span className={theme.productsPage.sortLabel}>{t("SORT_BY")}</span>
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

          <CategoryFilterWrapper categoriesData={categoriesData} />

          <PriceFilter />
        </aside>

        <div className={theme.productsPage.productsCol}>
          <div className={theme.productsPage.productsGrid}>
            {premium.map((product) => {
              const isInWishlist =
                productsIdsInWishlist &&
                productsIdsInWishlist.includes(product.id);

              const isInCart =
                productsIdsInCart && productsIdsInCart.includes(product.id);

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInCart={isInCart}
                  isInWishlist={isInWishlist}
                />
              );
            })}
          </div>{" "}
          <SecondPaginationComponent
            currentPage={Number(page)}
            totalPages={pagination.totalPages}
            searchParams={searchParamsData}
          />
        </div>
      </section>
    </main>
  );
}
