import { GetProductType, Locale } from "@/types";
import Link from "next/link";

interface Prop {
  products: GetProductType[];
  locale: Locale;
}

export default function ForSaleSection({ products, locale }: Prop) {
  const isAr = locale === "ar";
  return (
    <section className="bg-neutral-50/60 py-24 border-y border-neutral-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <header className="mb-14 flex items-end justify-between">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
                Limited Offers
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Flash Sale
            </h2>
          </div>

          <Link
            href="/sale"
            className="hidden text-sm font-medium text-neutral-800 transition-colors hover:text-black underline underline-offset-4 md:block"
          >
            View All Deals →
          </Link>
        </header>

        {/* Grid */}
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {

            return (
              <div
                key={product.id}
                className="group relative flex flex-col space-y-4"
              >
                {/* Image Container */}
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-neutral-200/60 bg-neutral-100 shadow-sm">
                  <span className="absolute top-4 left-4 z-10 bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full shadow-sm">
                    -{product.variants[0].discountPercentage}% OFF
                  </span>

                  <button
                    className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-neutral-200/40 text-neutral-600 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 active:scale-95 shadow-sm"
                    aria-label="Add to wishlist"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  <img
                    src={product.productCardImage}
                    alt={product.productName}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                    <button className="w-full bg-black py-3 text-xs font-semibold uppercase tracking-wider text-white rounded-2xl shadow-md hover:bg-neutral-800 transition active:scale-95">
                      Claim Deal
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-start px-1 flex-1">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-gray-400 font-medium tracking-tight">
                      {product.productName} • {product.categoryName}
                    </span>
                    <Link href={`/products/${product.id}`} className="block">
                      <h3 className="text-sm font-medium text-neutral-800 transition-colors hover:text-black line-clamp-1">
                        {product.productName}
                      </h3>
                    </Link>
                  </div>

                  <div className="text-right pt-0.5">
                    <p className="text-sm font-semibold text-red-600">
                      ${product.variants[0].finalPrice}.00
                    </p>
                    <p className="text-[11px] text-gray-400 line-through">
                      ${product.variants[0].price}.00
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
