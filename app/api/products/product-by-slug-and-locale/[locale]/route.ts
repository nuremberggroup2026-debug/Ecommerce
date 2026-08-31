import { auth } from "@/lib/auth/auth";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getProductBySlugAndLocale } from "@/server/products/services";
import { Locale } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ locale: Locale }> },
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
    const userId = (await auth())?.user?.id;
    const { locale } = await params;
    const result = await getProductBySlugAndLocale(locale, slug, userId);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        data: result.data || null,
        message: result.message,
      },
      { status },
    );
  } catch (error) {
    console.log("error :", error);

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
