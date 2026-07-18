import type { NextConfig } from 'next';

const securityHeaders = [
	{
		key: 'Content-Security-Policy',
		value: [
			"default-src 'self'",
			"base-uri 'self'",
			"object-src 'none'",
			"frame-ancestors 'none'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: blob: https: http://localhost:4000 http://127.0.0.1:4000",
			"font-src 'self' data:",
			"connect-src 'self' https://api.aquzera.com https://aquzera-api.eu-west-2.elasticbeanstalk.com http://localhost:4000 http://127.0.0.1:4000",
			"frame-src https://checkout.paystack.com https://js.paystack.co",
			"form-action 'self' https://checkout.paystack.com",
			"upgrade-insecure-requests",
		].join('; '),
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=86400; includeSubDomains',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'X-Frame-Options',
		value: 'DENY',
	},
	{
		key: 'Referrer-Policy',
		value: 'strict-origin-when-cross-origin',
	},
];

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: securityHeaders,
			},
		];
	},
	images: {
		// allow local /public images (default) + external CDNs if needed
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '4000',
				pathname: '/uploads/**',
			},
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '4000',
				pathname: '/uploads/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.jsdelivr.net',
			},
			{
				protocol: 'https',
				hostname: 'aquzera-api.eu-west-2.elasticbeanstalk.com',
				pathname: '/uploads/**',
			},
			{
				protocol: 'https',
				hostname: '*.s3.eu-west-2.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: '*.s3.amazonaws.com',
			},
		],
	},
};

export default nextConfig;
