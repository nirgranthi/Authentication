import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';

export function middleware(request: NextRequest) {
  // We only run this on API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';

    const { success, headers } = checkRateLimit(ip);

    if (!success) {
      return NextResponse.json(
        { message: 'Too Many Requests' },
        {
          status: 429,
          headers: {
            ...headers,
            'Retry-After': Math.ceil((parseInt(headers['X-RateLimit-Reset']) - Date.now()) / 1000).toString()
          }
        }
      );
    }

    const response = NextResponse.next();
    // Add rate limit headers to the response
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
