'use client';

import Image from 'next/image';
import { useAddToCart } from '@/lib/addToCart';

export default function HeroSection() {
	const addToCart = useAddToCart();

	return (
		<section className='relative overflow-hidden h-[500px] sm:h-[600px] md:h-[700px] lg:h-[824px] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[520px]'>
			<Image
				src='/images/home-family.png'
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
					Water Purifier*
				</h1>
				<p className='mt-4 max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] font-montserrat text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-normal leading-[110%] lg:leading-[100%] tracking-[0%] text-white/75'>
					Aquzera purification systems elevate your everyday hydration through
					advanced filtration and refined engineering.
				</p>
				<div className='mt-8'>
					<button
						onClick={() =>
							addToCart({
								id: 'aquzera-water-purifier',
								name: 'Aquzera Water Purifier',
								price: 200000,
								image: '/images/purifier-black.png',
							})
						}
						className='inline-flex font-mona justify-center items-center gap-3 font-bold tracking-[0.18em] text-white text-sm sm:text-base px-5 sm:px-7 py-3 sm:py-[14px] h-[56px] sm:h-[66px] lg:h-[76px] w-[180px] sm:w-[200px] lg:w-[225px] bg-[#1229C0] hover:opacity-90 transition-opacity cursor-pointer'>
						BUY NOW &nbsp;→
					</button>
				</div>
			</div>

			<div className='absolute flex flex-col bottom-0 left-0 right-0 items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3'>
				<span className='font-mona text-white font-semibold text-[14px] sm:text-[18px] md:text-[22px] lg:text-[25px] leading-[110%] tracking-[0.12em] sm:tracking-[0.15em]'>
					{' '}
					STARTING FROM ₦200,000*
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
		</section>
	);
}
