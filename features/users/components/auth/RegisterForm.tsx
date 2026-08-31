"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  createRegisterSchema,
  RegisterFormValues,
} from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { EmailInput } from "@/components/inputs/EmailInput";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { registerApi } from "@/features/auth/api/auth.client.api";
import { toastResponse } from "@/lib/toast";
import { theme } from "@/themes";

export default function RegisterForm() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(createRegisterSchema(locale as Locale)),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const result = await toastResponse(registerApi(data), t, "REGISTERING");
    if (result.success) return router.replace("/");
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <main className={theme.registerPage.main}>
      <div className={theme.registerPage.card}>
        {/* Header */}
        <div className={theme.registerPage.header}>
          <h1 className={theme.registerPage.title}>
            {t("RegisterPage.CREATE_ACCOUNT")}
          </h1>
          <p className={theme.registerPage.subtitle}>
            {t("RegisterPage.SUBTITLE")}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={theme.registerPage.form}
        >
          {/* Name Field */}
          <div>
            <label htmlFor="name" className={theme.registerPage.label}>
              {t("RegisterPage.NAME_LABEL")}
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              disabled={isSubmitting}
              className={theme.registerPage.input(!!errors.name)}
              placeholder={t("RegisterPage.NAME_PLACEHOLDER")}
              {...register("name")}
            />
            {errors.name && (
              <p className={theme.registerPage.errorText}>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <EmailInput
            id="email"
            label={t("RegisterPage.EMAIL_LABEL")}
            placeholder={t("RegisterPage.EMAIL_PLACEHOLDER")}
            autoComplete="email"
            disabled={isSubmitting}
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Password Input */}
          <PasswordInput
            id="password"
            label={t("RegisterPage.PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            error={errors.password?.message}
            isAr
            {...register("password")}
          />
          <PasswordInput
            id="confirmPassword"
            label={t("RegisterPage.CONFIRM_PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            error={errors.confirmPassword?.message}
            isAr
            {...register("confirmPassword")}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={theme.registerPage.submitButton}
          >
            {isSubmitting
              ? t("RegisterPage.CREATING_ACCOUNT")
              : t("RegisterPage.REGISTER")}
          </button>
        </form>

        {/* Divider */}
        <div className={theme.registerPage.divider}>
          <div className={theme.registerPage.dividerLine}></div>
          <span className={theme.registerPage.dividerText}>
            {t("RegisterPage.OR_CONTINUE_WITH")}
          </span>
          <div className={theme.registerPage.dividerLine}></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className={theme.registerPage.googleButton}
        >
          <svg className={theme.registerPage.googleIcon} viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {t("RegisterPage.SIGN_IN_GOOGLE")}
        </button>

        <p className={theme.registerPage.footerText}>
          {t("RegisterPage.ALREADY_HAVE_ACCOUNT")}{" "}
          <Link href="/login" className={theme.registerPage.footerLink}>
            {t("RegisterPage.SIGN_IN")}
          </Link>
        </p>
      </div>
    </main>
  );
}
