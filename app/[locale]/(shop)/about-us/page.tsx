import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Target,
  Eye,
  Users,
  Award,
} from "lucide-react";
import { theme } from "@/themes";
import { Locale } from "@/types";
import { generateStaticMetadata } from "@/lib/constants/metadata";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "We are committed to delivering high-quality products and services while creating a seamless experience for every customer.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "We aim to build a trusted and innovative brand that continuously evolves to meet the changing needs of our customers.",
  },
  {
    icon: Users,
    title: "Our People",
    description:
      "Our team is at the heart of everything we do. We believe in collaboration, creativity, and continuous growth.",
  },
  {
    icon: Award,
    title: "Our Standards",
    description:
      "Quality, reliability, and customer satisfaction guide every decision we make and every product we deliver.",
  },
];

const features = [
  "High-quality products",
  "Customer-focused service",
  "Reliable and trusted solutions",
  "Continuous improvement",
];
interface Prop {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Prop) => {
  const locale = (await params).locale;
  return generateStaticMetadata("aboutUs", locale);
};

export default function Page() {
  return (
    <main className={theme.aboutPage.main}>
      <section className={theme.aboutPage.heroSection}>
        <div className={theme.aboutPage.heroGradient} />

        <div className={theme.aboutPage.heroContainer}>
          <div className={theme.aboutPage.heroContent}>
            <span className={theme.aboutPage.badge}>About Us</span>

            <h1 className={theme.aboutPage.heroTitle}>
              Building trust through quality and excellence
            </h1>

            <p className={theme.aboutPage.heroDescription}>
              We are dedicated to providing exceptional products and services
              that make a real difference. Our focus is simple: quality,
              reliability, and an experience our customers can trust.
            </p>

            <div className={theme.aboutPage.heroButtons}>
              <Link href="/careers" className={theme.aboutPage.primaryBtn}>
                Join our team
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link href="/contact" className={theme.aboutPage.secondaryBtn}>
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={theme.aboutPage.storySection}>
        <div className={theme.aboutPage.storyContainer}>
          <div className={theme.aboutPage.imageWrapper}>
            <div className={theme.aboutPage.imageInner}>
              <Image
                src="/about-us.jpg"
                alt="About our company"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div>
            <span className={theme.aboutPage.sectionSubtitle}>Who we are</span>

            <h2 className={theme.aboutPage.sectionTitle}>
              More than a company, we are a team with a purpose
            </h2>

            <p className={theme.aboutPage.sectionText}>
              We believe that a successful business starts with understanding
              people. That is why we work every day to create products,
              services, and experiences that are practical, reliable, and
              valuable.
            </p>

            <p className={theme.aboutPage.sectionTextSecondary}>
              From the way we select our products to the way we communicate with
              our customers, we pay attention to the details that matter. Our
              goal is to build long-term relationships based on trust and
              consistency.
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

      <section className={theme.aboutPage.valuesSection}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={theme.aboutPage.valuesHeader}>
            <span className={theme.aboutPage.sectionSubtitle}>
              What drives us
            </span>

            <h2 className={theme.aboutPage.sectionTitle}>Our values</h2>

            <p className={theme.aboutPage.sectionText}>
              Everything we do is guided by a clear set of principles that help
              us deliver a better experience for our customers and our team.
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

      <section className={theme.aboutPage.storySection}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={theme.aboutPage.ctaBox}>
            <div className={theme.aboutPage.ctaTextContainer}>
              <h2 className={theme.aboutPage.ctaTitle}>
                Let&apos;s build something great together
              </h2>

              <p className={theme.aboutPage.ctaDesc}>
                Whether you are looking for our products, want to work with us,
                or simply have a question, we would love to hear from you.
              </p>
            </div>

            <div className={theme.aboutPage.ctaButtonWrapper}>
              <Link href="/contact" className={theme.aboutPage.primaryBtn}>
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
