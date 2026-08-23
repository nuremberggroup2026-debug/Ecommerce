import Image from "next/image";
import Link from "next/link";
import { TransalatedCareer } from "@/types";
import { theme } from "@/themes";

interface CareersListProps {
  careers: TransalatedCareer[];
}

export default function CareersList({ careers }: CareersListProps) {
  if (!careers?.length) {
    return (
      <section className={theme.careers.section}>
        <div className={theme.careers.emptyContainer}>
          <h2 className={theme.careers.emptyTitle}>
            No open positions
          </h2>

          <p className={theme.careers.emptyDescription}>
            We currently don&apos;t have any open positions.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={theme.careers.section}>
      <div className={theme.careers.container}>
        <div className={theme.careers.headerWrapper}>
          <span className={theme.careers.badge}>
            Careers
          </span>

          <h2 className={theme.careers.title}>
            Join our team
          </h2>

          <p className={theme.careers.description}>
            Explore our current opportunities and find the role that fits
            your skills and ambitions.
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
                      Career opportunity
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

                    <span>{career.requirements.length} requirements</span>
                  </div>
                )}

                <div className={theme.careers.actionWrapper}>
                  <Link
                    href={`/careers/${career.slug}`}
                    className={theme.careers.actionButton}
                  >
                    View position

                    <svg
                      className={theme.careers.actionIcon}
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