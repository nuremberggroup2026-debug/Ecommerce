import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getAllProductsByLocale } from "@/server/products/services";
import { Locale } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ locale: Locale }> },
) => {
  try {
    const { locale } = await params;
    const result = await getAllProductsByLocale(locale);
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
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
};
