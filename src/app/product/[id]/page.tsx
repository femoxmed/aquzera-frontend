import ProductDetailHero from '@/components/common/ProductDetailHero';
import ProductOverview from '@/components/common/ProductOverview';
import ProductFeatureSlider from '@/components/common/ProductFeatureSlider';
import ProductSpecs from '@/components/common/ProductSpecs';
import InsideTheBox from '@/components/common/InsideTheBox';

export default function ProductDetailPage() {
	return (
		<main className='bg-white'>
			<ProductDetailHero />
			<ProductOverview />
			<ProductFeatureSlider />
			<ProductSpecs />
			<InsideTheBox />
		</main>
	);
}
