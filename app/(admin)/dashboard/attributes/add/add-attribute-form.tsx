
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { adminAddAttribute } from "@/features/catalog/attributes/api/attributes.client.api";
import { toastResponse } from "@/lib/admintoast";

import {
  attributeSchema,
  AttributeSchema,
} from "@/server/attributes/validators";

export default function AddAttributeForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AttributeSchema>({
    resolver: zodResolver(attributeSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      attributeNameEn: "",
      attributeNameAr: "",
    },
  });

  const onSubmit = async (data: AttributeSchema) => {
    try {
      setLoading(true);

      await toastResponse(
        adminAddAttribute(data),
        "Attribute created successfully"
      );

      router.push("/dashboard/attributes");
      router.refresh();
    } catch (error) {
      console.error("Failed to create attribute", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Add Attribute
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create a new attribute
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* English Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              English Name
            </label>

            <input
              {...register("attributeNameEn")}
              placeholder="Enter English name"
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />

            {errors.attributeNameEn && (
              <p className="text-sm text-red-600">
                {errors.attributeNameEn.message}
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
              {...register("attributeNameAr")}
              placeholder="أدخل اسم الخاصية بالعربي"
              className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />

            {errors.attributeNameAr && (
              <p className="text-sm text-red-600">
                {errors.attributeNameAr.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-end border-t pt-6">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Attribute"}
          </button>
        </div>
      </div>
    </form>
  );
}
