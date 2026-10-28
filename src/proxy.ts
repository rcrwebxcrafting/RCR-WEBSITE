import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyTokenEdge } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle /admin and /admin/login
  const isLoginPage = pathname === '/admin/login'
  const isAdminRoot = pathname === '/admin'
  const isProtectedAdmin = pathname.startsWith('/admin') && !isLoginPage

  const token = request.cookies.get('rcr_admin_token')?.value

  if (isProtectedAdmin) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await verifyTokenEdge(token)
    if (!payload) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('rcr_admin_token')
      return response
    }

    if (isAdminRoot) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  if (isLoginPage && token) {
    const payload = await verifyTokenEdge(token)
    if (payload) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
