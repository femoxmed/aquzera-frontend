import { api } from '@/lib/api';
import type { Blog, BlogListing } from './types';

export const getFeaturedBlogs = async (limit = 12) =>
	(await api.get<Blog[]>('/blogs/public/featured', { params: { limit } })).data;

export const getBlogs = async (page = 1, limit = 12) =>
	(await api.get<BlogListing>('/blogs/public', { params: { page, limit } })).data;

export const getBlog = async (slug: string) =>
	(await api.get<Blog>(`/blogs/public/${slug}`)).data;

export const recordBlogView = async (slug: string) =>
	(await api.post<{ views: number }>(`/blogs/public/${slug}/view`)).data;

export const blogImage = (blog: Blog) =>
	blog.thumbnailImage?.url || blog.bannerImage?.url || '/images/office-business.png';
