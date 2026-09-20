import { adminBanners } from "@/features/banner/api/banners.server.api";
import { BannerDataTable } from "@/features/banner/components/admin/banner-data-table";

export default async function BannersPage() {
  const banners = await adminBanners();

  return (
    <div className="w-full min-w-0 pb-10" >
      <BannerDataTable data={banners.data} />
    </div>
  );
}
