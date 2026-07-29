
import ProductCard from "@/features/catalog/products/components/ProductCard";
import { GetProductType } from "@/types";
export default function FeaturedProductsComponent({
  products,
}: {
  products: GetProductType[];
}) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="mb-14 text-center sm:text-left space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
            Featured Products
          </h2>
          <p className="max-w-md text-sm text-gray-400 font-light">
            Handpicked products selected for supreme quality and timeless
            design.
          </p>
        </header>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
