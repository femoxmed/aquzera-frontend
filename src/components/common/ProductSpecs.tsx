const specs = [
	['DIMENSION*', '12.6 x 21.3 x 16.0 inch'],
	['POWER*', '100-240V ~ 2.5A\n50 - 60 Hz'],
	['SMART DISPLAY', '15" Inches'],
	['OPERATING TEMP.', '-30°C to 50°C (-22°F\nto 122°F)'],
	[
		'ENVIRONMENTAL RATING',
		'Meeting IP56 (Water Resistant), configured for indoor use',
	],
	['COLOUR *', 'Charcoal Black, White'],
];

type ProductSpecsProps = {
	specs?: Array<{ label: string; value: string }>;
};

export default function ProductSpecs({ specs: productSpecs }: ProductSpecsProps) {
	const visibleSpecs =
		productSpecs && productSpecs.length > 0
			? productSpecs.map((spec) => [spec.label, spec.value])
			: specs;

	return (
		<section className='bg-[linear-gradient(180deg,#123ADA_0%,#0A1F74_130.29%)] px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28 text-white'>
			<div className='mx-auto max-w-[1180px]'>
				<h2 className='text-center font-mona-wide font-bold tracking-tighter text-[28px] sm:text-[34px] md:text-[42px] lg:text-[52px] xl:text-[64px]'>
					Specifications
				</h2>

				<div className='mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 border-b border-white/70 pb-8 sm:pb-9 md:pb-10'>
					<p className='font-mona text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] font-black uppercase tracking-[0.28em]'>
						General ⊗
					</p>
				</div>

				<div className='grid gap-6 sm:gap-8 md:gap-10 border-b border-white/70 py-10 sm:py-11 md:py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
					{visibleSpecs.map(([label, value]) => (
						<div key={label}>
							<h4 className='font-mona text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] font-black uppercase tracking-[0.22em]'>
								{label}
							</h4>
							<p className='mt-3 sm:mt-4 whitespace-pre-line font-montserrat text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] leading-[1.2] text-white/90'>
								{value}
							</p>
						</div>
					))}
				</div>

				<div className='pt-10 sm:pt-11 md:pt-12'>
					<p className='font-mona text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] font-black uppercase tracking-[0.28em]'>
						Water Filtration ⊕
					</p>
				</div>
			</div>
		</section>
	);
}
