"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import ImageUploader from "@/components/test/ImageUploader";
import { toast } from "sonner";
import { adminUpdateBanner } from "@/features/banner/api/banners.client.api";
import { useRouter } from "next/navigation";


type Props = {
  banner: {
    id: string;
    nameEn: string;
    nameAr: string;
    image: string;
  };
};

type FormValues = {
  nameEn: string;
  nameAr: string;
  image: string;
};

export default function EditBannerForm({ banner }: Props) {
  const [image, setImage] = useState(banner.image);
  const [loading, setLoading] = useState(false);
    const router = useRouter();


  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      nameEn: banner.nameEn,
      nameAr: banner.nameAr,
      image: banner.image,
    },
  });

  const handleUploadComplete = (url: string) => {
    setImage(url);

    setValue("image", url, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      console.log("SEND DATA TO API:", data);

      await adminUpdateBanner(banner.id, data);

      // await updateBanner(banner.id, data);

      toast.success("Banner updated successfully");
            router.push("/dashboard/banners");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-6">
      <div className="space-y-2">
        <label className="font-medium">Name EN</label>

        <input
          {...register("nameEn")}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Name AR</label>

        <input
          {...register("nameAr")}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div className="space-y-3">
        <label className="font-medium">Image</label>

        {image && (
          <Image
            src={image}
            alt="Banner"
            width={500}
            height={250}
            className="h-60 w-full rounded-md border object-cover"
          />
        )}

        <ImageUploader
          endpoint="banners"
          initialImageUrl={watch("image")}
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
        />

        {errors.image && (
          <p className="text-xs text-red-600">Image is required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-black px-5 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
