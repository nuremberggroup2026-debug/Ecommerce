"use client";

import { useEffect ,useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  addToCart,
} from "@/Redux/slices/cart.slice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/Redux/store/hooks";

import type { Product } from "../types";

export default function ProductSection({
  product,
}: {
  product: Product;
}) {
  const features = ["XL", "L", "M", "S"];

  const dispatch = useAppDispatch();

  const cartItem = useAppSelector((state) =>
    state.cart.items.find(
      (item) => String(item.product.id) === String(product.id)
    )
  );

  const [activeImage, setActiveImage] = useState(product.images[0]);
const [quantity, setQuantity] = useState(
  cartItem?.quantity ?? 1
);  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] =
    useState<"details" | "shipping">("details");


const handleQuantityChange = (delta: number) => {
  setQuantity((prev) =>
    Math.min(
      Math.max(1, prev + delta),
      product.stock
    )
  );
};

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20 lg:px-10">
        <nav className="mb-8 text-xs font-light text-gray-400 tracking-tight">
          <Link
            href="/products"
            className="hover:text-black transition"
          >
            Products
          </Link>

          <span className="mx-2">•</span>

          <span className="text-gray-300">
            {product.category}
          </span>

          <span className="mx-2">•</span>

          <span className="text-neutral-900 font-medium">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border border-neutral-100 bg-neutral-50 shadow-sm">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                className="object-cover transition-all duration-500"
              />

              <button
                onClick={() =>
                  setIsWishlisted(!isWishlisted)
                }
                className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/40 shadow-sm"
              >
                <svg
                  className={`h-5 w-5 ${
                    isWishlisted
                      ? "fill-red-500 stroke-red-500"
                      : "text-neutral-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[4/5] w-20 overflow-hidden rounded-2xl border ${
                    activeImage === img
                      ? "border-black ring-1 ring-black"
                      : "border-neutral-200 opacity-60"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>          <div className="lg:col-span-5 space-y-8">

            <div className="space-y-2">

              <div className="flex items-center justify-between">

                <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                  {product.brand}
                </span>

                <div className="flex items-center gap-2">

                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      product.stock > 5
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />

                  <span className="text-[11px] font-medium text-neutral-500">
                    {product.stock > 5
                      ? "In Stock"
                      : `Only ${product.stock} items left`}
                  </span>

                </div>

              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 pt-1">

                <p className="text-xl font-bold tracking-tight text-black">
                  ${product.price}
                </p>

                <div className="h-4 w-px bg-neutral-200" />

                <div className="flex items-center gap-1.5 text-xs text-neutral-500">

                  <span className="text-amber-500 font-semibold">
                    ★
                  </span>

                  <span className="text-black font-medium">
                    {product.rating}
                  </span>

                  <span>
                    ({product.rating} reviews)
                  </span>

                </div>

              </div>

            </div>

            <hr className="border-neutral-100" />

            <div className="space-y-3">

              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {product.description}
              </p>

              <span className="text-[10px] text-gray-300 font-mono block">
                SKU: {product.sku}
              </span>

            </div>

            <div className="space-y-3">

              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 block">
                Quantity
              </label>

              <div className="inline-flex items-center border border-neutral-200 rounded-full bg-white p-1 shadow-sm">

                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
                >
                  -
                </button>

                <span className="w-10 text-center text-xs font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="p-2 text-gray-400 hover:text-black disabled:opacity-30"
                >
                  +
                </button>

              </div>

            </div>

            <div className="space-y-3 pt-2">

              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      product,
                      quantity,
                    })
                  )
                }
                className="w-full bg-black py-4 text-xs font-semibold uppercase tracking-widest text-white rounded-2xl transition hover:bg-neutral-800 shadow-sm active:scale-[0.98]"
              >
                Add to Bag
              </button>

            </div>            <div className="border-t border-neutral-100 pt-6">

              <div className="flex gap-6 border-b border-neutral-100 pb-2 text-xs uppercase tracking-wider font-semibold">

                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 transition-all relative ${
                    activeTab === "details"
                      ? "text-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  Features

                  {activeTab === "details" && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-black" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-2 transition-all relative ${
                    activeTab === "shipping"
                      ? "text-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  Shipping & Returns

                  {activeTab === "shipping" && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-black" />
                  )}
                </button>

              </div>

              <div className="py-4 text-xs text-gray-400 font-light leading-relaxed">

                {activeTab === "details" ? (

                  <ul className="list-disc pl-4 space-y-2">

                    {features.map((feature, index) => (
                      <li key={index}>
                        {feature}
                      </li>
                    ))}

                  </ul>

                ) : (

                  <p>
                    Complimentary standard shipping on orders over $300.
                    Returns are accepted within 14 days of receipt,
                    provided items are returned in their pristine original packaging.
                  </p>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}