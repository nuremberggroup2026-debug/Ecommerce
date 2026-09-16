
import { adminCareers } from "@/features/careers/api/careers.server.api";
import { CareerDataTable } from "@/features/careers/components/admin/careers-data-table";

export default async function DemoPage() {
  const careers = await adminCareers();

  return (
    <div>
      <CareerDataTable data={careers.data} />
    </div>
  );
}
