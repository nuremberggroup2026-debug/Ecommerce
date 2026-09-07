import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Feather,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { theme } from "@/themes";
import { Locale } from "@/types";
import { generateStaticMetadata } from "@/lib/constants/metadata";
import { getTranslations } from "next-intl/server";

interface Prop {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Prop) => {
  const locale = (await params).locale;
  return generateStaticMetadata("aboutUs", locale);
};

export default async function Page({ params }: Prop) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const isAr = locale === "ar";

  const features = [
    t("STORY.FEATURES.FEATURE_1"),
    t("STORY.FEATURES.FEATURE_2"),
    t("STORY.FEATURES.FEATURE_3"),
    t("STORY.FEATURES.FEATURE_4"),
  ];

  const values = [
    {
      icon: Sparkles,
      title: t("VALUES.VALUE_1.TITLE"),
      description: t("VALUES.VALUE_1.DESC"),
    },
    {
      icon: Feather,
      title: t("VALUES.VALUE_2.TITLE"),
      description: t("VALUES.VALUE_2.DESC"),
    },
    {
      icon: ShieldCheck,
      title: t("VALUES.VALUE_3.TITLE"),
      description: t("VALUES.VALUE_3.DESC"),
    },
    {
      icon: Truck,
      title: t("VALUES.VALUE_4.TITLE"),
      description: t("VALUES.VALUE_4.DESC"),
    },
  ];

  return (
    <main className={theme.aboutPage.main} dir={isAr ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className={theme.aboutPage.heroSection}>
        <div className={theme.aboutPage.heroGradient} />

        <div className={theme.aboutPage.heroContainer}>
          <div className={theme.aboutPage.heroContent}>
            <span className={theme.aboutPage.badge}>
              {t("HERO.BADGE")}
            </span>

            <h1 className={theme.aboutPage.heroTitle}>
              {t("HERO.TITLE")}
            </h1>

            <p className={theme.aboutPage.heroDescription}>
              {t("HERO.DESCRIPTION")}
            </p>

            <div className={theme.aboutPage.heroButtons}>
              <Link href="/products" className={theme.aboutPage.primaryBtn}>
                {t("HERO.PRIMARY_BTN")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>

              <a href="#philosophy" className={theme.aboutPage.secondaryBtn}>
                {t("HERO.SECONDARY_BTN")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section id="philosophy" className={theme.aboutPage.storySection}>
        <div className={theme.aboutPage.storyContainer}>
          <div className={theme.aboutPage.imageWrapper}>
            <div className={theme.aboutPage.imageInner}>
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
                alt="Apparel and fashion atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div>
            <span className={theme.aboutPage.sectionSubtitle}>
              {t("STORY.SUBTITLE")}
            </span>

            <h2 className={theme.aboutPage.sectionTitle}>
              {t("STORY.TITLE")}
            </h2>

            <p className={theme.aboutPage.sectionText}>
              {t("STORY.PARAGRAPH_1")}
            </p>

            <p className={theme.aboutPage.sectionTextSecondary}>
              {t("STORY.PARAGRAPH_2")}
            </p>

            <div className={theme.aboutPage.featuresGrid}>
              {features.map((feature) => (
                <div key={feature} className={theme.aboutPage.featureItem}>
                  <CheckCircle2 className={theme.aboutPage.featureIcon} />
                  <span className={theme.aboutPage.featureText}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values & Fashion Pillars Section */}
      <section className={theme.aboutPage.valuesSection}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={theme.aboutPage.valuesHeader}>
            <span className={theme.aboutPage.sectionSubtitle}>
              {t("VALUES.HEADER_SUBTITLE")}
            </span>

            <h2 className={theme.aboutPage.sectionTitle}>
              {t("VALUES.HEADER_TITLE")}
            </h2>

            <p className={theme.aboutPage.sectionText}>
              {t("VALUES.HEADER_DESC")}
            </p>
          </div>

          <div className={theme.aboutPage.valuesGrid}>
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div key={value.title} className={theme.aboutPage.valueCard}>
                  <div className={theme.aboutPage.valueIconBox}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className={theme.aboutPage.valueTitle}>{value.title}</h3>

                  <p className={theme.aboutPage.valueDesc}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={theme.aboutPage.storySection}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={theme.aboutPage.ctaBox}>
            <div className={theme.aboutPage.ctaTextContainer}>
              <h2 className={theme.aboutPage.ctaTitle}>
                {t("CTA.TITLE")}
              </h2>

              <p className={theme.aboutPage.ctaDesc}>
                {t("CTA.DESCRIPTION")}
              </p>
            </div>

            <div className={theme.aboutPage.ctaButtonWrapper}>
              <Link href="/products" className={theme.aboutPage.primaryBtn}>
                {t("CTA.BUTTON")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
