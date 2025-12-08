import { NextResponse } from 'next/server'
import { verifyToken } from './lib/jwt/jwt'

export async function middleware(req) {
  const token = req.cookies.get('auth_token')?.value
  const pathname = req.nextUrl.pathname

  // 1. Define paths based on access type
  const guestOnly = ['/login', '/register']
  const userOnlyPrefixes = ['/profile', '/account'] // Paths only normal users can access
  const adminOnlyPrefixes = ['/admin'] // Paths only admins can access

  // Attempt to decode the token to get user info (isAdmin flag)
  // 'decoded' will be null if token is missing or invalid.
  const decoded = await verifyToken(token || '')
  const isAdmin = decoded?.isAdmin === true // Explicitly check for true

  // --- 2. Logic for Guest-Only Pages (/login, /register) ---
  if (guestOnly.includes(pathname)) {
    if (token) {
      try {
        await verifyToken(token)
        // Redirect logic based on user role after successful login
        const redirectTo = isAdmin ? '/admin' : '/profile'
        return NextResponse.redirect(new URL(redirectTo, req.url))
      } catch {
        // Token exists but is invalid/expired, allow to proceed to login/register
        // to handle the refresh or sign-in again
        return NextResponse.next()
      }
    }
    // No token, proceed to guest page
    return NextResponse.next()
  }

  // --- 3. Logic for Protected Pages (All others defined in matcher) ---

  const isUserOnly = userOnlyPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  )
  const isAdminOnly = adminOnlyPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  )

  // A. Check for missing token on protected pages
  if (!token) {
    // If no token, redirect to login for any protected page
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // B. Token exists, verify it and check roles
  try {
    // Re-verify the token to ensure it is not expired
    await verifyToken(token)

    if (isUserOnly) {
      if (isAdmin) {
        // Admin trying to view a User-Only path, redirect to admin landing
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      // Normal user viewing User-Only path, allow
      return NextResponse.next()
    }

    if (isAdminOnly) {
      if (!isAdmin) {
        // Normal user trying to view an Admin-Only path, redirect to user landing
        return NextResponse.redirect(new URL('/profile', req.url))
      }
      // Admin viewing Admin-Only path, allow
      return NextResponse.next()
    }

    // Default: Path is protected but doesn't fall into explicit user/admin only category, allow access
    return NextResponse.next()
  } catch {
    // Token is invalid/expired during access attempt, redirect to login
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  // The matcher defines all routes the middleware should execute on
  matcher: [
    '/login',
    '/register',
    '/profile/:path*',
    '/account/:path*',
    '/admin/:path*',
  ],
}
