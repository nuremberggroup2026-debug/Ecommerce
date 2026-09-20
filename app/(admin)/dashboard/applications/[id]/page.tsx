import { adminApplicationsByCareerId } from "@/features/applications/api/applications.server.api";
import { ApplicationDataTable } from "@/features/applications/components/admin/applications-data-table";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ page: number; take: number }>;
}) {
  const { id } = await params;
  const { page, take } = await searchParams;
  const applications = await adminApplicationsByCareerId(id, page, take);

  return (
    <div className="w-full min-w-0 pb-10">
      <ApplicationDataTable data={applications.data} />
    </div>
  );
}
