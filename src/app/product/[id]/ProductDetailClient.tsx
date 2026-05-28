'use client';

import InsideTheBox from '@/components/common/InsideTheBox';
import ProductDetailHero from '@/components/common/ProductDetailHero';
import ProductFeatureSlider from '@/components/common/ProductFeatureSlider';
import ProductOverview from '@/components/common/ProductOverview';
import ProductSpecs from '@/components/common/ProductSpecs';
import { productImageUrl, productPrice } from '@/features/products/api';
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

	const imageSrc = productImageUrl(product);
	const description =
		product.description ||
		product.shortDescription ||
		'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.';

	return (
		<main className='bg-white'>
			<ProductDetailHero
				imageSrc={product.bannerImage?.url || imageSrc}
				imageAlt={product.name}
				priceLabel={
					product.startingPriceLabel ||
					`Starting From ₦${productPrice(product).toLocaleString()}*`
				}
			/>
			<ProductOverview
				id={product.id}
				name={product.name}
				price={productPrice(product)}
				description={description}
				imageSrc={imageSrc}
				colors={product.colors || undefined}
			/>
			<ProductFeatureSlider
				features={
					product.features?.map((feature) => ({
							title: feature.title,
							titleLine2: feature.titleLine2,
							description: feature.description || description,
							imageSrc: feature.image?.url || feature.imageUrl || imageSrc,
							imageAlt: feature.imageAlt || feature.title,
							imageClassName: feature.imageClassName,
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
