
import { adminProducts } from "@/features/products/api/products.server.api";
import { ProductDataTable } from "../../../../features/products/components/admin/products-data-table";

export default async function DemoPage() {
  const products = await adminProducts();

  return (
    <div className="container mx-auto py-10">
      <ProductDataTable data={products.data} />
    </div>
  );
}
