import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Aquzera Water Purifier Product Details',
	description:
		'View Aquzera water purifier details, color options, filtration features, specifications, included items, and purchase information.',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
		},
	},
};

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <ProductDetailClient slug={id} />;
}
