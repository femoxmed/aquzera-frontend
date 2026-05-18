'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAddToCart } from '@/lib/addToCart';

const specs = [
	{ value: '15”', label: 'Inches Smart\nDisplay' },
	{ value: '60 Hz', label: 'Low Power' },
	{ value: '25 kg', label: 'Weight' },
];

export default function ExploreModel() {
	const addToCart = useAddToCart();
	const [selectedColor, setSelectedColor] = useState<'white' | 'black'>(
		'black',
	);

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
							src='/images/purifier.png'
							alt='Aquzera Water Purifier'
							fill
							priority
							className='object-contain'
						/>
					</div>

					<div className='flex flex-row gap-5 md:mt-10 md:flex-col md:gap-7'>
						<button
							onClick={() => setSelectedColor('white')}
							className='flex h-[62px] items-center gap-4 rounded-[14px] px-4 transition'>
							<span
								className={`h-11 w-11 rounded-full border border-[#25282d] bg-white ${
									selectedColor === 'white'
										? 'ring-2 ring-black ring-offset-4'
										: ''
								}`}
							/>
							<span className='font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#25282d]'>
								White
							</span>
						</button>

						<button
							onClick={() => setSelectedColor('black')}
							className={`flex h-[66px] items-center gap-4 rounded-[14px] border px-4 transition ${
								selectedColor === 'black'
									? 'border-[#25282d]'
									: 'border-[#d7d7d7]'
							}`}>
							<span className='h-11 w-11 rounded-full bg-[#101818]' />
							<span className='font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#25282d]'>
								Charcoal Black
							</span>
						</button>
					</div>
				</div>

				{/* Specs */}
				<div className='mx-auto mt-20 grid max-w-[920px] grid-cols-3 text-center'>
					{specs.map(({ value, label }) => (
						<div
							key={value}
							className='flex min-h-[120px] flex-col items-center justify-center border-r border-[#25282d]/70 px-4 last:border-r-0 sm:min-h-[150px]'>
							<p className='font-mona-wide text-[38px] font-black leading-none tracking-[-0.05em] text-[#25282d] sm:text-[54px] md:text-[68px]'>
								{value}
							</p>

							<p className='mt-4 whitespace-pre-line font-montserrat text-[16px] leading-[1.1] tracking-[-0.03em] text-black sm:text-[22px] md:text-[26px]'>
								{label}
							</p>
						</div>
					))}
				</div>

				{/* CTA */}
				<div className='mt-14 flex justify-center'>
					<button
						onClick={() =>
							addToCart({
								id: 'aquzera-water-purifier',
								name: 'Aquzera Water Purifier',
								price: 200000,
								image: '/images/purifier.png',
							})
						}
						className='inline-flex h-[58px] min-w-[175px] items-center justify-center bg-[#1738e6] px-8 font-mona text-[13px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 sm:h-[64px] sm:min-w-[205px]'>
						BUY NOW <span className='ml-3 text-[24px] leading-none'>→</span>
					</button>
				</div>

				{/* Lifestyle image */}
				<div className='relative mt-20 h-[300px] overflow-hidden rounded-[30px] sm:h-[420px] md:h-[560px] lg:h-[600px] lg:rounded-[42px]'>
					<Image
						src='/images/family_sitting_drinking.png'
						alt='Family enjoying Aquzera water purifier'
						fill
						className='object-cover object-center'
					/>
				</div>

				<p className='mt-14 text-center font-mona text-[18px] font-black uppercase tracking-[0.28em] text-[#25282d] sm:text-[22px]'>
					Starting From ₦200,000*
				</p>
			</div>
		</section>
	);
}
