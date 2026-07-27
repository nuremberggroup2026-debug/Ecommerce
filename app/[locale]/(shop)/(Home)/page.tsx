import HeroSection from "@/components/test/HeroSection";
import CategoriesSection from "@/features/catalog/categories/components/CategoriesSection";
import PromoBanner from "@/components/test/PromoBanner";
import ForSaleSection from "@/components/test/ForSaleSection";
import ProductShowcaseTabs from "@/components/test/ProductShowcaseTabs";
import { fetchCategories } from "@/features/catalog/categories/api/categories.api";
import { getFeaturedProducts } from "@/features/catalog/featuredProducts/api/featueredProducts";
import FeaturedProductsComponent from "@/features/catalog/featuredProducts/components/FeaturedProductsComponent";
import { StoreFeaturesSection } from "@/components/test/StoreFeaturesSection";

export default async function Home() {
  const categories = await fetchCategories();
  const products =  (await getFeaturedProducts()).products;
  console.log(products);

  return (
    <main className="bg-white text-black antialiased">
      <HeroSection />

      <div className="bg-white">
        <CategoriesSection categories={categories} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border-t border-gray-100" />
      </div>

      <div className="bg-white">
        <FeaturedProductsComponent products={products} />
      </div>

      <div className="bg-neutral-50 py-4">
        <ForSaleSection />
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
