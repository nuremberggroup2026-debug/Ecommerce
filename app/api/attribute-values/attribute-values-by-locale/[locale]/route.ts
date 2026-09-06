import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getAttributeValuesByLocale } from "@/server/attributes/attributeValue.services";
import { Locale } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) => {
  try {
    const locale = (await params).locale as Locale;
    const result = await getAttributeValuesByLocale(locale);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        data: result.attributeValues || null,
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
