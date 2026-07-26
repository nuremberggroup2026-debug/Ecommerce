import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { addWishlistItem } from "@/server/wishlist/services";
import { WishlistCreateInput } from "@/types";
import { NextResponse } from "next/server";

export const POST = withAuth([], async (request: Request) => {
  try {
    const body = (await request.json()) as WishlistCreateInput;
    const result = await addWishlistItem(body);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      { success: result.success, message: result.message },
      { status },
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
});
