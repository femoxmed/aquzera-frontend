import { Forklift, Plug, Headset } from 'lucide-react';

export default function ProcessingSection() {
	return (
		<section className='bg-gradient-to-b from-black via-[#050607] to-[#202329] px-4 py-20 text-white md:py-28'>
			<div className='mx-auto max-w-[1040px]'>
				<div className='grid gap-8 border-b border-white/15 pb-14 md:grid-cols-[420px_1fr] md:items-start'>
					<h2 className='font-mona-wide text-[42px] font-bold leading-[0.9] tracking-[-0.05em] md:text-[58px]'>
						Quick and
						<br />
						Efficient
						<br />
						Processing
					</h2>

					<div className='space-y-6 pt-2 font-montserrat text-[14px] leading-[1.35] text-white/55 md:text-[16px]'>
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

				<div className='mt-24 space-y-28'>
					<div className='grid items-center gap-10 md:grid-cols-[230px_1fr] md:pl-10'>
						<div className='flex h-[165px] w-[165px] items-center justify-center rounded-full border border-white/35'>
							<Forklift className='h-16 w-16 stroke-[1.3]' />
						</div>
						<div className='max-w-[520px]'>
							<h3 className='font-mona text-[20px] font-black uppercase tracking-[0.28em]'>
								Efficient,Fast Delivery
							</h3>
							<p className='mt-5 font-montserrat text-[14px] leading-[1.35] text-white/50 md:text-[15px]'>
								Aquzera purification systems elevate your everyday hydration
								through advanced filtration and refined engineering.
							</p>
						</div>
					</div>

					<div className='grid items-center gap-10 md:grid-cols-[1fr_230px] md:pr-20'>
						<div className='max-w-[520px] md:ml-[190px]'>
							<h3 className='font-mona text-[20px] font-black uppercase tracking-[0.28em]'>
								Qualified Installation
							</h3>
							<p className='mt-5 font-montserrat text-[14px] leading-[1.35] text-white/50 md:text-[15px]'>
								Aquzera purification systems elevate your everyday hydration
								through advanced filtration and refined engineering.
							</p>
						</div>
						<div className='flex h-[165px] w-[165px] items-center justify-center rounded-full border border-white/35'>
							<Plug className='h-16 w-16 stroke-[1.3]' />
						</div>
					</div>

					<div className='grid items-center gap-10 md:grid-cols-[230px_1fr] md:pl-10'>
						<div className='flex h-[165px] w-[165px] items-center justify-center rounded-full border border-white/35'>
							<Headset className='h-16 w-16 stroke-[1.3]' />
						</div>
						<div className='max-w-[520px]'>
							<h3 className='font-mona text-[20px] font-black uppercase tracking-[0.28em]'>
								After Installation Services
							</h3>
							<p className='mt-5 font-montserrat text-[14px] leading-[1.35] text-white/50 md:text-[15px]'>
								Aquzera purification systems elevate your everyday hydration
								through advanced filtration and refined engineering.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
