'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useLatestFeaturedProductItem } from '@/features/products/hooks';
import { formatStartingPrice } from '@/lib/utils';
import { useAddToCart } from '@/lib/addToCart';
import { shouldBypassImageOptimizer } from '@/lib/images';

export default function HeroSection() {
	const { data: featuredProduct } = useLatestFeaturedProductItem();
	const addToCart = useAddToCart();
	const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
	const [selectedVariationId, setSelectedVariationId] = useState('');
	const priceLabel = formatStartingPrice(featuredProduct?.price ?? 200000);
	const variations = useMemo(
		() =>
			(featuredProduct?.colors || []).filter(
				(variation) => variation.id || variation.label || variation.value,
			),
		[featuredProduct?.colors],
	);
	const hasMultipleVariations = variations.length > 1;
	const defaultVariation = variations[0];
	const selectedVariation = variations.find(
		(variation) =>
			(variation.id || variation.label || variation.value) === selectedVariationId,
	);
	const productImage =
		featuredProduct?.mainImage ||
		defaultVariation?.imageUrl ||
		'/images/product_placeholder.png';

	const addFeaturedProductToCart = (
		variation?: (typeof variations)[number] | null,
	) => {
		if (!featuredProduct) {
			window.location.href = '/product';
			return;
		}

		const image = variation?.imageUrl || productImage;
		addToCart({
			id: featuredProduct.id,
			slug: featuredProduct.slug,
			name: featuredProduct.name,
			price: Number(featuredProduct.price) || 0,
			image,
			variant: variation
				? {
						id: variation.id,
						label: variation.label,
						value: variation.value,
						imageUrl: variation.imageUrl || undefined,
					}
				: undefined,
		});
	};

	const handleBuyNow = () => {
		if (!featuredProduct) {
			window.location.href = '/product';
			return;
		}

		if (hasMultipleVariations) {
			setSelectedVariationId('');
			setIsVariationModalOpen(true);
			return;
		}

		addFeaturedProductToCart(defaultVariation);
	};

	return (
		<section className='relative overflow-hidden h-[500px] sm:h-[600px] md:h-[700px] lg:h-[824px] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[520px]'>
			<Image
				src='/images/home_bg.png'
				alt='Family enjoying Aquzera water purifier'
				fill
				className='object-cover object-center'
				priority
			/>
			<div className='absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.10)_100%)]' />

			<div className='absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-30'>
				<h1 className='font-mona-wide font-bold text-white leading-[1.02] text-[clamp(2rem,5vw,3.6rem)] sm:text-[clamp(2.5rem,5vw,3.6rem)] lg:text-[clamp(4.4rem,5vw,3.6rem)]'>
					Aquzera
					<br />
					Water Purifier
				</h1>
				<p className='mt-4 max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] font-montserrat text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-normal leading-[110%] lg:leading-[100%] tracking-[0%] text-white/75'>
					Aquzera purification systems elevate your everyday hydration through
					advanced filtration and refined engineering.
				</p>
				<div className='mt-8'>
					<button
						type='button'
						onClick={handleBuyNow}
						className='inline-flex font-mona justify-center items-center gap-3 font-bold tracking-[0.18em] text-white text-sm sm:text-base px-5 sm:px-7 py-3 sm:py-[14px] h-[56px] sm:h-[66px] lg:h-[76px] w-[180px] sm:w-[200px] lg:w-[225px] bg-[#1229C0] hover:opacity-90 transition-opacity cursor-pointer'>
						BUY NOW &nbsp;→
					</button>
				</div>
			</div>

			<div className='absolute flex flex-col bottom-0 left-0 right-0 items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3'>
				<span className='font-mona text-white font-semibold text-[14px] sm:text-[18px] md:text-[22px] lg:text-[25px] leading-[110%] tracking-[0.12em] sm:tracking-[0.15em]'>
					{priceLabel}
				</span>
				<svg
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='#fff'
					strokeWidth='2'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M19 8l-7 7-7-7'
					/>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M19 13l-7 7-7-7'
					/>
				</svg>
			</div>

			{isVariationModalOpen ? (
				<div className='fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm'>
					<div className='w-full max-w-2xl bg-white text-black shadow-2xl'>
						<div className='flex items-start justify-between border-b border-[#dedede] px-5 py-5 sm:px-7'>
							<div>
								<p className='font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#1738e6]'>
									Choose variation
								</p>
								<h3 className='mt-2 font-mona-wide text-[24px] font-black leading-none text-black sm:text-[34px]'>
									{featuredProduct?.name || 'Aquzera Water Purifier'}
								</h3>
							</div>
							<button
								type='button'
								onClick={() => {
									setIsVariationModalOpen(false);
									setSelectedVariationId('');
								}}
								className='flex h-10 w-10 shrink-0 items-center justify-center border border-black text-black'
								aria-label='Close variation chooser'>
								<X className='h-5 w-5' strokeWidth={2} />
							</button>
						</div>

						<div className='grid max-h-[65vh] gap-3 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-7'>
							{variations.map((variation) => {
								const variationImage = variation.imageUrl || productImage;
								const variationId =
									variation.id || variation.label || variation.value;
								return (
									<button
										key={variationId}
										type='button'
										onClick={() => setSelectedVariationId(variationId)}
										className={`flex min-h-[116px] items-center gap-4 border bg-white p-3 text-left transition hover:border-[#1738e6] hover:bg-[#f6f8ff] ${
											selectedVariationId === variationId
												? 'border-[#1738e6] bg-[#f6f8ff]'
												: 'border-[#d8d8d8]'
										}`}>
										<div className='relative h-20 w-20 shrink-0 overflow-hidden bg-[#f4f4f2]'>
											<Image
												src={variationImage}
												alt={
													variation.label ||
													featuredProduct?.name ||
													'Aquzera Water Purifier'
												}
												fill
												unoptimized={shouldBypassImageOptimizer(variationImage)}
												className='object-contain p-2'
											/>
										</div>
										<div className='min-w-0'>
											<div className='flex items-center gap-2'>
												<span
													className='h-4 w-4 shrink-0 rounded-full border border-black/15'
													style={{ backgroundColor: variation.value || '#ffffff' }}
												/>
												<p className='break-words font-mona text-[16px] font-black text-black'>
													{variation.label || 'Selected variation'}
												</p>
											</div>
										</div>
									</button>
								);
							})}
						</div>
						{selectedVariation ? (
							<div className='border-t border-[#dedede] px-5 py-5 sm:px-7'>
								<button
									type='button'
									onClick={() => addFeaturedProductToCart(selectedVariation)}
									className='inline-flex h-12 w-full items-center justify-center bg-[#1738e6] px-5 font-mona text-[12px] font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90'>
									Proceed
								</button>
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</section>
	);
}
