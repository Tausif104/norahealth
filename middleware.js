import { NextResponse } from 'next/server'
import { verifyToken } from './lib/jwt/jwt'

export function middleware(req) {
  const token = req.cookies.get('auth_token')?.value
  const pathname = req.nextUrl.pathname

  // Guest-only (hide from logged-in users)
  const guestOnly = ['/login', '/register']

  // Protected routes (block if not logged in)
  const protectedPrefixes = ['/profile', '/account']

  // --------- Guest-only Redirect (if logged in) ---------
  if (guestOnly.includes(pathname)) {
    if (token) {
      try {
        verifyToken(token)
        return NextResponse.redirect(new URL('/profile', req.url))
      } catch {}
    }
    return NextResponse.next()
  }

  // --------- Protected Routes (if NOT logged in) ---------
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  )

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
      verifyToken(token)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/profile/:path*', // protect /profile and all subroutes
    '/account/:path*', // protect /account and all subroutes
  ],
}
