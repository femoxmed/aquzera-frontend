'use client';

import Link from 'next/link';
import { ShoppingBag, CircleHelp, UserCircle } from 'lucide-react';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='min-h-screen bg-black text-white'>
			{/* Auth Header */}
			<header className='border-b border-white/15 px-6 py-8 md:px-16'>
				<div className='mx-auto flex max-w-[1180px] items-center justify-between'>
					<Link
						href='/'
						className='font-mona text-[22px] font-black uppercase tracking-[-0.03em]'>
						AQUZERA
						<span className='block font-montserrat text-[7px] font-semibold tracking-[0.28em]'>
							WATER SOLUTIONS
						</span>
					</Link>
					<div className='flex items-center gap-6 text-white'>
						<ShoppingBag className='h-5 w-5' />
						<CircleHelp className='h-5 w-5' />
						<UserCircle className='hidden h-5 w-5 sm:block' />
					</div>
				</div>
			</header>

			{children}

			{/* Auth Footer */}
			<footer className='px-6 py-12 md:px-16'>
				<div className='mx-auto flex max-w-[1180px] flex-col gap-8 font-mona text-[14px] font-black uppercase tracking-[0.24em] text-white md:flex-row md:items-center md:justify-between'>
					<Link href='/' className='underline underline-offset-4'>
						Aquzera © 2026
					</Link>
					<div className='flex flex-col gap-5 sm:flex-row sm:gap-12'>
						<Link href='/privacy'>Privacy Policy</Link>
						<Link href='/warranty'>Warranty</Link>
						<Link href='/terms'>Terms & Conditions</Link>
					</div>
					<Link
						href='/contact'
						className='inline-flex h-[46px] w-fit items-center gap-3 border border-white/60 px-5'>
						<CircleHelp className='h-4 w-4' />
						Get Help
					</Link>
				</div>
			</footer>
		</main>
	);
}
