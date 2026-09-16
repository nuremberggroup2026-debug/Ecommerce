"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  CreatePromoCodeInput,
  createPromoCodeSchema,
  type CreatePromoCodeSchema,
} from "@/server/promoCodes/validators";
import { adminAddPromoCode } from "@/features/promocodes/api/promocodes.client.api";
import { toastResponse } from "@/lib/admintoast";
import PromoCodeFields from "./PromoCodeFields";
import PromoCodeStatusField from "./PromoCodeStatusField";
import FormActions from "./FormActions";

export default function AddPromoCodeForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<CreatePromoCodeInput, unknown, CreatePromoCodeSchema>({
    resolver: zodResolver(createPromoCodeSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      code: "",
      discountPercentage: 0,
      maxUsage: 1,
      expiresAt: undefined,
      isActive: true,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;
  console.log("erroros0: ", errors);

  const onSubmit = async (data: CreatePromoCodeSchema) => {
    console.log("data in form: ", data);
    try {
      setLoading(true);

      await toastResponse(
        adminAddPromoCode(data),
        "Promo code created successfully",
      );

      router.push("/dashboard/promo-codes");
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
        <div className="rounded-2xl border my-3  bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Add Promo Code</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a promo code with discounts, usage limits, and validity
            dates.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 rounded-2xl border my-3  bg-white p-6 shadow-sm">
          <PromoCodeFields />
          <PromoCodeStatusField />
        </div>

        <FormActions loading={loading} onCancel={() => router.back()} />
      </form>
    </FormProvider>
  );
}
