import Link from "next/link";
import { fetchALLCategories } from "@/features/catalog/categories/api/categories.api";
import CategoriesListComponent from "@/features/catalog/categoriesList/components/CategoriesListComponent";



export default async function CategoriesPage() {
  const categories = await fetchALLCategories();

  return (
   <CategoriesListComponent categories={categories}/>
  );
}