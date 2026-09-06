import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getCareerBySlugAndLocale } from "@/server/careers/services";
import { Locale } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) => {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug)
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Query string (slug) is required",
        },
        { status: 400 },
      );
    const locale = (await params).locale as Locale;
    const result = await getCareerBySlugAndLocale(slug, locale);
    const status = HTTP_STATUS_MAP[result.code] || 500;
    return NextResponse.json(
      {
        success: result.success,
        data: result.career || null,
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
