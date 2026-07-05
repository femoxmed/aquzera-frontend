import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
		],
	},
};

export default nextConfig;
