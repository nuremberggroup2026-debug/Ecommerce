
import { adminCareers } from "@/features/careers/api/careers.server.api";
import { CareerDataTable } from "@/features/careers/components/admin/careers-data-table";

export default async function DemoPage() {
  const careers = await adminCareers();

  return (
    <div className="w-full min-w-0 pb-10">
      <CareerDataTable data={careers.data} />
    </div>
  );
}
