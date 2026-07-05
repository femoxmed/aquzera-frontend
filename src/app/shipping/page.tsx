'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CircleHelp, UserCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import {
	checkoutCart,
	getCart,
	getOrderDetail,
	prepareCartCheckout,
	removeCartItem,
	serverCartToItems,
	type CheckoutPricing,
	type CheckoutOrderResponse,
} from '@/lib/cart';
import { shouldBypassImageOptimizer } from '@/lib/images';
import { useAuthStore } from '@/store/authStore';
import { useCartStore, type CartItem } from '@/store/cartStore';
import { getMe } from '@/lib/dashboard';
import { formatCurrency } from '@/lib/utils';


function CheckoutInput({
	label,
	value,
	onChange,
	placeholder,
	type = 'text',
	className = '',
}: {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	type?: string;
	className?: string;
}) {
	return (
		<label className={`block ${className}`}>
			<span className='font-mona text-[14px] font-black uppercase tracking-[0.22em] text-black'>
				{label}
			</span>
			<input
				type={type}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className='mt-5 h-18.5 w-full border border-[#b9b9b9] bg-white px-7 font-montserrat text-[15px] text-black outline-none placeholder:text-black/55 focus:border-black'
			/>
		</label>
	);
}

function SummaryItem({
	item,
	onRemove,
}: {
	item: CartItem;
	onRemove: (item: CartItem) => void;
}) {
	const image = item.variant?.imageUrl || item.image || '/images/product_placeholder.png';

	return (
		<div className='grid grid-cols-[178px_1fr_24px] gap-9 border-b border-[#d6d6d6] pb-10'>
			<div className='relative h-44.5 overflow-hidden rounded-[28px] border border-[#d3d3d3] bg-white'>
				<Image
					src={image}
					alt={item.name}
					fill
					unoptimized={shouldBypassImageOptimizer(image)}
					className='object-contain p-9'
				/>
				<span className='absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#a7ff18] text-sm font-black text-black'>
					✓
				</span>
			</div>
			<div className='pt-2'>
				<h3 className='font-mona text-[34px] font-black leading-[0.9] tracking-[-0.04em] text-black'>
					{item.name}
				</h3>
				<p className='mt-4 max-w-90 font-montserrat text-[15px] leading-[1.2] text-black/65'>
					{item.description ||
						'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.'}
				</p>
				<p className='mt-5 font-mona text-[22px] font-black tracking-[-0.02em] text-black'>
					{formatCurrency(item.price * item.quantity)}{' '}
					<span className='ml-4 font-montserrat text-[13px] font-medium uppercase tracking-[0.06em] text-black/50'>
						EXT. TAX
					</span>
				</p>
			</div>
			<button
				type='button'
				onClick={() => onRemove(item)}
				className='mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#ff676f] text-white'
				aria-label='Remove item'>
				<X className='h-4 w-4' strokeWidth={3} />
			</button>
		</div>
	);
}

