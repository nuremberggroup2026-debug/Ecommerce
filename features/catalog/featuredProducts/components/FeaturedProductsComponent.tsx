import ProductCard from "@/features/catalog/products/components/ProductCard";
import type { ProductsDataWithOutPag } from "../types/index";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";

export default function FeaturedProductsComponent({
  featuredProductsData,
}: {
  featuredProductsData: ProductsDataWithOutPag;
}) {
  const { products, productsIdsInCart, productsIdsInWishlist } =
    featuredProductsData;
  const t = useTranslations("Home.FeaturedProducts");
  
  return (
    <section className={theme.featuredProducts.section}>
      <div className={theme.featuredProducts.container}>
        <header className={theme.featuredProducts.header}>
          <h2 className={theme.featuredProducts.title}>
            {t("TITLE")}
          </h2>
          <p className={theme.featuredProducts.description}>
            {t("DESCRIPTION")}
          </p>
        </header>
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