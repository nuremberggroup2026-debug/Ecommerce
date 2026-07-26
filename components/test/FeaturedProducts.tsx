
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Minimal Chair",
    price: 120,
    brand: "Gubi",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 99,
    brand: "Sony",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199,
    brand: "Apple",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Leather Bag",
    price: 150,
    brand: "Fossil",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        <header className="mb-14 text-center sm:text-left space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
            Featured Products
          </h2>
          <p className="max-w-md text-sm text-gray-400 font-light">
            Handpicked products selected for supreme quality and timeless design.
          </p>
        </header>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col space-y-4">
              
              {/* منطقة الصورة التفاعلية */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gray-100 bg-neutral-50 shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />
                
                {/* شارة التميز إن وجدت */}
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full shadow-sm z-10">
                    {product.badge}
                  </span>
                )}

                {/* زر الـ Wishlist العائم (أيقونة قلب ناعمة) */}
                <button 
                  className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-gray-100 text-neutral-600 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 active:scale-95 shadow-sm"
                  aria-label="Add to wishlist"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* زر Add to Cart يرتفع بنعومة عند الـ Hover */}
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                  <button className="w-full bg-black py-3 text-xs font-semibold uppercase tracking-wider text-white rounded-2xl shadow-md hover:bg-neutral-800 transition active:scale-95">
                    Add To Cart
                  </button>
                </div>
              </div>

              {/* تفاصيل المنتج مقسمة برقي في الأسفل */}
              <div className="flex justify-between items-start px-1 flex-1">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-gray-400 font-medium tracking-tight">
                    {product.brand} • {product.category}
                  </span>
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="text-sm font-medium text-neutral-800 transition-colors hover:text-black line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                </div>
                <p className="text-sm font-semibold text-black pt-1">
                  ${product.price}.00
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

