import { adminAttributeWithValues } from "@/features/catalog/attributes/api/attributes.server.api";
import { adminCategoriesNameAndIDs } from "@/features/catalog/categories/api/categories.server.api";
import CreateProductForm from "@/features/products/components/admin/addProduct/CreateProductForm";

export default async function page() {
  const [attributesWithValues, categories] = await Promise.all([
    adminAttributeWithValues(),
    adminCategoriesNameAndIDs(),
  ]);

  return (
    <div className=" mb-14">
      <CreateProductForm
        categoriesNamesAndIDs={categories.data}
        attributeswithValues={attributesWithValues.data}
      />
    </div>
  );
}