export default function ShippingPage() {
	const router = useRouter();
	const user = useAuthStore((state) => state.user);
	const accessToken = useAuthStore((state) => state.accessToken);
	const setAuth = useAuthStore((state) => state.setAuth);
	const items = useCartStore((state) => state.items);
	const setItems = useCartStore((state) => state.setItems);
	const clearCart = useCartStore((state) => state.clearCart);
	const removeItem = useCartStore((state) => state.removeItem);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [consent, setConsent] = useState(false);
	const [pricing, setPricing] = useState<CheckoutPricing | null>(null);
	const [preparedOrder, setPreparedOrder] =
		useState<CheckoutOrderResponse['order'] | null>(null);
	const [form, setForm] = useState({
		fullName: user?.fullName || '',
		email: user?.email || '',
		phone: '',
		state: '',
		city: '',
		postalCode: '',
		address: '',
	});

	const fallbackSubtotal = useMemo(
		() => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
		[items],
	);
	const totals = pricing || {
		subtotal: fallbackSubtotal,
		tax: 0,
		deliveryFee: 0,
		total: fallbackSubtotal,
	};
	const orderItems = useMemo<CartItem[]>(() => {
		if (!preparedOrder?.items?.length) return [];

		return preparedOrder.items.map((item) => {
			const product = item.product;
			const image =
				item.variant?.imageUrl ||
				product?.mainImage?.url ||
				product?.bannerImage?.url ||
				product?.galleryImages?.[0]?.url;
			const unitPrice = Number(item.unitPrice ?? product?.price ?? 0);

			return {
				id: product?.id || item.id,
				name: product?.name || 'Unknown product',
				price: unitPrice,
				quantity: item.qty,
				image,
				variant: item.variant || undefined,
				description: product?.shortDescription || undefined,
			};
		});
	}, [preparedOrder]);
	const summaryItems = orderItems.length > 0 ? orderItems : items;
	const primaryItem = summaryItems[0];
	const additionalItems = summaryItems.slice(1);

	useEffect(() => {
		if (!accessToken) return;
		getCart()
			.then((cart) => setItems(serverCartToItems(cart)))
			.catch(() => undefined);
	}, [accessToken, setItems]);

	useEffect(() => {
		if (!user) return;
		setForm((current) => ({
			...current,
			fullName: user.fullName || current.fullName,
			email: user.email || current.email,
			phone: user.phone || current.phone,
		}));
	}, [user]);

	useEffect(() => {
		if (!accessToken) return;

		getMe()
			.then((me) => {
				setAuth(me, accessToken);
				setForm((current) => ({
					...current,
					fullName: me.fullName || current.fullName,
					email: me.email || current.email,
					phone: me.phone || current.phone,
				}));
			})
			.catch(() => undefined);
	}, [accessToken, setAuth]);

	useEffect(() => {
		if (!accessToken) return;

		const storedCheckout = sessionStorage.getItem('aquzera-checkout');
		if (storedCheckout) {
			try {
				const parsed = JSON.parse(storedCheckout) as {
					pricing?: CheckoutPricing;
					order?: CheckoutOrderResponse['order'];
				};
				if (parsed.pricing) setPricing(parsed.pricing);
				if (parsed.order?.id) {
					setPreparedOrder(parsed.order);
					getOrderDetail(parsed.order.id)
						.then(setPreparedOrder)
						.catch(() => undefined);
				}
				return;
			} catch {
				sessionStorage.removeItem('aquzera-checkout');
			}
		}

		prepareCartCheckout()
			.then((response) => {
				setPricing(response.pricing);
				setPreparedOrder(response.order);
				sessionStorage.setItem(
					'aquzera-checkout',
					JSON.stringify({
						pricing: response.pricing,
						order: response.order,
					}),
				);
			})
			.catch(() => undefined);
	}, [accessToken]);

	const updateForm = (key: keyof typeof form, value: string) => {
		setForm((current) => ({ ...current, [key]: value }));
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!accessToken) {
			router.push('/auth/signin?returnTo=/shipping');
			return;
		}

		if (summaryItems.length === 0) {
			toast.error('Your cart is empty');
			router.push('/cart');
			return;
		}

		if (!consent) {
			toast.error('Please authorize contact before completing the request');
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await checkoutCart({
				fullName: form.fullName,
				email: form.email,
				phone: form.phone,
				state: form.state,
				city: form.city,
				postalCode: form.postalCode,
				address: form.address,
				consent,
			});
			clearCart();
			sessionStorage.removeItem('aquzera-checkout');

			const authorizationUrl =
				response.authorizationUrl || response.paymentIntent?.authorizationUrl;
			if (authorizationUrl) {
				window.location.href = authorizationUrl;
				return;
			}

			toast.success('Request completed');
			router.push('/dashboard');
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					'Unable to complete request',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleRemoveItem = async (item: CartItem) => {
		const key = item.variant?.id || item.variant?.label || '';
		removeItem(item.id, key);
		if (!accessToken) return;
		try {
			const cart = await removeCartItem(item.id, key);
			setItems(serverCartToItems(cart));
		} catch {
			toast.error('Unable to remove item');
		}
	};

	return (
		<div className='min-h-screen bg-white text-black'>
			<form
				onSubmit={handleSubmit}
				className='mx-auto grid max-w-305 gap-16 px-6 py-24 lg:grid-cols-[1fr_560px]'>
				<section>
					<h1 className='font-mona text-[38px] font-black tracking-[-0.04em] text-black md:text-[46px]'>
						Account Details
					</h1>
					{user ? (
						<div className='mt-12 border border-[#d6d6d6] p-7'>
							<div className='flex items-start gap-5'>
								<UserCircle className='mt-1 h-9 w-9 text-[#1738e6]' />
								<div>
									<p className='font-mona text-[24px] font-black tracking-[-0.03em] text-black'>
										{user.fullName}
									</p>
									<p className='mt-2 font-montserrat text-[15px] text-black/65'>
										{user.email}
									</p>
									{user.role ? (
										<p className='mt-4 font-mona text-[12px] font-black uppercase tracking-[0.2em] text-black/45'>
											{user.role}
										</p>
									) : null}
								</div>
							</div>
						</div>
					) : (
						<div className='mt-12 border border-[#d6d6d6] p-7'>
							<p className='font-montserrat text-[15px] leading-[1.4] text-black/70'>
								Please log in to review your order and enter shipping details.
							</p>
							<Link
								href='/auth/signin?returnTo=/shipping'
								className='mt-6 inline-flex h-[50px] items-center bg-[#1738e6] px-6 font-mona text-[13px] font-black uppercase tracking-[0.22em] text-white'>
								Login
							</Link>
						</div>
					)}

					<input type='hidden' value={form.fullName} readOnly />
					<input type='hidden' value={form.email} readOnly />
					<div className='mt-12'>
						<CheckoutInput
							label='Mobile Phone Number'
							value={form.phone}
							onChange={(value) => updateForm('phone', value)}
							placeholder='+234'
						/>
					</div>

					<div className='mt-16 flex items-center justify-between'>
						<h2 className='font-mona text-[22px] font-black text-black'>
							Delivery Information
						</h2>
						<p className='font-montserrat text-[15px] text-black/70'>
							**Nigerian Residence Only
						</p>
					</div>

					<div className='mt-12 grid gap-9 sm:grid-cols-2'>
						<CheckoutInput
							label='State'
							value={form.state}
							onChange={(value) => updateForm('state', value)}
						/>
						<CheckoutInput
							label='City'
							value={form.city}
							onChange={(value) => updateForm('city', value)}
						/>
						<CheckoutInput
							label='Zip/Postal Code'
							value={form.postalCode}
							onChange={(value) => updateForm('postalCode', value)}
							className='sm:col-span-2'
						/>
						<CheckoutInput
							label='Fill In Address'
							value={form.address}
							onChange={(value) => updateForm('address', value)}
							className='sm:col-span-2'
						/>
					</div>
					<p className='mt-8 max-w-[600px] font-montserrat text-[15px] leading-[1.15] text-black/70'>
						Your Address would be used to calculate your shipping fee as well as
						Estimated delivery time. Kindly provide your exact address
						information
					</p>

					<Link
						href='/contact'
						className='mt-28 inline-flex h-[50px] items-center gap-4 border border-black px-6 font-mona text-[13px] font-black uppercase tracking-[0.22em] text-black'>
						<CircleHelp className='h-5 w-5' />
						Get Help
					</Link>
				</section>

				<aside className='pt-3'>
					{primaryItem ? (
						<SummaryItem item={primaryItem} onRemove={handleRemoveItem} />
					) : null}

					{additionalItems.length > 0 ? (
						<>
							<h2 className='mt-14 font-mona text-[34px] font-black tracking-[-0.04em] text-black'>
								You also added
							</h2>
							<div className='mt-10 space-y-12'>
								{additionalItems.map((item) => (
									<SummaryItem
										key={`${item.id}::${item.variant?.id || item.variant?.label || ''}`}
										item={item}
										onRemove={handleRemoveItem}
									/>
								))}
							</div>
						</>
					) : null}

					<div className='mt-12 border-b border-[#d6d6d6] pb-9'>
						<div className='grid grid-cols-[1fr_auto] gap-x-8 gap-y-9'>
							<div>
								<h3 className='font-mona text-[22px] font-black text-black'>
									Tax Inclusive
								</h3>
								<p className='mt-4 font-montserrat text-[15px] text-black/65'>
									7.5% VAT Tax on each cart Item
								</p>
							</div>
							<p className='font-mona text-[22px] font-black text-black'>
								{formatCurrency(totals.tax)}
							</p>

							<div>
								<h3 className='font-mona text-[22px] font-black text-black'>
									Delivery Fee
								</h3>
								<p className='mt-4 font-montserrat text-[15px] leading-[1.2] text-black/65'>
									Automated delivery calculated
									<br />
									per distance
								</p>
							</div>
							<p className='font-mona text-[22px] font-black text-black'>
								{formatCurrency(totals.deliveryFee)}
							</p>
						</div>
					</div>

					<div className='grid grid-cols-[1fr_auto] gap-8 border-b border-[#d6d6d6] py-9'>
						<div>
							<h3 className='font-mona text-[22px] font-black text-black'>
								Due Today
							</h3>
							<p className='mt-4 max-w-[260px] font-montserrat text-[15px] leading-[1.2] text-black/65'>
								Total Costing of Item(s) Inclusive of Tax and Delivery
							</p>
						</div>
						<p className='font-mona text-[22px] font-black text-black'>
							{formatCurrency(totals.total)}
						</p>
					</div>

					<label className='mt-10 flex items-start gap-5'>
						<input
							type='checkbox'
							checked={consent}
							onChange={(event) => setConsent(event.target.checked)}
							className='mt-1 h-6 w-6 shrink-0 rounded border border-[#a9a9a9]'
						/>
						<span className='font-montserrat text-[15px] leading-[1.2] text-black/70'>
							By proceeding, I authorize Aquzera to contact me about this
							request as well as with more information about Aquzera products,
							services and regional events via the contact information I
							provide. I understand calls or texts may use automatic or
							computer-assisted dialing or pre-recorded messages. Normal message
							and data rates apply. I can opt out at any time in the Aquzera app
							or by{' '}
							<Link
								href='/shipping-return-policy'
								className='text-[#1738e6] underline'>
								SHIPPING & RETURN POLICY
							</Link>
							. This is not required for purchase.
						</span>
					</label>

					<div className='mt-12 flex flex-col gap-6 sm:flex-row'>
						<Link
							href='/cart'
							className='inline-flex h-[72px] flex-1 items-center justify-center border border-black px-6 font-mona text-[14px] font-black uppercase tracking-[0.22em] text-black'>
							<X className='mr-4 h-5 w-5' />
							Exit & Cancel
						</Link>
						<button
							type='submit'
							disabled={isSubmitting}
							className='inline-flex h-[72px] flex-1 items-center justify-center bg-[#1738e6] px-6 font-mona text-[14px] font-black uppercase tracking-[0.22em] text-white disabled:cursor-not-allowed disabled:opacity-60'>
							{isSubmitting ? 'Completing...' : 'Complete Request'}
						</button>
					</div>
					<p className='mt-9 font-montserrat text-[15px] leading-[1.2] text-black/70'>
						To complete your Purchase request you would be redirected to
						Paystack to make payment
					</p>
				</aside>
			</form>
		</div>
	);
}
