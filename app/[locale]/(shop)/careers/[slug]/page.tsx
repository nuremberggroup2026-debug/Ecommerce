import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Locale } from "@/types";
import { careerBySlug } from "@/features/careers/api/careers.server.api";
import { theme } from "@/themes";

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
    career = (await careerBySlug(slug, locale)).data;
  } catch {
    notFound();
  }

  if (!career) {
    notFound();
  }

  return (
    <main className={theme.careerDetails.main}>
      {/* Hero */}
      <section className={theme.careerDetails.heroSection}>
        <div className={theme.careerDetails.heroImageWrapper}>
          {career.image && (
            <Image
              src={career.image}
              alt={career.position}
              fill
              priority
              className={theme.careerDetails.heroImage}
              sizes="100vw"
            />
          )}

          <div className={theme.careerDetails.heroOverlay} />
        </div>

        <div className={theme.careerDetails.heroContainer}>
          <Link
            href={`/${locale}/careers`}
            className={theme.careerDetails.backLink}
          >
            <svg
              className={theme.careerDetails.backIcon}
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
            <p className={theme.careerDetails.role}>
              {career.role}
            </p>
          )}

          <h1 className={theme.careerDetails.title}>
            {career.position}
          </h1>

          <div className={theme.careerDetails.metaWrapper}>
            {career.experience && (
              <span className={theme.careerDetails.badge}>
                {career.experience}
              </span>
            )}

            <span className={theme.careerDetails.badge}>
              {career.requirements.length} Requirements
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className={theme.careerDetails.contentSection}>
        <div className={theme.careerDetails.grid}>
          {/* Main */}
          <div className={theme.careerDetails.card}>
            {/* Description */}
            <div>
              <h2 className={theme.careerDetails.sectionTitle}>
                About the position
              </h2>

              <p className={theme.careerDetails.description}>
                {career.description}
              </p>
            </div>

            {/* Requirements */}
            {career.requirements.length > 0 && (
              <div className={theme.careerDetails.requirementsSection}>
                <h2 className={theme.careerDetails.sectionTitle}>
                  Requirements
                </h2>

                <ul className={theme.careerDetails.requirementsList}>
                  {career.requirements.map((requirement, index) => (
                    <li
                      key={`${career.id}-requirement-${index}`}
                      className={theme.careerDetails.requirementItem}
                    >
                      <span className={theme.careerDetails.requirementIcon}>
                        ✓
                      </span>

                      <span className={theme.careerDetails.requirementText}>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className={theme.careerDetails.sidebar}>
            <div className={theme.careerDetails.sidebarCard}>
              <h3 className={theme.careerDetails.sidebarTitle}>
                Interested in this position?
              </h3>

              <p className={theme.careerDetails.sidebarDescription}>
                If you think you are a good fit for this position, we would love
                to hear from you.
              </p>
              
              <Link
                href={`/${locale}/careers/${career.slug}/apply`}
                className={theme.careerDetails.applyButton}
              >
                Apply for this position
              </Link>

              <Link
                href={`/${locale}/careers`}
                className={theme.careerDetails.viewAllButton}
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