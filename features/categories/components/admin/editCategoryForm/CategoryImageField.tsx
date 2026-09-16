"use client";

import { useFormContext } from "react-hook-form";

import ImageUploader from "@/components/test/ImageUploader";
import type { UpdateCategorySchema } from "@/server/categories/validators";

type Props = {
  initialImageUrl: string;
  onFileSelect: (file: File | null) => void;
};

export default function CategoryImageField({ initialImageUrl, onFileSelect }: Props) {
  const {
    formState: { errors },
  } = useFormContext<UpdateCategorySchema>();

  return (
    <div className="space-y-1 md:col-span-2">
      <label className="text-sm font-medium">Category Image</label>

      <div className="rounded-lg border bg-gray-50 p-2">
        <ImageUploader initialImageUrl={initialImageUrl} onFileSelect={onFileSelect} />
      </div>

      {errors.image && <p className="text-xs text-red-600">{errors.image.message}</p>}
    </div>
  );
}
