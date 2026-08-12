import ViewApplication from "@/app/(admin)/dashboard/applications/[id]/view/view-application";
import { adminApplicationById } from "@/features/applications/api/applications.server.api";

export default async function Page({
  params,
}: {
  params: Promise<{
    applicationid: string;
  }>;
}) {
  const { applicationid } = await params;

  const response = await adminApplicationById(applicationid);
  const application = response.data;
  console.log("لاbilal",application)

  if (!application) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Application not found
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            The application you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <ViewApplication application={application} applicationid={applicationid} />
    </div>
  );
}