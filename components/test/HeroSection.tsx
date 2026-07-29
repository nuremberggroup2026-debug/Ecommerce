"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TranslatedBanner } from "@/types";

interface Prop {
  banners: TranslatedBanner[];
}

export default function HeroSection({ banners }: Prop) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <main className="relative w-full overflow-hidden bg-black">
      <section className="relative h-[600px] w-full md:h-[680px]">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.name}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* محتوى النص فوق الصورة */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-8 lg:px-16">
                <article className="max-w-2xl space-y-6 text-white">
                  {/* <span className="inline-block rounded-full border border-white/40 bg-white/10 px-5 py-1 text-sm backdrop-blur-sm">
                    {banner.name}
                  </span>*/}

                  <header className="space-y-4">
                    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                      {banner.name}
                      {/* <span className="block mt-1 text-white/95">
                        {banner.name}
                      </span>*/}
                    </h1>

                    {/* <p className="max-w-md text-gray-200 leading-relaxed text-sm md:text-base opacity-90">
                      {banner.name}
                    </p>*/}
                  </header>

                  <nav className="flex gap-4 pt-4">
                    <Link
                      href={"/produts"}
                      className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition hover:bg-neutral-200 shadow-sm"
                    >
                      Shop Now
                    </Link>

                    <Link
                      href={"/products"}
                      className="rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-black backdrop-blur-sm"
                    >
                      Browse Collection
                    </Link>
                  </nav>
                </article>
              </div>
            </div>
          </div>
        ))}

        {/* مؤشرات التنقل (النقاط الصغيرة بالأسفل) */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 transition-all duration-500 rounded-full ${
                index === current ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
