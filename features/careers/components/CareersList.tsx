import Image from "next/image";
import Link from "next/link";
import { TransalatedCareer } from "@/types";

interface CareersListProps {
  careers: TransalatedCareer[];

}

export default function CareersList({
  careers,
 
}: CareersListProps) {
  if (!careers?.length) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            No open positions
          </h2>

          <p className="mt-2 text-gray-500">
            We currently don&apos;t have any open positions.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Careers
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Join our team
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Explore our current opportunities and find the role that fits
            your skills and ambitions.
          </p>
        </div>

        {/* Careers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => (
            <article
              key={career.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                {career.image ? (
                  <Image
                    src={career.image}
                    alt={career.position}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-sm text-gray-400">
                      Career opportunity
                    </span>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Experience */}
                {career.experience && (
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur">
                    {career.experience}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Role */}
                {career.role && (
                  <span className="mb-2 text-sm font-medium text-primary">
                    {career.role}
                  </span>
                )}

                {/* Position */}
                <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-primary">
                  {career.position}
                </h3>

                {/* Description */}
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {career.description}
                </p>

                {/* Requirements */}
                {career.requirements?.length > 0 && (
                  <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                    <svg
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span>
                      {career.requirements.length} requirements
                    </span>
                  </div>
                )}

                {/* Button */}
                <div className="mt-auto pt-6">
                  <Link
                    href={`/careers/${career.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
                  >
                    View position

                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}