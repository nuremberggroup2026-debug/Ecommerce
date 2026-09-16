"use client";

import { useFormContext } from "react-hook-form";

import type { CreatePromoCodeSchema } from "@/server/promoCodes/validators";

export default function PromoCodeStatusField() {
  const { register } = useFormContext<CreatePromoCodeSchema>();

  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id="isActive"
        {...register("isActive")}
        className="h-4 w-4 rounded border-gray-300"
      />

      <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
        Active
      </label>
    </div>
  );
}
