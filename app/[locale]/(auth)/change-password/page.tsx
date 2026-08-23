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
import { theme } from "@/themes";

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
    <main className={theme.changePasswordPage.main}>
      <div className={theme.changePasswordPage.card}>
        {/* Header */}
        <div className={theme.changePasswordPage.header}>
          <h1 className={theme.changePasswordPage.title}>
            {t("ChangePasswordPage.TITLE")}
          </h1>
          <p className={theme.changePasswordPage.subtitle}>
            {t("ChangePasswordPage.SUBTITLE")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className={theme.changePasswordPage.form}>
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
          <div className={theme.changePasswordPage.divider}></div>

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
            className={theme.changePasswordPage.submitButton}
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