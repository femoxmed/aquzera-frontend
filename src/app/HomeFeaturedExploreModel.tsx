'use client';

import ExploreModel from '@/components/common/ExploreModel';
import { useLatestFeaturedProductItem } from '@/features/products/hooks';

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

	return (
		<ExploreModel
			id={product.id}
			slug={product.slug}
			name={product.name}
			price={product.price}
			priceLabel={product.priceLabel}
			colors={colors || undefined}
			specifications={product.specifications || undefined}
			mainImage={product.mainImage || undefined}
		/>
	);
}
