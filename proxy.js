import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt/jwt";

const ROLE_REDIRECT_MAP = {
  SUPERADMIN: "/admin",
  ADMIN: "/admin",
  AUTHOR: "/author",
  PATIENT: "/profile", // or USER if you use USER
};

export async function proxy(req) {
  const token = req.cookies.get("auth_token")?.value;
  const pathname = req.nextUrl.pathname;

  const guestOnly = ["/login", "/register"];

  /* ---------------- GUEST PAGES ---------------- */
  if (guestOnly.includes(pathname)) {
    if (!token) return NextResponse.next();

    try {
      const decoded = await verifyToken(token);
      const redirectTo = ROLE_REDIRECT_MAP[decoded.role] || "/profile";
      return NextResponse.redirect(new URL(redirectTo, req.url));
    } catch {
      return NextResponse.next();
    }
  }

  /* ---------------- PROTECTED PAGES ---------------- */
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = decoded.role;

  /* ---------------- ADMIN AREA ---------------- */
  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN" && role !== "SUPERADMIN") {
      return NextResponse.redirect(
        new URL(ROLE_REDIRECT_MAP[role] || "/profile", req.url)
      );
    }
    return NextResponse.next();
  }

  /* ---------------- AUTHOR AREA ---------------- */
  if (pathname.startsWith("/author")) {
    if (role !== "AUTHOR") {
      return NextResponse.redirect(
        new URL(ROLE_REDIRECT_MAP[role] || "/profile", req.url)
      );
    }
    return NextResponse.next();
  }

  /* ---------------- USER AREA ---------------- */
  if (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/health")
  ) {
    if (role !== "PATIENT") {
      return NextResponse.redirect(
        new URL(ROLE_REDIRECT_MAP[role] || "/profile", req.url)
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

/* ---------------- MATCHER ---------------- */
export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin/:path*",
    "/author/:path*",
    "/profile/:path*",
    "/account/:path*",
    "/health/:path*",
  ],
};
