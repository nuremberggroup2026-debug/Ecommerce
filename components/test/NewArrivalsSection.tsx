import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Minimal Desk Lamp",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
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
    name: "Leather Wallet",
    price: "$60",
    image:
      "https://images.unsplash.com/photo-1518544887879-6a1a3f1d7f0c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function NewArrivals() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">

        {/* Header */}
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              New Arrivals
            </h2>
            <p className="mt-2 text-gray-500">
              Freshly added products you’ll love discovering.
            </p>
          </div>

          <Link
            href="/new-arrivals"
            className="hidden text-sm font-medium underline underline-offset-4 hover:opacity-70 md:block"
          >
            View All
          </Link>
        </header>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-gray-200"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                {/* Badge */}
                <span className="absolute left-3 top-3 z-10 rounded-full border border-black bg-white px-3 py-1 text-xs text-black">
                  New
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