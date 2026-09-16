import { adminPromoCodeById } from "@/features/promocodes/api/promocodes.server.api";
import EditPromCodeForm from "@/features/promocodes/components/admin/editPromoCode/EditPromoCodeForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: promoCode } = await adminPromoCodeById(id);
  console.log("propm data: ",promoCode);
  

  if (!promoCode) {
    return <div>Promo Code not found</div>;
  }

  return (
    <div >
      <EditPromCodeForm promoCode={promoCode} />
    </div>
  );
}
