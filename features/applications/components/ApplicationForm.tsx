"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createApplicationSchema,
  ApplicationFormValues,
} from "@/server/applications/validators"; // Adjust path
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";

import { TextInput } from "@/components/inputs/TextInput";
import { EmailInput } from "@/components/inputs/EmailInput";
import FileUploader from "@/components/inputs/FileUploader"; // Ensure correct path
import { useRouter } from "next/navigation";
import { applyApi } from "../api/applications.client.api";
import { toastResponse } from "@/lib/toast";

export default function ApplicationForm({
  careerSlug,
}: {
  careerSlug: string;
}) {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(createApplicationSchema(locale as Locale)),
    defaultValues: {
      careerSlug,
      cv: "",
    },
  });

  const onSubmit = async (data: ApplicationFormValues) => {
   
    const response = await toastResponse(
      applyApi(data),
      t,
      "SUBMITTING_APPLICATION",
    );

    if (response.success) router.replace("/");
  };

  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
          {t("ApplicationPage.FORM_TITLE")}
        </h2>
        <p className="mt-2 text-sm font-light text-neutral-500">
          {t("ApplicationPage.FORM_SUBTITLE")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextInput
            id="firstName"
            label={t("ApplicationPage.FIRST_NAME")}
            placeholder="John"
            disabled={isSubmitting}
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <TextInput
            id="lastName"
            label={t("ApplicationPage.LAST_NAME")}
            placeholder="Doe"
            disabled={isSubmitting}
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        <EmailInput
          id="email"
          label={t("ApplicationPage.EMAIL")}
          placeholder="hello@aura.studio"
          disabled={isSubmitting}
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextInput
            id="phoneNumber"
            label={t("ApplicationPage.PHONE")}
            placeholder="+962 xxx xxx xxx"
            disabled={isSubmitting}
            error={errors.phoneNumber?.message}
            {...register("phoneNumber", { valueAsNumber: true })}
          />
          <TextInput
            id="major"
            label={t("ApplicationPage.MAJOR")}
            placeholder="Computer Science"
            disabled={isSubmitting}
            error={errors.major?.message}
            {...register("major")}
          />
        </div>

        {/* CV Upload */}
        <div className="pt-2">
          <div className="mb-2 flex items-center gap-2 px-1">
            <label className="text-[11px] font-semibold  tracking-wider text-neutral-600">
              {t("ApplicationPage.CV_LABEL")}
            </label>
          </div>
          <FileUploader
            name="cv"
            label="" // Empty because we use the custom label above to match inputs
            control={control}
            error={errors.cv}
            locale={locale as Locale}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-2xl bg-black py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? t("ApplicationPage.SUBMITTING")
            : t("ApplicationPage.SUBMIT_APPLICATION")}
        </button>
      </form>
    </div>
  );
}
