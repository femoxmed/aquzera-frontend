'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAddToCart } from '@/lib/addToCart';
import { shouldBypassImageOptimizer } from '@/lib/images';
import ColorSwatch from '@/components/common/ColorSwatch';
import ProductPriceDisplay from './ProductPriceDisplay';
import type {
	ProductColor,
	ProductSpecification,
} from '@/features/products/types';

const defaultSpecs = [
	{ value: '15"', label: 'Inches Smart\nDisplay' },
	{ value: '60 Hz', label: 'Low Power' },
	{ value: '25 kg', label: 'Weight' },
];

const defaultColors: ProductColor[] = [
	{ id: 'charcoal', label: 'Charcoal Black', value: '#101818' },
	{ id: 'white', label: 'White', value: '#ffffff' },
];

type ExploreModelProps = {
	id?: string;
	slug?: string;
	name?: string;
	price?: number;
	regularPrice?: number | null;
	priceLabel?: string;
	saleLabel?: string | null;
	colors?: ProductColor[];
	specifications?: ProductSpecification[];
	mainImage?: string;
};

export default function ExploreModel({
	id = 'aquzera-water-purifier',
	slug,
	name = 'Aquzera Water Purifier',
	price = 200000,
	regularPrice,
	priceLabel = 'Starting From ₦200,000',
	saleLabel,
	colors = defaultColors,
	specifications,
	mainImage = '/images/purifier.png',
}: ExploreModelProps) {
	const addToCart = useAddToCart();
	const selectableColors = colors.filter((color) => color.status !== 'inactive');
	const [selectedColor, setSelectedColor] = useState<string>(
		selectableColors.find((color) => color.image?.url || color.imageUrl)?.id ||
			selectableColors[0]?.id ||
			'charcoal',
	);

	const displaySpecs =
		specifications && specifications.length > 0 ? specifications : defaultSpecs;

	const selectedColorData = selectableColors.find((c) => c.id === selectedColor);
	const displayImage =
		selectedColorData?.image?.url || selectedColorData?.imageUrl || mainImage;
	const productHref = `/product/${slug || id}`;

	return (
		<section className='bg-white px-4 py-14 sm:px-6 md:py-20 lg:py-24'>
			<div className='mx-auto max-w-[1180px]'>
				<h2 className='text-center font-mona-wide text-[42px] font-bold leading-none tracking-[-0.04em] text-black sm:text-[54px] md:text-[64px]'>
					Explore Model
				</h2>

				{/* Product + colors */}
				<div className='mt-16 flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:gap-12'>
					<div className='relative h-[390px] w-[260px] sm:h-[460px] sm:w-[310px] md:h-[520px] md:w-[350px]'>
						<Image
							key={displayImage}
							src={displayImage}
							alt={name}
							fill
							sizes='(max-width: 640px) 260px, (max-width: 768px) 310px, 350px'
							priority
							unoptimized={shouldBypassImageOptimizer(displayImage)}
							className='object-contain'
						/>
					</div>

					<div className='flex flex-row gap-5 md:mt-10 md:flex-col md:gap-7'>
						{selectableColors.map((color) => (
							<button
								key={color.id}
								onClick={() => setSelectedColor(color.id)}
								className={`flex h-[62px] items-center gap-4 rounded-[14px] px-4 transition ${
									selectedColor === color.id
										? 'border border-[#25282d]'
										: 'border border-[#d7d7d7]'
								}`}>
								<ColorSwatch
									value={color.value}
									className={`h-11 w-11 ${
										selectedColor === color.id
											? 'ring-2 ring-black ring-offset-4'
											: ''
									}`}
								/>
								<span className='font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#25282d]'>
									{color.label}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* Specs */}
				<div className='mx-auto mt-20 grid max-w-[1040px] grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-4'>
					{displaySpecs.map((spec) => {
						const value = 'value' in spec ? spec.value : '';
						const label = 'label' in spec ? spec.label : '';
						return (
							<div
								key={value || label}
								className='flex min-h-[120px] flex-col items-center justify-center border-b border-[#25282d]/25 px-4 py-6 last:border-b-0 sm:min-h-[150px] sm:border-r sm:last:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0'>
								<p className='font-mona-wide text-[22px] font-black leading-tight text-[#25282d] sm:text-[26px] md:text-[30px]'>
									{label}
								</p>
								<p className='mt-4 max-w-[220px] whitespace-pre-line font-montserrat text-[13px] leading-snug text-black/70 sm:text-[14px]'>
									{value}
								</p>
							</div>
						);
					})}
				</div>

				{/* CTA */}
				<div className='mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row'>
					<button
						onClick={() =>
							addToCart({
								id,
								slug,
								name,
								price,
								image: displayImage,
								variant: selectedColorData
									? {
											id: selectedColorData.id,
											label: selectedColorData.label,
											value: selectedColorData.value,
											imageUrl: displayImage,
										}
									: undefined,
							})
						}
						className='inline-flex h-[58px] min-w-[175px] items-center justify-center bg-[#1738e6] px-8 font-mona text-[13px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 sm:h-[64px] sm:min-w-[205px]'>
						BUY NOW <span className='ml-3 text-[24px] leading-none'>→</span>
					</button>
					<Link
						href={productHref}
						className='inline-flex h-[58px] min-w-[175px] items-center justify-center border border-[#25282d] px-8 font-mona text-[13px] font-black uppercase tracking-[0.22em] text-[#25282d] transition-colors hover:bg-[#25282d] hover:text-white sm:h-[64px] sm:min-w-[205px]'>
						View Details
					</Link>
				</div>

				{/* Lifestyle image */}
				<div className='relative mt-20 h-[300px] overflow-hidden rounded-[30px] sm:h-[420px] md:h-[560px] lg:h-[600px] lg:rounded-[42px]'>
					<Image
						src='/images/family_sitting_drinking.png'
						alt='Family enjoying Aquzera water purifier'
						fill
						sizes='(max-width: 1280px) 100vw, 1120px'
						className='object-cover object-center'
					/>
				</div>

				<p className='mt-14 text-center font-mona text-[18px] font-black uppercase tracking-[0.28em] text-[#25282d] sm:text-[22px]'>
					<ProductPriceDisplay
						price={price}
						regularPrice={regularPrice}
						saleLabel={saleLabel}
						currentClassName='text-[#25282d]'
						regularClassName='text-[#25282d]/55'
						labelClassName='text-[#1738e6]'
					/>
				</p>
			</div>
		</section>
	);
}
