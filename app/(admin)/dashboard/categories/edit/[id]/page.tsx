import { adminCategoryById } from "@/features/catalog/categories/api/categories.server.api";
import EditCategoryForm from "@/app/(admin)/dashboard/categories/edit/edit-category-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: category } = await adminCategoryById(id);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="p-6">
      <EditCategoryForm
        category={{
          id: category.id,
          image: category.image,
          slug: category.slug,
          categoryNameAr: category.categoryNameAr,
          categoryNameEn: category.categoryNameEn,
          categoryDescriptionAr: category.categoryDescriptionAr,
          categoryDescriptionEn: category.categoryDescriptionEn,
          isFeatured: category.isFeatured,
        }}
      />
    </div>
  );
}
