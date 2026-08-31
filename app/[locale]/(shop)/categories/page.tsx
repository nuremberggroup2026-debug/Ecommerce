import Link from "next/link";
import { fetchALLCategories } from "@/features/catalog/categories/api/categories.client.api";
import CategoriesListComponent from "@/features/catalog/categoriesList/components/CategoriesListComponent";
import { Locale } from "@/types";
import { generateStaticMetadata } from "@/lib/constants/metadata";

interface Prop {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Prop) => {
  const locale = (await params).locale;
  return generateStaticMetadata("categories", locale);
};

export default async function CategoriesPage({ params }: Prop) {
  const { locale } = await params;
  const categories = await fetchALLCategories(locale);

  return <CategoriesListComponent categories={categories} locale={locale} />;
}
