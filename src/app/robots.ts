import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: [
					'/auth/',
					'/cart',
					'/shipping',
					'/payment',
					'/dashboard',
					'/profile',
				],
			},
		],
		sitemap: 'https://aquzera.com/sitemap.xml',
		host: 'https://aquzera.com',
	};
}
