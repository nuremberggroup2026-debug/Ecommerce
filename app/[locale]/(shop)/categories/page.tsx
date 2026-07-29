import Link from "next/link";
import { fetchALLCategories } from "@/features/catalog/categories/api/categories.api";
import CategoriesListComponent from "@/features/catalog/categoriesList/components/CategoriesListComponent";
import { Locale } from "@/types";

interface Prop {
  params: Promise<{ locale: Locale }>;
}

export default async function CategoriesPage({ params }: Prop) {
  const { locale } = await params;
  const categories = await fetchALLCategories(locale);

  return <CategoriesListComponent categories={categories} locale={locale} />;
}
