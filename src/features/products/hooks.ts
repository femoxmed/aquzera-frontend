'use client';

import { useQuery } from '@tanstack/react-query';
import {
	getLatestFeaturedProduct,
	getLatestFeaturedProductItem,
	getProductListing,
	getPublicProduct,
	getPublicProducts,
} from './api';

export function useProducts() {
	return useQuery({
		queryKey: ['public-products'],
		queryFn: getPublicProducts,
	});
}

export function useProductListing(page = 1, limit = 6) {
	return useQuery({
		queryKey: ['public-products', 'listing', page, limit],
		queryFn: () => getProductListing(page, limit),
	});
}

export function useProduct(slug: string) {
	return useQuery({
		queryKey: ['public-products', slug],
		queryFn: () => getPublicProduct(slug),
		enabled: Boolean(slug),
	});
}

export function useLatestFeaturedProduct() {
	return useQuery({
		queryKey: ['public-products', 'featured', 'latest'],
		queryFn: getLatestFeaturedProduct,
	});
}

export function useLatestFeaturedProductItem() {
	return useQuery({
		queryKey: ['public-products', 'featured', 'latest-item'],
		queryFn: getLatestFeaturedProductItem,
	});
}
