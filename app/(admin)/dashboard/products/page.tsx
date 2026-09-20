import { adminCategoriesNameAndIDs } from "@/features/categories/api/categories.server.api";
import { adminProducts } from "@/features/products/api/products.server.api";
import { ProductDataTable } from "@/features/products/components/admin/products-data-table";
import ProductsFilter from "@/features/products/components/admin/ProductsFilter";
import { AdminProductsFiltrationObjectFrontend } from "@/features/products/types";

interface Props {
  searchParams: Promise<AdminProductsFiltrationObjectFrontend>;
}

export default async function DemoPage({ searchParams }: Props) {
  const { page, take, category } = await searchParams;

  const [productsData, categoriesData] = await Promise.all([
    adminProducts({ page, take, category }),
    adminCategoriesNameAndIDs(),
  ]);

  return (
    <div className="w-full min-w-0 pb-10">
      <ProductsFilter categoriesData={categoriesData.data} />
      <ProductDataTable data={productsData.data} />
    </div>
  );
}
