import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { adminGetOrdersByStatus } from "@/server/orders/services";
import { OrderStatus } from "@/types";
import { NextResponse } from "next/server";

export const GET = withAuth(["admin", "super_admin"], async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const orderStatus = searchParams.get("orderStatus") as OrderStatus;
    const pageNumber = searchParams.get("page");

    const result = await adminGetOrdersByStatus(
      orderStatus,
      Number(pageNumber),
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
