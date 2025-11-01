import { NextResponse } from 'next/server'

export async function proxy(request) {
  // Get the RuangAkunID cookie
  const ruangAkunId = request.cookies.get('RuangAkunID')?.value

  // Call our API to validate/create user
  const apiUrl = new URL('/api/auth/cookie-user', request.url)

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ruangAkunId: ruangAkunId || null
      })
    })

    const data = await response.json()

    if (response.ok && data.id) {
      // Create response and set/update cookie
      const nextResponse = NextResponse.next()

      // Set cookie with the user ID (either new or existing)
      // Cookie expires in 1 year
      nextResponse.cookies.set('RuangAkunID', data.id, {
        httpOnly: false, // Allow client-side access if needed
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
        path: '/'
      })

      return nextResponse
    }
  } catch (error) {
    console.error('Proxy error:', error)
    // Continue even if validation fails
  }

  return NextResponse.next()
}

// Configure which routes use this proxy
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth/cookie-user (to avoid infinite loop)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth/cookie-user|_next/static|_next/image|favicon.ico).*)',
  ],
}
