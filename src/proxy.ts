import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const protectedRoutes = ['/profile', '/cart', '/shipping', '/payment', '/dashboard'];
export function proxy(request: NextRequest) {
	const token = request.cookies.get('accessToken')?.value;
	const refreshToken = request.cookies.get('refreshToken')?.value;
	const pathname = request.nextUrl.pathname;
	const isProtected = protectedRoutes.some((route) =>
		pathname.startsWith(route),
	);
	if (isProtected && !token && !refreshToken) {
		const signInUrl = new URL('/auth/signin', request.url);
		signInUrl.searchParams.set(
			'returnTo',
			`${request.nextUrl.pathname}${request.nextUrl.search}`,
		);
		return NextResponse.redirect(signInUrl);
	}
	return NextResponse.next();
}
export const config = {
	matcher: [
		'/profile/:path*',
		// '/cart/:path*',
		'/shipping/:path*',
		'/payment/:path*',
		'/dashboard/:path*',
	],
};
