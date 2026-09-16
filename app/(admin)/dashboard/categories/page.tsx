import { adminCategories } from "@/features/categories/api/categories.server.api";
import { CategoryDataTable } from "@/features/categories/components/admin/category-data-table"

export default async function DemoPage() {
  const categories = await adminCategories();

  return (
    <div >
      <CategoryDataTable  data={categories.data} />
    </div>
  );
}




