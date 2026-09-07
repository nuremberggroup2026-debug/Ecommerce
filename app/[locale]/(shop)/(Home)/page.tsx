import HeroSection from "@/components/test/HeroSection";
import CategoriesSection from "@/features/catalog/categories/components/CategoriesSection";
import PromoBanner from "@/components/test/PromoBanner";
import ForSaleSection from "@/components/test/ForSaleSection";
import { fetchFeaturedCategories } from "@/features/catalog/categories/api/categories.server.api";
import FeaturedProductsComponent from "@/features/catalog/products/components/FeaturedProductsComponent";
import { StoreFeaturesSection } from "@/components/test/StoreFeaturesSection";
import { fetchBanners } from "@/features/banner/api/banners.server.api";
import { Locale } from "@/types";
import {
  fetchFeaturedProducts,
  fetchOnDiscountProducts,
} from "@/features/catalog/products/api/products.server.api";
import { generateStaticMetadata } from "@/lib/constants/metadata";
import { getTranslations } from "next-intl/server";
import { SectionSeparator } from "@/components/common/SectionSeparator";

interface Prop {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Prop) => {
  const locale = (await params).locale;
  return generateStaticMetadata("home", locale);
};

export default async function Home({ params }: Prop) {
  const locale = (await params).locale;
  const [banners, categories, featuredProducts, onDiscountProducts, t] =
    await Promise.all([
      fetchBanners(locale),
      fetchFeaturedCategories(locale),
      fetchFeaturedProducts(locale),
      fetchOnDiscountProducts(locale),
      getTranslations({ locale, namespace: "Home.Separators" }),
    ]);

  return (
    <main className="bg-white text-black antialiased">
      <HeroSection banners={banners.data} />

      <SectionSeparator title={t("CATEGORIES")} />
      <div className="bg-white">
        <CategoriesSection categories={categories} locale={locale} />
      </div>

      <SectionSeparator title={t("FEATURED_PRODUCTS")} />
      <div className="bg-white">
        <FeaturedProductsComponent
          featuredProductsData={featuredProducts}
          locale={locale}
        />
      </div>

      <SectionSeparator title={t("FLASH_SALE")} />
      <div className="bg-neutral-50/60 py-2">
        <ForSaleSection
          discountProductsData={onDiscountProducts}
          locale={locale}
        />
      </div>

      <div className="my-8 sm:my-12">
        <PromoBanner />
      </div>

      <SectionSeparator title={t("STORE_FEATURES")} />
      <StoreFeaturesSection />
    </main>
  );
}
