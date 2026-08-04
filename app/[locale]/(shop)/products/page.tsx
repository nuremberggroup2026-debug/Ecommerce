import { fetchALLCategories } from "@/features/catalog/categories/api/categories.api";
import { getProducts } from "@/features/catalog/products/api/products.api";
import ProductCard from "@/features/catalog/products/components/ProductCard";
import { applyPremiumPricing } from "@/features/catalog/products/services/products.services";
import CategoryFilterWrapper from "@/features/catalog/filters/CategoryFilter";
import SecondPaginationComponent from "@/features/catalog/pagination/SecondPaginationComponent";
import SortFilter from "@/features/catalog/filters/SortFilter";
import PriceFilter from "@/features/catalog/filters/PriceFilter";
import { Locale, SortType } from "@/types";

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

  const {
    page = "1",
    categories,
    search,
    sort,
    minPrice,
    maxPrice,
  } = searchParamsData;

  const [products, categoriesData] = await Promise.all([
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
  let premium = applyPremiumPricing(products);

  if (minPrice) {
    premium = premium.filter((product) => product.price >= Number(minPrice));
  }

  if (maxPrice) {
    premium = premium.filter((product) => product.price <= Number(maxPrice));
  }

  return (
    <main className="min-h-screen bg-neutral-50/50 text-black">
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-10 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            All Products
          </h1>

          <p className="text-sm text-gray-400 font-light max-w-md mx-auto">
            A refined collection of premium essentials crafted for modern
            everyday life.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between border-b border-gray-100 pb-5 text-sm">
          <span className="text-gray-400 font-medium">
            {premium.length} items
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Sort by:</span>

            <SortFilter />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside className="hidden lg:block space-y-8 sticky top-28 h-fit">
          <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-4">
              Search
            </h3>

            <form>
              <input
                name="search"
                defaultValue={search}
                placeholder="Find a product..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 text-xs"
              />
            </form>
          </div>

          <CategoryFilterWrapper categoriesData={categoriesData} />

          <PriceFilter />
        </aside>

        <div className="lg:col-span-3 space-y-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            {premium.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>{" "}
          <SecondPaginationComponent
            currentPage={Number(page)}
            totalPages={products.pagination.totalPages}
            searchParams={searchParamsData}
          />
        </div>
      </section>
    </main>
  );
}
