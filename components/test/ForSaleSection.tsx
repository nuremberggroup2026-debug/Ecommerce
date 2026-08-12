import ProductCard from "@/features/catalog/products/components/ProductCard";
import { ProductsDataWithOutPag } from "@/features/catalog/products/types";
import { Locale } from "@/types";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Prop {
  discountProductsData: ProductsDataWithOutPag;
  locale: Locale;
}

export default function ForSaleSection({ discountProductsData, locale }: Prop) {
  const t = useTranslations("Home.ForSaleSection");

  const { products, productsIdsInCart, productsIdsInWishlist } =
    discountProductsData;
  const isAr = locale === "ar";

  return (
    <section className="bg-neutral-50/60 py-24 border-y border-neutral-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <header className="mb-14 flex items-end justify-between">
          <div className="space-y-2 text-center sm:text-start">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
                {t("LIMITED_OFFERS")}
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              {t("FLASH_SALE")}
            </h2>
          </div>

          <Link
            href="/sale"
            className="hidden text-sm font-medium text-neutral-800 transition-colors hover:text-black underline underline-offset-4 md:block"
          >
            {t("VIEW_ALL_DEALS")} {isAr ? "←" : "→"}
          </Link>
        </header>

        {/* Grid */}
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const isInWishlist =
              productsIdsInWishlist &&
              productsIdsInWishlist.includes(product.id);

            const isInCart =
              productsIdsInCart && productsIdsInCart.includes(product.id);

            return (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={isInWishlist}
                isInCart={isInCart}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
