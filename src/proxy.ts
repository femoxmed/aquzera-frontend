import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile', '/dashboard'];
const noIndexRoutes = [
	'/auth',
	'/cart',
	'/shipping',
	'/payment',
	'/dashboard',
	'/profile',
];
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

function buildContentSecurityPolicy(nonce: string, allowDevelopmentRuntime: boolean) {
	const scriptPolicy = allowDevelopmentRuntime
		? `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://js.paystack.co`
		: `script-src 'self' 'nonce-${nonce}' https://js.paystack.co`;
	const styleElementPolicy = allowDevelopmentRuntime
		? "style-src-elem 'self' 'unsafe-inline'"
		: `style-src-elem 'self' 'nonce-${nonce}'`;
	const connectSources = [
		"'self'",
		'https://api.aquzera.com',
		'https://aquzera-api.eu-west-2.elasticbeanstalk.com',
	];

	if (allowDevelopmentRuntime) {
		connectSources.push('http://localhost:4000', 'http://127.0.0.1:4000');
	}

	return [
		"default-src 'none'",
		"base-uri 'self'",
		"object-src 'none'",
		"frame-ancestors 'none'",
		scriptPolicy,
		"style-src 'self'",
		styleElementPolicy,
		"style-src-attr 'unsafe-inline'",
		"img-src 'self' data: blob: https:",
		"font-src 'self' data:",
		`connect-src ${connectSources.join(' ')}`,
		"manifest-src 'self'",
		"frame-src https://checkout.paystack.com https://js.paystack.co",
		"form-action 'self' https://checkout.paystack.com",
		"upgrade-insecure-requests",
	].join('; ');
}

function applySecurityHeaders(
	response: NextResponse,
	csp: string,
	shouldNoIndex = false,
) {
	response.headers.set('Content-Security-Policy', csp);
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains',
	);
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=(self)',
	);
	if (shouldNoIndex) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}
	return response;
}

export function proxy(request: NextRequest) {
	const nonce = generateNonce();
	const isLocalRequest =
		request.nextUrl.hostname === 'localhost' ||
		request.nextUrl.hostname === '127.0.0.1';
	const csp = buildContentSecurityPolicy(
		nonce,
		isDevelopment || isLocalRequest,
	);
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-nonce', nonce);
	requestHeaders.set('Content-Security-Policy', csp);

	const token = request.cookies.get('accessToken')?.value;
	const refreshToken = request.cookies.get('refreshToken')?.value;
	const pathname = request.nextUrl.pathname;
	const isProtected = protectedRoutes.some((route) =>
		pathname.startsWith(route),
	);
	const shouldNoIndex = noIndexRoutes.some((route) => pathname.startsWith(route));
	if (isProtected && !token && !refreshToken) {
		const signInUrl = new URL('/auth/signin', request.url);
		signInUrl.searchParams.set(
			'returnTo',
			`${request.nextUrl.pathname}${request.nextUrl.search}`,
		);
		return applySecurityHeaders(NextResponse.redirect(signInUrl), csp, true);
	}
	return applySecurityHeaders(
		NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		}),
		csp,
		shouldNoIndex,
	);
}
export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|images/|icons/|mona-sans/).*)',
	],
};
