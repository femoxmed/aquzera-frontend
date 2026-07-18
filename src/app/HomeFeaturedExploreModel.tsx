'use client';

import ExploreModel from '@/components/common/ExploreModel';
import { useLatestFeaturedProductItem } from '@/features/products/hooks';
import { formatStartingPrice } from '@/lib/utils';

export default function HomeFeaturedExploreModel() {
	const { data: product } = useLatestFeaturedProductItem();

	if (!product) {
		return <ExploreModel />;
	}

	const colors = product.colors
		?.filter((color) => color.status !== 'inactive')
		.map((color) => ({
			id: color.id,
			label: color.label,
			value: color.value,
			status: color.status || 'active',
			imageUrl: color.imageUrl || undefined,
		}));
	const priceLabel = formatStartingPrice(product.price);
	const activeVariationImage = colors?.find((color) => color.imageUrl)?.imageUrl;
	const hasSingleVariation = (colors?.length || 0) === 1;

	return (
		<ExploreModel
			id={product.id}
			slug={product.slug}
			name={product.name}
			price={product.price}
			regularPrice={product.regularPrice}
			priceLabel={priceLabel}
			saleLabel={product.salePrice ? product.saleLabel || 'Sale' : null}
			colors={colors || undefined}
			specifications={product.specifications || undefined}
			mainImage={
				hasSingleVariation
					? activeVariationImage || product.mainImage || undefined
					: product.mainImage || activeVariationImage || undefined
			}
		/>
	);
}
