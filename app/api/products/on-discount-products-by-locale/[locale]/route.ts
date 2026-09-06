import { auth } from "@/lib/auth/auth";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getDiscountProductsByLocale } from "@/server/products/services";
import { Locale } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const locale = (await params).locale as Locale;
    const result = await getDiscountProductsByLocale(locale, userId);
    console.log("reasss: ", result);

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
    console.log("error: ", error);

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
