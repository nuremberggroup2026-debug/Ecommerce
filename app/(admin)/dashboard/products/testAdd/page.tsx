import { adminAttributes } from "@/features/catalog/attributes/api/attributes.server.api";
import { adminCategories } from "@/features/catalog/categories/api/categories.server.api";
import React from "react";

export default async function page() {
  const [attributesWithValues, categories] = await Promise.all([
    adminAttributes(),
    adminCategories(),
  ]);

  return <div>page</div>;
}
