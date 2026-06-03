import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
	id: string;
	slug?: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	color?: string;
	variant?: {
		id?: string;
		label?: string;
		value?: string;
		imageUrl?: string;
	};
	description?: string;
	type?: 'machine' | 'filter' | 'accessory' | 'service';
	addOns?: CartAddOn[];
};

export type CartAddOn = {
	productId: string;
	name: string;
	price: number;
	image?: string;
	shortDescription?: string | null;
	isCompulsory?: boolean;
};

type CartState = {
	items: CartItem[];
	setItems: (items: CartItem[]) => void;
	addItem: (item: CartItem) => void;
	removeItem: (id: string, variantKey?: string) => void;
	updateQuantity: (id: string, quantity: number, variantKey?: string) => void;
	clearCart: () => void;
	total: () => number;
};

function cartVariantKey(item: Pick<CartItem, 'variant'>) {
	return item.variant?.id || item.variant?.label || '';
}

function matchesCartLine(item: CartItem, id: string, variantKey?: string) {
	if (item.id !== id) return false;
	if (variantKey === undefined) return true;
	return cartVariantKey(item) === variantKey;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			setItems: (items) => set({ items }),
			addItem: (item) =>
				set((state) => {
					const variantKey = cartVariantKey(item);
					const existing = state.items.find(
						(i) => matchesCartLine(i, item.id, variantKey),
					);
					if (existing) {
						return {
							items: state.items.map((i) =>
								matchesCartLine(i, item.id, variantKey)
									? { ...i, quantity: i.quantity + item.quantity }
									: i,
							),
						};
					}
					return { items: [...state.items, item] };
				}),
			removeItem: (id, variantKey) =>
				set((state) => ({
					items: state.items.filter(
						(item) => !matchesCartLine(item, id, variantKey),
					),
				})),
			updateQuantity: (id, quantity, variantKey) =>
				set((state) => ({
					items: state.items
						.map((item) =>
							matchesCartLine(item, id, variantKey)
								? { ...item, quantity }
								: item,
						)
						.filter((item) => item.quantity > 0),
				})),
			clearCart: () => set({ items: [] }),
			total: () =>
				get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
		}),
		{ name: 'aquzera-cart' },
	),
);
