"use client";

import { useFormContext } from "react-hook-form";

import ImageUploader from "@/components/test/ImageUploader";
import type { CategorySchema } from "@/server/categories/validators";

type Props = {
  onFileSelect: (file: File | null) => void;
};

export default function CategoryImageField({ onFileSelect }: Props) {
  const {
    formState: { errors },
  } = useFormContext<CategorySchema>();

  return (
    <div className="space-y-2 md:col-span-2">
      <label className="text-sm font-medium text-gray-700">Category Image</label>

      <div className="rounded-xl border bg-gray-50 p-3">
        <ImageUploader onFileSelect={onFileSelect} />
      </div>

      {errors.image && <p className="text-xs text-red-600">{errors.image.message}</p>}
    </div>
  );
}
