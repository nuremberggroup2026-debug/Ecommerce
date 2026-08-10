"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import ImageUploader from "@/components/test/ImageUploader";
import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";

import { categorySchema, CategorySchema } from "@/server/categories/validators";

import { adminAddCategory } from "@/features/catalog/categories/api/categories.client.api";

export default function AddCategoryForm() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      categoryNameEn: "",
      categoryNameAr: "",
      categoryDescriptionEn: "",
      categoryDescriptionAr: "",
      image: "",
      isFeatured: false,
    },
  });

  const { startUpload, isUploading } = useUploadThing("categories");

  const onSubmit = async (data: CategorySchema) => {
    try {
      setLoading(true);

      let imageUrl = "";

      if (selectedFile) {
        const uploaded = await startUpload([selectedFile]);

        const url = uploaded?.[0]?.url;

        if (!url) {
          throw new Error("Image upload failed");
        }

        imageUrl = url;
      }

      await toastResponse(
        adminAddCategory({
          ...data,
          image: imageUrl,
        }),
        "Category created successfully",
      );

      router.push("/dashboard/categories");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Add Category</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create a new category
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            English Name
          </label>

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
          <label className="text-sm font-medium text-gray-700">
            Arabic Name
          </label>

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
          <label className="text-sm font-medium text-gray-700">
            English Description
          </label>

          <textarea
            {...register("categoryDescriptionEn")}
            placeholder="Enter English category description"
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
          <label className="text-sm font-medium text-gray-700">
            Arabic Description
          </label>

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

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Category Image
          </label>

          <div className="rounded-xl border bg-gray-50 p-3">
            <ImageUploader
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
            <p className="text-xs text-red-600">{errors.image.message}</p>
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

      <div className="flex justify-end gap-2 border-t pt-4">
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
          {loading || isUploading ? "Creating..." : "Create Category"}
        </button>
      </div>
    </form>
  );
}
