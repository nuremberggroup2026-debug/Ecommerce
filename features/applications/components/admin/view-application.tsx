"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Check,
  Download,
  Mail,
  Phone,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CareerApplication } from "@/features/applications/types";
import { markApplicationAsShown } from "@/features/applications/api/applications.client.api";

type Props = {
  application: CareerApplication;
  applicationid: string;
};

export default function ViewApplication({ application, applicationid }: Props) {
  const router=useRouter()
  const [isShown, setIsShown] = useState(application.isShown);
  const [loading, setLoading] = useState(false);

  const fullName = `${application.firstName} ${application.lastName ?? ""}`.trim();

  const appliedDate = new Date(application.appliedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const career = application.careers;

  const handleToggleViewed = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await markApplicationAsShown(applicationid);

      if (!response.success) {
        throw new Error("Failed to update application status");
      }

      const newValue = !isShown;
      setIsShown(newValue);

      toast.success(
        newValue ? "Application marked as viewed" : "Application marked as new"
      
      );
      router.refresh()
    } catch (error) {
      console.error(error);
      toast.error("Failed to update application status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/applications"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Application Details
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              View applicant information and the position they applied for.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleViewed}
          disabled={loading}
          aria-label={isShown ? "Mark application as new" : "Mark application as viewed"}
          className={`group relative flex h-11 items-center gap-2 overflow-hidden rounded-xl border px-4 text-sm font-semibold shadow-sm transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
            isShown
              ? "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              : "border-black bg-black text-white hover:bg-gray-800"
          }`}
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300 ${
              isShown
                ? "bg-gray-100 text-gray-600 group-hover:scale-110"
                : "bg-white/15 text-white group-hover:scale-110"
            }`}
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : isShown ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </span>

          <span className="min-w-[100px] text-left">
            {loading ? "Updating..." : isShown ? "Mark as New" : "Mark as Viewed"}
          </span>

          {!loading && (
            <span
              className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                isShown ? "w-0 bg-gray-400 group-hover:w-full" : "w-0 bg-white group-hover:w-full"
              }`}
            />
          )}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Applicant Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Personal and contact details
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Full Name
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {fullName || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email
                </p>
                <a
                  href={`mailto:${application.email}`}
                  className="mt-1 flex items-center gap-2 break-all font-medium text-gray-900 hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                  {application.email}
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Phone Number
                </p>
                <a
                  href={`tel:${application.phoneNumber}`}
                  className="mt-1 flex items-center gap-2 font-medium text-gray-900 hover:underline"
                >
                  <Phone className="h-4 w-4 text-gray-400" />
                  {application.phoneNumber}
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Major
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {application.major || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Applied At
                </p>
                <div className="mt-1 flex items-center gap-2 font-medium text-gray-900">
                  <CalendarDays className="h-4 w-4 text-gray-400" />
                  {appliedDate}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Application ID
                </p>
                <p className="mt-1 truncate font-mono text-xs text-gray-600">
                  {application.id}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="font-semibold text-gray-900">
                Curriculum Vitae
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Applicant uploaded CV
              </p>
            </div>

            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                  <Download className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Applicant CV</p>
                  <p className="text-xs text-gray-500">
                    Open or download the submitted CV
                  </p>
                </div>
              </div>

              {application.cv ? (
                <a
                  href={application.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  <Download className="h-4 w-4" />
                  View CV
                </a>
              ) : (
                <span className="text-sm text-gray-400">No CV uploaded</span>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-52 w-full bg-gray-100">
              {career?.image ? (
                <Image
                  src={career.image}
                  alt={career.positionEn}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Briefcase className="h-10 w-10 text-gray-300" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-4 left-5 right-5">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-white/70">
                  Applied Position
                </p>
                <h2 className="text-xl font-bold text-white">
                  {career?.positionEn ?? "Unknown Position"}
                </h2>
              </div>
            </div>

            <div className="space-y-5 p-6">
              {career?.roleEn && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Role
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {career.roleEn}
                  </p>
                </div>
              )}

              {career?.experienceEn && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Experience
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {career.experienceEn}
                  </p>
                </div>
              )}

              {career?.descriptionEn && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Description
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {career.descriptionEn}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}