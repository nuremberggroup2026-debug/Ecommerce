"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { FieldErrors, UseFormSetValue, UseFormClearErrors } from "react-hook-form";
import ImageUploader from "@/components/test/ImageUploader";
import { ProductSchema } from "@/server/products/validators";

interface ProductImagesSectionProps {
  errors: FieldErrors<ProductSchema>;
  productImageFiles: File[];
  setCardImageFile: (file: File | null) => void;
  setProductImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setValue: UseFormSetValue<ProductSchema>;
  clearErrors: UseFormClearErrors<ProductSchema>;
}

export default function ProductImagesSection({
  errors,
  productImageFiles,
  setCardImageFile,
  setProductImageFiles,
  setValue,
  clearErrors,
}: ProductImagesSectionProps) {
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <section className="rounded-2xl border bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Product Images</h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload the card image and additional product images.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <label className={labelClass}>Card Image</label>
          <div className="rounded-2xl border border-dashed bg-gray-50 p-5">
            <ImageUploader
              onFileSelect={(file) => {
                setCardImageFile(file);
                setValue("productCardImage", file ? "pending" : "", {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                if (file) clearErrors("productCardImage");
              }}
            />
          </div>
          {errors.productCardImage && (
            <p className="text-xs text-red-600">{errors.productCardImage.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className={labelClass}>Additional Images</label>
          <div className="rounded-2xl border border-dashed bg-gray-50 p-5">
            <input
              type="file"
              accept="image/*"
              multiple
              className="block w-full text-sm"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                setProductImageFiles(files);
                setValue(
                  "productImages",
                  files.map((_, i) => `pending-${i}`),
                  { shouldDirty: true, shouldValidate: true }
                );
                if (files.length) clearErrors("productImages");
              }}
            />
          </div>

          {productImageFiles.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {productImageFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
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
                      onClick={() => {
                        const files = productImageFiles.filter((_, i) => i !== index);
                        setProductImageFiles(files);
                        setValue(
                          "productImages",
                          files.map((_, i) => `pending-${i}`),
                          { shouldDirty: true, shouldValidate: true }
                        );
                      }}
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {productImageFiles.length} image{productImageFiles.length !== 1 ? "s" : ""} selected
              </p>
            </>
          )}

          {errors.productImages && (
            <p className="text-xs text-red-600">{errors.productImages.message}</p>
          )}
        </div>
      </div>
    </section>
  );
}