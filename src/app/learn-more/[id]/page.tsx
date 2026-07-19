import LearnMoreProductClient from '@/components/product/LearnMoreProductClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Aquzera Product Details',
	description:
		'View Aquzera product details, color options, filtration features, specifications, included items, and purchase information.',
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

export default async function LearnMoreProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <LearnMoreProductClient slug={id} />;
}
