import ProductCard from "@/features/catalog/products/components/ProductCard";
import { ProductsDataWithOutPag } from "@/features/catalog/products/types";
import { Locale } from "@/types";
import { theme } from "@/themes";

interface Prop {
  discountProductsData: ProductsDataWithOutPag;
  locale: Locale;
}

export default function ForSaleSection({ discountProductsData, locale }: Prop) {
  const { products, productsIdsInCart, productsIdsInWishlist } =
    discountProductsData;
  const isAr = locale === "ar";

  return (
    <section className={theme.forSale.section} dir={isAr ? "rtl" : "ltr"}>
      <div className={theme.forSale.container}>
        {/* Grid */}
        <div className={theme.forSale.grid}>
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