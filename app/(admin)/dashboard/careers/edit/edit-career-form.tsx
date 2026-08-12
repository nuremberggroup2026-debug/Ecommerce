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
  updateCareerSchema,
  UpdateCareerSchema,
} from "@/server/careers/validators";

import { adminUpdateCareer } from "@/features/careers/api/careers.client.api";

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

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateCareerSchema>({
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

  const inputClass =
    "w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Career</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update career opportunity information
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">
            English Title
          </label>

          <input
            {...register("positionEn")}
            placeholder="Enter English career title"
            className={inputClass}
          />

          {errors.positionEn && (
            <p className="text-xs text-red-600">
              {errors.positionEn.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Arabic Title
          </label>

          <input
            dir="rtl"
            {...register("positionAr")}
            placeholder="أدخل عنوان الوظيفة بالعربي"
            className={inputClass}
          />

          {errors.positionAr && (
            <p className="text-xs text-red-600">
              {errors.positionAr.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            English Description
          </label>

          <textarea
            {...register("descriptionEn")}
            placeholder="Enter English career description"
            rows={5}
            className={`${inputClass} resize-none`}
          />

          {errors.descriptionEn && (
            <p className="text-xs text-red-600">
              {errors.descriptionEn.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Arabic Description
          </label>

          <textarea
            dir="rtl"
            {...register("descriptionAr")}
            placeholder="أدخل وصف الوظيفة بالعربي"
            rows={5}
            className={`${inputClass} resize-none`}
          />

          {errors.descriptionAr && (
            <p className="text-xs text-red-600">
              {errors.descriptionAr.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            English Experience
          </label>

          <input
            {...register("experienceEn")}
            placeholder="Enter English experience"
            className={inputClass}
          />

          {errors.experienceEn && (
            <p className="text-xs text-red-600">
              {errors.experienceEn.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Arabic Experience
          </label>

          <input
            dir="rtl"
            {...register("experienceAr")}
            placeholder="أدخل الخبرة المطلوبة"
            className={inputClass}
          />

          {errors.experienceAr && (
            <p className="text-xs text-red-600">
              {errors.experienceAr.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            English Role
          </label>

          <textarea
            {...register("roleEn")}
            placeholder="Enter English role"
            rows={3}
            className={`${inputClass} resize-none`}
          />

          {errors.roleEn && (
            <p className="text-xs text-red-600">
              {errors.roleEn.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Arabic Role
          </label>

          <textarea
            dir="rtl"
            {...register("roleAr")}
            placeholder="أدخل الدور الوظيفي بالعربي"
            rows={3}
            className={`${inputClass} resize-none`}
          />

          {errors.roleAr && (
            <p className="text-xs text-red-600">
              {errors.roleAr.message}
            </p>
          )}
        </div>

        <div className="space-y-3 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Career Image
          </label>

          <div className="rounded-xl border bg-gray-50 p-5">
            <ImageUploader
              initialImageUrl={career.image}
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
            <p className="text-sm text-red-600">
              {errors.image.message}
            </p>
          )}
        </div>
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
          {loading || isUploading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

