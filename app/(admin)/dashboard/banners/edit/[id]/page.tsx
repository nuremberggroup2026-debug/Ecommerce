import { adminBannerById } from "@/features/banner/api/banners.server.api";
import EditBannerForm from "@/app/(admin)/dashboard/banners/edit/edit-banner-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const banner = (await adminBannerById(id)).data;

  if (!banner) {
    return <div>Banner not found</div>;
  }

  return (
    <div className="space-y-6">
    

      <EditBannerForm
        banner={{
          id: banner.id,
          nameEn: banner.nameEn,
          nameAr: banner.nameAr,
          image: banner.image,
        }}
      />
    </div>
  );
}
