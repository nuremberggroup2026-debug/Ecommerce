import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { deleteManyCategories } from "@/server/categories/services";
import { NextResponse } from "next/server";


export const DELETE = withAuth(["super_admin"], async (request: Request) => {
  try {
    const body = (await request.json()) as  string[];
    const result = await deleteManyCategories(body);
    const status = HTTP_STATUS_MAP[result.code] || 500;
    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
      },
      { status },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
});