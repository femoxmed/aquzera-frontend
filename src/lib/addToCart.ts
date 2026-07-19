import { useCartStore, type CartItem } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

export function useAddToCart() {
	const addItem = useCartStore((s) => s.addItem);
	const router = useRouter();

	return async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
		const cartItem = { ...item, quantity: item.quantity ?? 1 };
		addItem(cartItem);
		router.push('/cart');
	};
}
