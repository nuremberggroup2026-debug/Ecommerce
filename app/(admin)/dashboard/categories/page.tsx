import { adminCategories } from "@/features/categories/api/categories.server.api";
import { CategoryDataTable } from "@/features/categories/components/admin/category-data-table"

export default async function DemoPage() {
  const categories = await adminCategories();

  return (
    <div className="w-full min-w-0 pb-10">
      <CategoryDataTable  data={categories.data} />
    </div>
  );
}




