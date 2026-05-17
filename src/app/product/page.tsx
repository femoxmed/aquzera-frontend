import ProductHero from '@/components/common/ProductHero';
import AquzeraProductItem from '@/components/common/AquzeraProductItem';
import BlueFeaturesStrip from '@/components/common/BlueFeaturesStrip';

export const metadata = { title: 'Products' };

export default function ProductPage() {
	return (
		<main className='bg-black text-white'>
			<ProductHero />
			<AquzeraProductItem
				imageSrc='/images/product_placeholder.png'
				imageAlt='Neo Sense Water Filter'
				title='Neo Sense'
				titleLine2='Water Filter'
				description='Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.'
				cartId='neo-sense-filter'
				cartName='Neo Sense Water Filter'
				cartPrice={85608}
				learnHref='/product/aquzera-water-purifier'
			/>
			<BlueFeaturesStrip />
		</main>
	);
}
