"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import ImageUploader from "@/components/test/ImageUploader";
import { CategoiresNameAndIDs } from "@/features/products/types/index";
import { CreateProductFormType } from "@/server/products/validators";

interface Props {
  categoriesNamesAndIDs: CategoiresNameAndIDs[];
  onProductCardImageSelect: (file: File | null) => void;
  onProductImagesSelect: (files: File[]) => void;
  initialCardImageUrl?: string;
  initialProductImages?: string[];
}

interface ImagePreview {
  file?: File;
  existingUrl?: string;
  url: string;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

const labelClass = "text-sm font-medium  ml-3 text-gray-700";

export default function ProductInformationSection({
  categoriesNamesAndIDs,
  onProductCardImageSelect,
  onProductImagesSelect,
  initialCardImageUrl,
  initialProductImages,
}: Props) {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreateProductFormType>();

  const [productImagePreviews, setProductImagePreviews] = useState<
    ImagePreview[]
  >(() =>
    (initialProductImages ?? []).map((url) => ({
      existingUrl: url,
      url,
    })),
  );

  const [cardPreviewUrl, setCardPreviewUrl] = useState<string | null>(
    initialCardImageUrl ?? null,
  );
  const [isReplacingCardImage, setIsReplacingCardImage] =
    useState(!initialCardImageUrl);

  useEffect(() => {
    return () => {
      productImagePreviews.forEach((p) => {
        if (p.file) URL.revokeObjectURL(p.url);
      });
    };
  }, []);

  const syncProductImages = (previews: ImagePreview[]) => {
    const newFiles = previews.filter((p) => p.file).map((p) => p.file!);
    onProductImagesSelect(newFiles);
    setValue(
      "productImages",
      previews.map((p) => p.existingUrl ?? "pending-image"),
      { shouldDirty: true, shouldValidate: true },
    );

    if (previews.length > 0) {
      clearErrors("productImages");
    }
  };

  const handleAddProductImages = (newFiles: File[]) => {
    setProductImagePreviews((prev) => {
      const additions = newFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      const updated = [...prev, ...additions];
      syncProductImages(updated);
      return updated;
    });
  };

  const handleRemoveProductImage = (index: number) => {
    setProductImagePreviews((prev) => {
      const removed = prev[index];
      if (removed.file) URL.revokeObjectURL(removed.url);
      const updated = prev.filter((_, i) => i !== index);
      syncProductImages(updated);
      return updated;
    });
  };

  return (
    <section className="rounded-2xl border bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Product Information
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Basic information and images about the product.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Product Name EN */}
        <div className="space-y-1">
          <label className={labelClass}>
            <span className="text-red-500">*</span> Product Name (EN)
          </label>
          <input
            {...register("productNameEn")}
            className={inputClass}
            placeholder="Product name"
          />
          {errors.productNameEn && (
            <p className="text-xs text-red-600">
              {errors.productNameEn.message}
            </p>
          )}
        </div>

        {/* Product Name AR */}
        <div className="space-y-1">
          <label className={labelClass}>
            <span className="text-red-500">*</span> Product Name (AR)
          </label>
          <input
            dir="rtl"
            {...register("productNameAr")}
            className={inputClass}
            placeholder="اسم المنتج"
          />
          {errors.productNameAr && (
            <p className="text-xs text-red-600">
              {errors.productNameAr.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className={labelClass}>
            <span className="text-red-500">*</span> Category
          </label>
          <select {...register("categoryId")} className={inputClass}>
            <option value="">Select category</option>
            {categoriesNamesAndIDs.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-xs text-red-600">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Featured */}

        {/* Description EN */}
        <div className="space-y-1 md:col-span-2">
          <label className={labelClass}>
            <span className="text-red-500">*</span> Description (EN)
          </label>
          <textarea
            {...register("productDescriptionEn")}
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder="Product description"
          />
          {errors.productDescriptionEn && (
            <p className="text-xs text-red-600">
              {errors.productDescriptionEn.message}
            </p>
          )}
        </div>

        {/* Description AR */}
        <div className="space-y-1 md:col-span-2">
          <label className={labelClass}>
            <span className="text-red-500">*</span> Description (AR)
          </label>
          <textarea
            dir="rtl"
            {...register("productDescriptionAr")}
            rows={5}
            className={`${inputClass} resize-none`}
            placeholder="وصف المنتج"
          />
          {errors.productDescriptionAr && (
            <p className="text-xs text-red-600">
              {errors.productDescriptionAr.message}
            </p>
          )}
        </div>

        {/* Product Card Image */}
        <div className="space-y-3 md:col-span-2">
          <div>
            <label className={labelClass}>
              <span className="text-red-500">*</span> Product Card Image
            </label>
            <p className="mt-1 text-xs text-gray-500">
              This image will be used as the main product image in cards and
              product listings.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-4">
            {!isReplacingCardImage && cardPreviewUrl ? (
              <div className="flex items-center gap-4">
                <img
                  src={cardPreviewUrl}
                  alt="Current product card image"
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsReplacingCardImage(true)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Replace Image
                </button>
              </div>
            ) : (
              <ImageUploader
                onFileSelect={(file) => {
                  onProductCardImageSelect(file);
                  setCardPreviewUrl(
                    file
                      ? URL.createObjectURL(file)
                      : (initialCardImageUrl ?? null),
                  );

                  setValue("productCardImage", file ? "pending-image" : "", {
                    shouldDirty: true,
                    shouldValidate: true,
                  });

                  if (file) clearErrors("productCardImage");
                }}
              />
            )}
          </div>

          {errors.productCardImage && (
            <p className="text-xs text-red-600">
              {errors.productCardImage.message}
            </p>
          )}
        </div>

        {/* Additional Product Images */}
        <div className="space-y-3 md:col-span-2">
          <div>
            <label className={labelClass}>Additional Product Images</label>
            <p className="mt-1 text-xs text-gray-500">
              Select images to display in the product gallery. You can add more
              in multiple batches.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-5">
            <input
              id="product-images-input"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              className="hidden"
              onChange={(event) => {
                const files = Array.from(event.target.files ?? []);
                if (files.length > 0) {
                  handleAddProductImages(files);
                }
                event.currentTarget.value = "";
              }}
            />

            <label
              htmlFor="product-images-input"
              className="inline-flex cursor-pointer items-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
            >
              + Select Images
            </label>

            <p className="mt-2 text-xs text-gray-400">
              PNG, JPG, WEBP — select one or more images
              {productImagePreviews.length > 0 &&
                ` (${productImagePreviews.length} selected)`}
            </p>
          </div>

          {/* Thumbnails */}
          {productImagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {productImagePreviews.map((preview, index) => (
                <div
                  key={preview.url}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200"
                >
                  <img
                    src={preview.url}
                    alt={`Product image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveProductImage(index)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.productImages && (
            <p className="text-xs text-red-600">
              {errors.productImages.message}
            </p>
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 transition hover:bg-gray-100/50 select-none">
          <input
            type="checkbox"
            {...register("isFeatured")}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-black focus:ring-2 focus:ring-black focus:ring-offset-1"
          />
          <span className="text-sm font-medium text-gray-700">
            Featured Product
          </span>
        </label>
      </div>
    </section>
  );
}
