'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useAddToCart } from '@/lib/addToCart';
import { shouldBypassImageOptimizer } from '@/lib/images';
import type { ProductColor } from '@/features/products/types';

type ProductHeroProps = {
	id: string;
	name: string;
	description?: string;
	price: number;
	imageSrc: string;
	learnHref: string;
	priceLabel: string;
	variations?: ProductColor[] | null;
};

export default function ProductHero({
	id,
	name,
	description,
	price,
	imageSrc,
	learnHref,
	priceLabel,
	variations,
}: ProductHeroProps) {
	const addToCart = useAddToCart();
	const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
	const selectableVariations = useMemo(
		() =>
			(variations || []).filter(
				(variation) => variation.id || variation.label || variation.value,
			),
		[variations],
	);
	const hasMultipleVariations = selectableVariations.length > 1;
	const defaultVariation = selectableVariations[0];

	const addProductToCart = (variation?: ProductColor | null) => {
		addToCart({
			id,
			name,
			price,
			image: variation?.image?.url || variation?.imageUrl || imageSrc,
			variant: variation
				? {
						id: variation.id,
						label: variation.label,
						value: variation.value,
						imageUrl: variation.image?.url || variation.imageUrl,
					}
				: undefined,
		});
	};

	const handleBuyNow = () => {
		if (hasMultipleVariations) {
			setIsVariationModalOpen(true);
			return;
		}

		addProductToCart(defaultVariation);
	};

	return (
		<>
			<section className='relative overflow-hidden h-[500px] sm:h-[600px] md:h-[700px] lg:h-[824px] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[520px]'>
				<Image
					src={imageSrc}
					alt={name}
					fill
					priority
					unoptimized={shouldBypassImageOptimizer(imageSrc)}
					className='object-cover object-center'
				/>

				<div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.52)_46%,rgba(0,0,0,0.38)_100%)]' />

				<div className='relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 pt-8 sm:pt-10 md:pt-12'>
					<div className='max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px]'>
						<h1 className='font-mona-wide font-bold leading-[0.95] tracking-[-0.04em] text-white text-[28px] sm:text-[34px] md:text-[44px] lg:text-[52px] xl:text-[62px]'>
							{name}
						</h1>

						{description ? (
							<p className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[410px] xl:max-w-[430px] font-montserrat leading-[1.15] text-white/78 text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]'>
								{description}
							</p>
						) : null}

						<div className='mt-5 sm:mt-6 md:mt-8 lg:mt-9 xl:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5'>
							<button
								onClick={handleBuyNow}
								className='inline-flex h-[44px] sm:h-[50px] md:h-[58px] lg:h-[66px] xl:h-[74px] min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[195px] xl:min-w-[205px] items-center justify-center bg-[#1738e6] px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 font-mona text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-black uppercase tracking-[0.24em] text-white hover:opacity-90 cursor-pointer'>
								BUY NOW{' '}
								<span className='ml-2 sm:ml-3 md:ml-4 text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[28px]'>
									→
								</span>
							</button>

							<Link
								href={learnHref}
								className='inline-flex h-[44px] sm:h-[50px] md:h-[58px] lg:h-[66px] xl:h-[74px] min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[175px] xl:min-w-[185px] items-center justify-center border border-white/60 px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 font-mona text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-black uppercase tracking-[0.24em] text-white hover:bg-white/10'>
								Learn More
							</Link>
						</div>

					</div>
				</div>

				<div className='absolute bottom-0 left-0 right-0 flex h-[48px] sm:h-[54px] md:h-[60px] lg:h-[66px] xl:h-[72px] items-center justify-center'>
					<p className='font-mona font-black uppercase tracking-[0.2em] sm:tracking-[0.24em] md:tracking-[0.28em] lg:tracking-[0.32em] text-white text-[11px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px]'>
						{priceLabel}
					</p>
					<div className='flex flex-col'>
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
				</div>
			</section>

			{isVariationModalOpen ? (
				<div className='fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm'>
					<div className='w-full max-w-2xl bg-white text-black shadow-2xl'>
						<div className='flex items-start justify-between border-b border-[#dedede] px-5 py-5 sm:px-7'>
							<div>
								<p className='font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#1738e6]'>
									Choose variation
								</p>
								<h3 className='mt-2 font-mona-wide text-[24px] font-black leading-none text-black sm:text-[34px]'>
									{name}
								</h3>
							</div>
							<button
								type='button'
								onClick={() => setIsVariationModalOpen(false)}
								className='flex h-10 w-10 shrink-0 items-center justify-center border border-black text-black'
								aria-label='Close variation chooser'>
								<X className='h-5 w-5' strokeWidth={2} />
							</button>
						</div>

						<div className='grid max-h-[65vh] gap-3 overflow-y-auto px-5 py-5 sm:grid-cols-2 sm:px-7'>
							{selectableVariations.map((variation) => {
								const variationImage =
									variation.image?.url || variation.imageUrl || imageSrc;
								return (
									<button
										key={`${variation.id || variation.label || variation.value}`}
										type='button'
										onClick={() => addProductToCart(variation)}
										className='flex min-h-[116px] items-center gap-4 border border-[#d8d8d8] bg-white p-3 text-left transition hover:border-[#1738e6] hover:bg-[#f6f8ff]'>
										<div className='relative h-20 w-20 shrink-0 overflow-hidden bg-[#f4f4f2]'>
											<Image
												src={variationImage}
												alt={variation.label || name}
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
											<p className='mt-2 font-montserrat text-[13px] text-black/60'>
												{variation.value || 'Choose this option'}
											</p>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
