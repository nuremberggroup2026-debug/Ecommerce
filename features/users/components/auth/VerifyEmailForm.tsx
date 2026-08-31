"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { verifyEmailApi } from "@/features/auth/api/auth.client.api";
import { theme } from "@/themes";

type VerificationState = "loading" | "success" | "already-verified" | "error";

export default function VerifyEmailForm() {
  const params = useParams();
  const t = useTranslations("VerifyEmail");

  const [status, setStatus] = useState<VerificationState>("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const userId = params.userId as string;
        const token = params.token as string;

        const response = await verifyEmailApi(token, userId);

        if (response.success) {
          if (response.message === "ACCOUNT_ALREADY_VERIFIED") {
            setStatus("already-verified");
          } else {
            setStatus("success");
          }
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    if (params.userId && params.token) {
      verifyEmail();
    }
  }, [params]);

  return (
    <main className={theme.verifyEmailPage.main}>
      <div className={theme.verifyEmailPage.card}>
        {/* LOADING STATE */}
        {status === "loading" && (
          <div className={theme.verifyEmailPage.stateWrapper}>
            <div className={theme.verifyEmailPage.spinner}></div>
            <h1 className={theme.verifyEmailPage.title}>{t("VERIFYING")}</h1>
            <p className={theme.verifyEmailPage.subtitle}>
              {t("VERIFYING_DESC")}
            </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className={theme.verifyEmailPage.stateWrapper}>
            <div className={theme.verifyEmailPage.successIconWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={theme.verifyEmailPage.icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h1 className={theme.verifyEmailPage.title}>{t("SUCCESS")}</h1>
            <p className={theme.verifyEmailPage.subtitle}>
              {t("SUCCESS_DESC")}
            </p>
            <Link href="/login" className={theme.verifyEmailPage.primaryButton}>
              {t("PROCEED_TO_LOGIN")}
            </Link>
          </div>
        )}

        {/* ALREADY VERIFIED STATE */}
        {status === "already-verified" && (
          <div className={theme.verifyEmailPage.stateWrapper}>
            <div className={theme.verifyEmailPage.alreadyVerifiedIconWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={theme.verifyEmailPage.icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <h1 className={theme.verifyEmailPage.title}>
              {t("ALREADY_VERIFIED")}
            </h1>
            <p className={theme.verifyEmailPage.subtitle}>
              {t("ALREADY_VERIFIED_DESC")}
            </p>
            <Link href="/login" className={theme.verifyEmailPage.primaryButton}>
              {t("PROCEED_TO_LOGIN")}
            </Link>
          </div>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <div className={theme.verifyEmailPage.stateWrapper}>
            <div className={theme.verifyEmailPage.errorIconWrapper}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={theme.verifyEmailPage.icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className={theme.verifyEmailPage.title}>{t("ERROR")}</h1>
            <p className={theme.verifyEmailPage.subtitle}>{t("ERROR_DESC")}</p>
            <Link href="/" className={theme.verifyEmailPage.secondaryButton}>
              {t("BACK_TO_HOME")}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
