import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getAllCategoriesByLocale } from "@/server/categories/services";
import { Locale } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ locale: Locale }> },
) => {
  try {
    const { locale } = await params;
    const result = await getAllCategoriesByLocale(locale);
    const status = HTTP_STATUS_MAP[result.code] || 500;
    return NextResponse.json(
      {
        success: result.success,
        data: result.categories || null,
        message: result.message,
      },
      { status },
    );
  } catch (error) {
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
