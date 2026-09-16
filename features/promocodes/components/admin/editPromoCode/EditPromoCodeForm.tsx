"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { toastResponse } from "@/lib/admintoast";
import {
  updatePromoCodeSchema,
  type UpdatePromoCodeInput,
  type UpdatePromoCodeSchema,
} from "@/server/promoCodes/validators";
import { adminUpdatePromoCode } from "@/features/promocodes/api/promocodes.client.api";
import type { AllPromoCodes } from "@/features/promocodes/types/index";
import PromoCodeFields from "./PromoCodeFields";
import PromoCodeStatusField from "./PromoCodeStatusField";
import FormActions from "./FormActions";

type Props = {
  promoCode: AllPromoCodes;
};

export default function EditPromoCodeForm({ promoCode }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<UpdatePromoCodeInput, unknown, UpdatePromoCodeSchema>({
    resolver: zodResolver(updatePromoCodeSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      code: promoCode.code,
      discountPercentage: promoCode.discountPercentage,
      maxUsage: promoCode.maxUsage,
      expiresAt: promoCode.expiresAt ?? undefined,
      isActive: promoCode.isActive ?? false,
    },
  });

  const { handleSubmit, reset,formState:{errors} } = form;
  
  

  const onSubmit = async (data: UpdatePromoCodeSchema) => {
    try {
      
      
      setLoading(true);

      await toastResponse(
        adminUpdatePromoCode(promoCode.id, data),
        "Promo code updated successfully",
      );

      reset(data);

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
      <div className="rounded-2xl border my-3  bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Add Promo Code</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the discount, limits, or validity of an existing promo code.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 rounded-2xl border my-3  bg-white p-6 shadow-sm">
          <PromoCodeFields />

          <PromoCodeStatusField />
        </div>

        <FormActions loading={loading} onCancel={() => router.back()} />
      </form>
    </FormProvider>
  );
}
