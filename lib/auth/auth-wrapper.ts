import { UserRoles } from "@/types";
import { auth } from "./auth";
import { HTTP_STATUS_MAP } from "../constants/response";
import { NextResponse } from "next/server";

type AuthenticatedContext = {
  user: {
    //logged in user
    id: string;
    email: string;
    name: string;
    role: UserRoles;
  };
  params?: Promise<any>;
};

type ApiHandler = (
  request: Request,
  context: AuthenticatedContext,
) => Promise<Response> | Response;

/**
 * Auth Wrapper to chaeck the user role (Just like the middleware)
 * @param allowedRoles array of the roles that your api rqueires, for only authenticated user, send an empty array
 * @param handler your api
 * @returns error if user not allowed, else excute the api
 */
export function withAuth(allowedRoles: UserRoles[], handler: ApiHandler) {
  return async (request: Request, nextContext?: { params?: Promise<any> }) => {
    try {
      const session = await auth();
      console.log("session: ", session);

      if (!session || !session.user)
        return NextResponse.json(
          {
            success: false,
            message: "You must be logged in to access this resource.",
          },
          { status: HTTP_STATUS_MAP.UNAUTHORIZED },
        );

      const userRole = session.user.role || "user";

      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole))
        return NextResponse.json(
          {
            success: false,
            message: "Forbidden: You do not have permission.",
          },
          {
            status: HTTP_STATUS_MAP.FORBIDDEN,
          },
        );
      const routeParams = nextContext?.params || Promise.resolve({});
      return await handler(request, {
        params: routeParams,
        user: {
          id: session.user.id!,
          email: session.user.email!,
          name: session.user.name!,
          role: userRole,
        },
      });
    } catch (error) {
      console.error("API Wrapper Error:", error);
      return NextResponse.json(
        { success: false, message: "Internal server error." },
        { status: HTTP_STATUS_MAP.INTERNAL_ERROR },
      );
    }
  };
}
