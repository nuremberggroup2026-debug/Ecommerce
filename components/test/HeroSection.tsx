"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  primaryLink: string;
  secondaryLink: string;
};

export default function HeroSection() {
  const slides: Slide[] = [
    {
      badge: "Premium Selection",
      title: "Discover Products Built for",
      subtitle: "Everyday Needs",
      description: "A clean and modern shopping experience with carefully selected products, fast delivery, and trusted quality.",
      bgImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/shop",
      secondaryLink: "/products",
    },
    {
      badge: "New Arrival",
      title: "Elevate Your Lifestyle Aesthetics",
      subtitle: "Minimal & Pure",
      description: "Explore our latest curation of design-forward essentials crafted carefully to complement modern living spaces.",
      bgImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/categories/home",
      secondaryLink: "/products",
    },
    {
      badge: "Exclusive Release",
      title: "Immersive Sound Technology",
      subtitle: "Next Gen Audio",
      description: "Experience absolute clarity and deep acoustics with adaptive noise cancellation designed for daily commutes.",
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
      primaryLink: "/categories/electronics",
      secondaryLink: "/products",
    },
  ];

  const [current, setCurrent] = useState(0);

  // الانتقال التلقائي بين السلايدات كل 5 ثوانٍ
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="relative w-full overflow-hidden bg-black">
      {/* البانر الرئيسي: ارتفاعه ثابت ومثالي للشاشات */}
      <section className="relative h-[600px] w-full md:h-[680px]">
        {/* السلايدات */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* الخلفية السينمائية للصورة */}
            <Image
              src={slide.bgImage}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            {/* طبقة التعتيم الفخمة لإبراز النصوص */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* محتوى النص فوق الصورة */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-8 lg:px-16">
                <article className="max-w-2xl space-y-6 text-white">
                  <span className="inline-block rounded-full border border-white/40 bg-white/10 px-5 py-1 text-sm backdrop-blur-sm">
                    {slide.badge}
                  </span>

                  <header className="space-y-4">
                    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
                      {slide.title}
                      <span className="block mt-1 text-white/95">{slide.subtitle}</span>
                    </h1>

                    <p className="max-w-md text-gray-200 leading-relaxed text-sm md:text-base opacity-90">
                      {slide.description}
                    </p>
                  </header>

                  <nav className="flex gap-4 pt-4">
                    <Link
                      href={slide.primaryLink}
                      className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition hover:bg-neutral-200 shadow-sm"
                    >
                      Shop Now
                    </Link>

                    <Link
                      href={slide.secondaryLink}
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
          {slides.map((_, index) => (
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