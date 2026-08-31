import { adminCategories } from "@/features/catalog/categories/api/categories.server.api";
import { CategoryDataTable } from "@/features/catalog/categories/components/admin/category-data-table"

export default async function DemoPage() {
  const categories = await adminCategories();

  return (
    <div className="container  mx-auto py-10  ">
      <CategoryDataTable  data={categories.data} />
    </div>
  );
}




