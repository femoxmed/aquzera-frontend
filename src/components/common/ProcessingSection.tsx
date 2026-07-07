import { Forklift, Plug, Headset } from 'lucide-react';

export default function ProcessingSection() {
	return (
		<section className='bg-gradient-to-b from-black via-[#050607] to-[#202329] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 text-white'>
			<div className='mx-auto max-w-[1040px]'>
				<div className='grid gap-6 sm:gap-7 md:gap-8 border-b border-white/15 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 md:grid-cols-[420px_1fr] md:items-start'>
					<h2 className='font-mona-wide font-bold leading-[0.9] tracking-[-0.05em] text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[58px]'>
						Quick and
						<br />
						Efficient
						<br />
						Processing
					</h2>

					<div className='space-y-4 sm:space-y-5 md:space-y-6 pt-0 sm:pt-1 md:pt-2 font-montserrat leading-[1.35] text-white/55 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px]'>
						<p>
							Aquzera purification systems elevate your everyday hydration
							through advanced filtration and refined engineering.
						</p>
						<p>
							Aquzera purification systems elevate your everyday hydration
							through advanced filtration and refined engineering.
						</p>
					</div>
				</div>

				<div className='mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28 xl:space-y-32'>
					<div className='flex flex-col items-center md:grid md:grid-cols-[230px_1fr] md:items-center gap-6 sm:gap-8 md:gap-10 md:pl-0 lg:pl-6 xl:pl-10 text-center md:text-left'>
						<div className='flex h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px] lg:h-[150px] lg:w-[150px] xl:h-[165px] xl:w-[165px] items-center justify-center rounded-full border border-white/35'>
							<Forklift className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-15 lg:w-15 xl:h-16 xl:w-16 stroke-[1.3]' />
						</div>
						<div className='max-w-[400px] sm:max-w-[450px] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[520px] mx-auto md:mx-0'>
							<h3 className='font-mona font-black uppercase tracking-[0.28em] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] xl:text-[20px]'>
								Seamless Delivery
							</h3>
							<p className='mt-3 sm:mt-4 md:mt-5 font-montserrat leading-[1.35] text-white/50 text-[13px] sm:text-[14px] md:text-[14px] lg:text-[15px] xl:text-[16px]'>
								From order to arrival, every Aquzera system is delivered with
								precision, care, and efficiency.
							</p>
						</div>
					</div>

					<div className='flex flex-col md:grid md:grid-cols-[1fr_230px] items-center gap-6 sm:gap-8 md:gap-10 md:pr-0 lg:pr-12 xl:pr-20 text-center md:text-left'>
						<div className='max-w-[400px] sm:max-w-[450px] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[520px] mx-auto md:mx-0 md:ml-0 lg:ml-[100px] xl:ml-[190px] order-1 md:order-none'>
							<h3 className='font-mona font-black uppercase tracking-[0.28em] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] xl:text-[20px]'>
								Precision Installation
							</h3>
							<p className='mt-3 sm:mt-4 md:mt-5 font-montserrat leading-[1.35] text-white/50 text-[13px] sm:text-[14px] md:text-[14px] lg:text-[15px] xl:text-[16px]'>
								Expertly installed by certified professionals to ensure
								exceptional performance from day one.
							</p>
						</div>
						<div className='flex h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px] lg:h-[150px] lg:w-[150px] xl:h-[165px] xl:w-[165px] items-center justify-center rounded-full border border-white/35 order-0 md:order-none'>
							<Plug className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-15 lg:w-15 xl:h-16 xl:w-16 stroke-[1.3]' />
						</div>
					</div>

					<div className='flex flex-col items-center md:grid md:grid-cols-[230px_1fr] md:items-center gap-6 sm:gap-8 md:gap-10 md:pl-0 lg:pl-6 xl:pl-10 text-center md:text-left'>
						<div className='flex h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px] lg:h-[150px] lg:w-[150px] xl:h-[165px] xl:w-[165px] items-center justify-center rounded-full border border-white/35'>
							<Headset className='h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-15 lg:w-15 xl:h-16 xl:w-16 stroke-[1.3]' />
						</div>
						<div className='max-w-[400px] sm:max-w-[450px] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[520px] mx-auto md:mx-0'>
							<h3 className='font-mona font-black uppercase tracking-[0.28em] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] xl:text-[20px]'>
								Dedicated Aftercare
							</h3>
							<p className='mt-3 sm:mt-4 md:mt-5 font-montserrat leading-[1.35] text-white/50 text-[13px] sm:text-[14px] md:text-[14px] lg:text-[15px] xl:text-[16px]'>
								Our commitment extends beyond installation with ongoing
								maintenance, filter replacements, and dedicated customer
								support.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
