import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { createPromoCode, getPromoCodes } from "@/server/promoCodes/services";
import { PromoCodeCreateInput } from "@/server/promoCodes/types";
import { NextResponse } from "next/server";

export const POST = withAuth(["super_admin"], async (request: Request) => {
  try {
    const body = (await request.json()) as PromoCodeCreateInput;
    const result = await createPromoCode(body);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
      },
      { status },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: HTTP_STATUS_MAP.INTERNAL_ERROR },
    );
  }
});

export const GET = withAuth(["super_admin"], async (request: Request) => {
  try {
    const pageParameter = new URL(request.url).searchParams;
    const page = Number(pageParameter.get("page"));
    const take = Number(pageParameter.get("take"));

    if (!Number.isInteger(page) || page < 1) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Page must be a positive integer",
        },
        { status: HTTP_STATUS_MAP.BAD_REQUEST },
      );
    }

    const result = await getPromoCodes(page, take);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        data: result.data || null,
        message: result.message,
      },
      { status },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: HTTP_STATUS_MAP.INTERNAL_ERROR },
    );
  }
});
