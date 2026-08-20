"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";
import { updateCategorySchema, type UpdateCategorySchema } from "@/server/categories/validators";
import { adminUpdateCategory } from "@/features/catalog/categories/api/categories.client.api";

import CategoryTextFields from "./CategoryTextFields";
import CategoryImageField from "./CategoryImageField";
import CategoryFeaturedField from "./CategoryFeaturedField";
import FormActions from "./FormActions";

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

  const form = useForm<UpdateCategorySchema>({
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

  const { handleSubmit, setValue, reset, clearErrors } = form;

  const { startUpload, isUploading } = useUploadThing("categories");

  const onSubmit = async (data: UpdateCategorySchema) => {
    try {
      setLoading(true);

      let imageUrl = data.image;

      if (selectedFile) {
        const uploaded = await startUpload([selectedFile]);
        const url = uploaded?.[0]?.serverData?.uploadedUrl;

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

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CategoryTextFields />

          <CategoryImageField
            initialImageUrl={category.image}
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

        <FormActions loading={loading || isUploading} onCancel={() => router.back()} />
      </form>
    </FormProvider>
  );
}
