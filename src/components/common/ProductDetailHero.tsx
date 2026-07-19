import Image from 'next/image';
import { shouldBypassImageOptimizer } from '@/lib/images';
import ProductPriceDisplay from './ProductPriceDisplay';

type ProductDetailHeroProps = {
	imageSrc?: string;
	imageAlt?: string;
	priceLabel?: string;
	regularPrice?: number | null;
	saleLabel?: string | null;
};

export default function ProductDetailHero({
	imageSrc = '/images/product_page_bg.png',
	imageAlt = 'Aquzera Water Purifier',
	priceLabel = 'Starting From ₦200,000',
	regularPrice,
	saleLabel,
}: ProductDetailHeroProps) {
	const currentPrice = Number(priceLabel.replace(/[^0-9.]/g, '') || 0);

	return (
		<section className='relative h-[300px] sm:h-[380px] md:h-[450px] lg:h-[520px] xl:h-[640px] overflow-hidden bg-black'>
			<Image
				src={imageSrc}
				alt={imageAlt}
				fill
				sizes='100vw'
				priority
				unoptimized={shouldBypassImageOptimizer(imageSrc)}
				className='object-contain object-center opacity-70'
			/>
			<div className='absolute inset-0 bg-black/35' />
			<div className='absolute bottom-8 left-0 right-0 px-4 text-center sm:bottom-10 md:bottom-12'>
				<p className='font-mona text-[11px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-black uppercase tracking-[0.22em] sm:tracking-[0.24em] md:tracking-[0.28em] text-white'>
					<ProductPriceDisplay
						price={currentPrice}
						regularPrice={regularPrice}
						saleLabel={saleLabel}
						currentClassName='text-white'
						regularClassName='text-white/70'
						labelClassName='text-[#a7ff18]'
					/>
				</p>
				<p className='mt-1 text-xl sm:text-2xl text-white'>⌄</p>
			</div>
		</section>
	);
}
