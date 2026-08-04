import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { addCartItem } from "@/server/cartItems/services";
import { CartitemCreateInput } from "@/types";
import { NextResponse } from "next/server";

export const POST = withAuth([], async (request: Request, { user }) => {
  try {
    const body = (await request.json()) as CartitemCreateInput;
    const result = await addCartItem(body, user.id);
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
