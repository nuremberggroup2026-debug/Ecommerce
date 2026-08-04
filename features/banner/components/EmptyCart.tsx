import Link from "next/link";

export default function EmptyCart() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <p className="mb-6 text-gray-400">Your cart is empty</p>
        <Link
          href="/products"
          className="rounded-full bg-black px-8 py-4 text-xs uppercase tracking-widest text-white transition hover:bg-neutral-800"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}