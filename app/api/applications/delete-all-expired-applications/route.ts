import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { deleteAllExpiredApplications } from "@/server/applications/services";
import { NextResponse } from "next/server";

export const DELETE = withAuth(["super_admin"], async () => {
  try {
    const result = await deleteAllExpiredApplications();
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
        deletedCount: result.deletedCount || 0,
      },
      { status },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "INTERNAL_SERVER_ERROR",
      },
      { status: 500 },
    );
  }
});
