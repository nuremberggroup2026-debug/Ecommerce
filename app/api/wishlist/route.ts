import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { addWishlistItem } from "@/server/wishlist/services";
import { WishlistBodyType } from "@/types";
import { NextResponse } from "next/server";

export const POST = withAuth([], async (request: Request, { user }) => {
  try {
    const body = (await request.json()) as WishlistBodyType;
    const result = await addWishlistItem({
      productId: body.productId,
      userId: user.id,
    });
    const status = HTTP_STATUS_MAP[result.code] || 500;

    console.log("result: ", result);

    return NextResponse.json(
      { success: result.success, message: result.message },
      { status },
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { success: false, message: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    );
  }
});
