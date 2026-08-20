"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";
import { careerSchema, type CareerSchema } from "@/server/careers/validators";
import { adminAddCareer } from "@/features/careers/api/careers.client.api";

import CareerTextFields from "./CareerTextFields";
import RequirementsField from "./RequirementsField";
import CareerImageField from "./CareerImageField";
import FormActions from "./FormActions";

export default function AddCareerForm() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<CareerSchema>({
    resolver: zodResolver(careerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      positionEn: "",
      positionAr: "",
      descriptionEn: "",
      descriptionAr: "",
      requirementsEn: [],
      requirementsAr: [],
      experienceEn: "",
      experienceAr: "",
      roleEn: "",
      roleAr: "",
      image: "",
    },
  });

  const { handleSubmit, setValue, clearErrors } = form;

  const { startUpload, isUploading } = useUploadThing("careers");

  const onSubmit = async (data: CareerSchema) => {
    try {
      setLoading(true);

      let imageUrl = "";

      if (selectedFile) {
        const uploaded = await startUpload([selectedFile]);
        const url = uploaded?.[0]?.serverData?.uploadedUrl;

        if (!url) {
          throw new Error("Image upload failed");
        }

        imageUrl = url;
      }

      await toastResponse(
        adminAddCareer({
          ...data,
          image: imageUrl,
        }),
        "Career created successfully"
      );

      router.push("/dashboard/careers");
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Add Career</h1>
          <p className="mt-1 text-sm text-gray-500">Create a new career opportunity</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <CareerTextFields />

          <RequirementsField
            fieldName="requirementsEn"
            label="English Requirements"
            placeholder="Enter English requirement"
          />

          <RequirementsField
            fieldName="requirementsAr"
            label="Arabic Requirements"
            placeholder="أدخل المتطلب بالعربي"
            dir="rtl"
          />

          <CareerImageField
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
