import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import appConfig from '../app.config.js'

// only allow firebase emulator requests from localhost
export function middleware(request: NextRequest) {
  const isLocalhost = request.headers
    .get('host')
    ?.includes(`localhost:${appConfig.nextjs.port}`)

  if (!isLocalhost) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } },
    )
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/firebase/emulators/:path*',
}
