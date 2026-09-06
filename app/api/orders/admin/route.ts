import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { adminGetOrders } from "@/server/orders/services";
import { OrdersFilteration, OrderStatus } from "@/server/orders/types";
import { NextResponse } from "next/server";

export const GET = withAuth(["admin", "super_admin"], async (request) => {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1) ?? 1;
    const take = Number(searchParams.get("take") ?? 5) ?? 5;
    const orderStatus = searchParams.get("status") as OrderStatus | undefined;
    const customerEmail = searchParams.get("customerEmail");
    console.log("searchParams: ", searchParams);

    const orderNumber = searchParams.get("orderNumber");
    console.log("orderNumber: ", searchParams.get("orderNumber"));

    const filtrationObjcet: OrdersFilteration = {
      page,
      take,
      status: orderStatus,
      customerEmail,
      orderNumber,
    };

    const result = await adminGetOrders(filtrationObjcet);
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
