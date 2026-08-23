import ProductCard from "@/features/catalog/products/components/ProductCard";
import { ProductsDataWithOutPag } from "@/features/catalog/products/types";
import { Locale } from "@/types";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";

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
    <section className={theme.forSale.section}>
      <div className={theme.forSale.container}>
        {/* Header */}
        <header className={theme.forSale.header}>
          <div className={theme.forSale.headerInfo}>
            <div className={theme.forSale.badgeWrapper}>
              <span className={theme.forSale.badgeDot} />
              <span className={theme.forSale.badgeText}>
                {t("LIMITED_OFFERS")}
              </span>
            </div>
            <h2 className={theme.forSale.title}>
              {t("FLASH_SALE")}
            </h2>
          </div>

          <Link
            href="/sale"
            className={theme.forSale.viewAllLink}
          >
            {t("VIEW_ALL_DEALS")} {isAr ? "←" : "→"}
          </Link>
        </header>

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