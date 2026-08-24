import React from "react";
import type { TransalatedCareer } from "../../types";
import CareerDetails from "./CareerDetails";
import ApplicationForm from "./ApplicationForm";
import { theme } from "@/themes";

interface Prop {
  career: TransalatedCareer;
}

export default function ApplicationPage({ career }: Prop) {
  return (
    <main className={theme.applicationPage.main}>
      <div className={theme.applicationPage.container}>
        <div className={theme.applicationPage.grid}>
          {/* Left Side: Career Details (Sticky) */}
          <section className={theme.applicationPage.detailsSection}>
            <CareerDetails career={career} />
          </section>

          {/* Right Side: Application Form */}
          <section className={theme.applicationPage.formSection}>
            <ApplicationForm careerSlug={career.slug} />
          </section>
        </div>
      </div>
    </main>
  );
}