import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock3, Eye } from 'lucide-react';
import type { Blog } from '@/features/blogs/types';
import { blogImage } from '@/features/blogs/api';

export function BlogCard({ blog }: { blog: Blog }) {
	return <Link href={`/blog/${blog.slug}`} className='group block min-w-0'>
		<div className='relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#e9eef2]'>
			<Image src={blogImage(blog)} alt={blog.title} fill className='object-cover transition duration-700 group-hover:scale-[1.04]' />
			<div className='absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent' />
			<span className='absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#061927] backdrop-blur'>{blog.category}</span>
			<span className='absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#1229C0] text-white transition group-hover:rotate-45'><ArrowUpRight size={19} /></span>
		</div>
		<div className='px-1 pt-5'>
			<div className='mb-3 flex items-center gap-4 text-xs font-medium text-[#777]'>
				<span className='flex items-center gap-1.5'><Clock3 size={14} />{blog.readTimeMinutes} min read</span>
				<span className='flex items-center gap-1.5'><Eye size={14} />{blog.viewCount || 0}</span>
			</div>
			<h3 className='font-mona-wide text-xl font-bold leading-tight text-[#061927] transition group-hover:text-[#1229C0]'>{blog.title}</h3>
			<p className='mt-3 line-clamp-2 text-sm leading-6 text-[#686d73]'>{blog.excerpt}</p>
		</div>
	</Link>;
}
