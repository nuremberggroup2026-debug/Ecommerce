import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getAllWishlistItemsByUserIdAndLocale } from "@/server/wishlist/services";
import { NextResponse } from "next/server";

export const GET = withAuth([], async (request: Request, { params, user }) => {
  try {
    const { locale } = await params;
    const userId = user.id;
    console.log("userId: ", userId);

    const result = await getAllWishlistItemsByUserIdAndLocale(userId, locale);
    const status = HTTP_STATUS_MAP[result.code];
    return NextResponse.json(
      {
        success: result.success,
        data: result.data,
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
});
