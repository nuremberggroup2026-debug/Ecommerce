import React from "react";
import type { TransalatedCareer } from "../../types";
import CareerDetails from "./CareerDetails";
import ApplicationForm from "./ApplicationForm";

interface Prop {
  career: TransalatedCareer;
}

export default function ApplicationPage({ career }: Prop) {
  return (
    <main className="min-h-screen bg-neutral-50/50 pb-20 pt-12 text-neutral-900">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Side: Career Details (Sticky) */}
          <section className="lg:sticky lg:top-8 lg:col-span-6 xl:col-span-5">
            <CareerDetails career={career} />
          </section>

          {/* Right Side: Application Form */}
          <section className="lg:col-span-6 xl:col-span-7">
            <ApplicationForm careerSlug={career.slug} />
          </section>
        </div>
      </div>
    </main>
  );
}
