'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Clock3, Eye } from 'lucide-react';
import { getBlog, recordBlogView } from '@/features/blogs/api';
import type { Blog } from '@/features/blogs/types';
import { productImageUrl, productSlug } from '@/features/products/api';
import { formatStartingPrice } from '@/lib/utils';
import { shouldBypassImageOptimizer } from '@/lib/images';

export default function BlogDetailPage() {
	const { slug } = useParams<{ slug: string }>();
	const [blog, setBlog] = useState<Blog | null>(null);
	const viewed = useRef(false);
	useEffect(() => { getBlog(slug).then(setBlog); }, [slug]);
	useEffect(() => {
		if (!blog || viewed.current) return;
		viewed.current = true;
		recordBlogView(slug).then(({ views }) => setBlog((current) => current ? { ...current, viewCount: views } : current)).catch(() => undefined);
	}, [blog, slug]);
	if (!blog) return <main className='min-h-screen bg-white pt-[100px]'><div className='container py-24 text-[#657078]'>Loading story...</div></main>;
	const paragraphs = blog.content.split(/\n\s*\n/).filter(Boolean);

	return <main className='bg-white pb-24 pt-[100px]'>
		<article>
			<header className='bg-[#f3f6f7] py-14 md:py-20'>
				<div className='container'>
					<Link href='/blog' className='mb-10 inline-flex items-center gap-2 text-sm font-bold text-[#43505a]'><ArrowLeft size={17} /> All stories</Link>
					<div className='mx-auto max-w-5xl text-center'>
						<p className='mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#1229C0]'>{blog.category}</p>
						<h1 className='font-mona-wide text-4xl font-bold leading-[1.02] text-[#061927] sm:text-5xl md:text-7xl'>{blog.title}</h1>
						<p className='mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#68727a]'>{blog.excerpt}</p>
						<div className='mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-[#56616a]'>
							<span>Written by <strong className='text-[#061927]'>{blog.author?.fullName || 'Aquzera Editorial'}</strong></span>
							<span className='flex items-center gap-1.5'><Clock3 size={16} /> {blog.readTimeMinutes} min read</span>
							<span className='flex items-center gap-1.5'><Eye size={16} /> {blog.viewCount || 0} views</span>
						</div>
					</div>
				</div>
			</header>
			{blog.bannerImage?.url && <div className='container -mt-1 py-10 md:py-14'><div className='relative aspect-[16/8] overflow-hidden rounded-[30px] md:rounded-[46px]'><Image src={blog.bannerImage.url} alt={blog.title} fill priority unoptimized={shouldBypassImageOptimizer(blog.bannerImage.url)} className='object-cover' /></div></div>}
			<div className='container'>
				<div className='mx-auto max-w-3xl py-8'>
					{paragraphs.map((paragraph, index) => <p key={index} className={`mb-7 font-montserrat text-[17px] leading-[1.9] text-[#303840] ${index === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-mona-wide first-letter:text-7xl first-letter:font-bold first-letter:leading-[.8] first-letter:text-[#1229C0]' : ''}`}>{paragraph}</p>)}
				</div>
			</div>
		</article>
		{!!blog.relatedProducts?.length && <section className='mt-10 bg-[#061927] py-20 text-white'>
			<div className='container'>
				<p className='text-xs font-bold uppercase tracking-[.22em] text-[#7ec9ff]'>Continue the experience</p>
				<h2 className='mt-4 font-mona-wide text-3xl font-bold md:text-5xl'>Products related to this story.</h2>
				<div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{blog.relatedProducts.map((product) => {
						const image = productImageUrl(product);
						return <Link key={product.id} href={`/product/${productSlug(product)}`} className='group rounded-[28px] bg-white p-4 text-[#061927]'>
						<div className='relative aspect-square overflow-hidden rounded-[20px] bg-[#edf1f3]'><Image src={image} alt={product.name} fill unoptimized={shouldBypassImageOptimizer(image)} className='object-contain p-6 transition group-hover:scale-105' /></div>
						<div className='flex items-center justify-between gap-4 px-2 pb-2 pt-5'><div><h3 className='font-mona-wide text-xl font-bold'>{product.name}</h3><p className='mt-1 text-sm text-[#6a747b]'>{product.startingPriceLabel || formatStartingPrice(product.price)}</p></div><ArrowUpRight className='text-[#1229C0]' /></div>
					</Link>;
					})}
				</div>
			</div>
		</section>}
	</main>;
}
