"use client";

import { Plus } from "lucide-react";
import { useFormContext, type FieldArrayWithId } from "react-hook-form";

import type { UpdateProductSchema } from "@/server/products/validators";

import type { ProductAttributeOption } from "./types";
import VariantCard from "./VariantCard";

type Props = {
  fields: FieldArrayWithId<UpdateProductSchema, "variants", "id">[];
  variants: UpdateProductSchema["variants"];
  attributes: ProductAttributeOption[];
  onAddVariant: () => void;
  onRemoveVariant: (index: number) => void;
  onSetDefaultVariant: (index: number) => void;
  onToggleAttribute: (index: number, valueId: string) => void;
  onUpdatePrice: (index: number, value: string) => void;
  onUpdateDiscount: (index: number, value: string) => void;
  onVariantImageSelect: (fieldId: string, file: File | null) => void;
};

export default function AdvancedVariantsSection({
  fields,
  variants,
  attributes,
  onAddVariant,
  onRemoveVariant,
  onSetDefaultVariant,
  onToggleAttribute,
  onUpdatePrice,
  onUpdateDiscount,
  onVariantImageSelect,
}: Props) {
  const {
    formState: { errors },
  } = useFormContext<UpdateProductSchema>();

  console.log("variants: ", variants);
  console.log("attributes: ", attributes);

  return (
    <>
      <div className="mb-6 flex items-center justify-end">
        <button
          type="button"
          onClick={onAddVariant}
          className="flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add Variant
        </button>
      </div>

      <div className="space-y-5">
        {fields.map((field, index) => (
          <VariantCard
            key={field.id}
            index={index}
            fieldId={field.id}
            variant={variants?.[index]}
            attributes={attributes}
            onRemove={() => onRemoveVariant(index)}
            onSetDefault={() => onSetDefaultVariant(index)}
            onToggleAttribute={(valueId) => onToggleAttribute(index, valueId)}
            onUpdatePrice={(value) => onUpdatePrice(index, value)}
            onUpdateDiscount={(value) => onUpdateDiscount(index, value)}
            onImageSelect={(file) => onVariantImageSelect(field.id, file)}
          />
        ))}
      </div>

      {errors.variants?.message && (
        <p className="mt-4 text-sm text-red-600">{errors.variants.message}</p>
      )}
    </>
  );
}
