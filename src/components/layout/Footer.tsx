import Link from 'next/link';
import Image from 'next/image';
import { HelpCircle } from 'lucide-react';

export default function Footer() {
	return (
		<footer>
			{/* FOOTER IMAGE AREA */}
			<section className='relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[420px] overflow-hidden bg-black/45 backdrop-blur-sm'>
				<Image
					src='/images/footer_bg.png'
					alt='Aquzera footer'
					fill
					className='object-cover object-center blur-[5px] bg-black/45 backdrop-blur-sm'
				/>
				<div className='absolute inset-0 bg-black/65' />

				<div className='absolute bottom-0 left-0 right-0 z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 font-mona text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] font-black uppercase tracking-[0.18em] sm:tracking-[0.2em] md:tracking-[0.22em] lg:tracking-[0.24em] text-white'>
					<p className='underline underline-offset-2 sm:underline-offset-3 md:underline-offset-4 order-1 sm:order-none'>
						Aquzera &copy; 2026
					</p>

					<div className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-14 xl:gap-20 order-3 sm:order-none'>
						<Link href='/privacy'>Privacy Policy</Link>
						<Link href='/warranty'>Warranty</Link>
						<Link href='/terms'>Terms & Conditions</Link>
					</div>

					<Link
						href='/contact'
						className='border border-white/45 px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 py-2 sm:py-2 md:py-3 hover:bg-white/10 order-2 sm:order-none'>
						? Get Help
					</Link>
				</div>
			</section>
		</footer>
	);
}
