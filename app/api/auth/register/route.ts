import { NextRequest, NextResponse } from "next/server";
import { register } from "@/server/auth/services";
import { HTTP_STATUS_MAP } from "@/lib/constants/response";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterBody;

    const result = await register(body.name, body.email, body.password);

    const httpStatus = HTTP_STATUS_MAP[result.code] || 500;
    return NextResponse.json(
      {
        success: result.success,
        message: result.message,
        user: result.user ?? null,
      },
      { status: httpStatus },
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
}
