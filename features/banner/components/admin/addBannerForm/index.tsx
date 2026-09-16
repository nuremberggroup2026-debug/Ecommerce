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

  const {
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { isSubmitting },
  } = form;

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
        "ADDING_BANNER",
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
      <div className="rounded-2xl border my-3  bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Add Banner</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a promotional banner to highlight products, and important store
          content.
        </p>
      </div>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-7xl rounded-xl border bg-white p-4 shadow-sm"
      >
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

        <div className="mt-8 flex justify-end border-t pt-6 gap-3">
          <button
            type="button"
            onClick={() => reset()}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-200 bg-white px-8 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
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
