// Blue features strip — Water Purity / Advance Filtering / Hot & Cold Always
// Used on both the Landing and Products pages.
import Image from 'next/image';

const features = [
	{
		src: '/images/water_purity.svg',
		alt: 'Water purity icon',
		label: 'WATER PURITY',
	},
	{
		src: '/images/advanced_filtering.svg',
		alt: 'Advanced filtering icon',
		label: 'ADVANCE FILTERING',
	},
	{
		src: '/images/hot_cold_always.svg',
		alt: 'Hot and cold icon',
		label: 'HOT & COLD ALWAYS',
	},
];

export default function BlueFeaturesStrip() {
	return (
		<section className='bg-[linear-gradient(180deg,#123ADA_0%,#0A1F74_130.29%)] px-4 sm:px-6 md:px-8 lg:px-4 py-12 sm:py-16 md:py-20 lg:py-28 text-white'>
			<div className='mx-auto max-w-[1180px] text-center'>
				<h2 className='mx-auto max-w-[300px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] font-mona-wide text-[18px] sm:text-[24px] md:text-[40px] lg:text-[66px] font-bold leading-[1.1] sm:leading-[1] lg:leading-[0.95] tracking-[-0.04em]'>
					Every Family deserves a healthy drinking water
				</h2>

				<p className='mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-[300px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] font-montserrat text-[12px] sm:text-[14px] md:text-[20px] lg:text-[30px] font-normal leading-[1.15] tracking-[0.02em] text-white/85'>
					The Benefits of the presence of Aquzera in your home
					<br />
					is the more reason to have it as a must have.
				</p>

				<div className='mx-auto mt-12 sm:mt-16 md:mt-24 lg:mt-36 grid max-w-[1200px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center sm:items-end gap-8 sm:gap-10 md:gap-12'>
					{features.map(({ src, alt, label }) => (
						<div key={label} className='flex flex-col items-center'>
							<div className='text-white'>
								<Image
									src={src}
									alt={alt}
									width={105}
									height={105}
									className='h-[60px] w-[60px] sm:h-[75px] sm:w-[75px] md:h-[90px] md:w-[90px] lg:h-[105px] lg:w-[105px]'
								/>
							</div>

							<span className='mt-6 sm:mt-8 md:mt-10 lg:mt-12 font-mona text-[12px] sm:text-[14px] md:text-[20px] lg:text-[30px] font-bold uppercase leading-none tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.28em] text-white'>
								{label}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
