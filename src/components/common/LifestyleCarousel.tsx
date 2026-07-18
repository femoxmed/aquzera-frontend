'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '@/components/ui/carousel';

const lifestyleSlides = [
	{
		id: 1,
		image: '/images/hot_cold.png',
		title: 'Hot or Cold\nalways',
	},
	{
		id: 2,
		image: '/images/clean.png',
		title: 'Clean and\nRefreshing',
	},
	{
		id: 3,
		image: '/images/stylish.png',
		title: 'Stylish in\nevery space',
	},
];

export default function LifestyleCarousel() {
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
		<div className='relative'>
			<Carousel
				setApi={setApi}
				opts={{ align: 'start', loop: true }}
				className='w-full'>
				<CarouselContent className='-ml-4'>
					{lifestyleSlides.map((slide) => (
						<CarouselItem
							key={slide.id}
							className='pl-4 basis-[80%] sm:basis-[55%] md:basis-[42%] lg:basis-[34%] relative overflow-hidden'>
							<div className='relative overflow-hidden cursor-pointer select-none rounded-[20px] sm:rounded-[30px] md:rounded-[40px] lg:rounded-[50px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] aspect-square'>
								<Image
									src={slide.image}
									alt={slide.title}
									fill
									sizes='(max-width: 640px) 80vw, (max-width: 768px) 55vw, (max-width: 1024px) 42vw, 34vw'
									className='object-cover'
								/>
								<div className='absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65)_0%,transparent_55%)]' />
								<button
									className='w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] md:w-[60px] md:h-[60px] lg:w-[73px] lg:h-[73px] bg-[#1229C0] text-[16px] sm:text-[20px] md:text-[28px] lg:text-[35px] absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center justify-center rounded-full text-white shadow-lg'
									onClick={(e) => e.stopPropagation()}>
									+
								</button>
								<div className='absolute w-full h-[60px] sm:h-[80px] lg:h-[100px] bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(30,30,30,0.7)_65.75%)] flex items-center px-4 sm:px-6 lg:px-10'>
									<p className='text-white font-bold leading-snug whitespace-pre-line text-sm sm:text-base lg:text-lg'>
										{slide.title}
									</p>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className='hidden md:flex bg-white shadow-lg border border-gray-100 w-11 h-11 rounded-2xl' />
				<CarouselNext className='hidden md:flex bg-white shadow-lg border border-gray-100 w-11 h-11 rounded-2xl' />
			</Carousel>

			<div className='flex justify-center gap-2 mt-6'>
				{Array.from({ length: count }).map((_, idx) => (
					<button
						key={idx}
						onClick={() => api?.scrollTo(idx)}
						className={`rounded-full transition-all duration-300 h-2 ${idx === current - 1 ? 'w-6 bg-[#1229C0]' : 'w-2 bg-gray-300'}`}
					/>
				))}
			</div>
		</div>
	);
}
