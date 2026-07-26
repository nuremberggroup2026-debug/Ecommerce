"use client";

import { useState } from "react";
import Link from "next/link";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

import type { Product } from "../../types";

export default function ProductSection({
  product,
}: {
  product: Product;
}) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] =
    useState<"details" | "shipping">("details");

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

          <div className="lg:col-span-7">
            <ProductGallery
              product={product}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              isWishlisted={isWishlisted}
              setIsWishlisted={setIsWishlisted}
            />
          </div>


          <div className="lg:col-span-5 space-y-8">

            <ProductInfo
              product={product}
            />

            <ProductTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

          </div>

        </div>

      </div>
    </main>
  );
}