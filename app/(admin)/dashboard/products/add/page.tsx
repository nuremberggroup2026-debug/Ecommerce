import React from "react";
import AddProductForm from "./add-product-form";

import { adminCategories } from "@/features/catalog/categories/api/categories.server.api"
import { adminAttributes } from "@/features/catalog/attributes/api/attributes.server.api";

export default async function Page() {
  const [categoriesResponse, attributesResponse] = await Promise.all([
    adminCategories(),
    adminAttributes(),
  ]);

  const categories = categoriesResponse.data ?? [];
  const attributes = attributesResponse.data ?? [];

  return (
    <div className="container mx-auto py-10">
      <AddProductForm
        categories={categories}
        attributes={attributes}
      />
    </div>
  );
}
