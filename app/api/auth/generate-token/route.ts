import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { generateToken } from "@/server/auth/services";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as { email: string };

    const result = await generateToken(body.email);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      { success: result.success, message: result.message },
      { status },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
};
