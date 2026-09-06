"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import {
  createForgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { EmailInput } from "@/components/inputs/EmailInput";
import { generateForgotPasswordToken } from "@/features/auth/api/auth.client.api";
import { theme } from "@/themes";

export default function ForgotPasswordForm() {
  const locale = useLocale();
  const t = useTranslations("ForgotPasswordPage");

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(createForgotPasswordSchema(locale as Locale)),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const response = await generateForgotPasswordToken(data.email);

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
    <main className={theme.forgetPasswordPage.main}>
      <div className={theme.forgetPasswordPage.card}>
        {isSuccess ? (
          /* SUCCESS STATE */
          <div className={theme.forgetPasswordPage.successWrapper}>
            <div className={theme.forgetPasswordPage.successIconWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={theme.forgetPasswordPage.successIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h1 className={theme.forgetPasswordPage.title}>
              {t("SUCCESS_TITLE")}
            </h1>
            <p className={theme.forgetPasswordPage.subtitle}>
              {t("SUCCESS_DESC")}
            </p>
            <Link
              href="/login"
              className={theme.forgetPasswordPage.successButton}
            >
              {t("BACK_TO_LOGIN")}
            </Link>
          </div>
        ) : (
          /* FORM STATE */
          <div className={theme.forgetPasswordPage.formStateWrapper}>
            <div className={theme.forgetPasswordPage.header}>
              <h1 className={theme.forgetPasswordPage.title}>{t("TITLE")}</h1>
              <p className={theme.forgetPasswordPage.subtitle}>
                {t("SUBTITLE")}
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={theme.forgetPasswordPage.form}
            >
              <EmailInput
                id="email"
                label={t("EMAIL_LABEL")}
                placeholder={t("EMAIL_PLACEHOLDER")}
                autoComplete="email"
                disabled={isSubmitting}
                error={errors.email?.message}
                {...register("email")}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={theme.forgetPasswordPage.submitButton}
              >
                {isSubmitting ? t("SENDING") : t("SEND_LINK")}
              </button>
            </form>

            <div className={theme.forgetPasswordPage.backLinkWrapper}>
              <Link href="/login" className={theme.forgetPasswordPage.backLink}>
                &larr; {t("BACK_TO_LOGIN")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
