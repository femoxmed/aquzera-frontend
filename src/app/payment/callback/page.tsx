'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentCallbackPage() {
	const searchParams = useSearchParams();
	const reference = searchParams.get('reference') || searchParams.get('trxref');

	return (
		<section className='flex min-h-screen items-center justify-center bg-white px-6 py-24 text-center'>
			<div className='max-w-xl'>
				<p className='font-mona text-[12px] font-black uppercase tracking-[0.24em] text-[#1738e6]'>
					Payment submitted
				</p>
				<h1 className='mt-5 font-mona-wide text-[38px] font-black leading-tight tracking-[-0.04em] text-black sm:text-[52px]'>
					Thanks, we are confirming your payment.
				</h1>
				<p className='mt-6 font-montserrat text-[15px] leading-6 text-black/60'>
					Paystack has redirected you back to Aquzera. Your order status will
					update once payment confirmation is received.
				</p>
				{reference ? (
					<p className='mt-5 break-all font-montserrat text-[13px] text-black/45'>
						Reference: {reference}
					</p>
				) : null}
				<div className='mt-9 flex flex-col justify-center gap-4 sm:flex-row'>
					<Link
						href='/dashboard/orders'
						className='inline-flex h-14 items-center justify-center bg-[#1738e6] px-8 font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white'>
						View Orders
					</Link>
					<Link
						href='/product'
						className='inline-flex h-14 items-center justify-center border border-black px-8 font-mona text-[12px] font-black uppercase tracking-[0.22em] text-black'>
						Continue Shopping
					</Link>
				</div>
			</div>
		</section>
	);
}
