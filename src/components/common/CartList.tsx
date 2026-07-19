'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import AnnouncementBar from '@/components/common/AnnouncementBar';
import { shouldBypassImageOptimizer } from '@/lib/images';
import ColorSwatch from '@/components/common/ColorSwatch';
import { formatCurrency } from '@/lib/utils';
import { clearServerCart, removeCartItem } from '@/lib/cart';
import { toast } from 'sonner';

const specSections = [
	{
		id: 'general',
		title: 'GENERAL',
		specs: [
			{ label: 'DIMENSION*', value: '12.6 x 21.3 x 16.0 inch' },
			{ label: 'POWER*', value: '100-240V ~ 2.5A\n50 - 60 Hz' },
			{ label: 'SMART DISPLAY', value: '15" Inches' },
			{ label: 'OPERATING TEMP.', value: '-30°C to 50°C (-22°F\nto 122°F)' },
			{
				label: 'ENVIRONMENTAL RATING',
				value: 'Meeting IP56 (Water\nResistant), configured for\nindoor use',
			},
			{ label: 'COLOUR *', value: 'Charcoal Black, White' },
		],
	},
	{ id: 'water', title: 'WATER FILTRATION', specs: [] },
];

export default function CartList() {
	const router = useRouter();
	const { items, addItem, clearCart, updateQuantity } = useCartStore();
	const accessToken = useAuthStore((state) => state.accessToken);

	const [openSection, setOpenSection] = useState('general');
	const [activeThumb, setActiveThumb] = useState(0);
	const [activeLineKey, setActiveLineKey] = useState('');
	const [isClearingCart, setIsClearingCart] = useState(false);
	const [removingLineKey, setRemovingLineKey] = useState<string | null>(null);

	const isEmpty = items.length === 0;
	const cartLineKey = (item: (typeof items)[number]) =>
		`${item.id}::${item.variant?.id || item.variant?.label || ''}`;
	const variantKey = (item: (typeof items)[number]) =>
		item.variant?.id || item.variant?.label || '';
	const activeItem =
		items.find((item) => cartLineKey(item) === activeLineKey) || items[0];
	const cartIds = new Set(items.map((item) => item.id));
	const compatibleAddOns = (activeItem?.addOns || []).filter(
		(addOn) => !cartIds.has(addOn.productId),
	);

	const productName = activeItem?.name || 'Aquzera Water Purifier';
	const productPrice = activeItem?.price || 200000;
	const productImage =
		activeItem?.variant?.imageUrl ||
		activeItem?.image ||
		(activeItem?.id === 'neo-sense-filter'
			? '/images/neo-sense-filter.png'
			: '/images/purifier-black.png');
	const thumbnails = [productImage];
	const selectedVariant = activeItem?.variant;

	const totalPrice = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	useEffect(() => {
		if (items.length === 0) {
			setActiveLineKey('');
			return;
		}

		if (!items.some((item) => cartLineKey(item) === activeLineKey)) {
			setActiveLineKey(cartLineKey(items[0]));
		}
	}, [items, activeLineKey]);

	const syncQuantity = async (
		item: (typeof items)[number],
		nextQuantity: number,
	) => {
		const next = Math.max(0, nextQuantity);
		const key = variantKey(item);

		updateQuantity(item.id, next, key);
	};

	const handleRemoveLine = async (item: (typeof items)[number]) => {
		const key = variantKey(item);
		const lineKey = cartLineKey(item);
		if (removingLineKey === lineKey) return;

		setRemovingLineKey(lineKey);
		try {
			if (accessToken) {
				await removeCartItem(item.id, key || undefined);
			}
			updateQuantity(item.id, 0, key);
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ||
					'Unable to remove this item. Please try again.',
			);
		} finally {
			setRemovingLineKey(null);
		}
	};

	const handleClearCart = async () => {
		if (isClearingCart) return;
		setIsClearingCart(true);
		try {
			if (accessToken) {
				await clearServerCart();
			}
			clearCart();
			router.push('/product');
		} catch (error: any) {
			toast.error(
				error?.response?.data?.message ||
					'Unable to clear your saved cart. Please try again.',
			);
		} finally {
			setIsClearingCart(false);
		}
	};

	const handleProceedToCheckout = async () => {
		router.push('/shipping');
	};

	const selectCartLine = (key: string) => {
		setActiveLineKey(key);
		setActiveThumb(0);
	};

	if (isEmpty) {
		return (
			<>
				{/* <AnnouncementBar /> */}
				<section className='bg-white min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 pt-[120px] lg:pt-[140px]'>
					<div className='w-full max-w-xl text-center'>
						<h1 className='font-mona-wide text-[28px] sm:text-[36px] md:text-[48px] font-bold text-gray-900'>
							My Cart
						</h1>
						<p className='mt-4 text-sm text-gray-500 leading-relaxed'>
							Oops!! your Cart is Currently empty. You can use the
							<br />
							button below to navigate to the product page
						</p>
						<Link
							href='/product'
							className='mt-8 inline-block bg-[#1229C0] text-white text-xs font-bold tracking-[0.22em] px-10 py-4 hover:opacity-90 transition-opacity'>
							PRODUCT PAGE
						</Link>
					</div>
				</section>
			</>
		);
	}

	return (
		<>
			{/* <AnnouncementBar /> */}
			<section className='bg-white pt-[120px] lg:pt-[140px]'>
				<div className='mx-auto max-w-[1280px] px-5 pb-20 sm:px-8 lg:px-10 xl:px-0'>
					<div className='grid gap-14 lg:grid-cols-2 lg:gap-20'>
						{/* LEFT */}
						<div>
							<div className='flex flex-col gap-8 md:flex-row md:gap-10'>
								{/* Thumbnails */}
								<div className='flex justify-center gap-4 md:w-[130px] md:flex-col md:justify-start'>
									{thumbnails.map((src, i) => (
										<button
											key={i}
											onClick={() => setActiveThumb(i)}
											className={`relative h-[96px] w-[96px] shrink-0 overflow-hidden rounded-[24px] border bg-white transition md:h-[132px] md:w-[132px] ${
												activeThumb === i
													? 'border-[#1f2529]'
													: 'border-[#bfc4c8]'
											}`}>
											<Image
												src={src}
												alt=''
												fill
												sizes='(max-width: 768px) 96px, 132px'
												unoptimized={shouldBypassImageOptimizer(src)}
												className='object-contain p-5'
											/>
										</button>
									))}
								</div>

								{/* Main Image */}
								<div className='flex min-h-[360px] flex-1 items-center justify-center'>
									<div className='relative h-[360px] w-full md:h-[460px]'>
										<Image
											src={thumbnails[activeThumb]}
											alt={productName}
											fill
											sizes='(max-width: 768px) 100vw, 50vw'
											priority
											unoptimized={shouldBypassImageOptimizer(
												thumbnails[activeThumb],
											)}
											className='object-contain'
										/>
									</div>
								</div>
							</div>

							{/* Extra Compatible Additions */}
							{compatibleAddOns.length > 0 && (
								<div className='mt-14 border-t border-[#d7d7d7] pt-12'>
									<h2 className='font-mona text-[30px] font-black leading-none tracking-[-0.04em] text-black'>
										Extra Compatible Additions
									</h2>
									<p className='mt-4 max-w-[520px] font-montserrat text-[15px] leading-[1.25] text-black/60'>
										Aquzera purification systems elevate your everyday hydration
										through advanced filtration and refined engineering.
									</p>
									<div className='mt-10 space-y-8'>
										{compatibleAddOns.map((addOn) => (
									<div key={addOn.productId} className='flex max-w-[560px] items-center gap-8'>
										<div className='relative flex h-[178px] w-[178px] shrink-0 items-center justify-center rounded-[28px] border border-[#1f2529]'>
											<Image
												src={addOn.image || '/images/product_placeholder.png'}
												alt={addOn.name}
												fill
												sizes='178px'
												unoptimized={shouldBypassImageOptimizer(addOn.image)}
												className='object-contain p-10'
											/>
											<button className='absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#a7ff18] text-[13px] font-black text-black'>
												✓
											</button>
										</div>
										<div className='flex-1'>
											<div className='flex items-start justify-between gap-4'>
												<h3 className='font-mona text-[34px] font-black leading-[0.9] tracking-[-0.05em] text-black'>
													{addOn.name}
												</h3>
												<button
													onClick={async () => {
														const item = {
															id: addOn.productId,
															name: addOn.name,
															price: addOn.price,
															quantity: 1,
															image: addOn.image,
															description: addOn.shortDescription || undefined,
														};
														addItem(item);
													}}
													className='flex h-7 w-7 items-center justify-center rounded-full bg-[#ff676f] text-sm font-black text-white'>
													+
												</button>
											</div>
											<p className='mt-4 max-w-[330px] font-montserrat text-[14px] leading-[1.2] text-black/60'>
												{addOn.shortDescription ||
													'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.'}
											</p>
											<p className='mt-5 font-mona text-[22px] font-black tracking-[-0.02em] text-[#252b31]'>
												{formatCurrency(addOn.price)}{' '}
												<span className='ml-3 font-montserrat text-[13px] font-medium uppercase tracking-[0.06em] text-black/45'>
													EXT. TAX
												</span>
											</p>
										</div>
									</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* RIGHT */}
						<div className='border-t border-[#d5d5d5] pt-12 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0'>
							<h1 className='font-mona text-[42px] font-black leading-[0.95] tracking-[-0.05em] text-black sm:text-[50px] xl:text-[58px]'>
								{productName}
							</h1>

							<p className='mt-7 max-w-[420px] font-montserrat text-[16px] leading-[1.25] text-black/65'>
								{activeItem?.description ||
									'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.'}
							</p>

							<div className='mt-8 flex items-end gap-6'>
								<p className='font-mona text-[34px] font-black tracking-[-0.02em] text-[#252b31]'>
									{formatCurrency(productPrice)}
								</p>
								<p className='pb-2 font-montserrat text-[13px] uppercase tracking-[0.06em] text-black/45'>
									EXT. TAX
								</p>
							</div>

							<div className='my-10 border-t border-[#d7d7d7]' />

							<div>
								<h2 className='font-mona text-[16px] font-black uppercase tracking-[0.22em] text-[#252b31]'>
									Cart Items
								</h2>
								<div className='mt-5 space-y-4'>
									{items.map((item) => {
										const key = cartLineKey(item);
										const image =
											item.variant?.imageUrl ||
											item.image ||
											'/images/product_placeholder.png';
										const isActive = key === cartLineKey(activeItem);

										return (
											<div
												key={key}
												role='button'
												tabIndex={0}
												aria-pressed={isActive}
												onClick={() => selectCartLine(key)}
												onKeyDown={(event) => {
													if (event.key === 'Enter' || event.key === ' ') {
														event.preventDefault();
														selectCartLine(key);
													}
												}}
												className={`flex cursor-pointer gap-4 rounded-[8px] border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#1738e6] focus:ring-offset-2 ${
													isActive
														? 'border-[#1f2529] bg-white'
														: 'border-[#d7d7d7] bg-[#fafafa] hover:border-[#1f2529]'
												}`}>
												<div className='relative h-24 w-24 shrink-0 bg-white'>
													<Image
														src={image}
														alt={item.name}
														fill
														sizes='96px'
														unoptimized={shouldBypassImageOptimizer(image)}
														className='object-contain p-3'
													/>
												</div>
												<div className='min-w-0 flex-1'>
													<div className='flex items-start justify-between gap-4'>
														<div>
															<h3 className='font-mona text-[20px] font-black leading-none tracking-[-0.04em] text-black'>
																{item.name}
															</h3>
															{item.variant ? (
																<div className='mt-3 flex items-center gap-3'>
																	<ColorSwatch
																		value={item.variant.value}
																		className='h-7 w-7'
																	/>
																	<span className='font-mona text-[11px] font-black uppercase tracking-[0.22em] text-[#252b31]'>
																		{item.variant.label ||
																			item.variant.id ||
																			'Selected color'}
																	</span>
																</div>
															) : null}
														</div>
														<button
															type='button'
															onClick={(event) => {
																event.stopPropagation();
																handleRemoveLine(item);
															}}
															disabled={removingLineKey === key}
															className='font-mona text-[18px] font-black text-[#252b31] disabled:cursor-not-allowed disabled:opacity-40'>
															×
														</button>
													</div>
													<div className='mt-5 flex flex-wrap items-center justify-between gap-4'>
														<div className='flex items-center gap-4'>
															<button
																type='button'
																onClick={(event) => {
																	event.stopPropagation();
																	syncQuantity(item, item.quantity - 1);
																}}
																className='flex h-10 w-10 items-center justify-center rounded-full border border-[#1f2529] text-[24px] font-light text-[#252b31]'>
																−
															</button>
															<span className='w-6 text-center font-mona text-[18px] font-black text-[#252b31]'>
																{item.quantity}
															</span>
															<button
																type='button'
																onClick={(event) => {
																	event.stopPropagation();
																	syncQuantity(item, item.quantity + 1);
																}}
																className='flex h-10 w-10 items-center justify-center rounded-full border border-[#1f2529] text-[24px] font-light text-[#252b31]'>
																+
															</button>
														</div>
														<p className='font-mona text-[20px] font-black text-[#252b31]'>
															{formatCurrency(item.price * item.quantity)}
														</p>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>

							<div className='my-10 border-t border-[#d7d7d7]' />

							{selectedVariant ? (
								<div className='flex flex-wrap items-center gap-8'>
									<div className='flex h-[66px] items-center gap-5 rounded-[14px] border border-[#1f2529] px-5'>
										<ColorSwatch
											value={selectedVariant.value}
											className='h-11 w-11'
										/>
										<span className='font-mona text-[14px] font-black uppercase tracking-[0.22em] text-[#252b31]'>
											{selectedVariant.label || selectedVariant.id || 'Selected color'}
										</span>
									</div>
								</div>
							) : null}

							<div className='my-10 border-t border-[#d7d7d7]' />

							<div className='flex flex-col gap-4 sm:flex-row'>
								<button
									onClick={handleClearCart}
									disabled={isClearingCart}
									className='inline-flex h-[66px] min-w-[180px] items-center justify-center border border-[#1f2529] px-6 font-mona text-[14px] font-black uppercase tracking-[0.22em] text-[#252b31] hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50'>
									{isClearingCart ? 'Clearing...' : '× Exit & Cancel'}
								</button>
								<button
									onClick={handleProceedToCheckout}
									className='inline-flex h-[66px] min-w-[250px] items-center justify-center bg-[#1738e6] px-6 font-mona text-[14px] font-black uppercase tracking-[0.22em] text-white hover:opacity-90'>
									Proceed To Checkout
								</button>
							</div>

							{/* Total */}
							<div className='mt-10 border-t-2 border-[#1f2529] pt-6 flex items-center justify-between'>
								<span className='font-mona text-[18px] font-black uppercase tracking-[0.22em] text-[#252b31]'>
									Total
								</span>
								<span className='font-mona text-[34px] font-black tracking-[-0.02em] text-[#252b31]'>
									{formatCurrency(totalPrice)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
