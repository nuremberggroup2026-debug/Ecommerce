import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { deleteCartItem, editQuantity } from "@/server/cartItems/services";
import { DeleteCartItemData } from "@/types";
import { NextResponse } from "next/server";
export const PUT = withAuth([], async (request: Request, { user, params }) => {
  try {
    const { id } = await params;
    const body = (await request.json()) as { newQuantity: number };
    const result = await editQuantity(
      { newQuantity: body.newQuantity, cartItemId: id },
      user.id,
    );
    const status = HTTP_STATUS_MAP[result.code] || 500;

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

export const DELETE = withAuth(
  [],
  async (request: Request, { user, params }) => {
    try {
      const { id } = await params;
      const result = await deleteCartItem(id, user.id);
      const status = HTTP_STATUS_MAP[result.code] || 500;

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
  },
);
