import Link from 'next/link';

export const metadata = { title: 'Payment' };

export default function PaymentPage() {
	return (
		<section className='flex min-h-screen items-center justify-center bg-white px-6 py-24 text-center'>
			<div className='max-w-md'>
				<h1 className='font-mona-wide text-[38px] font-black tracking-[-0.04em] text-black'>
					Payment
				</h1>
				<p className='mt-4 font-montserrat text-[15px] leading-6 text-black/60'>
					Complete checkout from your cart to start a secure payment session.
				</p>
				<Link
					href='/cart'
					className='mt-8 inline-flex h-14 items-center justify-center bg-[#1738e6] px-8 font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white'>
					Return To Cart
				</Link>
			</div>
		</section>
	);
}
