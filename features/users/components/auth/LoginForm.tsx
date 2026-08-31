"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { createLoginSchema, LoginFormValues } from "@/server/auth/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";
import { EmailInput } from "@/components/inputs/EmailInput";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { theme } from "@/themes";

export default function LoginForm() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations("LoginPage");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(createLoginSchema(locale as Locale)),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result?.error) {
        toast.success(t("SUCCESS_LOGIN"));
        router.push("/dashboard");
      } else {
        if (result.code === "EMAIL_NOT_VERIFIED") {
          toast.error(t("EMAIL_NOT_VERIFIED"));
        } else {
          toast.error(t("INVALID_CREDENTIALS"));
        }
      }
    } catch (error) {
      toast.error(t("UNEXPECTED_ERROR"));
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <main className={theme.loginPage.main}>
      <div className={theme.loginPage.card}>
        {/* Header */}
        <div className={theme.loginPage.header}>
          <h1 className={theme.loginPage.title}>{t("WELCOME_BACK")}</h1>
          <p className={theme.loginPage.subtitle}>{t("SUBTITLE")}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={theme.loginPage.form}
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

          <PasswordInput
            id="password"
            label={t("PASSWORD_LABEL")}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isSubmitting}
            isAr={locale === "ar"}
            error={errors.password?.message}
            {...register("password")}
          />

          <div className={theme.loginPage.forgotPasswordWrapper}>
            <Link
              href="/forgot-password"
              className={theme.loginPage.forgotPasswordLink}
            >
              {t("FORGOT_PASSWORD")}
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={theme.loginPage.submitButton}
          >
            {isSubmitting ? t("SIGNING_IN") : t("SIGN_IN")}
          </button>
        </form>

        {/* Divider */}
        <div className={theme.loginPage.divider}>
          <div className={theme.loginPage.dividerLine}></div>
          <span className={theme.loginPage.dividerText}>
            {t("OR_CONTINUE_WITH")}
          </span>
          <div className={theme.loginPage.dividerLine}></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className={theme.loginPage.googleButton}
        >
          <svg className={theme.loginPage.googleIcon} viewBox="0 0 24 24">
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
          {t("SIGN_IN_GOOGLE")}
        </button>

        <p className={theme.loginPage.footerText}>
          {t("NO_ACCOUNT")}{" "}
          <Link href="/register" className={theme.loginPage.footerLink}>
            {t("CREATE_ONE")}
          </Link>
        </p>
      </div>
    </main>
  );
}
