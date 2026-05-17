import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	color?: string;
};

type CartState = {
	items: CartItem[];
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
			addItem: (item) =>
				set((state) => {
					const existing = state.items.find((i) => i.id === item.id);
					if (existing) {
						return {
							items: state.items.map((i) =>
								i.id === item.id
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
