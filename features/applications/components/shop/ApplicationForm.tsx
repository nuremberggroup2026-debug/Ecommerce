"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createApplicationSchema,
  ApplicationFormValues,
} from "@/server/applications/validators";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types";

import { TextInput } from "@/components/inputs/TextInput";
import { EmailInput } from "@/components/inputs/EmailInput";
import FileUploader from "@/components/inputs/FileUploader";
import { useRouter } from "next/navigation";
import { applyApi } from "../../api/applications.client.api";
import { toastResponse } from "@/lib/toast";
import { theme } from "@/themes";

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
    <div className={theme.applicationForm.container}>
      <div className={theme.applicationForm.header}>
        <h2 className={theme.applicationForm.title}>
          {t("ApplicationPage.FORM_TITLE")}
        </h2>
        <p className={theme.applicationForm.subtitle}>
          {t("ApplicationPage.FORM_SUBTITLE")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={theme.applicationForm.form}>
        <div className={theme.applicationForm.rowGrid}>
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

        <div className={theme.applicationForm.rowGrid}>
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
        <div className={theme.applicationForm.fileUploadSection}>
          <div className={theme.applicationForm.fileUploadHeader}>
            <label className={theme.applicationForm.fileUploadLabel}>
              {t("ApplicationPage.CV_LABEL")}
            </label>
          </div>
          <FileUploader
            name="cv"
            label=""
            control={control}
            error={errors.cv}
            locale={locale as Locale}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={theme.applicationForm.submitButton}
        >
          {isSubmitting
            ? t("ApplicationPage.SUBMITTING")
            : t("ApplicationPage.SUBMIT_APPLICATION")}
        </button>
      </form>
    </div>
  );
}