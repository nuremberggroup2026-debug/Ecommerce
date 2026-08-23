"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  createResetPasswordSchema,
  ResetPasswordFormValues,
} from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { resetPasswordApi } from "@/features/auth/api/auth.client.api";
import { theme } from "@/themes";

export default function ResetPasswordPage() {
  const params = useParams();
  const locale = useLocale() as Locale;
  const t = useTranslations("ResetPasswordPage");
  const isAr = locale === "ar";
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(createResetPasswordSchema(locale as Locale)),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const token = params.token as string;
      const response = await resetPasswordApi({
        token,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      });
      if (response.success) {
        setIsSuccess(true);
      } else {
        toast.error(t(response.message));
      }
    } catch (error) {
      toast.error(t("UNEXPECTED_ERROR"));
    }
  };

  return (
    <main className={theme.resetPasswordPage.main}>
      <div className={theme.resetPasswordPage.card}>
        {isSuccess ? (
          /* SUCCESS STATE */
          <div className={theme.resetPasswordPage.successWrapper}>
            <div className={theme.resetPasswordPage.successIconWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={theme.resetPasswordPage.successIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h1 className={theme.resetPasswordPage.title}>
              {t("SUCCESS_TITLE")}
            </h1>
            <p className={theme.resetPasswordPage.subtitle}>
              {t("SUCCESS_DESC")}
            </p>
            <Link
              href="/login"
              className={theme.resetPasswordPage.successButton}
            >
              {t("PROCEED_TO_LOGIN")}
            </Link>
          </div>
        ) : (
          /* FORM STATE */
          <div className={theme.resetPasswordPage.formStateWrapper}>
            <div className={theme.resetPasswordPage.header}>
              <h1 className={theme.resetPasswordPage.title}>
                {t("TITLE")}
              </h1>
              <p className={theme.resetPasswordPage.subtitle}>
                {t("SUBTITLE")}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={theme.resetPasswordPage.form}>
              <PasswordInput
                id="password"
                label={t("PASSWORD_LABEL")}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={isSubmitting}
                isAr={isAr}
                error={errors.password?.message}
                {...register("password")}
              />

              <PasswordInput
                id="confirmPassword"
                label={t("CONFIRM_PASSWORD_LABEL")}
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
                className={theme.resetPasswordPage.submitButton}
              >
                {isSubmitting ? t("RESETTING") : t("RESET_PASSWORD")}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}