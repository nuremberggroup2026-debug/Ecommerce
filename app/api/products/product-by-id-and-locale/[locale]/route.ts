import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getProductByIdAndLocale } from "@/server/products/services";
import { Locale } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ locale: Locale }> },
) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Query string (id) is required",
        },
        { status: 400 },
      );

    const { locale } = await params;
    const result = await getProductByIdAndLocale(locale, id);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        data: result.data || null,
        message: result.message,
      },
      { status },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
};
