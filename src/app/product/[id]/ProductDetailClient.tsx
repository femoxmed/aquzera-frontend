'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import ColorSwatch from '@/components/common/ColorSwatch';
import ProductPriceDisplay from '@/components/common/ProductPriceDisplay';
import {
	activeProductColors,
	isProductSaleActive,
	productImageUrl,
	productPrice,
	productRegularPrice,
	productSlug,
	productVariantImageUrl,
} from '@/features/products/api';
import { useProduct } from '@/features/products/hooks';
import type { ProductColor } from '@/features/products/types';
import { shouldBypassImageOptimizer } from '@/lib/images';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

type ProductDetailClientProps = {
	slug: string;
};

type ProductTab = 'overview' | 'features' | 'specifications' | 'delivery';

const tabs: Array<{ id: ProductTab; label: string }> = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'features', label: 'Features' },
	{ id: 'specifications', label: 'Specifications' },
	{ id: 'delivery', label: 'Delivery' },
];

function variationKey(color: ProductColor) {
	return color.id || color.label || color.value;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
	const router = useRouter();
	const addItem = useCartStore((state) => state.addItem);
	const { data: product, isLoading, isError } = useProduct(slug);
	const [selectedVariationKey, setSelectedVariationKey] = useState('');
	const [selectedImage, setSelectedImage] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState<ProductTab>('overview');

	const activeColors = useMemo(() => activeProductColors(product), [product]);
	const selectedVariation =
		activeColors.find((color) => variationKey(color) === selectedVariationKey) ||
		activeColors[0] ||
		null;

	useEffect(() => {
		setSelectedImage('');
	}, [selectedVariationKey]);

	if (isLoading) {
		return (
			<main className='flex min-h-screen items-center justify-center bg-white px-6 text-center font-mona text-sm uppercase tracking-[0.22em] text-black/50'>
				Loading product...
			</main>
		);
	}

	if (isError || !product) {
		return (
			<main className='flex min-h-screen items-center justify-center bg-white px-6 text-center text-black'>
				<div>
					<h1 className='font-mona-wide text-[34px] font-black'>
						Product unavailable
					</h1>
					<p className='mt-4 max-w-md font-montserrat text-sm text-black/55'>
						We could not load this product. Please return to the products page
						and try again.
					</p>
				</div>
			</main>
		);
	}

	const baseImage = productImageUrl(product);
	const selectedVariationImage = productVariantImageUrl(selectedVariation);
	const mainImage = selectedVariationImage || baseImage;
	const displayImage = selectedImage || mainImage;
	const thumbnails = [
		mainImage,
		baseImage,
		...(product.galleryImages || []).map((image) => image.url || '').filter(Boolean),
	].filter((image, index, images) => image && images.indexOf(image) === index);
	const description =
		product.shortDescription ||
		product.description ||
		'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering.';
	const currentPrice = productPrice(product);
	const regularPrice = productRegularPrice(product);
	const saleLabel = isProductSaleActive(product)
		? product.saleLabel || 'Sale'
		: null;
	const lineTotal = currentPrice * quantity;
	const learnMoreHref = `/learn-more/${productSlug(product)}`;
	const cartAddOns = (product.addOns || [])
		.filter((addOn) => addOn.productId && addOn.name)
		.map((addOn) => ({
			productId: addOn.productId,
			name: addOn.name || 'Compatible add-on',
			price: Number(addOn.price || 0),
			image: addOn.image,
			shortDescription: addOn.shortDescription,
			isCompulsory: addOn.isCompulsory,
		}));

	const cartPayload = () => ({
		id: product.id,
		slug: product.slug,
		name: product.name,
		price: currentPrice,
		quantity,
		image: displayImage,
		description: product.shortDescription || undefined,
		addOns: cartAddOns,
		variant: selectedVariation
			? {
					id: selectedVariation.id,
					label: selectedVariation.label,
					value: selectedVariation.value,
					imageUrl: displayImage,
				}
			: undefined,
	});

	const handleAddToCart = () => {
		addItem(cartPayload());
		toast.success('Added to cart');
	};

	const handleCheckout = () => {
		addItem(cartPayload());
		router.push('/shipping');
	};

	return (
		<main className='bg-white pt-[112px] text-black lg:pt-[128px]'>
			<section className='mx-auto grid max-w-[1500px] gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1fr_1px_0.86fr] lg:gap-12 lg:px-10 xl:px-16'>
				<div className='grid gap-6 md:grid-cols-[112px_1fr] md:gap-10'>
					<div className='order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col md:overflow-visible'>
						{thumbnails.map((src) => (
							<button
								key={src}
								type='button'
								className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-[22px] border bg-white ${
									src === displayImage ? 'border-[#25282d]' : 'border-[#d7d7d7]'
								}`}
								onClick={() => setSelectedImage(src)}
								aria-label='Product image thumbnail'>
								<Image
									src={src}
									alt={product.name}
									fill
									sizes='96px'
									unoptimized={shouldBypassImageOptimizer(src)}
									className='object-contain p-3'
								/>
							</button>
						))}
					</div>

					<div className='order-1 flex min-h-[420px] items-center justify-center bg-[#f7f7f5] px-6 py-10 md:order-2 lg:min-h-[620px]'>
						<div className='relative h-[360px] w-full max-w-[520px] sm:h-[460px] lg:h-[560px]'>
							<Image
								key={displayImage}
								src={displayImage}
								alt={product.name}
								fill
								sizes='(max-width: 1024px) 90vw, 520px'
								priority
								unoptimized={shouldBypassImageOptimizer(mainImage)}
								className='object-contain'
							/>
						</div>
					</div>
				</div>

				<div className='hidden bg-[#d7d7d7] lg:block' />

				<div className='flex flex-col justify-center lg:py-8'>
					<p className='font-mona text-[11px] font-black uppercase tracking-[0.24em] text-[#1738e6]'>
						Purchase Detail
					</p>
					<h1 className='mt-4 max-w-[620px] font-mona-wide text-[42px] font-black leading-[0.88] tracking-[-0.04em] text-black sm:text-[56px] lg:text-[68px]'>
						{product.name}
					</h1>
					<p className='mt-6 max-w-[520px] font-montserrat text-[15px] leading-[1.28] text-black/62 sm:text-[18px]'>
						{description}
					</p>

					<div className='mt-8 font-mona text-[30px] font-black tracking-[-0.03em] text-[#25282d] sm:text-[38px]'>
						<ProductPriceDisplay
							price={currentPrice}
							regularPrice={regularPrice}
							saleLabel={saleLabel}
							currentClassName='text-[#25282d]'
							regularClassName='text-[#25282d]/45'
							labelClassName='text-[#1738e6]'
						/>
						<span className='ml-4 align-middle font-montserrat text-[12px] font-semibold uppercase tracking-[0.1em] text-black/35'>
							Ext. Tax
						</span>
					</div>

					<div className='my-9 border-t border-[#dedede]' />

					{activeColors.length > 0 ? (
						<div>
							<p className='font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#25282d]'>
								Colour
							</p>
							<div className='mt-4 flex flex-wrap gap-3'>
								{activeColors.map((color) => {
									const key = variationKey(color);
									const isSelected =
										selectedVariation && variationKey(selectedVariation) === key;
									return (
										<button
											key={key}
											type='button'
											onClick={() => setSelectedVariationKey(key)}
											className={`flex h-[58px] items-center gap-3 rounded-[8px] border px-4 transition ${
												isSelected
													? 'border-[#25282d] bg-white'
													: 'border-[#d7d7d7] bg-[#fbfbfb]'
											}`}>
											<ColorSwatch value={color.value} className='h-9 w-9' />
											<span className='font-mona text-[11px] font-black uppercase tracking-[0.2em] text-[#25282d]'>
												{color.label}
											</span>
											{isSelected ? <Check className='h-4 w-4' /> : null}
										</button>
									);
								})}
							</div>
						</div>
					) : null}

					<div className='mt-8'>
						<p className='font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#25282d]'>
							Quantity
						</p>
						<div className='mt-4 flex items-center gap-4'>
							<button
								type='button'
								onClick={() => setQuantity((value) => Math.max(1, value - 1))}
								className='flex h-12 w-12 items-center justify-center rounded-full border border-[#25282d] text-[#25282d]'
								aria-label='Decrease quantity'>
								<Minus className='h-5 w-5' />
							</button>
							<span className='w-10 text-center font-mona text-[24px] font-black'>
								{quantity}
							</span>
							<button
								type='button'
								onClick={() => setQuantity((value) => value + 1)}
								className='flex h-12 w-12 items-center justify-center rounded-full border border-[#25282d] text-[#25282d]'
								aria-label='Increase quantity'>
								<Plus className='h-5 w-5' />
							</button>
							<span className='ml-auto font-mona text-[20px] font-black text-[#25282d]'>
								{formatCurrency(lineTotal)}
							</span>
						</div>
					</div>

					<div className='mt-8 grid gap-3 sm:grid-cols-2'>
						<button
							type='button'
							onClick={handleAddToCart}
							className='inline-flex h-[58px] items-center justify-center border border-[#25282d] px-6 font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#25282d] transition hover:bg-[#25282d] hover:text-white'>
							<ShoppingBag className='mr-3 h-4 w-4' />
							Add To Cart
						</button>
						<button
							type='button'
							onClick={handleCheckout}
							className='inline-flex h-[58px] items-center justify-center bg-[#1738e6] px-6 font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition hover:opacity-90'>
							Checkout
						</button>
					</div>

					<a
						href={learnMoreHref}
						className='mt-5 inline-flex font-montserrat text-[13px] font-semibold text-black/55 underline underline-offset-4 hover:text-black'>
						View full product story
					</a>
				</div>
			</section>

			<section className='mx-auto max-w-[1220px] px-4 pb-16 sm:px-6 lg:px-10'>
				<div className='border-t border-[#dedede] pt-8'>
					<div className='flex gap-2 overflow-x-auto'>
						{tabs.map((tab) => (
							<button
								key={tab.id}
								type='button'
								onClick={() => setActiveTab(tab.id)}
								className={`h-11 shrink-0 border px-4 font-mona text-[11px] font-black uppercase tracking-[0.18em] ${
									activeTab === tab.id
										? 'border-[#25282d] bg-[#25282d] text-white'
										: 'border-[#d7d7d7] bg-white text-[#25282d]'
								}`}>
								{tab.label}
							</button>
						))}
					</div>

					<div className='mt-8 min-h-[160px] max-w-4xl font-montserrat text-[15px] leading-[1.55] text-black/68'>
						{activeTab === 'overview' ? (
							<p>{product.description || description}</p>
						) : null}
						{activeTab === 'features' ? (
							<div className='grid gap-5 sm:grid-cols-2'>
								{(product.features || []).slice(0, 4).map((feature) => (
									<div key={feature.title} className='border border-[#e1e1e1] p-5'>
										<h3 className='font-mona text-[16px] font-black text-black'>
											{feature.title}
											{feature.titleLine2 ? ` ${feature.titleLine2}` : ''}
										</h3>
										<p className='mt-3'>{feature.description}</p>
									</div>
								))}
								{!product.features?.length ? <p>No feature notes available.</p> : null}
							</div>
						) : null}
						{activeTab === 'specifications' ? (
							<div className='grid gap-3 sm:grid-cols-2'>
								{(product.specifications || []).slice(0, 8).map((spec) => (
									<div
										key={`${spec.label}-${spec.value}`}
										className='flex justify-between gap-6 border-b border-[#e4e4e4] py-3'>
										<span className='font-semibold text-black'>{spec.label}</span>
										<span className='text-right'>{spec.value}</span>
									</div>
								))}
								{!product.specifications?.length ? (
									<p>No specifications available.</p>
								) : null}
							</div>
						) : null}
						{activeTab === 'delivery' ? (
							<p>
								Checkout uses Nigerian delivery details. Installation and service
								support can be coordinated from your dashboard after payment is
								confirmed.
							</p>
						) : null}
					</div>
				</div>
			</section>
		</main>
	);
}
