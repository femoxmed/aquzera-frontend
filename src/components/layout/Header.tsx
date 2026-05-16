'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

const navLinks = [
	{ href: '/', label: 'HOME' },
	{ href: '/product', label: 'PRODUCTS' },
	{ href: '/about', label: 'ABOUT' },
	{ href: '/contact', label: 'CONTACT' },
];

export default function Header() {
	const pathname = usePathname();
	const items = useCartStore((s) => s.items);
	const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className='top-0 z-50 bg-[linear-gradient(180deg,_rgba(0,0,0,0.7125)_0%,_rgba(30,30,30,0.375)_65.75%)] border-b border-gray-100 shadow-sm fixed w-[100%]'>
			<div className='container flex h-[100px] items-center justify-between'>
				{/* Logo */}
				<Link href='/' className='flex flex-col leading-none select-none'>
					<span
						className='font-mona text-[17px] font-black tracking-[0.18em] text-white'
						style={{ fontStretch: 'expanded' }}>
						AQUZERA
					</span>
					<span className='text-[7px] font-semibold tracking-[0.25em] text-gray-400 uppercase mt-[1px]'>
						WATER SOLUTIONS
					</span>
				</Link>

				{/* Desktop Nav */}
				<nav className='hidden md:flex items-center gap-8'>
					{navLinks.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={`font-mona text-[20px] font-semibold tracking-[0.15em] leading-[50px] transition-colors hover:text-primary ${
								pathname === href ? 'text-white' : 'text-white'
							}`}>
							{label}
						</Link>
					))}
				</nav>

				{/* Right icons */}
				<div className='flex items-center gap-5'>
					<Link href='/cart' className='relative' aria-label='Cart'>
						<Image
							src='/icons/shopping_cart.svg'
							alt='Cart'
							width={18}
							height={18}
							className='h-[18px] w-[18px]'
						/>
						{cartCount > 0 && (
							<span className='absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold'>
								{cartCount}
							</span>
						)}
					</Link>
					<Link href='/faq' className='hidden sm:block' aria-label='Help'>
						<Image
							src='/icons/question.svg'
							alt='Help'
							width={18}
							height={18}
							className='h-[18px] w-[18px]'
						/>
					</Link>
					<Link
						href='/profile'
						className='hidden sm:block'
						aria-label='Account'>
						<Image
							src='/icons/profile-circle.svg'
							alt='Account'
							width={18}
							height={18}
							className='h-[18px] w-[18px]'
						/>
					</Link>

					{/* Mobile hamburger */}
					<button
						className='md:hidden flex items-center justify-center w-9 h-9 rounded-full text-white hover:bg-white/10 transition-colors'
						onClick={() => setMenuOpen(true)}
						aria-label='Open menu'>
						<Menu className='h-6 w-6' strokeWidth={1.8} />
					</button>
				</div>
			</div>

			{/* Mobile sidebar overlay */}
			{menuOpen && (
				<div
					className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden'
					onClick={() => setMenuOpen(false)}
				/>
			)}

			{/* Mobile sidebar */}
			<div
				className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#0f0f0f] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
					menuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}>
				<div className='flex flex-col h-full px-6 py-8'>
					{/* Close button */}
					<div className='flex justify-end mb-10'>
						<button
							className='flex items-center justify-center w-9 h-9 rounded-full text-white hover:bg-white/10 transition-colors'
							onClick={() => setMenuOpen(false)}
							aria-label='Close menu'>
							<X className='h-6 w-6' strokeWidth={1.8} />
						</button>
					</div>

					{/* Nav links */}
					<nav className='flex flex-col gap-2'>
						{navLinks.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								onClick={() => setMenuOpen(false)}
								className={`font-mona text-[22px] font-semibold tracking-[0.15em] px-4 py-3 rounded-lg transition-colors ${
									pathname === href
										? 'text-white bg-white/10'
										: 'text-white/70 hover:text-white hover:bg-white/5'
								}`}>
								{label}
							</Link>
						))}
					</nav>

					{/* Divider */}
					<div className='mt-8 mb-6 border-t border-white/10' />

					{/* Bottom icons */}
					<div className='flex items-center gap-6 px-4'>
						<Link
							href='/cart'
							className='relative text-white/70 hover:text-white transition-colors'
							onClick={() => setMenuOpen(false)}
							aria-label='Cart'>
							<Image
								src='/icons/shopping_cart.svg'
								alt='Cart'
								width={24}
								height={24}
								className='h-6 w-6'
							/>
							{cartCount > 0 && (
								<span className='absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold'>
									{cartCount}
								</span>
							)}
						</Link>
						<Link
							href='/faq'
							className='text-white/70 hover:text-white transition-colors'
							onClick={() => setMenuOpen(false)}
							aria-label='Help'>
							<Image
								src='/icons/question.svg'
								alt='Help'
								width={24}
								height={24}
								className='h-6 w-6'
							/>
						</Link>
						<Link
							href='/profile'
							className='text-white/70 hover:text-white transition-colors'
							onClick={() => setMenuOpen(false)}
							aria-label='Account'>
							<Image
								src='/icons/profile-circle.svg'
								alt='Account'
								width={24}
								height={24}
								className='h-6 w-6'
							/>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
