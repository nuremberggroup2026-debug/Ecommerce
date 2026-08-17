"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createChangePasswordSchema,
  ChangePasswordFormValues,
} from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { changePasswordApi } from "@/features/auth/api/auth.client.api";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("");
  const isAr = locale === "ar";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(createChangePasswordSchema(locale as Locale)),
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      const response = await changePasswordApi(data);
      if (response.success) {
        toast.success(t(response.message));
        router.replace("/");
      } else {
        toast.error(t(response.message));
      }
    } catch (error) {
      toast.error(t("ChangePasswordPage.UNEXPECTED_ERROR"));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50/50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            {t("ChangePasswordPage.TITLE")}
          </h1>
          <p className="mt-2 text-sm font-light text-neutral-500">
            {t("ChangePasswordPage.SUBTITLE")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <PasswordInput
            id="currentPassword"
            label={t("ChangePasswordPage.CURRENT_PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isSubmitting}
            isAr={isAr}
            error={errors.oldPassword?.message}
            {...register("oldPassword")}
          />

          {/* Divider */}
          <div className="my-6 border-t border-neutral-100"></div>

          <PasswordInput
            id="newPassword"
            label={t("ChangePasswordPage.NEW_PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            isAr={isAr}
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <PasswordInput
            id="confirmNewPassword"
            label={t("ChangePasswordPage.CONFIRM_NEW_PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            isAr={isAr}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-2xl bg-black py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? t("ChangePasswordPage.UPDATING")
              : t("ChangePasswordPage.UPDATE_PASSWORD")}
          </button>
        </form>
      </div>
    </main>
  );
}
