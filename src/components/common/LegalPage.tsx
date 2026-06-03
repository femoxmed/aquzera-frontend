type LegalSection = {
	title: string;
	body: string;
	items?: string[];
};

type LegalPageProps = {
	title: string;
	date: string;
	introTitle: string;
	intro?: string;
	sections: LegalSection[];
};

export default function LegalPage({
	title,
	date,
	introTitle,
	intro,
	sections,
}: LegalPageProps) {
	return (
		<div className='bg-white pt-[100px]'>
			<section className='flex min-h-[290px] flex-col items-center justify-center bg-[linear-gradient(115deg,#1738e6_0%,#0a247d_100%)] px-6 text-center text-white'>
				<h1 className='font-mona-wide text-[38px] font-black leading-none tracking-[-0.04em] sm:text-[52px] md:text-[64px]'>
					{title}
				</h1>
				<p className='mt-6 font-montserrat text-[15px] text-white/75'>
					{date}
				</p>
			</section>

			<section className='px-6 py-14 sm:px-10 md:py-20'>
				<div className='mx-auto max-w-[900px]'>
					<p className='font-montserrat text-[18px] leading-snug text-[#2f3338]'>
						{introTitle}
					</p>
					{intro ? (
						<p className='mt-7 max-w-[780px] font-montserrat text-[18px] leading-snug text-[#2f3338]'>
							{intro}
						</p>
					) : null}

					<div className='mt-14 space-y-12'>
						{sections.map((section, index) => (
							<section key={section.title}>
								<h2 className='font-mona-wide text-[24px] font-black leading-tight tracking-[-0.03em] text-[#1738e6] sm:text-[30px]'>
									{index + 1}. {section.title}
								</h2>
								<p className='mt-6 font-montserrat text-[17px] leading-snug text-[#2f3338] sm:text-[19px]'>
									{section.body}
								</p>
								{section.items?.length ? (
									<ul className='mt-6 list-disc space-y-1 pl-5 font-montserrat text-[16px] leading-snug text-[#2f3338] sm:text-[18px]'>
										{section.items.map((item) => (
											<li key={item}>{item}</li>
										))}
									</ul>
								) : null}
							</section>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
