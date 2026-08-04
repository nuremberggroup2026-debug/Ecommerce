import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getAttributeByIdAndLocale } from "@/server/attributes/attribute.services";
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
    const result = await getAttributeByIdAndLocale(id, locale);
    const status = HTTP_STATUS_MAP[result.code] || 500;
    return NextResponse.json(
      {
        success: result.success,
        data: result.attribute || null,
        message: result.message,
      },
      { status },
    );
  } catch (error) {
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
