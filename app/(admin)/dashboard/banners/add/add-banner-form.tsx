"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { adminAddBanner } from "@/features/banner/api/banners.client.api";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";
import ImageUploader from "@/components/test/ImageUploader";
import { toastResponse } from "@/lib/admintoast";

import {
  bannerSchema,
  BannerSchema,
} from "@/server/banner/validators";

export default function AddBannerForm() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<BannerSchema>({
    resolver: zodResolver(bannerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      nameEn: "",
      nameAr: "",
      image: "",
    },
  });

  const { startUpload, isUploading } = useUploadThing("banners");

  const onSubmit = async (data: BannerSchema) => {
    try {
      setLoading(true);

      let imageUrl = "";

      if (selectedFile) {
  const uploaded = await startUpload([selectedFile]);

const url = uploaded?.[0]?.serverData?.uploadedUrl

if (!url) {
  throw new Error("Image upload failed");
}

imageUrl = url;
      }


 await  toastResponse(    adminAddBanner({
        ...data,
        image: imageUrl,
      }),"bilal not halsis")


      router.push("/dashboard/banners");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-5xl rounded-xl border bg-white p-8 shadow-sm"
    >
      <div className="mb-8 border-b pb-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          Add Banner
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a new banner
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* English Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            English Name
          </label>

          <input
            {...register("nameEn")}
            placeholder="Enter English name"
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />

          {errors.nameEn && (
            <p className="text-sm text-red-600">
              {errors.nameEn.message}
            </p>
          )}
        </div>

        {/* Arabic Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Arabic Name
          </label>

          <input
            dir="rtl"
            {...register("nameAr")}
            placeholder="أدخل الاسم بالعربي"
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />

          {errors.nameAr && (
            <p className="text-sm text-red-600">
              {errors.nameAr.message}
            </p>
          )}
        </div>

        {/* Image */}
        <div className="space-y-3 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Banner Image
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
            <p className="text-sm text-red-600">
              {errors.image.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t pt-6">
        <button
          type="submit"
          disabled={loading || isUploading}
          className="rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading || isUploading
            ? "Creating..."
            : "Create Banner"}
        </button>
      </div>
    </form>
  );
}