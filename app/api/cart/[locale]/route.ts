import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getCartByUserIdAndLocale } from "@/server/carts/services";
import { NextResponse } from "next/server";

export const GET = withAuth([], async (request, { user, params }) => {
  try {
    const userId = user.id;
    const { locale } = await params;
    const result = await getCartByUserIdAndLocale(userId, locale);
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
      { success: false, message: "Internal server error", data: null },
      { status: 500 },
    );
  }
});
