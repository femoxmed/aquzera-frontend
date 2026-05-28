import { useCartStore, type CartItem } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { addCartItem, serverCartToItems } from '@/lib/cart';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

export function useAddToCart() {
	const addItem = useCartStore((s) => s.addItem);
	const setItems = useCartStore((s) => s.setItems);
	const accessToken = useAuthStore((s) => s.accessToken);
	const router = useRouter();

	return async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
		const cartItem = { ...item, quantity: item.quantity ?? 1 };
		addItem(cartItem);

		if (accessToken) {
			try {
				const serverCart = await addCartItem(cartItem);
				setItems(serverCartToItems(serverCart));
			} catch (error: any) {
				toast.error(
					error?.response?.data?.message ||
						error?.message ||
						'Unable to sync cart',
				);
			}
		}

		router.push('/cart');
	};
}
