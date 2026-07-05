'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogCard } from './BlogCard';
import { getFeaturedBlogs } from '@/features/blogs/api';
import type { Blog } from '@/features/blogs/types';

export default function FeaturedBlogs() {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const track = useRef<HTMLDivElement>(null);
	useEffect(() => { getFeaturedBlogs(12).then(setBlogs).catch(() => setBlogs([])); }, []);
	if (!blogs.length) return null;
	const move = (direction: number) => track.current?.scrollBy({ left: direction * Math.min(track.current.clientWidth * .78, 920), behavior: 'smooth' });

	return <section className='overflow-hidden bg-[#f5f7f8] py-20 md:py-28'>
		<div className='container'>
			<div className='mb-10 flex items-end justify-between gap-6'>
				<div><p className='mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#1229C0]'>Fresh perspectives</p><h2 className='max-w-2xl font-mona-wide text-3xl font-bold leading-[1.05] text-[#061927] md:text-5xl'>Ideas for living well with water.</h2></div>
				<div className='hidden items-center gap-3 md:flex'><button onClick={() => move(-1)} className='flex h-12 w-12 items-center justify-center rounded-full border border-[#ccd4d9] bg-white'><ArrowLeft size={18} /></button><button onClick={() => move(1)} className='flex h-12 w-12 items-center justify-center rounded-full bg-[#061927] text-white'><ArrowRight size={18} /></button></div>
			</div>
			<div ref={track} className='-mr-4 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:none] sm:-mr-6 lg:-mr-[max(2rem,calc((100vw-80rem)/2))]'>
				{blogs.map((blog) => <div key={blog.id} className='w-[84vw] max-w-[390px] flex-none snap-start sm:w-[46vw] lg:w-[31vw]'><BlogCard blog={blog} /></div>)}
			</div>
			<Link href='/blog' className='mt-9 inline-flex items-center gap-3 rounded-full border border-[#061927] px-6 py-3 text-sm font-bold text-[#061927] transition hover:bg-[#061927] hover:text-white'>Explore every story <ArrowRight size={17} /></Link>
		</div>
	</section>;
}
