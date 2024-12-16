import { NextRequest, NextResponse } from 'next/server';
export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    // Corrected to use 'request' instead of 'Request'
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Check if token exists and if the current path is one of the defined routes
    if (token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify') ||
        url.pathname.startsWith('/')
    )) {
        // If token exists, redirect to the dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If no token exists, redirect to home
    return NextResponse.redirect(new URL('/home', request.url));
}

// Matching paths for the middleware
export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*',
  ],
};
