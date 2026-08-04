import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getOrderDetailsByUserIdAndLocale } from "@/server/orders/services";
import { NextResponse } from "next/server";

export const GET = withAuth([], async (request, { params, user }) => {
  try {
    const { locale } = await params;
    const userId = user.id;
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
    if (!orderId)
      return NextResponse.json(
        {
          message: "Missing query string (order ID)",
          success: false,
          data: null,
        },
        { status: 400 },
      );
    const result = await getOrderDetailsByUserIdAndLocale(
      orderId,
      userId,
      locale,
    );
    const status = HTTP_STATUS_MAP[result.code];
    return NextResponse.json(
      {
        message: result.message,
        success: result.success,
        data: result.data,
      },
      { status },
    );
  } catch (error) {
    console.log("error: ", error);

    return NextResponse.json(
      {
        message: "INTERNAL_SERVER_ERROR",
        success: false,
        data: null,
      },
      { status: 500 },
    );
  }
});
