"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProductSchema } from "@/server/products/validators";

export interface ProductCategoryOption {
  id: string;
  categoryNameEn: string;
  categoryNameAr: string;
}

interface ProductInfoSectionProps {
  register: UseFormRegister<ProductSchema>;
  errors: FieldErrors<ProductSchema>;
  categories: ProductCategoryOption[];
}

export default function ProductInfoSection({
  register,
  errors,
  categories,
}: ProductInfoSectionProps) {
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <section className="rounded-2xl border bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Product Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Basic information about the product.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-1">
          <label className={labelClass}>Product Name (EN)</label>
          <input {...register("productNameEn")} className={inputClass} placeholder="Product name" />
          {errors.productNameEn && (
            <p className="text-xs text-red-600">{errors.productNameEn.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Product Name (AR)</label>
          <input dir="rtl" {...register("productNameAr")} className={inputClass} placeholder="اسم المنتج" />
          {errors.productNameAr && (
            <p className="text-xs text-red-600">{errors.productNameAr.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Slug</label>
          <input {...register("slug")} className={inputClass} placeholder="product-slug" />
          {errors.slug && <p className="text-xs text-red-600">{errors.slug.message}</p>}
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Category</label>
          <select {...register("categoryId")} className={inputClass}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryNameEn} / {category.categoryNameAr}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-xs text-red-600">{errors.categoryId.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Description (EN)</label>
          <textarea
            {...register("productDescriptionEn")}
            rows={6}
            className={`${inputClass} resize-none`}
            placeholder="Product description"
          />
          {errors.productDescriptionEn && (
            <p className="text-xs text-red-600">{errors.productDescriptionEn.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className={labelClass}>Description (AR)</label>
          <textarea
            dir="rtl"
            {...register("productDescriptionAr")}
            rows={6}
            className={`${inputClass} resize-none`}
            placeholder="وصف المنتج"
          />
          {errors.productDescriptionAr && (
            <p className="text-xs text-red-600">{errors.productDescriptionAr.message}</p>
          )}
        </div>

        <label className="flex items-center gap-3 md:col-span-2">
          <input type="checkbox" {...register("isFeatured")} className="h-4 w-4 rounded" />
          <span className="text-sm font-medium">Featured Product</span>
        </label>
      </div>
    </section>
  );
}