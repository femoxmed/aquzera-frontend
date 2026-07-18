'use client';

import AquzeraProductItem from '@/components/common/AquzeraProductItem';
import BlueFeaturesStrip from '@/components/common/BlueFeaturesStrip';
import Pagination from '@/components/common/Pagination';
import ProductHero from '@/components/common/ProductHero';
import {
	activeProductColors,
	isProductSaleActive,
	productImageUrl,
	productPrice,
	productRegularPrice,
	productSlug,
} from '@/features/products/api';
import { useProductListing } from '@/features/products/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatStartingPrice } from '@/lib/utils';

export default function ProductListClient() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pageParam = Number(searchParams.get('page') || 1);
	const page =
		Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1;
	const { data: listing, isLoading, isError } = useProductListing(page, 6);
	const bannerProduct = listing?.featuredProduct;
	const listedProducts = listing?.products || [];
	const pagination = listing?.pagination;
	const hasAnyProducts = Boolean(bannerProduct || listedProducts.length > 0);
	const totalPages = pagination?.totalPages || 1;

	const handlePageChange = (nextPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		if (nextPage <= 1) {
			params.delete('page');
		} else {
			params.set('page', String(nextPage));
		}
		const queryString = params.toString();
		router.push(queryString ? `/product?${queryString}` : '/product');
	};

	return (
		<main className='bg-black text-white'>
			{bannerProduct ? (
				<ProductHero
					id={bannerProduct.id}
					name={bannerProduct.name}
					description={
						bannerProduct.shortDescription ||
						bannerProduct.description ||
						undefined
					}
					price={productPrice(bannerProduct)}
					regularPrice={productRegularPrice(bannerProduct)}
					saleLabel={
						isProductSaleActive(bannerProduct)
							? bannerProduct.saleLabel || 'Sale'
							: null
					}
					imageSrc={
						bannerProduct.bannerImage?.url || productImageUrl(bannerProduct)
					}
					learnHref={`/product/${productSlug(bannerProduct)}`}
					priceLabel={formatStartingPrice(productPrice(bannerProduct))}
					variations={activeProductColors(bannerProduct)}
				/>
			) : null}
			{listedProducts.length > 0 ? (
				listedProducts.map((product, index) => (
					<AquzeraProductItem
						key={product.id}
						imageSrc={productImageUrl(product)}
						imageAlt={product.name}
						title={product.name}
						description={product.shortDescription || product.description || ''}
						cartId={product.id}
						cartName={product.name}
						cartPrice={productPrice(product)}
						regularPrice={productRegularPrice(product)}
						saleLabel={
							isProductSaleActive(product) ? product.saleLabel || 'Sale' : null
						}
						variations={activeProductColors(product)}
						learnHref={`/product/${productSlug(product)}`}
						imageOnRight={index % 2 === 1}
					/>
				))
			) : !isLoading && !hasAnyProducts ? (
				<section className='flex min-h-[420px] items-center justify-center px-6 py-24 text-center'>
					<div>
						<h1 className='font-mona-wide text-[30px] font-black text-white sm:text-[42px]'>
							Products unavailable
						</h1>
						<p className='mt-4 max-w-md font-montserrat text-sm leading-relaxed text-white/55'>
							{isError
								? 'We could not load the live catalogue. Please try again shortly.'
								: 'No active products are available right now.'}
						</p>
					</div>
				</section>
			) : null}
			{isLoading ? (
				<section className='px-6 py-20 text-center font-mona text-sm uppercase tracking-[0.22em] text-white/60'>
					Loading products...
				</section>
			) : null}
			{!isLoading && listedProducts.length > 0 && totalPages > 1 ? (
				<section className='mx-auto max-w-6xl px-6 py-10'>
					<Pagination
						page={pagination?.page || page}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</section>
			) : null}
			<BlueFeaturesStrip />
		</main>
	);
}
