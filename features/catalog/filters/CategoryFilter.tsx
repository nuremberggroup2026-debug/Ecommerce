"use client";

import { TransalatedCategories } from "@/types";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

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
    <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
      <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-4">
        {t("Categories")}
      </h3>

      <div className="space-y-3">
        {categoriesData.map((category) => (
          <label
            key={category.id}
            className="flex items-center gap-3 cursor-pointer text-sm text-gray-600"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="h-4 w-4 rounded border-gray-300 accent-black"
            />

            <span>{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
