"use client";

import { Plus, Trash2 } from "lucide-react";
import { UseFormRegister, FieldErrors, FieldArrayWithId } from "react-hook-form";
import ImageUploader from "@/components/test/ImageUploader";
import { ProductSchema } from "@/server/products/validators";

export interface ProductAttributeValueOption {
  id: string;
  attributeId: string;
  attributeValueEn: string;
  attributeValueAr: string;
}

export interface ProductAttributeOption {
  id: string;
  attributeNameEn: string;
  attributeNameAr: string;
  attributeValues: ProductAttributeValueOption[];
}

interface AdvancedVariantsSectionProps {
  register: UseFormRegister<ProductSchema>;
  errors: FieldErrors<ProductSchema>;
  variantFields: FieldArrayWithId<ProductSchema, "variants", "id">[];
  variants: ProductSchema["variants"];
  attributes: ProductAttributeOption[];
  addVariant: () => void;
  removeVariant: (index: number) => void;
  setDefaultVariant: (index: number) => void;
  toggleAttributeValue: (index: number, valueId: string) => void;
  isSelected: (index: number, valueId: string) => boolean;
  updatePrice: (index: number, price: number) => void;
  updateDiscount: (index: number, discount: number) => void;
  setVariantFiles: React.Dispatch<React.SetStateAction<Record<string, File | null>>>;
}

export default function AdvancedVariantsSection({
  register,
  errors,
  variantFields,
  variants,
  attributes,
  addVariant,
  removeVariant,
  setDefaultVariant,
  toggleAttributeValue,
  isSelected,
  updatePrice,
  updateDiscount,
  setVariantFiles,
}: AdvancedVariantsSectionProps) {
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <section className="rounded-2xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Product Variants</h2>
          <p className="mt-1 text-sm text-gray-500">
            Create variants with their own pricing, stock, images and attributes.
          </p>
        </div>

        <button
          type="button"
          onClick={addVariant}
          className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add Variant
        </button>
      </div>

      <div className="space-y-5">
        {variantFields.map((field, index) => {
          const variant = variants?.[index];

          return (
            <div key={field.id} className="rounded-2xl border bg-gray-50 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">Variant {index + 1}</h3>
                    {variant?.sku && <p className="text-xs text-gray-500">{variant.sku}</p>}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
                <div>
                  <label className={labelClass}>SKU</label>
                  <input
                    {...register(`variants.${index}.sku`)}
                    className={inputClass}
                    placeholder="SKU-001"
                  />
                  {errors.variants?.[index]?.sku && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.variants[index]?.sku?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant?.price ?? 0}
                    onChange={(e) => updatePrice(index, Number(e.target.value))}
                    className={inputClass}
                  />
                  {errors.variants?.[index]?.price && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.variants[index]?.price?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Discount %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={variant?.discountPercentage ?? 0}
                    onChange={(e) => updateDiscount(index, Number(e.target.value))}
                    className={inputClass}
                  />
                  {errors.variants?.[index]?.discountPercentage && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.variants[index]?.discountPercentage?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Final Price</label>
                  <input
                    type="number"
                    readOnly
                    value={variant?.finalPrice ?? 0}
                    className={`${inputClass} bg-gray-100`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Stock</label>
                  <input
                    type="number"
                    min="0"
                    {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                    className={inputClass}
                  />
                  {errors.variants?.[index]?.stock && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.variants[index]?.stock?.message}
                    </p>
                  )}
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="defaultVariant"
                  checked={variant?.isDefault === true}
                  onChange={() => setDefaultVariant(index)}
                  className="h-4 w-4"
                />
                <div>
                  <p className="text-sm font-medium">Default Variant</p>
                  <p className="text-xs text-gray-500">Default variant cannot have attributes.</p>
                </div>
              </label>

              <div className="mt-6">
                <label className={labelClass}>Variant Image</label>
                <div className="mt-2 rounded-2xl border border-dashed bg-white p-5">
                  <ImageUploader
                    onFileSelect={(file) =>
                      setVariantFiles((current) => ({
                        ...current,
                        [field.id]: file,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold">Variant Attributes</h4>
                {variant?.isDefault ? (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
                    Default variant cannot have attributes
                  </div>
                ) : (
                  <div className="mt-3 space-y-4">
                    {attributes.map((attr) => (
                      <div key={attr.id} className="space-y-2">
                        <p className="text-xs font-medium text-gray-600">
                          {attr.attributeNameEn} / {attr.attributeNameAr}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {attr.attributeValues.map((val) => {
                            const active = isSelected(index, val.id);
                            return (
                              <button
                                key={val.id}
                                type="button"
                                onClick={() => toggleAttributeValue(index, val.id)}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                                  active
                                    ? "border-black bg-black text-white"
                                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                                }`}
                              >
                                {val.attributeValueEn} / {val.attributeValueAr}
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
        })}
      </div>
    </section>
  );
}