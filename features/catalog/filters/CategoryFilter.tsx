"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: {
    name: string;
    slug: string;
  }[];
}

export default function CategoryFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories =
    searchParams.get("category")?.split(",") ?? [];

  function handleCategoryChange(slug: string) {
    let selected = [...selectedCategories];

    if (selected.includes(slug)) {
      selected = selected.filter((item) => item !== slug);
    } else {
      selected.push(slug);
    }

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (selected.length) {
      params.set("category", selected.join(","));
    } else {
      params.delete("category");
    }

    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
      <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-4">
        Categories
      </h3>

      <div className="space-y-3">
        {categories.map((category) => (
          <label
            key={category.slug}
            className="flex items-center gap-3 cursor-pointer text-sm text-gray-600"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.slug)}
              onChange={() => handleCategoryChange(category.slug)}
              className="h-4 w-4 rounded border-gray-300 accent-black"
            />

            <span>{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}