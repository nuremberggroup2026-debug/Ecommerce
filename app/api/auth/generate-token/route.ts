import { HTTP_STATUS_MAP } from "@/lib/constants/response";
import { generateToken } from "@/server/auth/services";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const email = (await request.json()) as  string ;

    const result = await generateToken(email);
    const status = HTTP_STATUS_MAP[result.code] || 500;

    return NextResponse.json(
      { success: result.success, message: result.message },
      { status },
    );
  } catch (error) {
    console.log("error: ",error);
    
    return NextResponse.json(
      { success: false, message: "INTERNAL_SERVER_ERROR" },
      { status: 500 },
    );
  }
};
