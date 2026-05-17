import Image from 'next/image';
import Link from 'next/link';
import BlueFeaturesStrip from '@/components/common/BlueFeaturesStrip';

export const metadata = { title: 'About' };

const processingFeatures = [
	{
		id: 'delivery',
		icon: '🚚',
		title: 'EFFICIENT, FAST DELIVERY',
		description:
			'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.',
	},
	{
		id: 'installation',
		icon: '🔌',
		title: 'QUALIFIED INSTALLATION',
		description:
			'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.',
	},
	{
		id: 'after',
		icon: '🎧',
		title: 'AFTER INSTALLATION SERVICES',
		description:
			'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.',
	},
];

export default function AboutPage() {
	return (
		<main className='bg-white pt-[110px] lg:pt-[130px]'>
			{/* AQUZERA FOR BUSINESSES */}
			<section className='bg-white px-5 pb-20 text-center sm:px-8 lg:pb-28'>
				<div className='mx-auto max-w-[1180px]'>
					<h1 className='mx-auto max-w-[650px] font-mona-wide text-[38px] font-bold leading-[0.95] tracking-[-0.05em] text-black sm:text-[48px] md:text-[58px]'>
						Aquzera for
						<br className='hidden sm:block' /> Businesses
					</h1>

					<p className='mx-auto mt-6 max-w-[620px] font-montserrat text-[15px] leading-[1.4] text-black/60 sm:text-[18px]'>
						Bring clarity to your Business Restaurant, or Office
					</p>

					<div className='relative mx-auto mt-12 h-[280px] w-full overflow-hidden rounded-[28px] sm:h-[380px] md:h-[480px] lg:rounded-[42px]'>
						<Image
							src='/images/office-business.png'
							alt='Aquzera for businesses — office scene'
							fill
							priority
							className='object-cover object-center'
						/>
					</div>

					<p className='mx-auto mt-12 max-w-[850px] font-montserrat text-[15px] leading-[1.35] tracking-[-0.02em] text-black/65 sm:text-[18px] md:text-[21px]'>
						Learn why thousands of businesses and offices are opting for Aquzera
						water purifiers. Most people are at work for at least one-third of
						the day. Make sure to have a healthy environment for yourself, your
						employees, and your customers with Aquzera and our regular filter
						changes through our rental program.
					</p>

					<Link
						href='/product'
						className='mt-10 inline-flex h-[58px] min-w-[190px] items-center justify-center bg-[#1738e6] px-7 font-mona text-[12px] font-black uppercase tracking-[0.24em] text-white transition-opacity hover:opacity-90 sm:h-[64px] sm:min-w-[220px]'>
						EXPLORE NOW <span className='ml-3 text-[22px]'>→</span>
					</Link>

					<div className='mt-14 border-t border-black/15' />
				</div>
			</section>

			{/* QUICK AND EFFICIENT PROCESSING */}
			<section className='bg-[linear-gradient(180deg,#000_0%,#050607_60%,#202329_100%)] px-5 py-20 text-white sm:px-8 md:py-28'>
				<div className='mx-auto max-w-[1080px]'>
					<div className='grid gap-8 border-b border-white/15 pb-12 md:grid-cols-[420px_1fr] md:gap-14'>
						<h2 className='font-mona-wide text-[42px] font-bold leading-[0.9] tracking-[-0.06em] sm:text-[52px] md:text-[60px]'>
							Quick and
							<br />
							Efficient
							<br />
							Processing
						</h2>

						<div className='max-w-[520px] font-montserrat text-[14px] leading-[1.45] text-white/55 sm:text-[16px]'>
							<p>
								Aquzera purification systems elevate your everyday hydration
								through advanced filtration and refined engineering.
							</p>
							<p className='mt-5'>
								From delivery to installation and support, we make the process
								simple, fast, and reliable for every customer.
							</p>
						</div>
					</div>

					<div className='mt-20 space-y-20 md:space-y-28'>
						{processingFeatures.map((feature, index) => (
							<div
								key={feature.id}
								className={`grid items-center gap-8 md:grid-cols-[180px_1fr_180px] ${
									index === 1 ? 'md:text-left' : ''
								}`}>
								{index !== 1 ? (
									<>
										<div className='flex h-[150px] w-[150px] items-center justify-center rounded-full border border-white/30 text-[48px] text-white/80'>
											{feature.icon}
										</div>

										<div className='max-w-[520px]'>
											<h3 className='font-mona text-[18px] font-black uppercase tracking-[0.26em] text-white'>
												{feature.title}
											</h3>
											<p className='mt-5 font-montserrat text-[14px] leading-[1.45] text-white/50 sm:text-[15px]'>
												{feature.description}
											</p>
										</div>

										<div className='hidden md:block' />
									</>
								) : (
									<>
										<div className='hidden md:block' />

										<div className='max-w-[520px] md:ml-auto'>
											<h3 className='font-mona text-[18px] font-black uppercase tracking-[0.26em] text-white'>
												{feature.title}
											</h3>
											<p className='mt-5 font-montserrat text-[14px] leading-[1.45] text-white/50 sm:text-[15px]'>
												{feature.description}
											</p>
										</div>

										<div className='flex h-[150px] w-[150px] items-center justify-center rounded-full border border-white/30 text-[48px] text-white/80'>
											{feature.icon}
										</div>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			<BlueFeaturesStrip />
		</main>
	);
}
