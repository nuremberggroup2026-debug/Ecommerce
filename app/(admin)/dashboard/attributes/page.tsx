
import { adminAttributes } from "@/features/catalog/attributes/api/attributes.server.api";
import { AttributeDataTable } from "./attribute-data-table";

export default async function AttributesPage() {
  const attributes = await adminAttributes();

  return (
    <div className="container  mx-auto py-10">
      <AttributeDataTable data={attributes.data} />
    </div>
  );
}

