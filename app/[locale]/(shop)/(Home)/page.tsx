import HeroSection from "@/components/test/HeroSection";
import CategoriesSection from "@/features/catalog/categories/components/CategoriesSection";
import PromoBanner from "@/components/test/PromoBanner";
import ForSaleSection from "@/components/test/ForSaleSection";
import ProductShowcaseTabs from "@/components/test/ProductShowcaseTabs";
import { fetchFeaturedCategories } from "@/features/catalog/categories/api/categories.client.api";
import { getFeaturedProducts } from "@/features/catalog/featuredProducts/api/featueredProducts";
import FeaturedProductsComponent from "@/features/catalog/featuredProducts/components/FeaturedProductsComponent";
import { StoreFeaturesSection } from "@/components/test/StoreFeaturesSection";
import { fetchBanners } from "@/features/banner/api/banners.server.api";
import { Locale } from "@/types";
import {
  fetchFeaturedProducts,
  fetchOnDiscountProducts,
} from "@/features/catalog/products/api/products.api";
import { Session } from "inspector/promises";
import { auth } from "@/lib/auth/auth";

interface Prop {
  params: Promise<{ locale: Locale }>;
}
export default async function Home({ params }: Prop) {
  const locale = (await params).locale;
  const [banners, categories, featuredProducts, onDiscountProducts] =
    await Promise.all([
      fetchBanners(locale),
      fetchFeaturedCategories(locale),
      fetchFeaturedProducts(locale),
      fetchOnDiscountProducts(locale),
    ]);
  // const products = (await getFeaturedProducts()).products;
  console.log("categories: ", categories);

  console.log("banners: ", banners);

  const session = await auth();
  console.log("session home: ", session);

  console.log("featuredProducts: ", featuredProducts);

  console.log("onDiscountProducts: ", onDiscountProducts);

  return (
    <main className="bg-white text-black antialiased">
      <HeroSection banners={banners.data} />

      <div className="bg-white">
        <CategoriesSection categories={categories} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border-t border-gray-100" />
      </div>

      <div className="bg-white">
        <FeaturedProductsComponent products={featuredProducts} />
      </div>

      <div className="bg-neutral-50 py-4">
        <ForSaleSection products={onDiscountProducts} locale={locale} />
      </div>

      <PromoBanner />

      <div className="bg-white">
        <ProductShowcaseTabs />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border-t border-gray-100" />
      </div>

      <StoreFeaturesSection />
    </main>
  );
}
