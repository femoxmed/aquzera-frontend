'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAddToCart } from '@/lib/addToCart';
import { shouldBypassImageOptimizer } from '@/lib/images';

const COLORS = [
	{
		id: 'charcoal',
		label: 'CHARCOAL BLACK',
		bg: 'bg-[#101818]',
		value: '#101818',
	},
	{ id: 'white', label: 'WHITE', bg: 'bg-white', value: '#ffffff' },
];

type ProductColorInput = {
	id: string;
	label: string;
	value: string;
	imageUrl?: string;
};

type ProductOverviewProps = {
	id?: string;
	name?: string;
	price?: number;
	description?: string;
	imageSrc?: string;
	colors?: ProductColorInput[];
};

export default function ProductOverview({
	id = 'aquzera-water-purifier',
	name = 'Aquzera Water Purifier',
	price = 200000,
	description = 'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.',
	imageSrc = '/images/product_placeholder.png',
	colors = COLORS.map((color) => ({
		id: color.id,
		label: color.label,
		value: color.value,
	})),
}: ProductOverviewProps) {
	const addToCart = useAddToCart();
	const [selectedColorId, setSelectedColorId] = useState<string>(
		colors[0]?.id || '',
	);

	const selectedColor = colors.find((c) => c.id === selectedColorId);
	const displayImage = selectedColor?.imageUrl || imageSrc;

	return (
		<section className='relative overflow-hidden bg-black px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28 text-white'>
			<div className='absolute left-[10%] top-[35%] h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px] rounded-full border border-white/10' />
			<div className='absolute right-[-10%] top-[20%] h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] md:h-[620px] md:w-[620px] rounded-full border border-white/10' />

			<div className='relative z-10 mx-auto flex max-w-[900px] flex-col items-center text-center'>
				<h1 className='font-mona-wide font-bold leading-none tracking-[-0.05em] text-[30px] sm:text-[38px] md:text-[48px] lg:text-[56px] xl:text-[64px]'>
					{name}
				</h1>

				<p className='mt-4 sm:mt-5 md:mt-6 max-w-[300px] sm:max-w-[360px] md:max-w-[440px] font-montserrat text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.25] text-white/55'>
					{description}
				</p>

				<button
					onClick={() =>
						addToCart({
							id,
							name,
							price,
							image: displayImage,
							variant: selectedColor
								? {
										id: selectedColor.id,
										label: selectedColor.label,
										value: selectedColor.value,
										imageUrl: displayImage,
									}
								: undefined,
						})
					}
					className='mt-8 sm:mt-9 md:mt-10 inline-flex h-[48px] sm:h-[52px] md:h-[58px] lg:h-[64px] xl:h-[64px] min-w-[150px] sm:min-w-[165px] md:min-w-[180px] lg:min-w-[190px] xl:min-w-[190px] items-center justify-center bg-[#1738e6] px-5 sm:px-6 md:px-7 lg:px-8 xl:px-8 font-mona text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[13px] font-black uppercase tracking-[0.24em] text-white hover:opacity-90 cursor-pointer'>
					Buy Now{' '}
					<span className='ml-2 sm:ml-3 text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[24px]'>
						→
					</span>
				</button>

				<div className='relative mt-10 sm:mt-12 md:mt-14 h-[320px] sm:h-[380px] md:h-[470px] lg:h-[520px] xl:h-[560px] w-full max-w-[280px] sm:max-w-[340px] md:max-w-[430px] lg:max-w-[450px] xl:max-w-[450px]'>
					<Image
						key={displayImage}
						src={displayImage}
						alt={name}
						fill
						unoptimized={shouldBypassImageOptimizer(displayImage)}
						className='object-contain'
					/>
				</div>

				<div className='mt-6 sm:mt-7 md:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8'>
					{colors.map((color) => (
						<button
							key={color.id}
							onClick={() => setSelectedColorId(color.id)}
							className={`flex items-center gap-3 sm:gap-4 rounded-[10px] sm:rounded-[12px] border px-3 sm:px-4 py-2 sm:py-3 transition ${
								selectedColorId === color.id
									? 'border-white'
									: 'border-white/25'
							}`}>
							<span
								className='h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full border border-white/20'
								style={{ backgroundColor: color.value }}
							/>
							<span className='font-mona text-[10px] sm:text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] text-white'>
								{color.label}
							</span>
						</button>
					))}
				</div>
			</div>
		</section>
	);
}
