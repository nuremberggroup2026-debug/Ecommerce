"use client";

import React, { useState } from "react";
// 1. Import FieldValues and Path from react-hook-form
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  FileUp,
  X,
  Loader2,
  Paperclip,
  CheckCircle2,
  Eye,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Locale } from "@/types";

interface FileUploaderProps<T extends FieldValues> {
  name: Path<T>; 
  label: string;
  control: Control<T>; 
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  locale?: Locale;
}

interface UploadResponse {
  name: string;
  ufsUrl?: string;
}

export default function FileUploader<T extends FieldValues>({
  name,
  label,
  control,
  error,
  required,
  locale,
  disabled,
}: FileUploaderProps<T>) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const isArabic = locale === "ar";

  const { startUpload } = useUploadThing("cv", {
    onClientUploadComplete(res: UploadResponse[]) {
      const upload = res?.[0];
      if (upload) {
        setFileName(upload.name);
        setIsUploading(false);
        toast.success("File uploaded successfully!");
      }
    },
    onUploadError(err: Error) {
      setIsUploading(false);
      toast.error(`Upload failed: ${err.message}`);
    },
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("File size must be less than 8MB.");
      return;
    }

    setIsUploading(true);
    const res = await startUpload([file]);
    const upload = res?.[0];

    if (upload?.ufsUrl) {
      onChange(upload.ufsUrl);
    } else {
      setIsUploading(false);
    }
  };

  const handleRemove = (onChange: (value: string) => void) => {
    onChange("");
    setFileName(null);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "File is required" : false }}
      render={({ field }) => {
        const isFilePresent = !!field.value;
        const displayFileName = fileName || "Uploaded Document.pdf";

        return (
          <div className="w-full space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {required && <span className="text-destructive mr-1 ">*</span>}
              {label}
            </label>

            <div className="relative">
              {!isFilePresent ? (
                <label
                  className={cn(
                    "flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
                    "hover:border-primary/50 hover:bg-accent/50",
                    error
                      ? "border-destructive bg-destructive/5"
                      : "border-muted-foreground/25",
                    (disabled || isUploading) &&
                      "cursor-not-allowed opacity-50",
                  )}
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    {isUploading ? (
                      <Loader2 className="mb-3 h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                      <FileUp className="mb-3 h-8 w-8 text-muted-foreground" />
                    )}
                    <p className="mb-1 text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">
                        {isArabic ? "اضغط لتحميل ملف" : " Click to upload"}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      {isArabic ? "PDF (بحد اقصى 8 ميجابايت)" : "PDF (Max 8MB)"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    disabled={disabled || isUploading}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field.onChange)}
                  />
                </label>
              ) : (
                <div className="duration-200 animate-in fade-in zoom-in-95 flex items-center gap-3 rounded-lg border border-slate-200 bg-card p-3 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Paperclip className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {displayFileName}
                    </p>
                    <div className="mt-1 flex items-center gap-4">
                      <span className="flex items-center gap-1 text-[11px] font-medium text-green-600">
                        <CheckCircle2 className="h-3 w-3" />
                        Ready
                      </span>

                      {typeof field.value === "string" &&
                        field.value.startsWith("http") && (
                          <a
                            href={field.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[11px] font-bold text-primary transition-all hover:underline"
                          >
                            <Eye className="h-3 w-3" /> View Document
                          </a>
                        )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(field.onChange)}
                    className="rounded-md p-2 text-slate-400 transition-colors hover:bg-destructive/10 hover:text-destructive"
                    disabled={isUploading}
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {error && (
              <p className="flex flex-row gap-2 text-[0.8rem] font-medium text-destructive">
                <AlertCircle size={12} className="mt-0.5 text-red-600" />
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
