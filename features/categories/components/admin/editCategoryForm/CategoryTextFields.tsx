"use client";

import { useFormContext } from "react-hook-form";

import type { UpdateCategorySchema } from "@/server/categories/validators";

import { inputClass } from "./utils";

export default function CategoryTextFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UpdateCategorySchema>();

  return (
    <>
      <div className="space-y-1">
        <label className="text-sm font-medium">English Name</label>
        <input
          {...register("categoryNameEn")}
          placeholder="Enter English category name"
          className={inputClass}
        />
        {errors.categoryNameEn && (
          <p className="text-xs text-red-600">{errors.categoryNameEn.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Arabic Name</label>
        <input
          dir="rtl"
          {...register("categoryNameAr")}
          placeholder="أدخل اسم التصنيف بالعربي"
          className={inputClass}
        />
        {errors.categoryNameAr && (
          <p className="text-xs text-red-600">{errors.categoryNameAr.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">English Description</label>
        <textarea
          {...register("categoryDescriptionEn")}
          placeholder="Enter English description"
          rows={3}
          className={`${inputClass} resize-none`}
        />
        {errors.categoryDescriptionEn && (
          <p className="text-xs text-red-600">{errors.categoryDescriptionEn.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Arabic Description</label>
        <textarea
          dir="rtl"
          {...register("categoryDescriptionAr")}
          placeholder="أدخل وصف التصنيف بالعربي"
          rows={3}
          className={`${inputClass} resize-none`}
        />
        {errors.categoryDescriptionAr && (
          <p className="text-xs text-red-600">{errors.categoryDescriptionAr.message}</p>
        )}
      </div>
    </>
  );
}
