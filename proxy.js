import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt/jwt";

const ROLE_REDIRECT_MAP = {
  SUPERADMIN: "/admin",
  ADMIN: "/admin",
  AUTHOR: "/author",
  PATIENT: "/profile",
};

export async function proxy(req) {
  const token = req.cookies.get("auth_token")?.value;
  const pathname = req.nextUrl.pathname;

  const guestOnly = ["/login", "/register"];

  /* ---------- GUEST PAGES ---------- */
  if (guestOnly.includes(pathname)) {
    if (!token) return NextResponse.next();

    try {
      const decoded = await verifyToken(token);
      return NextResponse.redirect(
        new URL(ROLE_REDIRECT_MAP[decoded.role] || "/profile", req.url)
      );
    } catch {
      return NextResponse.next();
    }
  }

  /* ---------- PROTECTED ---------- */
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

  /* ---------- ADMIN ---------- */
  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN" && role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL(ROLE_REDIRECT_MAP[role], req.url));
    }
  }

  /* ---------- AUTHOR ---------- */
  if (pathname.startsWith("/author")) {
    if (role !== "AUTHOR") {
      return NextResponse.redirect(new URL(ROLE_REDIRECT_MAP[role], req.url));
    }
  }

  /* ---------- PROFILE / HEALTH ---------- */
  if (pathname.startsWith("/profile") || pathname.startsWith("/health")) {
    if (role !== "PATIENT") {
      return NextResponse.redirect(new URL(ROLE_REDIRECT_MAP[role], req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin/:path*",
    "/author/:path*",
    "/profile/:path*",
    "/health/:path*",
  ],
};
