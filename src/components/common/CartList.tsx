'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import AnnouncementBar from '@/components/common/AnnouncementBar';

const COLORS = [
	{
		id: 'charcoal',
		label: 'CHARCOAL BLACK',
		bg: 'bg-[#101818]',
		border: 'border-[#101818]',
	},
	{ id: 'white', label: 'WHITE', bg: 'bg-white', border: 'border-[#2b2f33]' },
];

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
	const { items, removeItem, addItem, clearCart, total } = useCartStore();

	const [selectedColor, setSelectedColor] = useState('charcoal');
	const [quantity, setQuantity] = useState(2);
	const [includeFilter, setIncludeFilter] = useState(true);
	const [openSection, setOpenSection] = useState('general');
	const [activeThumb, setActiveThumb] = useState(0);

	const isEmpty = items.length === 0;
	const mainItem =
		items.find((i) => i.id === 'aquzera-water-purifier') || items[0];
	const isNeoSense = mainItem?.id === 'neo-sense-filter';

	const productName = mainItem?.name || 'Aquzera Water Purifier';
	const productPrice = mainItem?.price || 200000;
	const productImage =
		mainItem?.image ||
		(mainItem?.id === 'neo-sense-filter'
			? '/images/neo-sense-filter.png'
			: '/images/purifier-black.png');
	const thumbnails = [productImage, '/images/purifier-back.png'];

	const totalPrice = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

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
											priority
											className='object-contain'
										/>
									</div>
								</div>
							</div>

							{/* Extra Compatible Additions */}
							{!isNeoSense && includeFilter && (
								<div className='mt-14 border-t border-[#d7d7d7] pt-12'>
									<h2 className='font-mona text-[30px] font-black leading-none tracking-[-0.04em] text-black'>
										Extra Compatible Additions
									</h2>
									<p className='mt-4 max-w-[520px] font-montserrat text-[15px] leading-[1.25] text-black/60'>
										Aquzera purification systems elevate your everyday hydration
										through advanced filtration and refined engineering.
									</p>
									<div className='mt-10 flex max-w-[560px] items-center gap-8'>
										<div className='relative flex h-[178px] w-[178px] shrink-0 items-center justify-center rounded-[28px] border border-[#1f2529]'>
											<Image
												src='/images/neo-sense-filter.png'
												alt='Neo Sense Filter'
												fill
												className='object-contain p-10'
											/>
											<button className='absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#a7ff18] text-[13px] font-black text-black'>
												✓
											</button>
										</div>
										<div className='flex-1'>
											<div className='flex items-start justify-between gap-4'>
												<h3 className='font-mona text-[34px] font-black leading-[0.9] tracking-[-0.05em] text-black'>
													Neo Sense
													<br />
													Filter
												</h3>
												<button
													onClick={() => setIncludeFilter(false)}
													className='flex h-7 w-7 items-center justify-center rounded-full bg-[#ff676f] text-sm font-black text-white'>
													×
												</button>
											</div>
											<p className='mt-4 max-w-[330px] font-montserrat text-[14px] leading-[1.2] text-black/60'>
												Aquzera purification systems elevate your everyday
												hydration through advanced filtration and refined
												engineering.
											</p>
											<p className='mt-5 font-mona text-[22px] font-black tracking-[-0.02em] text-[#252b31]'>
												₦85,608{' '}
												<span className='ml-3 font-montserrat text-[13px] font-medium uppercase tracking-[0.06em] text-black/45'>
													EXT. TAX
												</span>
											</p>
										</div>
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
								Aquzera purification systems elevate your everyday hydration
								through advanced filtration and refined engineering.
							</p>

							<div className='mt-8 flex items-end gap-6'>
								<p className='font-mona text-[34px] font-black tracking-[-0.02em] text-[#252b31]'>
									₦ {productPrice.toLocaleString()}
								</p>
								<p className='pb-2 font-montserrat text-[13px] uppercase tracking-[0.06em] text-black/45'>
									EXT. TAX
								</p>
							</div>

							<div className='my-10 border-t border-[#d7d7d7]' />

							{!isNeoSense && (
								<div className='flex flex-wrap items-center gap-8'>
									{COLORS.map((c) => (
										<button
											key={c.id}
											onClick={() => setSelectedColor(c.id)}
											className={`flex h-[66px] items-center gap-5 rounded-[14px] border px-5 transition ${
												selectedColor === c.id
													? 'border-[#1f2529]'
													: 'border-[#d7d7d7]'
											}`}>
											<span
												className={`h-11 w-11 rounded-full border ${c.bg} ${c.border}`}
											/>
											<span className='font-mona text-[14px] font-black uppercase tracking-[0.22em] text-[#252b31]'>
												{c.label}
											</span>
										</button>
									))}
								</div>
							)}

							<div className='my-10 border-t border-[#d7d7d7]' />

							<div className='flex flex-wrap items-center gap-7'>
								<p className='font-mona text-[14px] font-black uppercase tracking-[0.22em] text-[#252b31]'>
									Quantity
								</p>
								<button
									onClick={() => setQuantity((q) => Math.max(1, q - 1))}
									className='flex h-[68px] w-[68px] items-center justify-center rounded-full border border-[#1f2529] text-[36px] font-light text-[#252b31]'>
									−
								</button>
								<span className='w-8 text-center font-mona text-[26px] font-black text-[#252b31]'>
									{quantity}
								</span>
								<button
									onClick={() => setQuantity((q) => q + 1)}
									className='flex h-[68px] w-[68px] items-center justify-center rounded-full border border-[#1f2529] text-[36px] font-light text-[#252b31]'>
									+
								</button>
							</div>

							<div className='my-10 border-t border-[#d7d7d7]' />

							<div className='flex flex-col gap-4 sm:flex-row'>
								<button
									onClick={() => {
										clearCart();
										router.push('/product');
									}}
									className='inline-flex h-[66px] min-w-[180px] items-center justify-center border border-[#1f2529] px-6 font-mona text-[14px] font-black uppercase tracking-[0.22em] text-[#252b31] hover:bg-black hover:text-white'>
									× Exit & Cancel
								</button>
								<button
									onClick={() => {
										// Update current item quantity
										if (mainItem) {
											addItem({ ...mainItem, quantity });
										}
										// Add filter if included
										if (includeFilter && !isNeoSense) {
											addItem({
												id: 'neo-sense-filter',
												name: 'Neo Sense Filter',
												price: 85608,
												quantity: 1,
												image: '/images/neo-sense-filter.png',
											});
										}
										router.push('/shipping');
									}}
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
									₦{totalPrice.toLocaleString()}
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
