// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')

  // Public paths that don't require authentication
  const publicPaths = ['/', '/auth/login', '/auth/register']
  
  // If trying to access auth pages while logged in
  if (token && pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/main/explore/feed', request.url))
  }

  // If trying to access protected pages while logged out
  if (!token && pathname.startsWith('/main/')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}