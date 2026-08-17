"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { verifyEmailApi } from "@/features/auth/api/auth.client.api";

type VerificationState = "loading" | "success" | "already-verified" | "error";

export default function VerifyEmailPage() {
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
    <main className="flex min-h-screen items-center justify-center bg-neutral-50/50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-neutral-100 bg-white p-8 text-center shadow-sm sm:p-10">
        {/* LOADING STATE */}
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="mb-6 h-12 w-12 animate-spin rounded-full border-2 border-neutral-200 border-t-black"></div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              {t("VERIFYING")}
            </h1>
            <p className="mt-2 text-sm font-light text-neutral-500">
              {t("VERIFYING_DESC")}
            </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className="flex flex-col items-center">
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
              {t("SUCCESS")}
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
        )}

        {/* ALREADY VERIFIED STATE */}
        {status === "already-verified" && (
          <div className="flex flex-col items-center">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
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
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              {t("ALREADY_VERIFIED")}
            </h1>
            <p className="mt-2 text-sm font-light text-neutral-500">
              {t("ALREADY_VERIFIED_DESC")}
            </p>
            <Link
              href="/login"
              className="mt-8 inline-block w-full rounded-2xl bg-black py-4 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
            >
              {t("PROCEED_TO_LOGIN")}
            </Link>
          </div>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <div className="flex flex-col items-center">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              {t("ERROR")}
            </h1>
            <p className="mt-2 text-sm font-light text-neutral-500">
              {t("ERROR_DESC")}
            </p>
            <Link
              href="/"
              className="mt-8 inline-block w-full rounded-2xl border border-neutral-200 bg-white py-4 text-[11px] font-bold uppercase tracking-widest text-neutral-900 transition-all hover:bg-neutral-50 active:scale-[0.98]"
            >
              {t("BACK_TO_HOME")}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
