'use client';

import { useProduct } from '@/features/products/hooks';
import { activeProductColors, productPrice } from '@/features/products/api';
import ProductDetailHero from '@/components/common/ProductDetailHero';
import ProductOverview from '@/components/common/ProductOverview';
import ProductFeatureSlider from '@/components/common/ProductFeatureSlider';
import ProductSpecs from '@/components/common/ProductSpecs';
import InsideTheBox from '@/components/common/InsideTheBox';
import ExploreModel from '@/components/common/ExploreModel';
import { formatStartingPrice } from '@/lib/utils';

type ProductDetailClientProps = {
	slug: string;
};

export default function ProductDetailClient({
	slug,
}: ProductDetailClientProps) {
	const { data: product, isLoading, isError } = useProduct(slug);

	if (isLoading) {
		return (
			<section className='flex min-h-[420px] items-center justify-center bg-black px-6 py-24 text-center'>
				<p className='font-mona text-sm uppercase tracking-[0.22em] text-white/60'>
					Loading product...
				</p>
			</section>
		);
	}

	if (isError || !product) {
		return (
			<section className='flex min-h-[420px] items-center justify-center bg-black px-6 py-24 text-center'>
				<div>
					<h1 className='font-mona-wide text-[30px] font-black text-white sm:text-[42px]'>
						Product unavailable
					</h1>
					<p className='mt-4 max-w-md font-montserrat text-sm leading-relaxed text-white/55'>
						We could not load this product. Please try again shortly.
					</p>
				</div>
			</section>
		);
	}

	const heroImage = product.bannerImage?.url || product.mainImage?.url || '';
	const mainImage =
		product.mainImage?.url || product.galleryImages?.[0]?.url || '';
	const priceLabel =
		product.startingPriceLabel ||
		`${formatStartingPrice(productPrice(product))}*`;

	const activeColors = activeProductColors(product);
	const colors = activeColors.map((c) => ({
		id: c.id,
		label: c.label,
		value: c.value,
		status: c.status || 'active',
		imageUrl: c.image?.url || c.imageUrl || undefined,
	}));

	const features = (product.features || []).map((f) => ({
		title: f.title,
		titleLine2: f.titleLine2,
		description: f.description,
		imageSrc: f.image?.url || f.imageUrl || '/images/product_placeholder.png',
		imageAlt: f.imageAlt || f.title,
		imageClassName: f.imageClassName || 'object-contain p-8 sm:p-10 md:p-12',
	}));

	const specs = (product.specifications || []).map((s) => ({
		label: s.label,
		value: s.value,
	}));

	const boxItems = (product.boxItems || []).map((b) => ({
		title: b.title,
		description: b.description,
		image: b.image,
		imageUrl: b.imageUrl,
		imageAlt: b.imageAlt,
	}));

	return (
		<main>
			<ProductDetailHero
				imageSrc={heroImage}
				imageAlt={product.name}
				priceLabel={priceLabel}
			/>

			<ProductOverview
				id={product.id}
				name={product.name}
				price={productPrice(product)}
				description={
					product.shortDescription || product.description || undefined
				}
				imageSrc={mainImage}
				colors={colors}
			/>

			{features.length > 0 ? (
				<ProductFeatureSlider features={features} />
			) : (
				<ProductFeatureSlider />
			)}

			{specs.length > 0 ? <ProductSpecs specs={specs} /> : <ProductSpecs />}

			<InsideTheBox
				description={
					product.shortDescription || product.description || undefined
				}
				items={boxItems}
			/>

			<ExploreModel
				id={product.id}
				name={product.name}
				price={productPrice(product)}
				priceLabel={priceLabel}
				colors={activeColors || undefined}
				specifications={product.specifications || undefined}
				mainImage={mainImage}
			/>
		</main>
	);
}
