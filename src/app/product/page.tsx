import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProductListClient from './ProductListClient';

export const metadata: Metadata = {
	title: 'Aquzera Water Purifiers for Homes and Businesses',
	description:
		'Explore Aquzera water purifiers, hot and cold dispensers, color variations, installation options, and filtration systems for cleaner daily water.',
	alternates: { canonical: '/product' },
	openGraph: {
		title: 'Aquzera Water Purifiers for Homes and Businesses',
		description:
			'Compare Aquzera water purifier models, filtration features, color variations, and installation-ready systems.',
		url: 'https://aquzera.com/product',
	},
};

export default function ProductPage() {
	return (
		<Suspense>
			<ProductListClient />
		</Suspense>
	);
}
