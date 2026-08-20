"use client";

import { useFormContext } from "react-hook-form";

import ImageUploader from "@/components/test/ImageUploader";
import type { UpdateBannerSchema } from "@/server/banner/validators";

type Props = {
  initialImageUrl: string;
  onFileSelect: (file: File | null) => void;
};

export default function BannerImageField({ initialImageUrl, onFileSelect }: Props) {
  const {
    formState: { errors },
  } = useFormContext<UpdateBannerSchema>();

  return (
    <div className="md:col-span-2 space-y-3">
      <label className="text-sm font-medium text-gray-700">Banner Image</label>

      <div className="rounded-xl border bg-gray-50 p-5">
        <ImageUploader initialImageUrl={initialImageUrl} onFileSelect={onFileSelect} />
      </div>

      {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
    </div>
  );
}
