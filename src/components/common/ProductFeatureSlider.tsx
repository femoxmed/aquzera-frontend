'use client';

import { useState, useEffect } from 'react';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@/components/ui/carousel';
import ProductFeatureItem from './ProductFeatureItem';

const features = [
	{
		title: 'Smart',
		titleLine2: 'Display',
		description:
			'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering. With a focus on quality, integrity, and modern design, we create water experiences that are as pure as they are precise.',
		imageSrc: '/images/display-closeup.png',
		imageAlt: 'Smart Display',
	},
	{
		title: 'Hot & Cold',
		titleLine2: 'Dispense',
		description:
			'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.',
		imageSrc: '/images/purifier-lower.png',
		imageAlt: 'Hot and Cold Dispense',
		imageClassName: 'object-cover object-top',
	},
	{
		title: 'Water',
		titleLine2: 'Purification',
		description:
			'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.',
		imageSrc: '/images/neo-sense-filter.png',
		imageAlt: 'Water Purification',
		imageClassName: 'object-contain p-10 md:p-16',
	},
];

export default function ProductFeatureSlider() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);
		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<section className='bg-white px-5 py-14 sm:py-16 md:py-20 lg:py-28'>
			<div className='mx-auto max-w-295'>
				<Carousel
					setApi={setApi}
					opts={{ align: 'start', loop: true }}
					className='w-full'>
					<CarouselContent className='-ml-2 md:-ml-4'>
						{features.map((feature, idx) => (
							<CarouselItem
								key={idx}
								className='pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/2'>
								<ProductFeatureItem
									title={feature.title}
									titleLine2={feature.titleLine2}
									description={feature.description}
									imageSrc={feature.imageSrc}
									imageAlt={feature.imageAlt}
									imageClassName={
										feature.imageClassName || 'object-cover object-center'
									}
								/>
							</CarouselItem>
						))}
					</CarouselContent>

					<div className='flex items-center justify-between mt-8 sm:mt-10 md:mt-14'>
						<CarouselPrevious className='static translate-y-0 bg-white shadow-lg border border-gray-200 w-10 h-10 sm:w-12 sm:h-12 rounded-full' />
						<div className='flex items-center gap-2'>
							{Array.from({ length: count }).map((_, idx) => (
								<button
									key={idx}
									onClick={() => api?.scrollTo(idx)}
									className={`rounded-full transition-all duration-300 h-2 ${
										idx === current - 1 ? 'w-6 bg-[#1229C0]' : 'w-2 bg-gray-300'
									}`}
								/>
							))}
						</div>
						<CarouselNext className='static translate-y-0 bg-white shadow-lg border border-gray-200 w-10 h-10 sm:w-12 sm:h-12 rounded-full' />
					</div>
				</Carousel>
			</div>
		</section>
	);
}
