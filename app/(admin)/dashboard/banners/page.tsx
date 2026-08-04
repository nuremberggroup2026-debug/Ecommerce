import { columns } from "./columns";
import { DataTable } from "./data-table";
import { adminBanners } from "@/features/banner/api/banners.server.api";

export default async function DemoPage() {
  const banners = await adminBanners();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={banners.data} />
    </div>
  );
}
