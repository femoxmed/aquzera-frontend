'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAddToCart } from '@/lib/addToCart';
import { shouldBypassImageOptimizer } from '@/lib/images';

type AquzeraProductItemProps = {
	imageSrc: string;
	imageAlt: string;
	title: string;
	titleLine2?: string;
	description: string;
	cartId: string;
	cartName: string;
	cartPrice: number;
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
	learnHref = '/about',
	imageOnRight = false,
}: AquzeraProductItemProps) {
	const addToCart = useAddToCart();
	return (
		<section className='grid grid-cols-1 md:grid-cols-2'>
			{/* Image */}
			<div
				className={`relative h-[200px] sm:h-[260px] md:h-full flex items-center justify-center overflow-hidden bg-[#f4f4f2] order-1 ${
					imageOnRight ? 'md:order-2' : 'md:order-1'
				}`}>
				<Image
					src={imageSrc}
					alt={imageAlt}
					fill
					unoptimized={shouldBypassImageOptimizer(imageSrc)}
					className='object-cover'
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
						onClick={() =>
							addToCart({
								id: cartId,
								name: cartName,
								price: cartPrice,
								image: imageSrc,
							})
						}
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
	);
}
