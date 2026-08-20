import { adminBanners } from "@/features/banner/api/banners.server.api";
import { BannerDataTable } from "../../../../features/banner/components/admin/banner-data-table";

export default async function BannersPage() {
  const banners = await adminBanners();

  return (
    <div className="container mx-auto py-10">
      <BannerDataTable data={banners.data} />
    </div>
  );
}
