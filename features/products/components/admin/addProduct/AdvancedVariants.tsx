"use client";

import { useEffect, useState } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { CreateProductFormType } from "@/server/products/validators";
import { AttributesWithValues } from "@/features/products/types/index";
import ImageUploader from "@/components/test/ImageUploader";

interface Props {
  attributesWithValues: AttributesWithValues[];
  onVariantImageSelect: (index: number, file: File | null) => void;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

const labelClass = "text-sm font-medium text-gray-700";

const calculateFinalPrice = (
  price: number = 0,
  discountPercentage: number = 0,
) => {
  const safePrice = Number.isFinite(price) ? Math.max(0, price) : 0;
  const safeDiscount = Number.isFinite(discountPercentage)
    ? Math.min(100, Math.max(0, discountPercentage))
    : 0;
  return Number((safePrice - safePrice * (safeDiscount / 100)).toFixed(2));
};

export default function AdvancedVariants({
  attributesWithValues,
  onVariantImageSelect,
}: Props) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProductFormType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const [selections, setSelections] = useState<
    Record<number, Record<string, string>>
  >({});

  const watchedVariants = useWatch({
    control,
    name: "variants",
  });

  const handleAttributeChange = (
    variantIndex: number,
    attributeId: string,
    valueId: string,
  ) => {
    setSelections((prev) => {
      const variantSelections = { ...(prev[variantIndex] ?? {}) };

      if (valueId) {
        variantSelections[attributeId] = valueId;
      } else {
        delete variantSelections[attributeId];
      }

      const next = { ...prev, [variantIndex]: variantSelections };

      setValue(
        `variants.${variantIndex}.attributeValueIds`,
        Object.values(variantSelections),
        { shouldDirty: true, shouldValidate: true },
      );

      return next;
    });
  };

  return (
    <section className="rounded-2xl border bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Advanced Variants</h2>
        <p className="mt-1 text-sm text-gray-500">
          Create multiple product variants with different attributes.
        </p>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => {
          const variantErrors = errors.variants?.[index];
          const currentPrice = watchedVariants?.[index]?.price || 0;
          const currentDiscount =
            watchedVariants?.[index]?.discountPercentage || 0;
          const computedFinalPrice = calculateFinalPrice(
            currentPrice,
            currentDiscount,
          );

          return (
            <div
              key={field.id}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Variant {index + 1}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Configure this variant's details.
                  </p>
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      remove(index);
                      setSelections((prev) => {
                        const next = { ...prev };
                        delete next[index];
                        return next;
                      });
                    }}
                    className="text-sm text-red-500 transition hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {/* SKU */}
                <div className="space-y-1">
                  <label className={labelClass}>
                    <span className="text-red-500">*</span> SKU
                  </label>
                  <input
                    {...register(`variants.${index}.sku`)}
                    className={inputClass}
                    placeholder="e.g. TSHIRT-RED-M"
                  />
                  {variantErrors?.sku && (
                    <p className="text-xs text-red-600">
                      {variantErrors.sku.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className={labelClass}>
                    <span className="text-red-500">*</span> Price
                  </label>
                  <input
                    type="text"
                    step="0.01"
                    {...register(`variants.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    className={inputClass}
                    placeholder="59.99"
                  />
                  {variantErrors?.price && (
                    <p className="text-xs text-red-600">
                      {variantErrors.price.message}
                    </p>
                  )}
                </div>

                {/* Discount */}
                <div className="space-y-1">
                  <label className={labelClass}>Discount Percentage</label>
                  <input
                    type="text"
                    step="0.01"
                    {...register(`variants.${index}.discountPercentage`, {
                      setValueAs: (value) =>
                        value === "" ? undefined : Number(value),
                    })}
                    className={inputClass}
                    placeholder="15"
                  />
                  {variantErrors?.discountPercentage && (
                    <p className="text-xs text-red-600">
                      {variantErrors.discountPercentage.message}
                    </p>
                  )}
                </div>

                {/* Final Price (Disabled / Auto calculated) */}
                <div className="space-y-1">
                  <label className={labelClass}> Final Price</label>
                  <input
                    type="text"
                    step="0.01"
                    value={computedFinalPrice}
                    readOnly
                    tabIndex={-1}
                    className={`${inputClass} cursor-not-allowed bg-gray-100 font-medium text-gray-600 focus:border-gray-200 focus:ring-0`}
                    placeholder="0.00"
                  />
                  {/* Hidden field so React Hook Form registers value accurately */}
                  <input type="hidden" value={computedFinalPrice} />
                </div>

                {/* Stock */}
                <div className="space-y-1">
                  <label className={labelClass}>
                    <span className="text-red-500">*</span> Stock
                  </label>
                  <input
                    type="text"
                    {...register(`variants.${index}.stock`, {
                      valueAsNumber: true,
                    })}
                    className={inputClass}
                    placeholder="30"
                  />
                  {variantErrors?.stock && (
                    <p className="text-xs text-red-600">
                      {variantErrors.stock.message}
                    </p>
                  )}
                </div>

                {/* Attributes */}
                <div className="space-y-2 lg:col-span-3">
                  <label className={labelClass}>Attributes</label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {attributesWithValues.map((attribute) => (
                      <div key={attribute.attributeId}>
                        <label className="mb-1 block text-xs text-gray-500">
                          {attribute.attributeName}
                        </label>

                        <select
                          className={inputClass}
                          value={
                            selections[index]?.[attribute.attributeId] ?? ""
                          }
                          onChange={(event) =>
                            handleAttributeChange(
                              index,
                              attribute.attributeId,
                              event.target.value,
                            )
                          }
                        >
                          <option value="">Select value</option>

                          {attribute.attributeValues.map((value) => (
                            <option
                              key={value.attributeValueId}
                              value={value.attributeValueId}
                            >
                              {value.attributeValue}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {variantErrors?.attributeValueIds && (
                    <p className="text-xs text-red-600">
                      {variantErrors.attributeValueIds.message}
                    </p>
                  )}
                </div>

                {/* Variant Image */}
                <div className="space-y-2 lg:col-span-3">
                  <label className={labelClass}>Variant Image</label>

                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <ImageUploader
                      onFileSelect={(file) => onVariantImageSelect(index, file)}
                    />
                  </div>

                  {variantErrors?.variantImage && (
                    <p className="text-xs text-red-600">
                      {variantErrors.variantImage.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            sku: "",
            variantImage: "",
            price: 0,
            discountPercentage: 0,

            stock: 0,
            isDefault: false,
            attributeValueIds: [],
          })
        }
        className="mt-6 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
      >
        + Add Variant
      </button>
    </section>
  );
}
