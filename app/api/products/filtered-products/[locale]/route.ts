import { auth } from "@/lib/auth/auth";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getFilterProducts } from "@/server/products/services";
import { Locale, ProductFilters, SortType } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ locale: Locale }> },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const { locale } = await params;
    const { searchParams } = new URL(request.url);
    const categories = searchParams.getAll("categories");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") as SortType;
    const page = searchParams.get("page");
    const filters: ProductFilters = {
      categories: categories.length > 0 ? categories : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      search: search ? search : undefined,
      sort: sort ? sort : undefined,
      page: page ? Number(page) : undefined,
    };

    const result = await getFilterProducts(filters, locale, userId);
    const status = HTTP_STATUS_MAP[result.code];
    return NextResponse.json(
      { message: result.message, success: result.success, data: result.data },
      { status },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL_SERVER_ERROR", success: false, data: false },
      { status: 500 },
    );
  }
};
