import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Locale } from "@/types";
import { careerBySlug } from "@/features/careers/api/careers.server.api";

interface Props {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export default async function CareerDetailsPage({ params }: Props) {
  const { locale, slug } = await params;

  let career;

  try {
    career = (await careerBySlug( slug,locale)).data;
  } catch {
    notFound();
  }

  if (!career) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          {career.image && (
            <Image
              src={career.image}
              alt={career.position}
              fill
              priority
              className="object-cover opacity-30"
              sizes="100vw"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Link
            href={`/${locale}/careers`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <svg
              className="h-4 w-4 rtl:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L5.414 10H16a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to careers
          </Link>

          {career.role && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-400">
              {career.role}
            </p>
          )}

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {career.position}
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            {career.experience && (
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                {career.experience}
              </span>
            )}

            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              {career.requirements.length} Requirements
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
          {/* Main */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                About the position
              </h2>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-gray-600">
                {career.description}
              </p>
            </div>

            {/* Requirements */}
            {career.requirements.length > 0 && (
              <div className="mt-12 border-t border-gray-100 pt-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  Requirements
                </h2>

                <ul className="mt-6 space-y-4">
                  {career.requirements.map((requirement, index) => (
                    <li
                      key={`${career.id}-requirement-${index}`}
                      className="flex gap-4 text-gray-600"
                    >
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        ✓
                      </span>

                      <span className="leading-7">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">
                Interested in this position?
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                If you think you are a good fit for this position, we would love
                to hear from you.
              </p>

              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary"
              >
                Apply for this position
              </button>

              <Link
                href={`/${locale}/careers`}
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                View all positions
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
