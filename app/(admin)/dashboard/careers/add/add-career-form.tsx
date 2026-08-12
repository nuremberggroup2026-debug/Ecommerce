"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import ImageUploader from "@/components/test/ImageUploader";
import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";
import { careerSchema, CareerSchema } from "@/server/careers/validators";
import { adminAddCareer } from "@/features/careers/api/careers.client.api";

export default function AddCareerForm() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [requirementEnInput, setRequirementEnInput] = useState("");
  const [requirementArInput, setRequirementArInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<CareerSchema>({
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

  const requirementsEn = watch("requirementsEn");
  const requirementsAr = watch("requirementsAr");

  const { startUpload, isUploading } = useUploadThing("careers");

  const addEnglishRequirement = () => {
    const value = requirementEnInput.trim();

    if (!value) return;

    setValue("requirementsEn", [...requirementsEn, value], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setRequirementEnInput("");
    clearErrors("requirementsEn");
  };

  const addArabicRequirement = () => {
    const value = requirementArInput.trim();

    if (!value) return;

    setValue("requirementsAr", [...requirementsAr, value], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setRequirementArInput("");
    clearErrors("requirementsAr");
  };

  const removeEnglishRequirement = (index: number) => {
    setValue(
      "requirementsEn",
      requirementsEn.filter((_, i) => i !== index),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  const removeArabicRequirement = (index: number) => {
    setValue(
      "requirementsAr",
      requirementsAr.filter((_, i) => i !== index),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

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

  const inputClass =
    "w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add Career</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new career opportunity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            English Position
          </label>
          <input
            {...register("positionEn")}
            placeholder="Enter English career position"
            className={inputClass}
          />
          {errors.positionEn && (
            <p className="text-xs text-red-600">
              {errors.positionEn.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Arabic Position
          </label>
          <input
            dir="rtl"
            {...register("positionAr")}
            placeholder="أدخل المسمى الوظيفي بالعربي"
            className={inputClass}
          />
          {errors.positionAr && (
            <p className="text-xs text-red-600">
              {errors.positionAr.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
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
          <label className="text-sm font-medium text-gray-700">
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
          <label className="text-sm font-medium text-gray-700">
            English Experience
          </label>
          <input
            {...register("experienceEn")}
            placeholder="Enter required experience"
            className={inputClass}
          />
          {errors.experienceEn && (
            <p className="text-xs text-red-600">
              {errors.experienceEn.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
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
          <label className="text-sm font-medium text-gray-700">
            English Role
          </label>
          <textarea
            {...register("roleEn")}
            placeholder="Enter English role"
            rows={3}
            className={`${inputClass} resize-none`}
          />
          {errors.roleEn && (
            <p className="text-xs text-red-600">{errors.roleEn.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
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
            <p className="text-xs text-red-600">{errors.roleAr.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            English Requirements
          </label>

          <div className="flex gap-2">
            <input
              value={requirementEnInput}
              onChange={(e) => setRequirementEnInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addEnglishRequirement();
                }
              }}
              placeholder="Enter English requirement"
              className={inputClass}
            />

            <button
              type="button"
              onClick={addEnglishRequirement}
              className="shrink-0 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Add
            </button>
          </div>

          {requirementsEn.length > 0 && (
            <div className="space-y-2">
              {requirementsEn.map((requirement, index) => (
                <div
                  key={`${requirement}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-lg border bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-xs text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">
                      {requirement}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeEnglishRequirement(index)}
                    className="text-xs font-medium text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.requirementsEn && (
            <p className="text-xs text-red-600">
              {errors.requirementsEn.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Arabic Requirements
          </label>

          <div className="flex gap-2">
            <input
              dir="rtl"
              value={requirementArInput}
              onChange={(e) => setRequirementArInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addArabicRequirement();
                }
              }}
              placeholder="أدخل المتطلب بالعربي"
              className={inputClass}
            />

            <button
              type="button"
              onClick={addArabicRequirement}
              className="shrink-0 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Add
            </button>
          </div>

          {requirementsAr.length > 0 && (
            <div className="space-y-2">
              {requirementsAr.map((requirement, index) => (
                <div
                  key={`${requirement}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-lg border bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-xs text-white">
                      {index + 1}
                    </span>
                    <span dir="rtl" className="text-sm text-gray-700">
                      {requirement}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeArabicRequirement(index)}
                    className="text-xs font-medium text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.requirementsAr && (
            <p className="text-xs text-red-600">
              {errors.requirementsAr.message}
            </p>
          )}
        </div>

        <div className="space-y-3 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Career Image
          </label>

          <div className="rounded-xl border bg-gray-50 p-5">
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
            <p className="text-sm text-red-600">{errors.image.message}</p>
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
          {loading || isUploading ? "Creating..." : "Create Career"}
        </button>
      </div>
    </form>
  );
}