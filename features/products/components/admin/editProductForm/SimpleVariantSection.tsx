"use client";

import { useFormContext } from "react-hook-form";

import ImageUploader from "@/components/test/ImageUploader";
import type { UpdateProductSchema } from "@/server/products/validators";

import { inputClass, labelClass } from "./utils";

type Props = {
  fieldId: string | undefined;
  variantImage: string;
  onUpdatePrice: (value: string) => void;
  onUpdateDiscount: (value: string) => void;
  onImageSelect: (file: File | null) => void;
};

export default function SimpleVariantSection({
  fieldId,
  variantImage,
  onUpdatePrice,
  onUpdateDiscount,
  onImageSelect,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<UpdateProductSchema>();

  return (
    <div className="rounded-2xl border bg-gray-50 p-5">
      <div className="mb-5">
        <h3 className="font-semibold">Product Pricing & Stock</h3>

        <p className="mt-1 text-sm text-gray-500">
          This product uses one default variant internally.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* SKU */}
        <div>
          <label className={labelClass}>SKU</label>

          <input
            {...register("variants.0.sku")}
            className={inputClass}
            placeholder="e.g. PROD-001"
          />

          {errors.variants?.[0]?.sku && (
            <p className="mt-1 text-xs text-red-600">{errors.variants[0]?.sku?.message}</p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className={labelClass}>Price</label>

          <input
            type="number"
            min="0"
            step="0.01"
            {...register("variants.0.price", { valueAsNumber: true })}
            onChange={(e) => onUpdatePrice(e.target.value)}
            className={inputClass}
            placeholder="0.00"
          />

          {errors.variants?.[0]?.price && (
            <p className="mt-1 text-xs text-red-600">{errors.variants[0]?.price?.message}</p>
          )}
        </div>

        {/* DISCOUNT */}
        <div>
          <label className={labelClass}>Discount %</label>

          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            {...register("variants.0.discountPercentage", { valueAsNumber: true })}
            onChange={(e) => onUpdateDiscount(e.target.value)}
            className={inputClass}
            placeholder="0"
          />
        </div>

        {/* FINAL PRICE */}
        <div>
          <label className={labelClass}>Final Price</label>

          <input
            type="number"
            readOnly
            {...register("variants.0.finalPrice", { valueAsNumber: true })}
            className={`${inputClass} bg-gray-100 font-semibold`}
          />
        </div>

        {/* STOCK */}
        <div>
          <label className={labelClass}>Stock</label>

          <input
            type="number"
            min="0"
            {...register("variants.0.stock", { valueAsNumber: true })}
            className={inputClass}
            placeholder="0"
          />
        </div>
      </div>

      {/* SIMPLE VARIANT IMAGE */}
      <div className="mt-6">
        <label className={labelClass}>Product Variant Image</label>

        <div className="mt-2 rounded-2xl border bg-white p-4">
          <ImageUploader
            initialImageUrl={variantImage || undefined}
            onFileSelect={(file) => {
              if (!fieldId) return;
              onImageSelect(file);
            }}
          />
        </div>
      </div>

      {/* INFO */}
      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-900">Simple product</p>

        <p className="mt-1 text-xs text-blue-700">
          This will be saved as one default variant with no attributes.
        </p>
      </div>
    </div>
  );
}
