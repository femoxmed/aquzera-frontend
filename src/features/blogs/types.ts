import type { Product } from '@/features/products/types';

export type Blog = {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	category: string;
	publishedAt?: string;
	featuredAt?: string;
	readTimeMinutes: number;
	viewCount: number;
	author?: { fullName: string };
	bannerImage?: { url?: string };
	thumbnailImage?: { url?: string };
	relatedProducts?: Product[];
};

export type BlogListing = {
	blogs: Blog[];
	pagination: { page: number; limit: number; total: number; totalPages: number };
};
