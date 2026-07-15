import Link from 'next/link';
import Image from 'next/image';

export default function BusinessesSection() {
	return (
		<section className='bg-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 text-center'>
			<div className='mx-auto max-w-[1160px]'>
				<h2 className='font-mona-wide font-bold leading-[0.95] tracking-[-0.04em] text-black text-[24px] sm:text-[30px] md:text-[38px] lg:text-[46px] xl:text-[56px]'>
					Aquzera for
					<br />
					Businesses
				</h2>

				<p className='mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 font-montserrat text-black/60 text-[14px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[22px]'>
					Bring clarity to your Business restaurant, or Office
				</p>

				<div className='relative mx-auto mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16 w-full overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[30px] lg:rounded-[34px] xl:rounded-[38px] h-[200px] sm:h-[260px] md:h-[340px] lg:h-[420px] xl:h-[520px]'>
					<Image
						src='/images/office-business.png'
						alt='Aquzera water purifier for businesses'
						fill
						className='object-cover'
					/>
				</div>

				<p className='mx-auto mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16 max-w-[300px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[750px] xl:max-w-[860px] font-montserrat leading-[1.15] tracking-[-0.02em] text-black/70 text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px]'>
					Clean drinking water is essential to a productive workplace. Aquzera
					delivers advanced purification solutions for offices, hotels,
					healthcare facilities, schools and commercial spaces ensuring every
					drop meets the highest standards of quality and care.
				</p>

				<div className='mt-6 sm:mt-7 md:mt-8 lg:mt-9 xl:mt-10 flex justify-center'>
					<Link
						href='/product/aquzera-water-purifier'
						className='inline-flex items-center justify-center bg-[#1738e6] font-mona font-black uppercase tracking-[0.24em] text-white transition-opacity hover:opacity-90 h-[44px] sm:h-[48px] md:h-[54px] lg:h-[60px] xl:h-[64px] min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] xl:min-w-[210px] px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]'>
						Explore Now{' '}
						<span className='ml-2 sm:ml-2 md:ml-2 lg:ml-3 xl:ml-3 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] leading-none'>
							→
						</span>
					</Link>
				</div>

				<div className='mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16 border-t border-black/15' />
			</div>
		</section>
	);
}
