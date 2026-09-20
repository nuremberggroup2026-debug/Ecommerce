import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getOrdersReportData } from "@/server/orders/services";
import { NextResponse } from "next/server";
import { order_status } from "@/generated/prisma/client";
import type {
  OrdersReportDataFilter,
  OrderStatus,
} from "@/server/orders/types";

export const GET = withAuth(["admin", "super_admin"], async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const rawStatus = searchParams.get("status");
    const orderStatus =
      rawStatus &&
      rawStatus !== "ALL" &&
      rawStatus.toUpperCase() !== "ALL" &&
      rawStatus !== "undefined" &&
      Object.values(order_status).includes(rawStatus as order_status)
        ? (rawStatus as OrderStatus)
        : undefined;

    if (!from || !to) {
      return NextResponse.json(
        {
          message: "FROM_AND_TO_ARE_REQUIRED",
          success: false,
          data: null,
        },
        { status: 400 },
      );
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
      return NextResponse.json(
        {
          message: "INVALID_REPORT_DATE_RANGE",
          success: false,
          data: null,
        },
        { status: 400 },
      );
    }

    const filter: OrdersReportDataFilter = {
      from: fromDate,
      to: toDate,
      ...(orderStatus && { status: orderStatus }),
    };
    const result = await getOrdersReportData(filter);
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
