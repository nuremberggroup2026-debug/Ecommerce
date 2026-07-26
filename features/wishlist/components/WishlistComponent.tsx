"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type WishlistItem = {
  id: string;
  title: string;
  price: number;
  category: string;
  brand: string;
  img: string;
  inStock: boolean;
};

export default function WishlistComponent() {
  // هنا تم الإصلاح النهائي والمضمون للأقواس المربعة [ ] داخل الدالة ليتعرف عليها الـ TypeScript كمصفوفة
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      title: "Premium Wireless Headphones",
      price: 299,
      category: "Electronics",
      brand: "Sony",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      inStock: true,
    },
    {
      id: "3",
      title: "Ergonomic Ceramic Mug",
      price: 35,
      category: "Home",
      brand: "Hasami",
      img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
      inStock: true,
    },
    {
      id: "5",
      title: "Organic Hydrating Serum",
      price: 45,
      category: "Beauty",
      brand: "Ordinary",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
      inStock: false,
    },
  ]);

  // حذف منتج من المفضلة
  const removeItem = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 flex-1 flex flex-col">
        
        {/* Header Section */}
        <header className="mb-16 border-b border-neutral-100 pb-6 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Your Wishlist</h1>
          <p className="text-xs text-gray-400 font-light mt-2">
            {wishlistItems.length === 0 
              ? "Your curation is empty" 
              : `You have saved ${wishlistItems.length} premium pieces for later`}
          </p>
        </header>

        {/* Empty Wishlist State */}
        {wishlistItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-6">
            <p className="text-sm text-gray-400 font-light">
              No objects saved yet. Explore our curated collections to build your wishlist.
            </p>
            <Link
              href="/products"
              className="rounded-full bg-black px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-neutral-800 shadow-sm active:scale-[0.98]"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          /* هاد الجزء يضمن تمركز العناصر بنصف الصفحة تماماً مهما كان عددها */
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-16 w-full">
              {wishlistItems.map((item) => (
                <div key={item.id} className="group flex flex-col space-y-4 w-full max-w-[260px]">
                  
                  {/* Visual Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border border-neutral-100 bg-neutral-50 p-4 transition-all duration-500 group-hover:shadow-md group-hover:border-neutral-200/50">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-w-7xl) 25vw, 50vw"
                      className="object-cover p-2 rounded-[28px] transition duration-700 ease-out group-hover:scale-[1.02]"
                    />

                    {/* Stock Alert Badge */}
                    {!item.inStock && (
                      <span className="absolute top-5 left-5 bg-neutral-900/90 px-3 py-1 text-[9px] font-medium uppercase tracking-wider text-white backdrop-blur-sm rounded-full shadow-sm z-10">
                        Out of Stock
                      </span>
                    )}

                    {/* Absolute Remove Button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 border border-neutral-200/40 text-neutral-400 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 active:scale-90 shadow-sm"
                      aria-label="Remove from wishlist"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Content Metadata Area */}
                  <div className="space-y-1 px-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                        {item.brand}
                      </span>
                      <p className="text-sm font-bold text-neutral-900">
                        ${item.price}.00
                      </p>
                    </div>
                    
                    <Link href={`/products/${item.id}`} className="block">
                      <h3 className="text-sm font-medium text-neutral-700 transition-colors hover:text-black line-clamp-1">
                        {item.title}
                      </h3>
                    </Link>
                  </div>

                  {/* Persistent Action Button */}
                  <div className="pt-1">
                    {item.inStock ? (
                      <button 
                        onClick={() => {
                          // منطق الـ Cart
                        }}
                        className="w-full bg-neutral-900 py-3 text-[11px] font-medium uppercase tracking-widest text-white rounded-xl shadow-sm hover:bg-black transition-all duration-300 active:scale-[0.98]"
                      >
                        Add to bag
                      </button>
                    ) : (
                      <button 
                        disabled
                        className="w-full bg-neutral-50 border border-neutral-200 py-3 text-[11px] font-medium uppercase tracking-widest text-neutral-400 rounded-xl cursor-not-allowed"
                      >
                        Unavailable
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}