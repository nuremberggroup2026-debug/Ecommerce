import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { verifyEmail } from "@/server/auth/services";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  params: { params: Promise<{ id: string }> },
) => {
  try {
    const token = (await request.json()) as string;

    const id = (await params.params).id;
    console.log("body: ", token);
    console.log("id: ", id);

    const result = await verifyEmail(id, token);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      { success: result.success, message: result.message },
      { status },
    );
  } catch (error) {
    console.log("error: ", error);

    return NextResponse.json(
      { success: false, message: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    );
  }
};
