import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	poweredByHeader: false,
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
