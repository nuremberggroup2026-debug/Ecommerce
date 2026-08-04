import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { deleteWishlistItem } from "@/server/wishlist/services";
import { NextResponse } from "next/server";

export const DELETE = withAuth(
  [],
  async (request: Request, { params, user }) => {
    try {
      const { itemId } = await params;
      console.log("itemIdAPI: ", itemId);

      const result = await deleteWishlistItem(itemId, user.id);
      const status = HTTP_STATUS_MAP[result.code];
      return NextResponse.json(
        {
          success: result.success,
          message: result.message,
        },
        { status },
      );
    } catch (error) {
      console.log("error: ", error);
      return NextResponse.json(
        {
          success: false,
          message: "INTERNAL_SERVER_ERROR",
        },
        { status: 500 },
      );
    }
  },
);
