import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getAttributesWithValues } from "@/server/attributes/attribute.services";
import { NextResponse } from "next/server";

export const GET = withAuth(["super_admin"], async (request: Request) => {
  try {
    const result = await getAttributesWithValues();
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        data: result.data || null,
        message: result.message,
      },
      { status },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
});
