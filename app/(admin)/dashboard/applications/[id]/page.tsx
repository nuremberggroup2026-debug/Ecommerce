import { adminApplicationsByCareerId } from "@/features/applications/api/applications.server.api";
import { ApplicationDataTable } from "../../../../../features/applications/components/admin/applications-data-table";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const applications = await adminApplicationsByCareerId(id);

  return (
    <div className="container mx-auto py-10">
      <ApplicationDataTable data={applications.data} />
    </div>
  );
}
