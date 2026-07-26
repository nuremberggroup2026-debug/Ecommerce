import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Urban Sneakers",
    price: "$95",
    image:
      "https://images.unsplash.com/photo-1528701800489-20be3c2ea7b7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Modern Backpack",
    price: "$110",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: "$199",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Street Jacket",
    price: "$140",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TrendingSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">

        {/* Header */}
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              Trending Now
            </h2>
            <p className="mt-2 text-gray-500">
              Most popular products right now based on user activity.
            </p>
          </div>

          <Link
            href="/trending"
            className="hidden text-sm font-medium underline underline-offset-4 hover:opacity-70 md:block"
          >
            View All
          </Link>
        </header>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-gray-200"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                {/* Badge */}
                <span className="absolute left-3 top-3 z-10 rounded-full bg-black px-3 py-1 text-xs text-white">
                  Trending #{index + 1}
                </span>

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h3>

                <p className="text-gray-500">{product.price}</p>

                <Link
                  href={`/products/${product.id}`}
                  className="inline-block text-sm font-medium text-black underline underline-offset-4 transition hover:opacity-70"
                >
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}