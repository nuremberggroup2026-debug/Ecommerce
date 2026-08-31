"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { CreateProductFormType } from "@/server/products/validators";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/10";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

const calculateFinalPrice = (
  price: number = 0,
  discountPercentage: number = 0,
) => {
  const safePrice = Number.isFinite(price) ? Math.max(0, price) : 0;
  const safeDiscount = Number.isFinite(discountPercentage)
    ? Math.min(100, Math.max(0, discountPercentage))
    : 0;
  return (safePrice - safePrice * (safeDiscount / 100)).toFixed(2);
};

export default function DefaultVariant() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateProductFormType>();

  const variantErrors = errors.variants?.[0];

  const price = useWatch({
    control,
    name: "variants.0.price",
  });

  const discountPercentage = useWatch({
    control,
    name: "variants.0.discountPercentage",
  });

  const computedFinalPrice = calculateFinalPrice(
    Number(price),
    Number(discountPercentage),
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 7.5 7.5 4 7.5-4M12 21v-9.5"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Default Variant</h3>

            <p className="text-sm text-gray-500">
              Configure the price, stock and SKU for this product.
            </p>
          </div>
        </div>
      </div>

      {/* Variant Fields */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Price */}
        <div>
          <label className={labelClass}>
            <span className="text-red-500">*</span> Price
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              $
            </span>

            <input
              type="text"
              step="0.01"
              min="0"
              {...register("variants.0.price", {
                valueAsNumber: true,
              })}
              className={`${inputClass} pl-8`}
              placeholder="0.00"
            />
          </div>

          {variantErrors?.price && (
            <p className="mt-1.5 text-xs text-red-600">
              {variantErrors.price.message}
            </p>
          )}
        </div>

        {/* Discount */}
        <div>
          <label className={labelClass}>Discount Percentage</label>

          <div className="relative">
            <input
              type="text"
              step="0.01"
              min="0"
              max="100"
              {...register("variants.0.discountPercentage", {
                valueAsNumber: true,
              })}
              className={`${inputClass} pr-10`}
              placeholder="0"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              %
            </span>
          </div>

          {variantErrors?.discountPercentage && (
            <p className="mt-1.5 text-xs text-red-600">
              {variantErrors.discountPercentage.message}
            </p>
          )}
        </div>

        {/* Final Price (Visual Display Only) */}
        <div>
          <label className={labelClass}>Final Price</label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              $
            </span>

            <input
              type="text"
              readOnly
              tabIndex={-1}
              value={computedFinalPrice}
              className={`${inputClass} cursor-not-allowed bg-gray-100/80 pl-8 font-medium text-gray-600 focus:border-gray-200 focus:ring-0`}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className={labelClass}>
            <span className="text-red-500">*</span> Stock
          </label>

          <input
            type="text"
            min="0"
            {...register("variants.0.stock", {
              valueAsNumber: true,
            })}
            className={inputClass}
            placeholder="0"
          />

          {variantErrors?.stock && (
            <p className="mt-1.5 text-xs text-red-600">
              {variantErrors.stock.message}
            </p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label className={labelClass}>
            <span className="text-red-500">*</span> SKU
          </label>

          <input
            type="text"
            {...register("variants.0.sku")}
            className={inputClass}
            placeholder="e.g. PROD-001"
          />

          {variantErrors?.sku && (
            <p className="mt-1.5 text-xs text-red-600">
              {variantErrors.sku.message}
            </p>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M12 10v6M12 7h.01" />
        </svg>

        <p className="text-xs leading-5 text-gray-500">
          A default variant does not have attributes such as color or size. The
          final price will be calculated automatically based on the discount
          percentage.
        </p>
      </div>
    </div>
  );
}
