
import Image from "next/image";
import Link from "next/link";

import { fetchCareersWithApplications } from "@/features/careers/api/careers.server.api";
import type { CareerCard } from "@/features/applications/types";

export default async function Page() {
  const response = await fetchCareersWithApplications();

  const careers = response.data as unknown as CareerCard[];

  return (
    <div className="container  mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">
            Careers
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View careers and manage their applications.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Total Careers
          </p>

          <p className="mt-1 text-2xl font-bold text-black">
            {careers.length}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {careers.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-black text-2xl text-white">
            💼
          </div>

          <h2 className="font-semibold text-black">
            No careers found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            There are no careers available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => {
            const applicationsCount =
              career.applications?.length ?? 0;

            return (
              <Link
                key={career.id}
                href={`/dashboard/applications/${career.id}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  {career.image ? (
                    <Image
                      src={career.image}
                      alt={career.positionEn}
                      fill
                      className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-100">
                      <span className="text-3xl grayscale">💼</span>
                    </div>
                  )}

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Applications */}
                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-black/80 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                      {applicationsCount}
                    </span>

                    {applicationsCount === 1
                      ? "Application"
                      : "Applications"}
                  </div>

                  {/* Position */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h2 className="line-clamp-2 text-xl font-bold text-white">
                      {career.positionEn}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Role */}
                  {career.roleEn && (
                    <div className="mb-4">
                      <span className="inline-flex rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700">
                        {career.roleEn}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  {career.descriptionEn && (
                    <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                      {career.descriptionEn}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Applicants
                      </p>

                      <p className="mt-1 text-xl font-bold text-black">
                        {applicationsCount}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-black transition-all duration-200 group-hover:gap-3">
                      View Applications
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
