
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import ImageUploader from "@/components/test/ImageUploader";
import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";
import {
  updateCategorySchema,
  UpdateCategorySchema,
} from "@/server/categories/validators";
import { adminUpdateCategory } from "@/features/catalog/categories/api/categories.client.api";

type Props = {
  category: {
    id: string;
    image: string;
    slug: string;
    categoryNameAr: string;
    categoryNameEn: string;
    categoryDescriptionAr: string;
    categoryDescriptionEn: string;
    isFeatured: boolean;
  };
};

export default function EditCategoryForm({ category }: Props) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateCategorySchema>({
    resolver: zodResolver(updateCategorySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      categoryNameEn: category.categoryNameEn,
      categoryNameAr: category.categoryNameAr,
      categoryDescriptionEn: category.categoryDescriptionEn,
      categoryDescriptionAr: category.categoryDescriptionAr,
      image: category.image,
        isFeatured: category.isFeatured ?? false,

    },
  });

  const { startUpload, isUploading } = useUploadThing("categories");

  const onSubmit = async (data: UpdateCategorySchema) => {
    try {
      setLoading(true);

      let imageUrl = data.image;

      if (selectedFile) {
 const uploaded = await startUpload([selectedFile]);

const url = uploaded?.[0]?.serverData?.uploadedUrl

if (!url) {
  throw new Error("Image upload failed");
}

imageUrl = url;
      }

      const updatedData = {
        ...data,
        image: imageUrl,
      };

      await toastResponse(
        adminUpdateCategory(category.id, updatedData),
        "Category updated successfully"
      );

      reset(updatedData);
      router.push("/dashboard/categories");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">English Name</label>
          <input
            {...register("categoryNameEn")}
            placeholder="Enter English category name"
            className={inputClass}
          />
          {errors.categoryNameEn && (
            <p className="text-xs text-red-600">
              {errors.categoryNameEn.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Arabic Name</label>
          <input
            dir="rtl"
            {...register("categoryNameAr")}
            placeholder="أدخل اسم التصنيف بالعربي"
            className={inputClass}
          />
          {errors.categoryNameAr && (
            <p className="text-xs text-red-600">
              {errors.categoryNameAr.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">English Description</label>
          <textarea
            {...register("categoryDescriptionEn")}
            placeholder="Enter English description"
            rows={3}
            className={`${inputClass} resize-none`}
          />
          {errors.categoryDescriptionEn && (
            <p className="text-xs text-red-600">
              {errors.categoryDescriptionEn.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Arabic Description</label>
          <textarea
            dir="rtl"
            {...register("categoryDescriptionAr")}
            placeholder="أدخل وصف التصنيف بالعربي"
            rows={3}
            className={`${inputClass} resize-none`}
          />
          {errors.categoryDescriptionAr && (
            <p className="text-xs text-red-600">
              {errors.categoryDescriptionAr.message}
            </p>
          )}
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium">Category Image</label>

          <div className="rounded-lg border bg-gray-50 p-2">
            <ImageUploader
              initialImageUrl={category.image}
              onFileSelect={(file) => {
                setSelectedFile(file);

                if (!file) {
                  setValue("image", "", {
                    shouldValidate: true,
                  });
                } else {
                  setValue("image", "temp-image", {
                    shouldValidate: true,
                  });
                  clearErrors("image");
                }
              }}
            />
          </div>

          {errors.image && (
            <p className="text-xs text-red-600">
              {errors.image.message}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            {...register("isFeatured")}
            className="h-4 w-4 rounded border-gray-300"
          />
          <span>Featured Category</span>
        </label>
      </div>

      <div className="flex justify-end gap-2 border-t pt-3">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading || isUploading}
          className="rounded-lg border px-5 py-2 text-sm transition hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || isUploading}
          className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading || isUploading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

