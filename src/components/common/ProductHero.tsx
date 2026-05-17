'use client';

import Image from 'next/image';
import { useAddToCart } from '@/lib/addToCart';

export default function ProductHero() {
	const addToCart = useAddToCart();
	return (
		<section className='relative overflow-hidden h-[500px] sm:h-[600px] md:h-[700px] lg:h-[824px] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[520px]'>
			<Image
				src='/images/product_page_bg.png'
				alt='Aquzera Water Purifier kitchen scene'
				fill
				priority
				className='object-cover object-center'
			/>

			<div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.52)_46%,rgba(0,0,0,0.38)_100%)]' />

			<div className='relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 pt-8 sm:pt-10 md:pt-12'>
				<div className='max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px]'>
					<h1 className='font-mona-wide font-black leading-[0.95] tracking-[-0.04em] text-white text-[28px] sm:text-[34px] md:text-[44px] lg:text-[52px] xl:text-[62px]'>
						Aquzera
						<br />
						Water Purifier*
					</h1>

					<p className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[410px] xl:max-w-[430px] font-montserrat leading-[1.15] text-white/78 text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]'>
						Aquzera purification systems elevate your everyday hydration through
						advanced filtration and refined engineering.
					</p>

					<div className='mt-5 sm:mt-6 md:mt-8 lg:mt-9 xl:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5'>
						<button
							onClick={() =>
								addToCart({
									id: 'aquzera-water-purifier',
									name: 'Aquzera Water Purifier',
									price: 200000,
									image: '/images/purifier-black.png',
								})
							}
							className='inline-flex h-[44px] sm:h-[50px] md:h-[58px] lg:h-[66px] xl:h-[74px] min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[195px] xl:min-w-[205px] items-center justify-center bg-[#1738e6] px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 font-mona text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-black uppercase tracking-[0.24em] text-white hover:opacity-90 cursor-pointer'>
							BUY NOW{' '}
							<span className='ml-2 sm:ml-3 md:ml-4 text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[28px]'>
								→
							</span>
						</button>

						<a
							href='/product/aquzera-water-purifier'
							className='inline-flex h-[44px] sm:h-[50px] md:h-[58px] lg:h-[66px] xl:h-[74px] min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[175px] xl:min-w-[185px] items-center justify-center border border-white/60 px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 font-mona text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-black uppercase tracking-[0.24em] text-white hover:bg-white/10'>
							Learn More
						</a>
					</div>
				</div>
			</div>

			<div className='absolute bottom-0 left-0 right-0 flex h-[48px] sm:h-[54px] md:h-[60px] lg:h-[66px] xl:h-[72px] items-center justify-center'>
				<p className='font-mona font-black uppercase tracking-[0.2em] sm:tracking-[0.24em] md:tracking-[0.28em] lg:tracking-[0.32em] text-white text-[11px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px]'>
					Starting From ₦200,000*
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
	);
}
