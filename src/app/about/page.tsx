import Image from 'next/image';

export const metadata = { title: 'About Us' };

const promises = [
	'Deliver clean, safe water',
	'Reduce reliance on constant water purchases',
	'Fit seamlessly into everyday life',
];

const approach = [
	{
		title: 'Reliable',
		body: 'We are committed to improving how people access and trust their water making it simple, safe, and convenient.',
	},
	{ title: 'Safe', body: 'Free from harmful contaminants' },
	{ title: 'Simple', body: 'No stress, no guesswork' },
];

export default function AboutPage() {
	return (
		<div className='bg-white'>
			<section className='relative flex min-h-[620px] items-center justify-center overflow-hidden px-6 pt-[100px] text-center text-white'>
				<Image
					src='/images/home_bg.png'
					alt='Family enjoying clean Aquzera water'
					fill
					priority
					className='object-cover object-center'
				/>
				<div className='absolute inset-0 bg-black/45' />
				<div className='relative z-10'>
					<h1 className='font-mona-wide text-[42px] font-black leading-none tracking-[-0.04em] sm:text-[58px]'>
						About Aquzera
					</h1>
					<p className='mt-4 font-montserrat text-[15px] text-white/75'>
						Clean water. Zero stress.
					</p>
					<p className='mt-36 font-mona text-[12px] font-black uppercase tracking-[0.28em]'>
						Learn More
					</p>
				</div>
			</section>

			<section className='grid items-center gap-10 px-6 py-16 sm:px-10 md:grid-cols-2 md:py-24 lg:px-20'>
				<div className='relative mx-auto h-[430px] w-full max-w-[420px]'>
					<Image
						src='/images/purifier.png'
						alt='Aquzera water purifier'
						fill
						className='object-contain'
					/>
				</div>
				<div className='mx-auto max-w-[520px]'>
					<h2 className='font-mona-wide text-[40px] font-black leading-tight tracking-[-0.04em] text-black sm:text-[54px]'>
						Who we are
					</h2>
					<p className='mt-7 font-montserrat text-[17px] leading-snug text-black/70'>
						Aquzera Water Solutions is a modern water purification company
						focused on providing clean, reliable water for daily consumption.
					</p>
					<p className='mt-7 font-montserrat text-[17px] leading-snug text-black/70'>
						We are committed to improving how people access and trust their
						water making it simple, safe, and convenient.
					</p>
				</div>
			</section>

			<section className='bg-[linear-gradient(160deg,#000_0%,#090b0d_55%,#252a30_100%)] px-6 py-20 text-white sm:px-10 lg:px-24'>
				<div className='mx-auto max-w-[1080px]'>
					<h2 className='font-mona-wide text-[32px] font-black tracking-[-0.03em] sm:text-[42px]'>
						What we do?
					</h2>
					<p className='mt-5 font-montserrat text-[16px] text-white/80'>
						We design and provide smart water systems that:
					</p>
					<div className='mt-14 grid gap-6 sm:grid-cols-2'>
						{promises.map((promise) => (
							<div
								key={promise}
								className='flex min-h-[130px] items-center rounded-[28px] bg-[linear-gradient(145deg,#1a1d21,#060708)] px-8 shadow-2xl'>
								<h3 className='max-w-[360px] font-mona-wide text-[25px] font-black leading-none tracking-[-0.04em] sm:text-[32px]'>
									{promise}
								</h3>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='px-6 py-20 sm:px-10 lg:px-24'>
				<div className='mx-auto max-w-[1080px]'>
					<h2 className='font-mona-wide text-[34px] font-black tracking-[-0.04em] text-[#2f3338] sm:text-[44px]'>
						Our Approach
					</h2>
					<p className='mt-4 font-montserrat text-[15px] text-black/65'>
						At Aquzera, we believe water should be:
					</p>
					<div className='mt-14 grid items-center gap-10 md:grid-cols-[1fr_0.85fr]'>
						<div className='relative min-h-[420px] overflow-hidden rounded-[28px]'>
							<Image
								src='/images/family_sitting_drinking.png'
								alt='Drinking clean water'
								fill
								className='object-cover object-left'
							/>
						</div>
						<div className='space-y-10'>
							{approach.map((item) => (
								<div key={item.title}>
									<h3 className='font-mona-wide text-[28px] font-black tracking-[-0.04em] text-[#2f3338]'>
										{item.title}
									</h3>
									<p className='mt-4 font-montserrat text-[16px] leading-snug text-black/65'>
										{item.body}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className='bg-[#f5f5f5] px-6 py-24 text-center sm:px-10'>
				<h2 className='mx-auto max-w-[760px] font-mona-wide text-[42px] font-black leading-tight tracking-[-0.05em] text-black sm:text-[64px]'>
					“Water is part of your daily life.”
				</h2>
				<p className='mt-8 font-montserrat text-[16px] text-black/60'>
					What you drink should never be uncertain.
				</p>
				<p className='mt-10 font-mona text-[12px] font-black uppercase tracking-[0.28em] text-black'>
					Aquzera Water Solutions
				</p>
			</section>
		</div>
	);
}
