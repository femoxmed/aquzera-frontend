'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';
import { getBlogs } from '@/features/blogs/api';
import type { BlogListing } from '@/features/blogs/types';

export default function BlogPage() {
	const [data, setData] = useState<BlogListing | null>(null);
	const [page, setPage] = useState(1);
	useEffect(() => { getBlogs(page, 12).then(setData); }, [page]);

	return <main className='min-h-screen bg-white pb-24 pt-[100px]'>
		<section className='border-b border-[#dce3e7] bg-[#061927] py-20 text-white md:py-28'>
			<div className='container'>
				<p className='mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#7ec9ff]'>The Aquzera journal</p>
				<h1 className='max-w-4xl font-mona-wide text-5xl font-bold leading-[.98] md:text-7xl'>Clear thinking for a better way of living.</h1>
				<p className='mt-7 max-w-2xl text-base leading-7 text-white/65 md:text-lg'>Stories about water, wellbeing, considered spaces, and the small rituals that make everyday life feel better.</p>
			</div>
		</section>
		<section className='container py-16 md:py-20'>
			<div className='grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3'>
				{data?.blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
			</div>
			{data && data.pagination.totalPages > 1 && <div className='mt-16 flex justify-center gap-3'>
				{Array.from({ length: data.pagination.totalPages }, (_, index) => index + 1).map((item) => <button key={item} onClick={() => setPage(item)} className={`flex h-11 min-w-11 items-center justify-center rounded-full px-4 text-sm font-bold ${item === page ? 'bg-[#1229C0] text-white' : 'border border-[#ccd4d9] text-[#061927]'}`}>{item === data.pagination.totalPages && item !== page ? <span className='flex items-center gap-2'>{item}<ArrowRight size={15} /></span> : item}</button>)}
			</div>}
		</section>
	</main>;
}
