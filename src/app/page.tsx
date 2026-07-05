import HeroSection from '@/components/common/HeroSection';
import LifestyleCarousel from '@/components/common/LifestyleCarousel';
import HomeFeaturedExploreModel from './HomeFeaturedExploreModel';
import BlueFeaturesStrip from '@/components/common/BlueFeaturesStrip';
import BusinessesSection from '@/components/common/BusinessesSection';
import ProcessingSection from '@/components/common/ProcessingSection';
import FeaturedBlogs from '@/components/blog/FeaturedBlogs';

export default function HomePage() {
	return (
		<>
			<HeroSection />

			<section className='bg-white py-14 overflow-hidden'>
				<div className='container'>
					<div className='text-center mb-10'>
						<h2 className='text-gray-900 font-mona-wide font-bold text-[24px] sm:text-[30px] md:text-[36px] lg:text-[45px]'>
							Your Lifestyle with Aquzera
						</h2>
						<p className='my-4 sm:my-5 text-gray-500 mx-auto font-montserrat font-normal text-[14px] sm:text-[16px] md:text-[20px] lg:text-[25px] leading-[110%] lg:leading-[100%] tracking-[0%] text-center max-w-[250px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-none'>
							What your lifestyle would be with us. Trust us on the
							<br />
							Journey to an awesome drinking water experience.
						</p>
					</div>
					<LifestyleCarousel />
				</div>
			</section>

			<HomeFeaturedExploreModel />
			<BlueFeaturesStrip />
			<BusinessesSection />
			<FeaturedBlogs />
			<ProcessingSection />
		</>
	);
}
