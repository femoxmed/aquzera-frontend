import Image from 'next/image';
import { shouldBypassImageOptimizer } from '@/lib/images';

type InsideTheBoxProps = {
	description?: string;
	items?: Array<{
		title: string;
		description?: string;
		image?: { url?: string };
		imageUrl?: string;
		imageAlt?: string;
	}>;
};

const defaultItems = [
	{
		title: 'Aquzera Water Purifier',
		description:
			'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.',
		imageUrl: '/images/purifier.png',
	},
	{
		title: 'Filter',
		description:
			'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.',
		imageUrl: '/images/neo-sense-filter.png',
	},
	{ title: 'Power Cord', imageUrl: '/images/product_placeholder.png' },
	{ title: 'Manual/Warranty Card', imageUrl: '/images/product_placeholder.png' },
];

export default function InsideTheBox({
	description = 'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering. With a focus on quality, integrity, and modern design, we create water experiences that are as pure as they are precise.',
	items = defaultItems,
}: InsideTheBoxProps) {
	return (
		<section className='bg-black px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 text-white'>
			<div className='mx-auto max-w-[1120px]'>
				<div className='text-center'>
					<h2 className='font-mona-wide text-[28px] sm:text-[34px] md:text-[44px] lg:text-[54px] xl:text-[64px] font-black leading-none tracking-[-0.05em]'>
						Inside the Box
					</h2>
					<p className='mx-auto mt-5 sm:mt-6 md:mt-7 max-w-[400px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[600px] xl:max-w-[620px] font-montserrat text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] leading-[1.25] text-white/55'>
						{description}
					</p>
				</div>

				<div className='mt-20 sm:mt-24 md:mt-28 grid gap-x-10 sm:gap-x-14 md:gap-x-20 gap-y-20 sm:gap-y-24 md:gap-y-28 lg:gap-y-32 grid-cols-1 md:grid-cols-2'>
					{items.map((item, index) => {
						const imageSrc =
							item.image?.url || item.imageUrl || '/images/product_placeholder.png';

						return (
							<div
								key={`${item.title}-${index}`}
								className='relative flex flex-col items-center justify-center text-center'>
								<button className='absolute right-[8%] top-[-30px] flex h-12 w-12 items-center justify-center rounded-full bg-[#1738e6] text-[28px] font-light text-white sm:h-14 sm:w-14 sm:text-[30px] md:h-16 md:w-16 md:text-[36px]'>
									+
								</button>
								<div className='relative h-[250px] w-full max-w-[320px] sm:h-[320px] md:h-[390px]'>
									<Image
										src={imageSrc}
										alt={item.imageAlt || item.title}
										fill
										sizes='(max-width: 768px) 100vw, 33vw'
										unoptimized={shouldBypassImageOptimizer(imageSrc)}
										className='object-contain'
									/>
								</div>
								<h3 className='mt-8 font-mona text-[16px] font-black uppercase tracking-[0.24em] text-white sm:text-[18px] md:text-[20px] lg:text-[22px]'>
									{item.title}
								</h3>
								{item.description ? (
									<p className='mt-4 max-w-[420px] font-montserrat text-[14px] leading-[1.3] text-white/60 sm:text-[15px] md:text-[16px] lg:text-[17px]'>
										{item.description}
									</p>
								) : null}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
