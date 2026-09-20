
import { adminAttributes } from "@/features/attributes/api/attributes.server.api";
import { AttributeDataTable } from "./attribute-data-table";

export default async function AttributesPage() {
  const attributes = await adminAttributes();

  return (
    <div className="w-full min-w-0 pb-10" >
      <AttributeDataTable data={attributes.data} />
    </div>
  );
}

