"use client";

import React, { useEffect, useState } from "react";
import { AttributesWithValues } from "@/features/products/types/index";
import DefaultVariant from "./DefaultVariant";
import AdvancedVariants from "./AdvancedVariants";
import { useFormContext } from "react-hook-form";
import { CreateProductFormType } from "@/server/products/validators";

interface Props {
  attributesWithValues: AttributesWithValues[];
  onVariantImageSelect: (index: number, file: File | null) => void;
}

export default function VariantInformationSection({
  attributesWithValues,
  onVariantImageSelect,
}: Props) {
  const { setValue } = useFormContext<CreateProductFormType>();

  const [isDefault, setIsDefault] = useState(true);

  useEffect(() => {
    setValue("variants.0.isDefault", true);
    setValue("variants.0.attributeValueIds", []);
  }, [setValue]);

  const handleVariantTypeChange = (defaultVariant: boolean) => {
    setIsDefault(defaultVariant);

    if (defaultVariant) {
      setValue("variants", [
        {
          sku: "",
          variantImage: "",
          price: 0,
          discountPercentage: 0,
          stock: 0,
          isDefault: true,
          attributeValueIds: [],
        },
      ]);
    } else {
      setValue("variants", [
        {
          sku: "",
          variantImage: "",
          price: 0,
          discountPercentage: 0,
          stock: 0,
          isDefault: false,
          attributeValueIds: [],
        },
      ]);
    }
  };

  return (
    <section className="rounded-2xl border mt-10  border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Product Variants
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to manage the variants of this product.
        </p>
      </div>

      {/* Variant Type Selection */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Default Variant */}
        <button
          type="button"
          onClick={() => handleVariantTypeChange(true)}
          className={`group relative rounded-2xl border p-5 text-left transition-all duration-200 ${
            isDefault
              ? "border-gray-900 bg-gray-50 shadow-sm"
              : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          {/* Selected indicator */}
          <div className="absolute right-5 top-5">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                isDefault
                  ? "border-gray-900 bg-gray-900"
                  : "border-gray-300 bg-white"
              }`}
            >
              {isDefault && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>

          <div className="pr-8">
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition ${
                isDefault
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              }`}
            >
              {/* Box icon */}
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

            <h3 className="font-semibold text-gray-900">Default Variant</h3>

            <p className="mt-1.5 text-sm leading-6 text-gray-500">
              A simple product with one variant and no attributes such as color
              or size.
            </p>

            <div className="mt-4 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gray-500">
              Single variant
            </div>
          </div>
        </button>

        {/* Advanced Variants */}
        <button
          type="button"
          onClick={() => handleVariantTypeChange(false)}
          className={`group relative rounded-2xl border p-5 text-left transition-all duration-200 ${
            !isDefault
              ? "border-gray-900 bg-gray-50 shadow-sm"
              : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          {/* Selected indicator */}
          <div className="absolute right-5 top-5">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                !isDefault
                  ? "border-gray-900 bg-gray-900"
                  : "border-gray-300 bg-white"
              }`}
            >
              {!isDefault && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>

          <div className="pr-8">
            <div
              className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition ${
                !isDefault
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
              }`}
            >
              {/* Sliders icon */}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                <circle cx="9" cy="6" r="2" fill="currentColor" />
                <circle cx="15" cy="12" r="2" fill="currentColor" />
                <circle cx="10" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>

            <h3 className="font-semibold text-gray-900">Advanced Variants</h3>

            <p className="mt-1.5 text-sm leading-6 text-gray-500">
              Create multiple variants with attributes such as color, size,
              material, and more.
            </p>

            <div className="mt-4 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-gray-500">
              Multiple variants
            </div>
          </div>
        </button>
      </div>

      {/* Selected Variant Form */}
      <div className="mt-8 border-t border-gray-100 pt-8">
        {isDefault ? (
          <DefaultVariant />
        ) : (
          <AdvancedVariants
            attributesWithValues={attributesWithValues}
            onVariantImageSelect={onVariantImageSelect}
          />
        )}
      </div>
    </section>
  );
}
