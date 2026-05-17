import { useCartStore, type CartItem } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

export function useAddToCart() {
	const addItem = useCartStore((s) => s.addItem);
	const router = useRouter();

	return (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
		addItem({ ...item, quantity: item.quantity ?? 1 });
		router.push('/cart');
	};
}
