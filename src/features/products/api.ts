import { api } from '@/lib/api';
import type { Product } from './types';

export type ProductListingResponse = {
	featuredProduct: Product | null;
	products: Product[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

export async function getPublicProducts() {
	const response = await api.get<Product[]>('/products/public');
	return response.data;
}

export async function getProductListing(page = 1, limit = 6) {
	const response = await api.get<ProductListingResponse>(
		'/products/public/listing',
		{ params: { page, limit } },
	);
	return response.data;
}

export async function getLatestFeaturedProduct() {
	const response = await api.get<Product | null>('/products/public/featured/latest');
	return response.data;
}

export async function getPublicProduct(slug: string) {
	const response = await api.get<Product>(`/products/public/${slug}`);
	return response.data;
}

export function productImageUrl(product?: Product | null) {
	return (
		product?.mainImage?.url ||
		product?.bannerImage?.url ||
		product?.galleryImages?.[0]?.url ||
		'/images/product_placeholder.png'
	);
}

export function productSlug(product: Product) {
	return product.slug || product.id;
}

export function productPrice(product: Product) {
	return Number(product.price || 0);
}
