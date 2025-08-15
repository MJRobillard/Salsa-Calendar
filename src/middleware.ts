import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if user is trying to access protected routes
  if (pathname.startsWith('/dashboard') || 
      pathname.startsWith('/events/demo') || 
      pathname.startsWith('/test-salsa-events')) {
    // Check if user has visited the landing page
    const hasVisitedLanding = request.cookies.get('hasVisitedLanding')
    
    if (!hasVisitedLanding) {
      // Redirect to landing page if they haven't visited it
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/events/demo/:path*', '/test-salsa-events/:path*']
} 