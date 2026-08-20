"use client";

import { useFormContext } from "react-hook-form";

import type { UpdateProductSchema } from "@/server/products/validators";

import type { ProductCategoryOption } from "./types";
import { inputClass, labelClass } from "./utils";

type Props = {
  categories: ProductCategoryOption[];
};

export default function ProductInfoSection({ categories }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<UpdateProductSchema>();

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Product Information</h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* NAME EN */}
        <div className="space-y-1">
          <label className={labelClass}>Product Name (EN)</label>

          <input {...register("productNameEn")} className={inputClass} />

          {errors.productNameEn && (
            <p className="text-xs text-red-600">{errors.productNameEn.message}</p>
          )}
        </div>

        {/* NAME AR */}
        <div className="space-y-1">
          <label className={labelClass}>Product Name (AR)</label>

          <input dir="rtl" {...register("productNameAr")} className={inputClass} />

          {errors.productNameAr && (
            <p className="text-xs text-red-600">{errors.productNameAr.message}</p>
          )}
        </div>

        {/* SLUG */}
        <div className="space-y-1">
          <label className={labelClass}>Slug</label>

          <input {...register("slug")} className={inputClass} />

          {errors.slug && <p className="text-xs text-red-600">{errors.slug.message}</p>}
        </div>

        {/* CATEGORY */}
        <div className="space-y-1">
          <label className={labelClass}>Category</label>

          <select {...register("categoryId")} className={inputClass}>
            <option value="">Select category</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.categoryNameEn} / {c.categoryNameAr}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="text-xs text-red-600">{errors.categoryId.message}</p>
          )}
        </div>

        {/* DESCRIPTION EN */}
        <div className="space-y-1">
          <label className={labelClass}>Description (EN)</label>

          <textarea
            {...register("productDescriptionEn")}
            rows={6}
            className={`${inputClass} resize-none`}
          />

          {errors.productDescriptionEn && (
            <p className="text-xs text-red-600">{errors.productDescriptionEn.message}</p>
          )}
        </div>

        {/* DESCRIPTION AR */}
        <div className="space-y-1">
          <label className={labelClass}>Description (AR)</label>

          <textarea
            dir="rtl"
            {...register("productDescriptionAr")}
            rows={6}
            className={`${inputClass} resize-none`}
          />

          {errors.productDescriptionAr && (
            <p className="text-xs text-red-600">{errors.productDescriptionAr.message}</p>
          )}
        </div>

        {/* FEATURED */}
        <label className="flex items-center gap-3 md:col-span-2">
          <input type="checkbox" {...register("isFeatured")} className="h-4 w-4" />
          <span className="text-sm font-medium">Featured Product</span>
        </label>
      </div>
    </section>
  );
}
