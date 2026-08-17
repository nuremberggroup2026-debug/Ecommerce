import { withAuth } from "@/lib/auth/auth-wrapper";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { changePassword } from "@/server/auth/services";
import { NextResponse } from "next/server";

interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const PUT = withAuth([], async (request: Request, { user }) => {
  try {
    const { id } = user;
    const body = (await request.json()) as ChangePasswordBody;
    const result = await changePassword(
      body.oldPassword,
      body.newPassword,
      body.confirmPassword,
      id,
    );
    const status = HTTP_STATUS_MAP[result.code] || 500;
    return NextResponse.json(
      { success: result.success, message: result.message },
      { status },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    );
  }
});
