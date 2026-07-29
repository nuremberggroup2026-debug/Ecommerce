import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@/lib/auth/auth";

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const session = await auth();

  const authRoute: string[] = ["/login"];
  const userRoutes: string[] = ["/account"];
  const adminRoutes: string[] = ["/admin"];
  const superAdminRoutes: string[] = ["/admin/superAdmin"];

  const isAuthRoute = authRoute.some((route) =>
    pathname.startsWith(route),
  );

  const isUserRoute = userRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isSuperAdminRoute = superAdminRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route),
  );


  // لا تمرر لوحة التحكم إلى next-intl
  if (pathname.startsWith("/dashboard")) {
    if (
      isSuperAdminRoute &&
      (!session || session.user?.role !== "super_admin")
    ) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    if (
      isAdminRoute &&
      (!session ||
        (session.user?.role !== "super_admin" &&
          session.user?.role !== "admin"))
    ) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    return NextResponse.next();
  }


  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  if (isUserRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  const response = handleI18nRouting(request);

  return response;
}


export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
