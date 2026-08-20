"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import ImageUploader from "@/components/test/ImageUploader";
import type { UpdateProductSchema } from "@/server/products/validators";

import { inputClass, labelClass } from "./utils";

type Props = {
  cardImage: string;
  existingImages: string[];
  cardImageFile: File | null;
  setCardImageFile: (file: File | null) => void;
  productImageFiles: File[];
  setProductImageFiles: (files: File[]) => void;
  removeImages: string[];
  setRemoveImages: (updater: (prev: string[]) => string[]) => void;
};

export default function ProductImagesSection({
  cardImage,
  existingImages,
  setCardImageFile,
  productImageFiles,
  setProductImageFiles,
  removeImages,
  setRemoveImages,
}: Props) {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<UpdateProductSchema>();

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Product Images</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* CARD IMAGE */}
        <div className="space-y-3">
          <label className={labelClass}>Card Image</label>

          <div className="rounded-2xl border bg-gray-50 p-5">
            <ImageUploader
              initialImageUrl={cardImage}
              onFileSelect={(file) => {
                setCardImageFile(file);

                if (file) {
                  setValue("productCardImage", "pending", {
                    shouldValidate: true,
                  });

                  clearErrors("productCardImage");
                } else {
                  setValue("productCardImage", cardImage, {
                    shouldValidate: true,
                  });
                }
              }}
            />
          </div>

          {errors.productCardImage && (
            <p className="text-xs text-red-600">{errors.productCardImage.message}</p>
          )}
        </div>

        {/* ADDITIONAL IMAGES */}
        <div className="space-y-3">
          <label className={labelClass}>Additional Images</label>

          <input
            type="file"
            accept="image/*"
            multiple
            className={inputClass}
            onChange={(e) => {
              setProductImageFiles(Array.from(e.target.files || []));
              clearErrors("productImages");
            }}
          />

          <div className="grid grid-cols-3 gap-3">
            {existingImages
              .filter((x) => !removeImages.includes(x))
              .map((url, i) => (
                <div
                  key={`${url}-${i}`}
                  className="relative aspect-square overflow-hidden rounded-xl border"
                >
                  <Image src={url} alt="Product" fill unoptimized className="object-cover" />

                  <button
                    type="button"
                    onClick={() => setRemoveImages((v) => [...v, url])}
                    className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

            {productImageFiles.map((file, i) => (
              <div
                key={`${file.name}-${i}`}
                className="relative aspect-square overflow-hidden rounded-xl border"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  fill
                  unoptimized
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setProductImageFiles(productImageFiles.filter((_, x) => x !== i))
                  }
                  className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {errors.productImages && (
            <p className="text-xs text-red-600">{errors.productImages.message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
