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

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              About Us
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Building trust through quality and excellence
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              We are dedicated to providing exceptional products and services
              that make a real difference. Our focus is simple: quality,
              reliability, and an experience our customers can trust.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200"
              >
                Join our team
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gray-100">
            <div className="relative aspect-[4/3]">
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
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Who we are
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              More than a company, we are a team with a purpose
            </h2>

            <p className="mt-6 text-base leading-7 text-gray-600">
              We believe that a successful business starts with understanding
              people. That is why we work every day to create products,
              services, and experiences that are practical, reliable, and
              valuable.
            </p>

            <p className="mt-4 text-base leading-7 text-gray-600">
              From the way we select our products to the way we communicate
              with our customers, we pay attention to the details that matter.
              Our goal is to build long-term relationships based on trust and
              consistency.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              What drives us
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our values
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600">
              Everything we do is guided by a clear set of principles that
              help us deliver a better experience for our customers and our
              team.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-800">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gray-950 px-6 py-14 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let&apos;s build something great together
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-300">
                Whether you are looking for our products, want to work with us,
                or simply have a question, we would love to hear from you.
              </p>
            </div>

            <div className="mt-8 shrink-0 lg:ml-10 lg:mt-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200"
              >
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
