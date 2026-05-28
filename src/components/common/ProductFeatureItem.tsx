import Image from 'next/image';
import { shouldBypassImageOptimizer } from '@/lib/images';

type ProductFeatureItemProps = {
	title: string;
	titleLine2?: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	imageClassName?: string;
	imageContainerClassName?: string;
};

export default function ProductFeatureItem({
	title,
	titleLine2,
	description,
	imageSrc,
	imageAlt,
	imageClassName = 'object-cover object-center',
	imageContainerClassName = '',
}: ProductFeatureItemProps) {
	return (
		<div className='px-1'>
			<div className='max-w-[520px]'>
				<h2 className='font-mona-wide text-[32px] sm:text-[38px] md:text-[38px] lg:text-[58px] font-bold leading-[0.9] tracking-[-0.06em] text-black'>
					{title}
					{titleLine2 && (
						<>
							<br />
							{titleLine2}
						</>
					)}
				</h2>

				<p className='mt-5 sm:mt-6 md:mt-7 font-montserrat text-[13px] sm:text-[14px] md:text-[15px] leading-[1.25] text-black/65'>
					{description}
				</p>
			</div>

			<div
				className={`relative mt-8 sm:mt-10 md:mt-14 h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px] overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] bg-[#f7f7f7] ${imageContainerClassName}`}>
				<Image
					src={imageSrc}
					alt={imageAlt}
					fill
					unoptimized={shouldBypassImageOptimizer(imageSrc)}
					className={imageClassName}
				/>
			</div>
		</div>
	);
}
