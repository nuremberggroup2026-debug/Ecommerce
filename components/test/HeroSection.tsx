"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TranslatedBanner } from "@/types";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";

interface Prop {
  banners: TranslatedBanner[];
}

export default function HeroSection({ banners }: Prop) {
  const t = useTranslations("Home");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <main className={theme.hero.main}>
      <section className={theme.hero.section}>
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`${theme.hero.slide} ${
              index === current ? theme.hero.slideActive : theme.hero.slideInactive
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.name}
              fill
              priority={index === 0}
              className={theme.hero.image}
            />
            <div className={theme.hero.overlay} />
            <div className={theme.hero.contentWrapper}>
              <div className={theme.hero.container}>
                <article className={theme.hero.article}>
                  <header className={theme.hero.header}>
                    <h1 className={theme.hero.title}>
                      {banner.name}
                    </h1>
                  </header>

                  <nav className={theme.hero.nav}>
                    <Link
                      href={"/products"}
                      className={theme.hero.shopButton}
                    >
                      {t("ShopNow")}
                    </Link>
                  </nav>
                </article>
              </div>
            </div>
          </div>
        ))}

        <div className={theme.hero.indicatorsWrapper}>
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`${theme.hero.indicator} ${
                index === current ? theme.hero.indicatorActive : theme.hero.indicatorInactive
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}