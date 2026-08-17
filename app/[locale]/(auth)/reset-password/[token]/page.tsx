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
    <main className="flex min-h-screen items-center justify-center bg-neutral-50/50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-neutral-100 bg-white p-8 text-center shadow-sm sm:p-10">
        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              {t("SUCCESS_TITLE")}
            </h1>
            <p className="mt-2 text-sm font-light text-neutral-500">
              {t("SUCCESS_DESC")}
            </p>
            <Link
              href="/login"
              className="mt-8 inline-block w-full rounded-2xl bg-black py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
            >
              {t("PROCEED_TO_LOGIN")}
            </Link>
          </div>
        ) : (
          /* FORM STATE */
          <div className="animate-in fade-in duration-300 text-left">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                {t("TITLE")}
              </h1>
              <p className="mt-2 text-sm font-light text-neutral-500">
                {t("SUBTITLE")}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                className="mt-6 w-full rounded-2xl bg-black py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
