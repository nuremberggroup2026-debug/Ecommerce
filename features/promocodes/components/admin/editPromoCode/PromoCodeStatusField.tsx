"use client";

import { useFormContext } from "react-hook-form";

import type { UpdatePromoCodeInput } from "@/server/promoCodes/validators";

export default function PromoCodeStatusField() {
  const { register } = useFormContext<UpdatePromoCodeInput>();

  return (
    <label className="flex items-center gap-2 text-sm md:col-span-2">
      <input
        type="checkbox"
        {...register("isActive")}
        className="h-4 w-4 rounded border-gray-300"
      />

      <span>Active Promo Code</span>
    </label>
  );
}
