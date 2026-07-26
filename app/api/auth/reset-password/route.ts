import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { resetPassword } from "@/server/auth/services";
import { NextResponse } from "next/server";

interface ResetPasswordBody {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as ResetPasswordBody;

    const result = await resetPassword(
      body.token,
      body.newPassword,
      body.confirmPassword,
    );
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      { success: result.success, message: result.message },
      { status },
    );
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
};
