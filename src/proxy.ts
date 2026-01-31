import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { UserRoles } from "./types";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data } = await userService.getSession();

  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = data.user.role;

  const roleBasedRoutes: Record<string, UserRoles[]> = {
    "/admin-dashboard": [UserRoles.ADMIN],
    "/seller-dashboard": [UserRoles.SELLER],
    "/customer-dashboard": [UserRoles.CUSTOMER],
  };

  const allowedRoles = roleBasedRoutes[pathname];

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/customer-dashboard",
    "/customer-dashboard/:path*",
  ],
};
