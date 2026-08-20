"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { TransalatedCareer } from "../../types";

export default function CareerDetails({
  career,
}: {
  career: TransalatedCareer;
}) {
  const t = useTranslations("ApplicationPage");

  return (
    <div className="space-y-8">
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-neutral-100">
        <Image
          src={career.image}
          alt={career.position}
          fill
          className="object-cover"
        />
      </div>

      {/* Title & Basics */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          {career.position}
        </h1>
        <div className="mt-4 flex flex-wrap gap-4">
          {career.role && (
            <span className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600">
              {t("ROLE")}: {career.role}
            </span>
          )}
          {career.experience && (
            <span className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-600">
              {t("EXPERIENCE")}: {career.experience}
            </span>
          )}
        </div>
      </div>

      <hr className="border-neutral-100" />

      {/* Description */}
      <div className="space-y-4">
        <p className="text-sm font-light leading-relaxed text-neutral-500">
          {career.description}
        </p>
      </div>

      {/* Requirements */}
      {career.requirements && career.requirements.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900">
            {t("REQUIREMENTS")}
          </h3>
          <ul className="list-inside list-disc space-y-2 text-sm font-light text-neutral-500">
            {career.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
