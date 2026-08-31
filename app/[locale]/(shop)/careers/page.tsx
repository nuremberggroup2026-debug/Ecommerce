import React from "react";
import { Locale } from "@/types";
import { fetchCareers } from "@/features/careers/api/careers.server.api";
import CareersList from "@/features/careers/components/CareersList";
import { generateStaticMetadata } from "@/lib/constants/metadata";

interface Prop {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Prop) => {
  const locale = (await params).locale;
  return generateStaticMetadata("careers", locale);
};
export default async function page({ params }: Prop) {
  const locale = (await params).locale;
  const careers = (await fetchCareers(locale)).data;

  return (
    <div>
      <CareersList careers={careers} />
    </div>
  );
}
