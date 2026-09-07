"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { theme } from "@/themes";
import { ROUTES } from "@/shared/config/routes";

export default function PromoBanner() {
  const t = useTranslations("Home.PromoBanner");

  return (
    <section className={theme.promoBanner.section}>
      <div className={theme.promoBanner.container}>
        <div className={theme.promoBanner.bannerWrapper}>
          {/* Visual Clothing / Fashion Editorial Image */}
          <div className={theme.promoBanner.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80"
              alt="Exclusive Apparel Collection"
              className={theme.promoBanner.image}
              loading="lazy"
            />
            <div className={theme.promoBanner.overlay} />
          </div>

          {/* Content & Fashion Narrative */}
          <div className={theme.promoBanner.contentWrapper}>
            <div className={theme.promoBanner.textWrapper}>
              <span className={theme.promoBanner.badge}>
                {t("BADGE")}
              </span>
              <h2 className={theme.promoBanner.title}>
                {t("TITLE")}
              </h2>
              <p className={theme.promoBanner.description}>
                {t("DESCRIPTION")}
              </p>
            </div>

            <Link
              href={ROUTES.PRODUCTS}
              className={theme.promoBanner.button}
            >
              <span>{t("BUTTON")}</span>
              <span className={theme.promoBanner.buttonArrow}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}