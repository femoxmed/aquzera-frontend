'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const specs = [
	{ value: '15"', label: 'Inches Smart\nDisplay' },
	{ value: '60 Hz', label: 'Low Power' },
	{ value: '25 kg', label: 'Weight' },
];

export default function ExploreModel() {
	const [selectedColor, setSelectedColor] = useState<'white' | 'black'>(
		'black',
	);

	return (
		<section className='bg-white py-8 sm:py-10 md:py-12 lg:py-14 border-t border-[#f3f4f6]'>
			<div className='container'>
				<h2 className='text-center font-mona-wide text-gray-900 mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-bold text-[28px] sm:text-[36px] md:text-[48px] lg:text-[65px] leading-[110%] lg:leading-[100%] tracking-[0%]'>
					Explore Model
				</h2>

				<div className='flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16'>
					<div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8'>
						<div className='relative flex-shrink-0 w-[180px] h-[300px] sm:w-[220px] sm:h-[370px] md:w-[280px] md:h-[470px] lg:w-[344px] lg:h-[581px]'>
							<Image
								src='/images/purifier.png'
								alt='Aquzera Water Purifier'
								fill
								className='object-contain drop-shadow-2xl'
							/>
						</div>
						<div className='flex flex-row sm:flex-col gap-3 sm:gap-5 my-4 sm:my-6 lg:my-8'>
							<button
								onClick={() => setSelectedColor('white')}
								className='flex items-center gap-2 focus:outline-none'>
								<span
									className={`block rounded-full w-[22px] h-[22px] bg-white outline-offset-2 ${selectedColor === 'white' ? 'outline-2 outline-black' : 'border-2 border-gray-300'}`}
								/>
								<span className='font-semibold text-gray-700 uppercase text-[0.65rem] tracking-[0.15em]'>
									WHITE
								</span>
							</button>
							<button
								onClick={() => setSelectedColor('black')}
								className='flex items-center gap-2 focus:outline-none'>
								<span
									className={`block rounded-full w-[22px] h-[22px] bg-[#111] outline-offset-2 ${selectedColor === 'black' ? 'outline-2 outline-[#1229C0]' : 'border-2 border-[#111]'}`}
								/>
								<span className='font-semibold text-gray-700 uppercase text-[0.65rem] tracking-[0.15em]'>
									CHARCOAL BLACK
								</span>
							</button>
						</div>
					</div>

					<div className='w-full'>
						<div className='mx-auto grid max-w-[1360px] grid-cols-3 items-start text-center'>
							{specs.map(({ value, label }, index) => (
								<div
									key={value}
									className='flex min-h-[100px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[260px] flex-col items-center justify-center border-r border-[#25282d] last:border-r-0'>
									<p className='font-mona-wide text-[30px] sm:text-[40px] md:text-[55px] lg:text-[70px] font-bold leading-none tracking-[-0.04em] text-[#25282d]'>
										{value}
									</p>
									<p className='mt-3 sm:mt-4 md:mt-6 lg:mt-8 whitespace-pre-line text-[14px] sm:text-[18px] md:text-[28px] lg:text-[38px] font-normal leading-[1.12] tracking-[-0.03em] text-black'>
										{label}
									</p>
								</div>
							))}
						</div>

						<div className='mt-8 sm:mt-10 md:mt-14 lg:mt-20 flex justify-center'>
							<Link
								href='/product/aquzera-water-purifier'
								className='inline-flex h-[50px] sm:h-[56px] md:h-[64px] lg:h-[73px] min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[237px] items-center justify-center bg-[#1738e6] px-6 sm:px-8 lg:px-10 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-black uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90'>
								BUY NOW
								<span className='ml-2 sm:ml-3 text-[18px] sm:text-[22px] md:text-[26px] lg:text-[29px] leading-none'>
									→
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
