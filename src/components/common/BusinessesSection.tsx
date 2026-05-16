import Link from 'next/link';
import Image from 'next/image';

export default function BusinessesSection() {
	return (
		<section className='bg-white px-4 py-16 text-center'>
			<div className='mx-auto max-w-[1160px]'>
				<h2 className='font-mona-wide text-[42px] font-bold leading-[0.95] tracking-[-0.04em] text-black md:text-[56px]'>
					Aquzera for
					<br />
					Businesses
				</h2>

				<p className='mt-8 font-montserrat text-[18px] text-black/60 md:text-[22px]'>
					Bring clarity to your Business restaurant, or Office
				</p>

				<div className='relative mx-auto mt-14 h-[360px] w-full overflow-hidden rounded-[38px] md:h-[520px]'>
					<Image
						src='/images/office-business.png'
						alt='Aquzera water purifier for businesses'
						fill
						className='object-cover'
					/>
				</div>

				<p className='mx-auto mt-14 max-w-[860px] font-montserrat text-[18px] leading-[1.15] tracking-[-0.02em] text-black/70 md:text-[22px]'>
					Learn why thousands of businesses and offices are opting for Aquzera
					water purifiers. Most people are at work for at least one third of the
					day. Make sure to keep a healthy environment for yourself, your
					employees, and your customers with Aquzera and our regular filter
					changes through our rental program.
				</p>

				<div className='mt-10 flex justify-center'>
					<Link
						href='/product/aquzera-water-purifier'
						className='inline-flex h-[64px] min-w-[210px] items-center justify-center bg-[#1738e6] px-8 font-mona text-[14px] font-black uppercase tracking-[0.24em] text-white transition-opacity hover:opacity-90'>
						Explore Now <span className='ml-3 text-[24px] leading-none'>→</span>
					</Link>
				</div>

				<div className='mt-14 border-t border-black/15' />
			</div>
		</section>
	);
}
