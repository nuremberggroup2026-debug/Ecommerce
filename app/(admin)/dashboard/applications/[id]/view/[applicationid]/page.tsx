import ViewApplication from "@/features/applications/components/admin/view-application";
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

  if (!application) {
    return (
      <div className="flex min-h-100 items-center justify-center pb-6">
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
    <div className="w-full px-1 pb-6">
      <ViewApplication
        application={application}
        applicationid={applicationid}
      />
    </div>
  );
}
