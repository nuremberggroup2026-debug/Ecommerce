"use client";

import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import ImageUploader from "@/components/test/ImageUploader";
import type { UpdateProductSchema } from "@/server/products/validators";

import type { ProductAttributeOption } from "./types";
import { inputClass, labelClass } from "./utils";

type VariantData = {
  sku?: string;
  variantImage?: string;
  isDefault?: boolean;
  attributeValueIds?: string[];
};

type Props = {
  index: number;
  fieldId: string;
  variant: VariantData | undefined;
  attributes: ProductAttributeOption[];
  onRemove: () => void;
  onSetDefault: () => void;
  onToggleAttribute: (valueId: string) => void;
  onUpdatePrice: (value: string) => void;
  onUpdateDiscount: (value: string) => void;
  onImageSelect: (file: File | null) => void;
};

export default function VariantCard({
  index,
  variant,
  attributes,
  onRemove,
  onSetDefault,
  onToggleAttribute,
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
      {/* VARIANT HEADER */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm text-white">
            {index + 1}
          </span>

          <div>
            <h3 className="font-semibold">Variant {index + 1}</h3>

            {variant?.sku && <p className="text-xs text-gray-500">{variant.sku}</p>}
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
      </div>

      {/* PRICE / STOCK */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {/* SKU */}
        <div>
          <label className={labelClass}>SKU</label>

          <input {...register(`variants.${index}.sku`)} className={inputClass} />

          {errors.variants?.[index]?.sku && (
            <p className="text-xs text-red-600">{errors.variants[index]?.sku?.message}</p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className={labelClass}>Price</label>

          <input
            type="number"
            min="0"
            step="0.01"
            {...register(`variants.${index}.price`, { valueAsNumber: true })}
            onChange={(e) => onUpdatePrice(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* DISCOUNT */}
        <div>
          <label className={labelClass}>Discount %</label>

          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            {...register(`variants.${index}.discountPercentage`, { valueAsNumber: true })}
            onChange={(e) => onUpdateDiscount(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* FINAL PRICE */}
        <div>
          <label className={labelClass}>Final Price</label>

          <input
            type="number"
            readOnly
            {...register(`variants.${index}.finalPrice`, { valueAsNumber: true })}
            className={`${inputClass} bg-gray-100`}
          />
        </div>

        {/* STOCK */}
        <div>
          <label className={labelClass}>Stock</label>

          <input
            type="number"
            min="0"
            {...register(`variants.${index}.stock`, { valueAsNumber: true })}
            className={inputClass}
          />
        </div>
      </div>

      {/* DEFAULT */}
      <div className="mt-5 flex items-center gap-3 rounded-xl border bg-white p-4">
        <input
          type="radio"
          name="defaultVariant"
          checked={Boolean(variant?.isDefault)}
          onChange={onSetDefault}
          className="h-4 w-4"
        />

        <div>
          <p className="text-sm font-medium">Default Variant</p>
          <p className="text-xs text-gray-500">Default variant cannot have attributes.</p>
        </div>
      </div>

      {/* VARIANT IMAGE */}
      <div className="mt-5">
        <label className={labelClass}>Variant Image</label>

        <div className="mt-2 rounded-2xl border bg-white p-4">
          <ImageUploader
            initialImageUrl={variant?.variantImage || undefined}
            onFileSelect={onImageSelect}
          />
        </div>
      </div>

      {/* ATTRIBUTES */}
      <div className="mt-6">
        <h4 className="font-semibold">Variant Attributes</h4>

        {variant?.isDefault && (
          <p className="mt-1 text-xs text-amber-600">
            Attributes are disabled because this is the default variant.
          </p>
        )}

        {!variant?.isDefault && (
          <div className="mt-4 space-y-4">
            {attributes.map((attribute) => (
              <div key={attribute.id} className="rounded-xl border bg-white p-4">
                <p className="font-medium">{attribute.attributeNameEn}</p>

                <p dir="rtl" className="text-xs text-gray-500">
                  {attribute.attributeNameAr}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {attribute.attributeValues.map((value) => {
                    const selected = variant?.attributeValueIds?.includes(value.id);

                    return (
                      <button
                        type="button"
                        key={value.id}
                        onClick={() => onToggleAttribute(value.id)}
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          selected
                            ? "border-black bg-black text-white"
                            : "bg-white hover:border-black"
                        }`}
                      >
                        {value.attributeValueEn}

                        <span dir="rtl" className="ml-2 text-xs opacity-70">
                          {value.attributeValueAr}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
