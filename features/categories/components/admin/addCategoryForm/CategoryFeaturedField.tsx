"use client";

import { useFormContext } from "react-hook-form";

import type { CategorySchema } from "@/server/categories/validators";

export default function CategoryFeaturedField() {
  const { register } = useFormContext<CategorySchema>();

  return (
    <label className="flex items-center gap-2 text-sm md:col-span-2">
      <input
        type="checkbox"
        {...register("isFeatured")}
        className="h-4 w-4 rounded border-gray-300"
      />

      <span>Featured Category</span>
    </label>
  );
}
