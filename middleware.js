import { NextResponse } from 'next/server'
import { verifyToken } from './lib/jwt/jwt'

export function middleware(req) {
  const token = req.cookies.get('auth_token')?.value
  const pathname = req.nextUrl.pathname

  const guestOnly = ['/login', '/register']

  const protectedPrefixes = ['/profile', '/account']

  if (guestOnly.includes(pathname)) {
    if (token) {
      try {
        verifyToken(token)
        return NextResponse.redirect(new URL('/profile', req.url))
      } catch {}
    }
    return NextResponse.next()
  }

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
  matcher: ['/login', '/register', '/profile/:path*', '/account/:path*'],
}
