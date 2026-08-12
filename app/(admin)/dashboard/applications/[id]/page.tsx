
import { adminApplicationsByCareerId } from "@/features/applications/api/applications.server.api";
import { ApplicationDataTable } from "../[id]/applications-data-table";



export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const applications = await adminApplicationsByCareerId(id);
  console.log("bilal",applications)

  return (
    <div className="container mx-auto py-10">
      <ApplicationDataTable data={applications.data} />
    </div>
  );
}
