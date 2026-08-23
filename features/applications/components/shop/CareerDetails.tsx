"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import type { TransalatedCareer } from "../../types";
import { theme } from "@/themes";

export default function CareerDetails({
  career,
}: {
  career: TransalatedCareer;
}) {
  const t = useTranslations("ApplicationPage");

  return (
    <div className={theme.careerDetailsWidget.container}>
      {/* Image */}
      <div className={theme.careerDetailsWidget.imageWrapper}>
        <Image
          src={career.image}
          alt={career.position}
          fill
          className={theme.careerDetailsWidget.image}
        />
      </div>

      {/* Title & Basics */}
      <div>
        <h1 className={theme.careerDetailsWidget.title}>
          {career.position}
        </h1>
        <div className={theme.careerDetailsWidget.badgesWrapper}>
          {career.role && (
            <span className={theme.careerDetailsWidget.badge}>
              {t("ROLE")}: {career.role}
            </span>
          )}
          {career.experience && (
            <span className={theme.careerDetailsWidget.badge}>
              {t("EXPERIENCE")}: {career.experience}
            </span>
          )}
        </div>
      </div>

      <hr className={theme.careerDetailsWidget.divider} />

      {/* Description */}
      <div className={theme.careerDetailsWidget.descriptionSection}>
        <p className={theme.careerDetailsWidget.description}>
          {career.description}
        </p>
      </div>

      {/* Requirements */}
      {career.requirements && career.requirements.length > 0 && (
        <div className={theme.careerDetailsWidget.requirementsSection}>
          <h3 className={theme.careerDetailsWidget.requirementsTitle}>
            {t("REQUIREMENTS")}
          </h3>
          <ul className={theme.careerDetailsWidget.requirementsList}>
            {career.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}