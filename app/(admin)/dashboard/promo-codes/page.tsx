import { adminPromoCodes } from "@/features/promocodes/api/promocodes.server.api";
import { PromoCodesDataTableServer } from "@/features/promocodes/components/admin/promo-codes-data-table";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: number; take: number }>;
}) {
  const searchParamsData = await searchParams;
  const page = searchParamsData.page || 1;
  const take = searchParamsData.take || 5;

  const data = await adminPromoCodes(page, take);

  return (
    <div className="container max-w-[90%] lg:max-w-7xl mx-auto pb-10">
      <PromoCodesDataTableServer
      
        data={data.data.promoCodes}
        pageCount={data.data.pagination.totalPages}
        route="/dashboard/promo-codes/edit"
      />
    </div>
  );
}
