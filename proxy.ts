import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@/lib/auth/auth";

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language");
    const prefersArabic = acceptLanguage?.toLowerCase().includes("ar");
    const locale = prefersArabic ? "ar" : "en";
    return Response.redirect(new URL(`/${locale}`, url));
  }

  const response = handleI18nRouting(request);

  const session = await auth();
  const authRoute: string[] = ["/login"]; // routes that allows not logged in users
  const userRoutes: string[] = ["/account"]; // routes that allows user role or higher
  const adminRoutes: string[] = ["/admin"]; // routes that allows admin role or higher
  const superAdminRoutes: string[] = ["/admin/superAdmin"]; // routes that allows super admin role

  const pathnameWithoutLocale = removeLocale(pathname);

  const isUserRoute = userRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  const isAuthRoute = authRoute.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  const isSuperAdminRoute = superAdminRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  const isAdminRoute = adminRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isUserRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isSuperAdminRoute && (!session || session.user?.role !== "super_admin")) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (
    isAdminRoute &&
    (!session ||
      (session.user?.role !== "super_admin" && session.user?.role !== "admin"))
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/", "/(en|ar)/:path*", "/admin/:path*"],
};

function removeLocale(pathname: string) {
  return pathname.replace(/^\/(en|ar)/, "");
}
