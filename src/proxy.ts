import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile', '/cart', '/shipping', '/payment', '/dashboard'];
const isDevelopment = process.env.NODE_ENV !== 'production';

function generateNonce() {
	const bytes = new Uint8Array(16);
	crypto.getRandomValues(bytes);
	let value = '';
	bytes.forEach((byte) => {
		value += String.fromCharCode(byte);
	});
	return btoa(value);
}

function buildContentSecurityPolicy(nonce: string) {
	const styleElementPolicy = isDevelopment
		? "style-src-elem 'self' 'unsafe-inline'"
		: `style-src-elem 'self' 'nonce-${nonce}'`;
	const connectSources = [
		"'self'",
		'https://api.aquzera.com',
		'https://aquzera-api.eu-west-2.elasticbeanstalk.com',
	];

	if (isDevelopment) {
		connectSources.push('http://localhost:4000', 'http://127.0.0.1:4000');
	}

	return [
		"default-src 'none'",
		"base-uri 'self'",
		"object-src 'none'",
		"frame-ancestors 'none'",
		`script-src 'self' 'nonce-${nonce}' https://js.paystack.co`,
		"style-src 'self'",
		styleElementPolicy,
		"style-src-attr 'unsafe-inline'",
		"img-src 'self' data: blob: https:",
		"font-src 'self' data:",
		`connect-src ${connectSources.join(' ')}`,
		"frame-src https://checkout.paystack.com https://js.paystack.co",
		"form-action 'self' https://checkout.paystack.com",
		"upgrade-insecure-requests",
	].join('; ');
}

function applySecurityHeaders(response: NextResponse, csp: string) {
	response.headers.set('Content-Security-Policy', csp);
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains',
	);
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	return response;
}

export function proxy(request: NextRequest) {
	const nonce = generateNonce();
	const csp = buildContentSecurityPolicy(nonce);
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-nonce', nonce);
	requestHeaders.set('Content-Security-Policy', csp);

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
		return applySecurityHeaders(NextResponse.redirect(signInUrl), csp);
	}
	return applySecurityHeaders(
		NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		}),
		csp,
	);
}
export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
	],
};
