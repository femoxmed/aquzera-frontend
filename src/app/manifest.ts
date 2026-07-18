import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Aquzera Water Solutions',
		short_name: 'Aquzera',
		description:
			'Water purifiers, filtration systems, installation support, and maintenance services in Nigeria.',
		start_url: '/',
		display: 'standalone',
		background_color: '#061927',
		theme_color: '#061927',
		icons: [
			{
				src: '/icons/icon.svg',
				sizes: 'any',
				type: 'image/svg+xml',
			},
			{
				src: '/icons/apple-touch-icon.svg',
				sizes: '180x180',
				type: 'image/svg+xml',
			},
		],
	};
}
