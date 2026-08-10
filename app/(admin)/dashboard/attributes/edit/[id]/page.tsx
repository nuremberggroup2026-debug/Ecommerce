import { adminAttributeById } from "@/features/catalog/attributes/api/attributes.server.api";
import EditAttributeForm from "../edit-attribute-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await adminAttributeById(id);

  const attribute = result.data;

  if (!attribute) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-red-600">
          Attribute not found
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <EditAttributeForm
        attribute={{
          id: attribute.id,

          attributeNameEn:
            attribute.attributeNameEn,

          attributeNameAr:
            attribute.attributeNameAr,

          attributeValues:
            attribute.attributeValues,
        }}
      />
    </div>
  );
}