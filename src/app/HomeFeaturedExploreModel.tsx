'use client';

import ExploreModel from '@/components/common/ExploreModel';
import { useLatestFeaturedProductItem } from '@/features/products/hooks';
import { formatStartingPrice } from '@/lib/utils';

export default function HomeFeaturedExploreModel() {
	const { data: product } = useLatestFeaturedProductItem();

	if (!product) {
		return <ExploreModel />;
	}

	const colors = product.colors?.map((color) => ({
		id: color.id,
		label: color.label,
		value: color.value,
		imageUrl: color.imageUrl || undefined,
	}));
	const priceLabel = formatStartingPrice(product.price);

	return (
		<ExploreModel
			id={product.id}
			slug={product.slug}
			name={product.name}
			price={product.price}
			priceLabel={priceLabel}
			colors={colors || undefined}
			specifications={product.specifications || undefined}
			mainImage={product.mainImage || undefined}
		/>
	);
}
