"use client";

import { useFormContext } from "react-hook-form";

import type { UpdateBannerSchema } from "@/server/banner/validators";

export default function BannerNameFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UpdateBannerSchema>();

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">English Name</label>

        <input
          {...register("nameEn")}
          placeholder="Enter English name"
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
        />

        {errors.nameEn && <p className="text-sm text-red-600">{errors.nameEn.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Arabic Name</label>

        <input
          dir="rtl"
          {...register("nameAr")}
          placeholder="أدخل الاسم بالعربي"
          className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
        />

        {errors.nameAr && <p className="text-sm text-red-600">{errors.nameAr.message}</p>}
      </div>
    </>
  );
}
