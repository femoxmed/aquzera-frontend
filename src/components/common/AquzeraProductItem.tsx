'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useAddToCart } from '@/lib/addToCart';
import { shouldBypassImageOptimizer } from '@/lib/images';
import type { ProductColor } from '@/features/products/types';

type AquzeraProductItemProps = {
	imageSrc: string;
	imageAlt: string;
	title: string;
	titleLine2?: string;
	description: string;
	cartId: string;
	cartName: string;
	cartPrice: number;
	variations?: ProductColor[] | null;
	learnHref?: string;
	imageOnRight?: boolean;
};

export default function AquzeraProductItem({
	imageSrc,
	imageAlt,
	title,
	titleLine2,
	description,
	cartId,
	cartName,
	cartPrice,
	variations,
	learnHref = '/about',
	imageOnRight = false,
}: AquzeraProductItemProps) {
	const addToCart = useAddToCart();
	const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
	const [selectedVariationId, setSelectedVariationId] = useState('');
	const selectableVariations = useMemo(
		() =>
			(variations || []).filter(
				(variation) =>
					variation.status !== 'inactive' &&
					(variation.id || variation.label || variation.value),
			),
		[variations],
	);
	const hasMultipleVariations = selectableVariations.length > 1;
	const defaultVariation = selectableVariations[0];
	const selectedVariation = selectableVariations.find(
		(variation) =>
			(variation.id || variation.label || variation.value) === selectedVariationId,
	);

	const addProductToCart = (variation?: ProductColor | null) => {
		addToCart({
			id: cartId,
			name: cartName,
			price: cartPrice,
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
			setSelectedVariationId('');
			setIsVariationModalOpen(true);
			return;
		}

		addProductToCart(defaultVariation);
	};

	return (
		<>
			<section className='grid grid-cols-1 md:grid-cols-2'>
				{/* Image */}
				<div
					className={`flex h-[320px] items-center justify-center overflow-hidden bg-[#f4f4f2] px-10 py-12 order-1 sm:h-[420px] sm:px-14 sm:py-16 md:h-[560px] lg:h-[640px] lg:px-20 lg:py-24 ${
						imageOnRight ? 'md:order-2' : 'md:order-1'
					}`}>
					<Image
						src={imageSrc}
						alt={imageAlt}
						width={720}
						height={720}
						unoptimized={shouldBypassImageOptimizer(imageSrc)}
						className='max-h-full w-auto max-w-full object-contain object-center'
					/>
				</div>

				{/* Content */}
				<div
					className={`flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 py-8 sm:py-10 md:py-16 lg:py-20 xl:py-24 order-2 ${
						imageOnRight ? 'md:order-1' : 'md:order-2'
					}`}>
					<h2 className='font-mona-wide font-black leading-[0.95] tracking-[-0.04em] text-white text-[28px] sm:text-[34px] md:text-[40px] lg:text-[48px] xl:text-[58px]'>
						{title}
						{titleLine2 && (
							<>
								<br />
								{titleLine2}
							</>
						)}
					</h2>

					<p className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] font-montserrat leading-[1.15] text-white/72 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px]'>
						{description}
					</p>

					<div className='mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5'>
						<button
							onClick={handleBuyNow}
							className='inline-flex h-[50px] sm:h-[56px] md:h-[62px] lg:h-[68px] xl:h-[74px] min-w-[150px] sm:min-w-[170px] md:min-w-[185px] lg:min-w-[195px] xl:min-w-[205px] items-center justify-center bg-[#1738e6] px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 font-mona text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-black uppercase tracking-[0.24em] text-white hover:opacity-90 cursor-pointer'>
							BUY NOW{' '}
							<span className='ml-2 sm:ml-3 md:ml-4 text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[28px]'>
								→
							</span>
						</button>

						<Link
							href={learnHref}
							className='inline-flex h-[50px] sm:h-[56px] md:h-[62px] lg:h-[68px] xl:h-[74px] min-w-[130px] sm:min-w-[150px] md:min-w-[165px] lg:min-w-[175px] xl:min-w-[185px] items-center justify-center border border-white/60 px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 font-mona text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-black uppercase tracking-[0.24em] text-white hover:bg-white/10'>
							Learn More
						</Link>
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
									{cartName}
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
							{selectableVariations.map((variation) => {
								const variationImage =
									variation.image?.url || variation.imageUrl || imageSrc;
								return (
									<button
										key={`${variation.id || variation.label || variation.value}`}
										type='button'
										onClick={() =>
											setSelectedVariationId(
												variation.id || variation.label || variation.value,
											)
										}
										className={`flex min-h-[116px] items-center gap-4 border bg-white p-3 text-left transition hover:border-[#1738e6] hover:bg-[#f6f8ff] ${
											selectedVariationId ===
											(variation.id || variation.label || variation.value)
												? 'border-[#1738e6] bg-[#f6f8ff]'
												: 'border-[#d8d8d8]'
										}`}>
										<div className='relative h-20 w-20 shrink-0 overflow-hidden bg-[#f4f4f2]'>
											<Image
												src={variationImage}
												alt={variation.label || cartName}
												fill
												unoptimized={shouldBypassImageOptimizer(variationImage)}
												className='object-contain p-2'
											/>
										</div>
										<div className='min-w-0'>
											<div className='flex items-center gap-2'>
												<svg
													viewBox='0 0 16 16'
													className='h-4 w-4 shrink-0 rounded-full border border-black/15'
													aria-hidden='true'>
													<circle cx='8' cy='8' r='8' fill={variation.value || '#ffffff'} />
												</svg>
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
									onClick={() => addProductToCart(selectedVariation)}
									className='inline-flex h-12 w-full items-center justify-center bg-[#1738e6] px-5 font-mona text-[12px] font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90'>
									Proceed
								</button>
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</>
	);
}
