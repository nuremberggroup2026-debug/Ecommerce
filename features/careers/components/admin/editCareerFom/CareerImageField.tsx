"use client";

import { useFormContext } from "react-hook-form";

import ImageUploader from "@/components/test/ImageUploader";
import type { UpdateCareerSchema } from "@/server/careers/validators";

type Props = {
  initialImageUrl: string;
  onFileSelect: (file: File | null) => void;
};

export default function CareerImageField({ initialImageUrl, onFileSelect }: Props) {
  const {
    formState: { errors },
  } = useFormContext<UpdateCareerSchema>();

  return (
    <div className="space-y-3 md:col-span-2">
      <label className="text-sm font-medium text-gray-700">Career Image</label>

      <div className="rounded-xl border bg-gray-50 p-5">
        <ImageUploader initialImageUrl={initialImageUrl} onFileSelect={onFileSelect} />
      </div>

      {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
    </div>
  );
}
