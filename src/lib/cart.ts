import { api } from '@/lib/api';
import type { CartItem } from '@/store/cartStore';

export type ServerCartItem = {
	id?: string;
	productId: string;
	quantity: number;
	name?: string;
	productName?: string;
	price?: number;
	unitPrice?: number;
	image?: string;
	shortDescription?: string | null;
	slug?: string;
	variant?: {
		id?: string;
		label?: string;
		value?: string;
		imageUrl?: string;
	};
	lineTotal?: number;
	addOns?: Array<{
		productId: string;
		name: string;
		price: number;
		image?: string;
		shortDescription?: string | null;
		isCompulsory?: boolean;
	}>;
};

export type ServerCart = {
	items: ServerCartItem[];
	summary: {
		distinctItems: number;
		itemCount: number;
		subtotal: number;
	};
};

export type CheckoutPricing = {
	subtotal: number;
	tax: number;
	deliveryFee: number;
	total: number;
};

export type CheckoutOrderResponse = {
	message: string;
	order: {
		id: string;
		total: number | string;
		tax?: number | string;
		deliveryFee?: number | string;
		status?: string;
		createdAt?: string;
		checkoutDetails?: Record<string, unknown> | null;
		items?: Array<{
			id: string;
			qty: number;
			unitPrice: number | string;
			variant?: {
				id?: string;
				label?: string;
				value?: string;
				imageUrl?: string;
			} | null;
			product?: {
				id: string;
				name: string;
				price?: number | string;
				shortDescription?: string | null;
				mainImage?: { url?: string };
				bannerImage?: { url?: string };
				galleryImages?: Array<{ url?: string }>;
			};
		}>;
	};
	pricing: CheckoutPricing;
	idempotencyKey?: string;
	paymentIntent?: { authorizationUrl?: string | null };
	authorizationUrl?: string | null;
};

export async function getCart() {
	const { data } = await api.get<ServerCart>('/cart');
	return data;
}

export async function addCartItem(item: CartItem) {
	const { data } = await api.post<ServerCart>('/cart/items', {
		productId: item.id,
		quantity: item.quantity,
		type: item.type || 'machine',
		variant: item.variant,
	});
	return data;
}

export async function updateCartItem(
	productId: string,
	quantity: number,
	variantKey?: string,
) {
	const { data } = await api.patch<ServerCart>(`/cart/items/${productId}`, {
		quantity,
		variantKey,
	});
	return data;
}

export async function removeCartItem(productId: string, variantKey?: string) {
	const { data } = await api.delete<ServerCart>(`/cart/items/${productId}`, {
		params: variantKey === undefined ? undefined : { variantKey },
	});
	return data;
}

export async function clearServerCart() {
	const { data } = await api.delete<ServerCart>('/cart');
	return data;
}

export async function mergeCart(items: CartItem[]) {
	const { data } = await api.post<ServerCart>('/cart/merge', {
		items: items.map((item) => ({
			productId: item.id,
			quantity: item.quantity,
			type: item.type || 'machine',
			variant: item.variant,
		})),
	});
	return data;
}

export async function checkoutCart(payload: {
	fullName: string;
	email: string;
	phone: string;
	state: string;
	city: string;
	postalCode: string;
	address: string;
	consent: boolean;
}) {
	const { data } = await api.post<CheckoutOrderResponse>('/cart/checkout', payload);
	return data;
}

export async function prepareCartCheckout() {
	const { data } = await api.post<CheckoutOrderResponse>(
		'/cart/checkout/prepare',
	);
	return data;
}

export async function getOrderDetail(orderId: string) {
	const { data } = await api.get<CheckoutOrderResponse['order']>(
		`/orders/${orderId}`,
	);
	return data;
}

export function serverCartToItems(cart: ServerCart): CartItem[] {
	return cart.items.map((item) => ({
		id: item.productId,
		slug: item.slug,
		name: item.name || item.productName || 'Unknown product',
		price: Number(item.price ?? item.unitPrice ?? 0),
		quantity: item.quantity,
		image: item.image,
		variant: item.variant,
		description: item.shortDescription || undefined,
		addOns: item.addOns || [],
		type: 'machine',
	}));
}
