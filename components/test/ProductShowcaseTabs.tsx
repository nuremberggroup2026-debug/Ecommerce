"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  brand: string;
  img: string;
  badge?: string;
};

export default function ProductShowcaseTabs() {
  const [activeTab, setActiveTab] = useState<"best" | "trending" | "new">("best");

  const data: Record<"best" | "trending" | "new", Product[]> = {
    best: [
      {
        id: "b1",
        title: "Premium Wireless Headphones",
        price: 299,
        category: "Electronics",
        brand: "Sony",
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        badge: "Top Seller",
      },
      {
        id: "b2",
        title: "Minimalist Leather Watch",
        price: 189,
        category: "Fashion",
        brand: "Fossil",
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "b3",
        title: "Classic Canvas Backpack",
        price: 75,
        category: "Fashion",
        brand: "Herschel",
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      },
    ],
    trending: [
      {
        id: "t1",
        title: "Smart Sports Smartwatch",
        price: 249,
        category: "Electronics",
        brand: "Apple",
        img: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=600&q=80",
        badge: "Trending",
      },
      {
        id: "t2",
        title: "Organic Hydrating Serum",
        price: 45,
        category: "Beauty",
        brand: "Ordinary",
        img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "t3",
        title: "Ergonomic Ceramic Mug",
        price: 35,
        category: "Home",
        brand: "Hasami",
        img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
      },
    ],
    new: [
      {
        id: "n1",
        title: "Minimalist Matte Sunglasses",
        price: 120,
        category: "Fashion",
        brand: "RayBan",
        img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        badge: "Just In",
      },
      {
        id: "n2",
        title: "Portable Metal Desk Lamp",
        price: 89,
        category: "Home",
        brand: "Xiaomi",
        img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "n3",
        title: "Aromatic Reed Diffuser",
        price: 28,
        category: "Beauty",
        brand: "Muji",
        img: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=600&q=80",
      },
    ],
  };

  const tabs = [
    { id: "best" as const, label: "Best Sellers" },
    { id: "trending" as const, label: "Trending Now" },
    { id: "new" as const, label: "New Arrivals" },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Header with Tabs */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-gray-100 pb-8 sm:flex-row sm:items-end">
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-3xl font-semibold tracking-tight">Our Curation</h2>
            <p className="text-sm text-gray-400 font-light">Explore handpicked premium goods from top-tier brands.</p>
          </div>

          <div className="flex p-1 bg-neutral-50 rounded-full border border-neutral-100/80">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            {data[activeTab].map((product) => (
              <div key={product.id} className="group relative flex flex-col space-y-4">
                
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gray-100 bg-neutral-50 shadow-sm">
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    sizes="(max-w-7xl) 33vw, 50vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-full shadow-sm z-10">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button 
                    className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-gray-100 text-neutral-600 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 active:scale-95 shadow-sm"
                    aria-label="Add to wishlist"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Add to Cart Hover Button */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                    <button className="w-full bg-black py-3 text-xs font-semibold uppercase tracking-wider text-white rounded-2xl shadow-md hover:bg-neutral-800 transition active:scale-95">
                      Add To Cart
                    </button>
                  </div>
                </div>

                {/* Info Text */}
                <div className="flex justify-between items-start px-1 flex-1">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-gray-400 font-medium tracking-tight">
                      {product.brand} • {product.category}
                    </span>
                    <Link href={`/products/${product.id}`} className="block">
                      <h3 className="text-sm font-medium text-neutral-800 transition-colors hover:text-black line-clamp-1">
                        {product.title}
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

      </div>
    </section>
  );
}