import ProductCard from "@/features/catalog/products/components/ProductCard";
import type { ProductsDataWithOutPag } from "../types/index";
import { useTranslations } from "next-intl";
export default function FeaturedProductsComponent({
  featuredProductsData,
}: {
  featuredProductsData: ProductsDataWithOutPag;
}) {
  const { products, productsIdsInCart, productsIdsInWishlist } =
    featuredProductsData;
  const t = useTranslations("Home.FeaturedProducts");
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="mb-14 text-center sm:text-left space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
            {t("TITLE")}
          </h2>
          <p className="max-w-md text-sm text-gray-400 font-light">
            {t("DESCRIPTION")}
          </p>
        </header>
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
