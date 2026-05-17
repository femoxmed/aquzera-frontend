import Image from 'next/image';

export default function InsideTheBox() {
	return (
		<section className='bg-black px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 text-white'>
			<div className='mx-auto max-w-[1120px]'>
				<div className='text-center'>
					<h2 className='font-mona-wide text-[28px] sm:text-[34px] md:text-[44px] lg:text-[54px] xl:text-[64px] font-black leading-none tracking-[-0.05em]'>
						Inside the Box
					</h2>
					<p className='mx-auto mt-5 sm:mt-6 md:mt-7 max-w-[400px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[600px] xl:max-w-[620px] font-montserrat text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] leading-[1.25] text-white/55'>
						Aquzera purification systems elevate your everyday hydration through
						advanced filtration and refined engineering. With a focus on
						quality, integrity, and modern design, we create water experiences
						that are as pure as they are precise.
					</p>
				</div>

				<div className='mt-20 sm:mt-24 md:mt-28 grid gap-x-10 sm:gap-x-14 md:gap-x-20 gap-y-20 sm:gap-y-24 md:gap-y-28 lg:gap-y-32 grid-cols-1 md:grid-cols-2'>
					{/* Product */}
					<div className='relative flex justify-center'>
						<button className='absolute right-[8%] sm:right-[10%] md:right-[12%] top-[-30px] sm:top-[-32px] md:top-[-35px] flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#1738e6] text-[28px] sm:text-[30px] md:text-[36px] font-light text-white'>
							+
						</button>
						<div className='relative h-[300px] sm:h-[360px] md:h-[430px] w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px]'>
							<Image
								src='/images/box-outline.png'
								alt='Aquzera Water Purifier outline'
								fill
								className='object-contain'
							/>
						</div>
					</div>

					<div className='flex flex-col justify-center text-center md:text-left'>
						<h3 className='font-mona text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-black uppercase tracking-[0.22em] text-white'>
							Aquzera Water Purifier
						</h3>
						<p className='mt-4 sm:mt-5 md:mt-6 max-w-[420px] sm:max-w-[460px] md:max-w-[520px] mx-auto md:mx-0 font-montserrat text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-[1.3] text-white/60'>
							Aquzera purification systems elevate your everyday hydration
							through advanced filtration and refined engineering.
						</p>
					</div>

					{/* Filter */}
					<div className='flex flex-col justify-center text-center md:text-left md:pr-6 md:pr-8 lg:pr-10'>
						<h3 className='font-mona text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-black uppercase tracking-[0.22em] text-white'>
							Filter
						</h3>
						<p className='mt-4 sm:mt-5 md:mt-6 max-w-[380px] sm:max-w-[420px] md:max-w-[470px] mx-auto md:mx-0 font-montserrat text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-[1.3] text-white/60'>
							Aquzera purification systems elevate your everyday hydration
							through advanced filtration and refined engineering.
						</p>
					</div>

					<div className='relative flex justify-center'>
						<button className='absolute left-[-20px] sm:left-[-25px] md:left-[-30px] top-[-30px] sm:top-[-32px] md:top-[-35px] flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#1738e6] text-[28px] sm:text-[30px] md:text-[36px] font-light text-white'>
							+
						</button>
						<div className='relative h-[300px] sm:h-[360px] md:h-[430px] w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px]'>
							<Image
								src='/images/filter-outline.png'
								alt='Filter outline'
								fill
								className='object-contain'
							/>
						</div>
					</div>

					{/* Power Cord */}
					<div className='relative flex flex-col items-center'>
						<button className='absolute right-[16%] sm:right-[18%] md:right-[22%] top-[-30px] sm:top-[-32px] md:top-[-35px] flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#1738e6] text-[28px] sm:text-[30px] md:text-[36px] font-light text-white'>
							+
						</button>
						<div className='relative h-[250px] sm:h-[300px] md:h-[360px] w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px]'>
							<Image
								src='/images/power-cord-outline.png'
								alt='Power Cord'
								fill
								className='object-contain'
							/>
						</div>
						<h3 className='mt-10 sm:mt-12 md:mt-16 font-mona text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-black uppercase tracking-[0.24em] text-white'>
							Power Cord
						</h3>
					</div>

					{/* Manual */}
					<div className='relative flex flex-col items-center'>
						<button className='absolute right-[6%] sm:right-[8%] md:right-[10%] top-[-30px] sm:top-[-32px] md:top-[-35px] flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#1738e6] text-[28px] sm:text-[30px] md:text-[36px] font-light text-white'>
							+
						</button>
						<div className='relative h-[250px] sm:h-[300px] md:h-[360px] w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px]'>
							<Image
								src='/images/manual-card-outline.png'
								alt='Manual and Warranty Card'
								fill
								className='object-contain'
							/>
						</div>
						<h3 className='mt-10 sm:mt-12 md:mt-16 font-mona text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-black uppercase tracking-[0.24em] text-white'>
							Manual/Warranty Card
						</h3>
					</div>
				</div>
			</div>
		</section>
	);
}
