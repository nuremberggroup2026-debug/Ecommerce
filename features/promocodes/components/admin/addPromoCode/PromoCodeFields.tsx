"use client";

import { useFormContext } from "react-hook-form";

import type { CreatePromoCodeSchema } from "@/server/promoCodes/validators";

import { inputClass } from "./utils";

export default function PromoCodeFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePromoCodeSchema>();

  return (
    <>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Promo Code</label>

        <input
          {...register("code")}
          placeholder="Enter promo code"
          className={inputClass}
        />

        {errors.code && (
          <p className="text-xs text-red-600">{errors.code.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Discount Percentage
        </label>

        <div className="relative">
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            {...register("discountPercentage", {
              valueAsNumber: true,
            })}
            placeholder="Enter discount percentage"
            className={`${inputClass} pr-10`}
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            %
          </span>
        </div>

        {errors.discountPercentage && (
          <p className="text-xs text-red-600">
            {errors.discountPercentage.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Maximum Usage
        </label>

        <input
          type="number"
          min="1"
          step="1"
          {...register("maxUsage", {
            valueAsNumber: true,
          })}
          placeholder="Enter maximum usage"
          className={inputClass}
        />

        {errors.maxUsage && (
          <p className="text-xs text-red-600">{errors.maxUsage.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Expiration Date
        </label>

        <input
          type="datetime-local"
          {...register("expiresAt", {
            setValueAs: (value) => (value ? new Date(value) : undefined),
          })}
          className={inputClass}
        />

        {errors.expiresAt && (
          <p className="text-xs text-red-600">{errors.expiresAt.message}</p>
        )}
      </div>
    </>
  );
}
