"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { adminAddBanner } from "@/features/banner/api/banners.client.api";
import { useUploadThing } from "@/utils/uploadthing";
import { toastResponse } from "@/lib/admintoast";

import { bannerSchema, type BannerSchema } from "@/server/banner/validators";

import BannerNameFields from "./BannerNameFields";
import BannerImageField from "./BannerImageField";

export default function AddBannerForm() {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<BannerSchema>({
    resolver: zodResolver(bannerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      nameEn: "",
      nameAr: "",
      image: "",
    },
  });

  const { handleSubmit, setValue, clearErrors } = form;

  const { startUpload, isUploading } = useUploadThing("banners");

  const onSubmit = async (data: BannerSchema) => {
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
        adminAddBanner({
          ...data,
          image: imageUrl,
        }),
        "bilal not halsis"
      );

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
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl rounded-xl border bg-white p-8 shadow-sm"
      >
        <div className="mb-8 border-b pb-5">
          <h2 className="text-2xl font-semibold text-gray-900">Add Banner</h2>
          <p className="mt-1 text-sm text-gray-500">Create a new banner</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <BannerNameFields />

          <BannerImageField
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

        <div className="mt-8 flex justify-end border-t pt-6">
          <button
            type="submit"
            disabled={loading || isUploading}
            className="rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading || isUploading ? "Creating..." : "Create Banner"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
