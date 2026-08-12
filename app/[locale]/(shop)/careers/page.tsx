import React from "react";
import { Locale } from "@/types";
import { fetchCareers } from "@/features/careers/api/careers.server.api";
import CareersList from "@/features/careers/components/CareersList";

interface Prop {
  params: Promise<{ locale: Locale }>;
}
export default async function page({ params }: Prop) {
  const locale = (await params).locale;
  const careers = await (await fetchCareers(locale)).data;

  return (
    <div>
      <CareersList careers={careers} />
    </div>
  );
}
