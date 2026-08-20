"use client";

import { useFormContext } from "react-hook-form";

import type { CareerSchema } from "@/server/careers/validators";

import { inputClass } from "./utils";

export default function CareerTextFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CareerSchema>();

  return (
    <>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">English Position</label>
        <input
          {...register("positionEn")}
          placeholder="Enter English career position"
          className={inputClass}
        />
        {errors.positionEn && (
          <p className="text-xs text-red-600">{errors.positionEn.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Arabic Position</label>
        <input
          dir="rtl"
          {...register("positionAr")}
          placeholder="أدخل المسمى الوظيفي بالعربي"
          className={inputClass}
        />
        {errors.positionAr && (
          <p className="text-xs text-red-600">{errors.positionAr.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">English Description</label>
        <textarea
          {...register("descriptionEn")}
          placeholder="Enter English career description"
          rows={5}
          className={`${inputClass} resize-none`}
        />
        {errors.descriptionEn && (
          <p className="text-xs text-red-600">{errors.descriptionEn.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Arabic Description</label>
        <textarea
          dir="rtl"
          {...register("descriptionAr")}
          placeholder="أدخل وصف الوظيفة بالعربي"
          rows={5}
          className={`${inputClass} resize-none`}
        />
        {errors.descriptionAr && (
          <p className="text-xs text-red-600">{errors.descriptionAr.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">English Experience</label>
        <input
          {...register("experienceEn")}
          placeholder="Enter required experience"
          className={inputClass}
        />
        {errors.experienceEn && (
          <p className="text-xs text-red-600">{errors.experienceEn.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Arabic Experience</label>
        <input
          dir="rtl"
          {...register("experienceAr")}
          placeholder="أدخل الخبرة المطلوبة"
          className={inputClass}
        />
        {errors.experienceAr && (
          <p className="text-xs text-red-600">{errors.experienceAr.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">English Role</label>
        <textarea
          {...register("roleEn")}
          placeholder="Enter English role"
          rows={3}
          className={`${inputClass} resize-none`}
        />
        {errors.roleEn && <p className="text-xs text-red-600">{errors.roleEn.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Arabic Role</label>
        <textarea
          dir="rtl"
          {...register("roleAr")}
          placeholder="أدخل الدور الوظيفي بالعربي"
          rows={3}
          className={`${inputClass} resize-none`}
        />
        {errors.roleAr && <p className="text-xs text-red-600">{errors.roleAr.message}</p>}
      </div>
    </>
  );
}
