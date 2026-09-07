import { adminAttributeWithValues } from "@/features/catalog/attributes/api/attributes.server.api";
import { adminCategoriesNameAndIDs } from "@/features/catalog/categories/api/categories.server.api";
import EditProductForm from "@/features/products/components/admin/editProduct/EditProductForm";
import { adminProductById } from "@/features/products/api/products.server.api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const [attributesWithValues, categories, product] = await Promise.all([
    adminAttributeWithValues(),
    adminCategoriesNameAndIDs(),
    adminProductById(id),
  ]);


  return (
    <div className="mx-7 mb-14 max-w-6xl">
      <EditProductForm
        productId={id}
        product={product.data}
        categoriesNamesAndIDs={categories.data}
        attributeswithValues={attributesWithValues.data}
      />
    </div>
  );
}
