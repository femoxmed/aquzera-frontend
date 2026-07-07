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

export type FeaturedProductItem = {
	id: string;
	name: string;
	slug?: string;
	price: number;
	priceLabel?: string;
	startingPriceLabel?: string | null;
	mainImage?: string | null;
	colors: Array<{
		id: string;
		label: string;
		value: string;
		status?: 'active' | 'inactive';
		imageUrl?: string | null;
	}>;
	specifications: Array<{
		label: string;
		value: string;
	}>;
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

export async function getLatestFeaturedProductItem() {
	const response = await api.get<FeaturedProductItem | null>(
		'/products/public/featured/latest-item',
	);
	return response.data;
}

export async function getPublicProduct(slug: string) {
	const response = await api.get<Product>(`/products/public/${slug}`);
	return response.data;
}

export function activeProductColors(product?: Product | null) {
	return (product?.colors || []).filter((color) => color.status !== 'inactive');
}

export function productImageUrl(product?: Product | null) {
	const activeColors = activeProductColors(product);
	const firstVariant = activeColors.find(
		(color) => color.image?.url || color.imageUrl,
	);
	const firstVariantImage =
		firstVariant?.image?.variants?.find((variant) => variant.name === 'medium')
			?.url ||
		firstVariant?.image?.url ||
		firstVariant?.imageUrl ||
		'';

	if (activeColors.length === 1 && firstVariantImage) {
		return firstVariantImage;
	}

	return (
		product?.mainImage?.url ||
		product?.galleryImages?.[0]?.url ||
		firstVariantImage ||
		product?.bannerImage?.url ||
		'/images/product_placeholder.png'
	);
}

export function productVariantImageUrl(variant?: {
	image?: { url?: string };
	imageUrl?: string;
} | null) {
	return variant?.image?.url || variant?.imageUrl || '';
}

export function productSlug(product: Product) {
	return product.slug || product.id;
}

export function productPrice(product: Product) {
	return Number(product.price || 0);
}
