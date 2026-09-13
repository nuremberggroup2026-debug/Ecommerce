import Image from "next/image";
import Link from "next/link";
import { Locale, TransalatedCareer } from "@/types";
import { theme } from "@/themes";
import { useTranslations } from "next-intl";

interface CareersListProps {
  careers: TransalatedCareer[];
  locale?: Locale;
}

export default function CareersList({ careers, locale = "en" }: CareersListProps) {
  const t = useTranslations("CareersPage");
  const isAr = locale === "ar";

  if (!careers?.length) {
    return (
      <section className={theme.careers.section} dir={isAr ? "rtl" : "ltr"}>
        <div className={theme.careers.emptyContainer}>
          <h2 className={theme.careers.emptyTitle}>
            {t("EMPTY_TITLE")}
          </h2>

          <p className={theme.careers.emptyDescription}>
            {t("EMPTY_DESCRIPTION")}
          </p>
        </div>
      </section>
    );
  }

  
  

  return (
    <section className={theme.careers.section} dir={isAr ? "rtl" : "ltr"}>
      <div className={theme.careers.container}>
        <div className={theme.careers.headerWrapper}>
          <span className={theme.careers.badge}>
            {t("BADGE")}
          </span>

          <h2 className={theme.careers.title}>
            {t("TITLE")}
          </h2>

          <p className={theme.careers.description}>
            {t("DESCRIPTION")}
          </p>
        </div>

        <div className={theme.careers.grid}>
          {careers.map((career) => (
            <article
              key={career.id}
              className={theme.careers.card}
            >
              <div className={theme.careers.imageWrapper}>
                {career.image ? (
                  <Image
                    src={career.image}
                    alt={career.position}
                    fill
                    className={theme.careers.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className={theme.careers.imagePlaceholder}>
                    <span className={theme.careers.imagePlaceholderText}>
                      {t("IMAGE_PLACEHOLDER")}
                    </span>
                  </div>
                )}

                <div className={theme.careers.imageOverlay} />

                {career.experience && (
                  <span className={theme.careers.experienceBadge}>
                    {career.experience}
                  </span>
                )}
              </div>

              <div className={theme.careers.cardBody}>
                {career.role && (
                  <span className={theme.careers.role}>
                    {career.role}
                  </span>
                )}

                <h3 className={theme.careers.cardTitle}>
                  {career.position}
                </h3>

                <p className={theme.careers.cardDescription}>
                  {career.description}
                </p>

                {career.requirements?.length > 0 && (
                  <div className={theme.careers.requirementsWrapper}>
                    <svg
                      className={theme.careers.requirementsIcon}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span>{t("REQUIREMENTS_COUNT", { count: career.requirements.length })}</span>
                  </div>
                )}

                <div className={theme.careers.actionWrapper}>
                  <Link
                    href={`/${locale}/careers/${career.slug}`}
                    className={theme.careers.actionButton}
                  >
                    {t("VIEW_POSITION")}

                    <svg
                      className={`${theme.careers.actionIcon} rtl:rotate-180`}
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