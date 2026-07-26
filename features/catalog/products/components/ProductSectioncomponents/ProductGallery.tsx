"use client";

import Image from "next/image";

import type { Product } from "../../types";

type Props = {
  product: Product;
  activeImage: string;
  setActiveImage: (img: string) => void;
  isWishlisted: boolean;
  setIsWishlisted: (value: boolean) => void;
};

export default function ProductGallery({
  product,
  activeImage,
  setActiveImage,
  isWishlisted,
  setIsWishlisted,
}: Props) {

  return (
    <div className="space-y-4">

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border border-neutral-100 bg-neutral-50 shadow-sm">

        <Image
          src={activeImage}
          alt={product.title}
          fill
          priority
          className="object-cover transition-all duration-500"
        />


        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
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

    </div>
  );
}