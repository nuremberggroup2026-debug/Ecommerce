import ProductCard from "@/features/catalog/products/components/ProductCard";
import type { ProductsDataWithOutPag } from "../types/index";
import { theme } from "@/themes";
import { Locale } from "@/types";

export default function FeaturedProductsComponent({
  featuredProductsData,
  locale,
}: {
  featuredProductsData: ProductsDataWithOutPag;
  locale: Locale;
}) {
  const { products, productsIdsInCart, productsIdsInWishlist } =
    featuredProductsData;
  const isAr = locale === "ar";
  return (
    <section className={theme.featuredProducts.section} dir={isAr ? "rtl" : "ltr"}>
      <div className={theme.featuredProducts.container}>
        <div className={theme.featuredProducts.grid}>
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
