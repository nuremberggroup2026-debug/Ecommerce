"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";

import {
  categorySchema,
  type CategorySchema,
} from "@/server/categories/validators";
import { adminAddCategory } from "@/features/categories/api/categories.client.api";
import CategoryTextFields from "./CategoryTextFields";
import CategoryImageField from "./CategoryImageField";
import CategoryFeaturedField from "./CategoryFeaturedField";
import FormActions from "./FormActions";

export default function AddCategoryForm() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<CategorySchema>({
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

  const { handleSubmit, setValue, clearErrors, reset } = form;

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

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        <div className="rounded-2xl border my-3  bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Add Category</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a category to organize products and improve store navigation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 rounded-2xl border my-3  bg-white p-6 shadow-sm">
          <CategoryTextFields />

          <CategoryImageField
            onFileSelect={(file) => {
              setSelectedFile(file);

              if (!file) {
                setValue("image", "", { shouldValidate: true });
              } else {
                setValue("image", "temp-image", { shouldValidate: true });
                clearErrors("image");
              }
            }}
          />

          <CategoryFeaturedField />
        </div>

        <FormActions
          loading={loading || isUploading}
          onCancel={() => router.back()}
        />
      </form>
    </FormProvider>
  );
}
