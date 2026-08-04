"use client";

import { UploadCloudIcon, X } from "lucide-react";
import { useState, useEffect, useRef, DragEvent } from "react";
import Image from "next/image";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useUploadThing } from "@/utils/uploadthing";
import { Locale } from "@/types";

interface ImageUploaderProps {
  endpoint: keyof OurFileRouter;
  onUploadComplete: (url: string) => void;
  onUploadError: (error: Error) => void;
  initialImageUrl?: string | null;
  onDelete?: () => void;
  locale?:Locale
}

type UploadThingFile = {
  url?: string;
  uploadedUrl?: string;
  file?: {
    url?: string;
    ufsUrl?: string;
    ufs_url?: string;
  };
};

export default function ImageUploader({
  endpoint,
  onUploadComplete,
  onUploadError,
  initialImageUrl,
  locale,
  onDelete,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImageUrl || null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const { startUpload, isUploading } = useUploadThing(endpoint);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const MAX_BYTES = 2 * 1024 * 1024;

  useEffect(() => {
    setImageUrl(initialImageUrl || null);
  }, [initialImageUrl]);

  const handleDelete = () => {
    setImageUrl(null);
    setErrorMessage(null);
    onDelete?.();
  };

  function extractUrl(res: UploadThingFile[] | undefined): string | null {
    if (!res?.[0]) return null;
    return (
      res[0].url ??
      res[0].uploadedUrl ??
      res[0].file?.url ??
      res[0].file?.ufsUrl ??
      res[0].file?.ufs_url ??
      null
    );
  }

  async function uploadFile(file: File) {
    setErrorMessage(null);

    if (file.size > MAX_BYTES) {
      const err = new Error("File exceeds 2MB.");
      setErrorMessage("File is too large (max 2MB).");
      onUploadError(err);
      return;
    }

    try {
      const rawRes = await startUpload([file]);
      const url = extractUrl(rawRes as UploadThingFile[]);

      if (!url) {
        const err = new Error("No file URL returned.");
        setErrorMessage("Upload failed to return file URL.");
        onUploadError(err);
        return;
      }

      setImageUrl(url);
      onUploadComplete(url);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Upload failed");
      setErrorMessage("Upload failed. Try again.");
      onUploadError(error);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile(file);
    e.currentTarget.value = "";
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    uploadFile(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  // =========================
  // Preview Mode
  // =========================
  if (imageUrl) {
    return (
      <div className="relative h-40 w-full ">
        <Image
          src={imageUrl}
          alt="Uploaded Image"
          fill
          className="object-cover rounded-md"
        />
        <button
          type="button"
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInput}
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center h-40 w-full  border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragOver ? "bg-gray-50 dark:bg-gray-800" : ""}`}
      >
        <UploadCloudIcon className="w-10 h-10 text-gray-400 mb-2" />

       <p className="text-sm font-semibold">
  {isUploading
    ? locale === "ar"
      ? "جاري الرفع..."
      : "Uploading..."
    : isDragOver
    ? locale === "ar"
      ? "قم بإفلات الصورة هنا"
      : "Drop image here"
    : locale === "ar"
    ? "قم بإفلات الصورة هنا أو انقر للرفع"
    : "Drop image here or click to upload"}
</p>

        <p className="text-xs text-gray-400">
          {locale==="en"?"Image (Max 2MB)":"الصورة (الحد الأقصى 2 ميجابايت)"}
        </p>
      </div>

      {errorMessage && (
        <p className="text-red-600 text-sm font-medium">
          
          {errorMessage}
        </p>
      )}
    </div>
  );
}