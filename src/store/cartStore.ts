import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
	id: string;
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
	removeItem: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
	total: () => number;
};

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			setItems: (items) => set({ items }),
			addItem: (item) =>
				set((state) => {
					const variantKey = item.variant?.id || item.variant?.label || '';
					const existing = state.items.find(
						(i) =>
							i.id === item.id &&
							(i.variant?.id || i.variant?.label || '') === variantKey,
					);
					if (existing) {
						return {
							items: state.items.map((i) =>
								i.id === item.id &&
								(i.variant?.id || i.variant?.label || '') === variantKey
									? { ...i, quantity: i.quantity + item.quantity }
									: i,
							),
						};
					}
					return { items: [...state.items, item] };
				}),
			removeItem: (id) =>
				set((state) => ({
					items: state.items.filter((item) => item.id !== id),
				})),
			updateQuantity: (id, quantity) =>
				set((state) => ({
					items: state.items.map((item) =>
						item.id === id ? { ...item, quantity } : item,
					),
				})),
			clearCart: () => set({ items: [] }),
			total: () =>
				get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
		}),
		{ name: 'aquzera-cart' },
	),
);
