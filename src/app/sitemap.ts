import type { MetadataRoute } from 'next';

const routes = [
	'',
	'/product',
	'/about',
	'/blog',
	'/contact',
	'/faq',
	'/privacy',
	'/shipping-policy',
	'/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	return routes.map((route) => ({
		url: `https://aquzera.com${route}`,
		lastModified: now,
		changeFrequency: route === '' || route === '/product' ? 'weekly' : 'monthly',
		priority: route === '' ? 1 : route === '/product' ? 0.9 : 0.7,
	}));
}
