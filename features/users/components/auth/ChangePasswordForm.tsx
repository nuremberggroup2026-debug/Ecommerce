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
import { KeyRound } from "lucide-react";

export default function ChangePasswordForm() {
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
        const responseKey = `ResponseMessages.${response.message}`;
        const translatedMsg = t(responseKey);
        toast.success(
          translatedMsg !== responseKey
            ? translatedMsg
            : t("ChangePasswordPage.SUCCESS_MESSAGE"),
        );
        router.replace("/");
      } else {
        const responseKey = `ResponseMessages.${response.message}`;
        const translatedMsg = t(responseKey);
        toast.error(
          translatedMsg !== responseKey ? translatedMsg : response.message,
        );
      }
    } catch (error) {
      toast.error(t("ChangePasswordPage.UNEXPECTED_ERROR"));
    }
  };

  return (
    <main
      className={theme.changePasswordPage.main}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className={theme.changePasswordPage.card}>
        {/* Header Icon */}
        <div className="mb-6 flex justify-center rtl:sm:justify-start ltr:sm:justify-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-800">
            <KeyRound className="h-6 w-6" />
          </div>
        </div>

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={theme.changePasswordPage.form}
        >
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
