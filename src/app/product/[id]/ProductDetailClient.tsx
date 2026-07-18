'use client';

import InsideTheBox from '@/components/common/InsideTheBox';
import ProductDetailHero from '@/components/common/ProductDetailHero';
import ProductFeatureSlider from '@/components/common/ProductFeatureSlider';
import ProductOverview from '@/components/common/ProductOverview';
import { formatStartingPrice } from '@/lib/utils';
import ProductSpecs from '@/components/common/ProductSpecs';
import {
	activeProductColors,
	isProductSaleActive,
	productImageUrl,
	productPrice,
	productRegularPrice,
	productVariantImageUrl,
} from '@/features/products/api';
import { useProduct } from '@/features/products/hooks';

type ProductDetailClientProps = {
	slug: string;
};

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
	const { data: product, isLoading, isError } = useProduct(slug);

	if (isLoading) {
		return (
			<main className='flex min-h-screen items-center justify-center bg-black px-6 text-center font-mona text-sm uppercase tracking-[0.22em] text-white/60'>
				Loading product...
			</main>
		);
	}

	if (isError || !product) {
		return (
			<main className='flex min-h-screen items-center justify-center bg-black px-6 text-center text-white'>
				<div>
					<h1 className='font-mona-wide text-[34px] font-black'>
						Product unavailable
					</h1>
					<p className='mt-4 max-w-md font-montserrat text-sm text-white/55'>
						We could not load this product. Please return to the products page
						and try again.
					</p>
				</div>
			</main>
		);
	}

	const activeColors = activeProductColors(product);
	const colors = activeColors.map((color) => ({
		id: color.id,
		label: color.label,
		value: color.value,
		status: color.status || 'active',
		imageUrl: productVariantImageUrl(color),
	}));
	const imageSrc = productImageUrl(product);
	const description =
		product.description ||
		product.shortDescription ||
		'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.';
	const saleLabel = isProductSaleActive(product)
		? product.saleLabel || 'Sale'
		: null;

	return (
		<main className='bg-white'>
			<ProductDetailHero
				imageSrc={product.bannerImage?.url || imageSrc}
				imageAlt={product.name}
				priceLabel={`${formatStartingPrice(productPrice(product))}*`}
				regularPrice={productRegularPrice(product)}
				saleLabel={saleLabel}
			/>
			<ProductOverview
				id={product.id}
				name={product.name}
				price={productPrice(product)}
				regularPrice={productRegularPrice(product)}
				saleLabel={saleLabel}
				description={description}
				imageSrc={imageSrc}
				colors={colors || undefined}
			/>
			<ProductFeatureSlider
				features={
					product.features?.map((feature) => ({
							title: feature.title,
							titleLine2: feature.titleLine2,
							description: feature.description || description,
							imageSrc: feature.image?.url || feature.imageUrl || imageSrc,
							imageAlt: feature.imageAlt || feature.title,
							imageClassName:
								feature.imageClassName || 'object-contain p-8 sm:p-10 md:p-12',
						})) || undefined
				}
			/>
			<ProductSpecs specs={product.specifications || undefined} />
			<InsideTheBox
				description={product.shortDescription || description}
				items={product.boxItems || undefined}
			/>
		</main>
	);
}
