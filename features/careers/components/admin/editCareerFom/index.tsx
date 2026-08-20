"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";

import { updateCareerSchema, type UpdateCareerSchema } from "@/server/careers/validators";
import { adminUpdateCareer } from "@/features/careers/api/careers.client.api";

import CareerTextFields from "./CareerTextFields";
import CareerImageField from "./CareerImageField";
import FormActions from "./FormActions";

type Props = {
  career: {
    id: string;
    positionEn: string;
    positionAr: string;
    descriptionEn: string;
    descriptionAr: string;
    requirementsEn: string[];
    requirementsAr: string[];
    experienceEn: string;
    experienceAr: string;
    roleEn: string;
    roleAr: string;
    image: string;
  };
};

export default function EditCareerForm({ career }: Props) {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<UpdateCareerSchema>({
    resolver: zodResolver(updateCareerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      positionEn: career.positionEn,
      positionAr: career.positionAr,
      descriptionEn: career.descriptionEn,
      descriptionAr: career.descriptionAr,
      requirementsEn: career.requirementsEn,
      requirementsAr: career.requirementsAr,
      experienceEn: career.experienceEn,
      experienceAr: career.experienceAr,
      roleEn: career.roleEn,
      roleAr: career.roleAr,
      image: career.image,
    },
  });

  const { handleSubmit, setValue, reset, clearErrors } = form;

  const { startUpload, isUploading } = useUploadThing("careers");

  const onSubmit = async (data: UpdateCareerSchema) => {
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
        adminUpdateCareer(career.id, updatedData),
        "Career updated successfully"
      );

      reset(updatedData);

      router.push("/dashboard/careers");
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Edit Career</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update career opportunity information
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <CareerTextFields />

          <CareerImageField
            initialImageUrl={career.image}
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
        </div>

        <FormActions loading={loading || isUploading} onCancel={() => router.back()} />
      </form>
    </FormProvider>
  );
}
