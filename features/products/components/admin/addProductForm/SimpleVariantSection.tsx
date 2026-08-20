"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import ImageUploader from "@/components/test/ImageUploader";
import { ProductSchema } from "@/server/products/validators";

interface SimpleVariantSectionProps {
  register: UseFormRegister<ProductSchema>;
  errors: FieldErrors<ProductSchema>;
  variants: ProductSchema["variants"];
  variantFieldId: string;
  updatePrice: (index: number, price: number) => void;
  updateDiscount: (index: number, discount: number) => void;
  setVariantFiles: React.Dispatch<React.SetStateAction<Record<string, File | null>>>;
}

export default function SimpleVariantSection({
  register,
  errors,
  variants,
  variantFieldId,
  updatePrice,
  updateDiscount,
  setVariantFiles,
}: SimpleVariantSectionProps) {
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <section className="rounded-2xl border bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Product Pricing & Stock</h2>
        <p className="mt-1 text-sm text-gray-500">
          Set the price, discount and available stock for this product.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className={labelClass}>SKU</label>
          <input {...register("variants.0.sku")} className={inputClass} placeholder="SKU-001" />
          {errors.variants?.[0]?.sku && (
            <p className="mt-1 text-xs text-red-600">{errors.variants[0]?.sku?.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={variants?.[0]?.price ?? 0}
            onChange={(e) => updatePrice(0, Number(e.target.value))}
            className={inputClass}
          />
          {errors.variants?.[0]?.price && (
            <p className="mt-1 text-xs text-red-600">{errors.variants[0]?.price?.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Discount %</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={variants?.[0]?.discountPercentage ?? 0}
            onChange={(e) => updateDiscount(0, Number(e.target.value))}
            className={inputClass}
          />
          {errors.variants?.[0]?.discountPercentage && (
            <p className="mt-1 text-xs text-red-600">
              {errors.variants[0]?.discountPercentage?.message}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Final Price</label>
          <input
            type="number"
            readOnly
            value={variants?.[0]?.finalPrice ?? 0}
            className={`${inputClass} bg-gray-100`}
          />
        </div>

        <div>
          <label className={labelClass}>Stock</label>
          <input
            type="number"
            min="0"
            {...register("variants.0.stock", { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.variants?.[0]?.stock && (
            <p className="mt-1 text-xs text-red-600">{errors.variants[0]?.stock?.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label className={labelClass}>
          Product Variant Image <span className="ml-1 text-xs text-gray-400">Optional</span>
        </label>
        <div className="mt-2 max-w-md rounded-2xl border border-dashed bg-gray-50 p-5">
          <ImageUploader
            onFileSelect={(file) =>
              setVariantFiles((current) => ({
                ...current,
                [variantFieldId || "simple"]: file,
              }))
            }
          />
        </div>
      </div>
    </section>
  );
}