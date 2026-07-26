import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { getAllUsers } from "@/server/auth/services";
import { NextResponse } from "next/server";

export const GET = withAuth(["super_admin"], async () => {
  try {
    const result = await getAllUsers();
    const status = HTTP_STATUS_MAP[result.code] || 500;
    return NextResponse.json(
      { success: result.success, message: result.message, data: result.data },
      { status },
    );
  } catch (error) {}
  return NextResponse.json(
    { success: false, message: "Internal server error", data: null },
    { status: 500 },
  );
});
