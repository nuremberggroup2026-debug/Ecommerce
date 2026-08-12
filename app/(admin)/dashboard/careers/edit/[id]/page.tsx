
import { adminCareerById } from "@/features/careers/api/careers.server.api";
import EditCareerForm from "@/app/(admin)/dashboard/careers/edit/edit-career-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const career = (await adminCareerById(id)).data;

  if (!career) {
    return <div>Career not found</div>;
  }

  return (
    <div className="p-6">
      <EditCareerForm
        career={{
          id: career.id,
          positionEn: career.positionEn,
          positionAr: career.positionAr,
          descriptionEn: career.descriptionEn,
          descriptionAr: career.descriptionAr,
          requirementsEn: career.requirementsEn,
          requirementsAr: career.requirementsAr,
          experienceEn: career.experienceEn,
          experienceAr: career.experienceAr,
          roleEn: career.roleEn,
          roleAr: career.roleAr,
          image: career.image,
        }}
      />
    </div>
  );
}

