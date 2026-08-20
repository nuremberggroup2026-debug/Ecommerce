
import { adminCareers } from "@/features/careers/api/careers.client.api";
import { CareerDataTable } from "../../../../features/careers/components/admin/careers-data-table";

export default async function DemoPage() {
  const careers = await adminCareers();

  return (
    <div className="container mx-auto py-10">
      <CareerDataTable data={careers.data} />
    </div>
  );
}
