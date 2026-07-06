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
	prepareCartCheckout,
	removeCartItem,
	serverCartToItems,
	type CheckoutPricing,
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
			<span className='font-mona text-[11px] font-black uppercase tracking-[0.18em] text-black sm:text-[14px] sm:tracking-[0.22em]'>
				{label}
			</span>
			<input
				type={type}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className='mt-3 h-14 w-full border border-[#b9b9b9] bg-white px-4 font-montserrat text-[16px] text-black outline-none placeholder:text-black/55 focus:border-black sm:mt-5 sm:h-18.5 sm:px-7 sm:text-[15px]'
			/>
		</label>
	);
}

function SummaryItem({
	item,
	onRemove,
	isRemoving,
}: {
	item: CartItem;
	onRemove: (item: CartItem) => void;
	isRemoving?: boolean;
}) {
	const image = item.variant?.imageUrl || item.image || '/images/product_placeholder.png';

	return (
		<div className='grid grid-cols-[96px_1fr_24px] gap-4 border-b border-[#d6d6d6] pb-6 sm:grid-cols-[178px_1fr_24px] sm:gap-9 sm:pb-10'>
			<div className='relative h-24 overflow-hidden rounded-[18px] border border-[#d3d3d3] bg-white sm:h-44.5 sm:rounded-[28px]'>
				<Image
					src={image}
					alt={item.name}
					fill
					unoptimized={shouldBypassImageOptimizer(image)}
					className='object-contain p-4 sm:p-9'
				/>
				<span className='absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#a7ff18] text-[10px] font-black text-black sm:right-4 sm:top-4 sm:h-7 sm:w-7 sm:text-sm'>
					✓
				</span>
			</div>
			<div className='min-w-0 pt-1 sm:pt-2'>
				<h3 className='break-words font-mona text-[20px] font-black leading-[0.95] text-black sm:text-[34px] sm:tracking-[-0.04em]'>
					{item.name}
				</h3>
				<p className='mt-2 line-clamp-3 max-w-90 font-montserrat text-[12px] leading-[1.25] text-black/65 sm:mt-4 sm:text-[15px] sm:leading-[1.2]'>
					{item.description ||
						'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.'}
				</p>
				<p className='mt-3 font-mona text-[15px] font-black text-black sm:mt-5 sm:text-[22px] sm:tracking-[-0.02em]'>
					{formatCurrency(item.price * item.quantity)}{' '}
					<span className='ml-2 font-montserrat text-[10px] font-medium uppercase tracking-[0.06em] text-black/50 sm:ml-4 sm:text-[13px]'>
						EXT. TAX
					</span>
				</p>
			</div>
			<button
				type='button'
				onClick={() => onRemove(item)}
				disabled={isRemoving}
				className='mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff676f] text-white disabled:cursor-not-allowed disabled:opacity-50 sm:mt-4 sm:h-7 sm:w-7'
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
	const [removingLineKey, setRemovingLineKey] = useState<string | null>(null);
	const [consent, setConsent] = useState(false);
	const [pricing, setPricing] = useState<CheckoutPricing | null>(null);
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
	const summaryItems = items;
	const primaryItem = summaryItems[0];
	const additionalItems = summaryItems.slice(1);
	const cartLineKey = (item: CartItem) =>
		`${item.id}::${item.variant?.id || item.variant?.label || ''}`;

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

		prepareCartCheckout()
			.then((response) => {
				setPricing(response.pricing);
			})
			.catch(() => setPricing(null));
	}, [accessToken, items.length]);

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
		const lineKey = cartLineKey(item);
		setRemovingLineKey(lineKey);
		removeItem(item.id, key);

		try {
			if (accessToken) {
				const cart = await removeCartItem(item.id, key);
				setItems(serverCartToItems(cart));
				if (cart.items.length === 0) {
					setPricing(null);
					router.push('/cart');
					return;
				}
			} else if (items.length <= 1) {
				setPricing(null);
				router.push('/cart');
				return;
			}
			const response = await prepareCartCheckout();
			setPricing(response.pricing);
		} catch (error: any) {
			if (accessToken) {
				getCart()
					.then((cart) => setItems(serverCartToItems(cart)))
					.catch(() => undefined);
			}
			setPricing(null);
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					'Unable to remove item',
			);
		} finally {
			setRemovingLineKey(null);
		}
	};

	return (
		<div className='min-h-screen bg-white text-black'>
			<form
				onSubmit={handleSubmit}
				className='mx-auto grid max-w-305 gap-10 px-4 pb-14 pt-[132px] sm:px-6 sm:py-24 lg:grid-cols-[1fr_560px] lg:gap-16'>
				<section className='min-w-0'>
					<h1 className='font-mona text-[30px] font-black leading-[0.95] text-black sm:text-[38px] sm:tracking-[-0.04em] md:text-[46px]'>
						Account Details
					</h1>
					{user ? (
						<div className='mt-8 border border-[#d6d6d6] p-5 sm:mt-12 sm:p-7'>
							<div className='flex items-start gap-4 sm:gap-5'>
								<UserCircle className='mt-1 h-8 w-8 shrink-0 text-[#1738e6] sm:h-9 sm:w-9' />
								<div className='min-w-0'>
									<p className='break-words font-mona text-[19px] font-black leading-none text-black sm:text-[24px] sm:tracking-[-0.03em]'>
										{user.fullName}
									</p>
									<p className='mt-2 break-all font-montserrat text-[13px] text-black/65 sm:text-[15px]'>
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
						<div className='mt-8 border border-[#d6d6d6] p-5 sm:mt-12 sm:p-7'>
							<p className='font-montserrat text-[13px] leading-[1.45] text-black/70 sm:text-[15px]'>
								Please log in to review your order and enter shipping details.
							</p>
							<Link
								href='/auth/signin?returnTo=/shipping'
								className='mt-6 inline-flex h-11 items-center bg-[#1738e6] px-5 font-mona text-[11px] font-black uppercase tracking-[0.18em] text-white sm:h-[50px] sm:px-6 sm:text-[13px] sm:tracking-[0.22em]'>
								Login
							</Link>
						</div>
					)}

					<input type='hidden' value={form.fullName} readOnly />
					<input type='hidden' value={form.email} readOnly />
					<div className='mt-9 sm:mt-12'>
						<CheckoutInput
							label='Mobile Phone Number'
							value={form.phone}
							onChange={(value) => updateForm('phone', value)}
							placeholder='+234'
						/>
					</div>

					<div className='mt-12 flex flex-col gap-2 sm:mt-16 sm:flex-row sm:items-center sm:justify-between'>
						<h2 className='font-mona text-[20px] font-black text-black sm:text-[22px]'>
							Delivery Information
						</h2>
						<p className='font-montserrat text-[13px] text-black/70 sm:text-[15px]'>
							**Nigerian Residence Only
						</p>
					</div>

					<div className='mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-9'>
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
					<p className='mt-6 max-w-[600px] font-montserrat text-[13px] leading-[1.35] text-black/70 sm:mt-8 sm:text-[15px] sm:leading-[1.15]'>
						Your Address would be used to calculate your shipping fee as well as
						Estimated delivery time. Kindly provide your exact address
						information
					</p>

					<Link
						href='/contact'
						className='mt-12 inline-flex h-[46px] items-center gap-3 border border-black px-5 font-mona text-[11px] font-black uppercase tracking-[0.16em] text-black sm:mt-28 sm:h-[50px] sm:gap-4 sm:px-6 sm:text-[13px] sm:tracking-[0.22em]'>
						<CircleHelp className='h-4 w-4 sm:h-5 sm:w-5' />
						Get Help
					</Link>
				</section>

				<aside className='min-w-0 pt-0 lg:pt-3'>
					{primaryItem ? (
						<SummaryItem
							item={primaryItem}
							onRemove={handleRemoveItem}
							isRemoving={removingLineKey === cartLineKey(primaryItem)}
						/>
					) : null}

					{additionalItems.length > 0 ? (
						<>
							<h2 className='mt-10 font-mona text-[26px] font-black text-black sm:mt-14 sm:text-[34px] sm:tracking-[-0.04em]'>
								You also added
							</h2>
							<div className='mt-6 space-y-8 sm:mt-10 sm:space-y-12'>
								{additionalItems.map((item) => (
									<SummaryItem
										key={`${item.id}::${item.variant?.id || item.variant?.label || ''}`}
										item={item}
										onRemove={handleRemoveItem}
										isRemoving={removingLineKey === cartLineKey(item)}
									/>
								))}
							</div>
						</>
					) : null}

					<div className='mt-8 border-b border-[#d6d6d6] pb-6 sm:mt-12 sm:pb-9'>
						<div className='grid grid-cols-[1fr_auto] gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-9'>
							<div>
								<h3 className='font-mona text-[18px] font-black text-black sm:text-[22px]'>
									Tax Inclusive
								</h3>
								<p className='mt-2 font-montserrat text-[12px] leading-[1.3] text-black/65 sm:mt-4 sm:text-[15px]'>
									7.5% VAT Tax on each cart Item
								</p>
							</div>
							<p className='text-right font-mona text-[16px] font-black leading-tight text-black sm:text-[22px]'>
								{formatCurrency(totals.tax)}
							</p>

							<div>
								<h3 className='font-mona text-[18px] font-black text-black sm:text-[22px]'>
									Delivery Fee
								</h3>
								<p className='mt-2 font-montserrat text-[12px] leading-[1.3] text-black/65 sm:mt-4 sm:text-[15px] sm:leading-[1.2]'>
									Automated delivery calculated
									<br />
									per distance
								</p>
							</div>
							<p className='text-right font-mona text-[16px] font-black leading-tight text-black sm:text-[22px]'>
								{formatCurrency(totals.deliveryFee)}
							</p>
						</div>
					</div>

					<div className='grid grid-cols-[1fr_auto] gap-4 border-b border-[#d6d6d6] py-6 sm:gap-8 sm:py-9'>
						<div>
							<h3 className='font-mona text-[18px] font-black text-black sm:text-[22px]'>
								Due Today
							</h3>
							<p className='mt-2 max-w-[260px] font-montserrat text-[12px] leading-[1.3] text-black/65 sm:mt-4 sm:text-[15px] sm:leading-[1.2]'>
								Total Costing of Item(s) Inclusive of Tax and Delivery
							</p>
						</div>
						<p className='text-right font-mona text-[16px] font-black leading-tight text-black sm:text-[22px]'>
							{formatCurrency(totals.total)}
						</p>
					</div>

					<label className='mt-7 flex items-start gap-3 sm:mt-10 sm:gap-5'>
						<input
							type='checkbox'
							checked={consent}
							onChange={(event) => setConsent(event.target.checked)}
							className='mt-1 h-5 w-5 shrink-0 rounded border border-[#a9a9a9] sm:h-6 sm:w-6'
						/>
						<span className='font-montserrat text-[12px] leading-[1.35] text-black/70 sm:text-[15px] sm:leading-[1.2]'>
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

					<div className='mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-6'>
						<Link
							href='/cart'
							className='inline-flex min-h-12 flex-1 items-center justify-center border border-black px-4 py-3 font-mona text-[12px] font-black uppercase tracking-[0.16em] text-black sm:h-[72px] sm:px-6 sm:py-0 sm:text-[14px] sm:tracking-[0.22em]'>
							<X className='mr-2 h-4 w-4 sm:mr-4 sm:h-5 sm:w-5' />
							Exit & Cancel
						</Link>
						<button
							type='submit'
							disabled={isSubmitting}
							className='inline-flex min-h-12 flex-1 items-center justify-center bg-[#1738e6] px-4 py-3 font-mona text-[12px] font-black uppercase tracking-[0.16em] text-white disabled:cursor-not-allowed disabled:opacity-60 sm:h-[72px] sm:px-6 sm:py-0 sm:text-[14px] sm:tracking-[0.22em]'>
							{isSubmitting ? 'Completing...' : 'Complete Request'}
						</button>
					</div>
					<p className='mt-6 font-montserrat text-[13px] leading-[1.35] text-black/70 sm:mt-9 sm:text-[15px] sm:leading-[1.2]'>
						To complete your Purchase request you would be redirected to
						Paystack to make payment
					</p>
				</aside>
			</form>
		</div>
	);
}
