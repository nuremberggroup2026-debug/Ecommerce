"use client";

import { TransalatedCategories } from "@/types";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { theme } from "@/themes";

interface Props {
  categoriesData: TransalatedCategories[];
}

export default function CategoryFilter({ categoriesData }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Product");

  const selectedCategories = searchParams.get("categories")?.split(",") ?? [];

  function handleCategoryChange(id: string) {
    let selected = [...selectedCategories];

    if (selected.includes(id)) {
      selected = selected.filter((item) => item !== id);
    } else {
      selected.push(id);
    }

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (selected.length) {
      params.set("categories", selected.join(","));
    } else {
      params.delete("categories");
    }

    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className={theme.categoryFilter.card}>
      <h3 className={theme.categoryFilter.title}>{t("Categories")}</h3>

      <div className={theme.categoryFilter.listContainer}>
        {categoriesData.map((category) => (
          <label key={category.id} className={theme.categoryFilter.label}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className={theme.categoryFilter.checkbox}
            />

            <span>{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
