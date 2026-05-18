'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	Cpu,
	UserCircle,
	Package,
	CalendarDays,
	Plug,
	LogOut,
	ShoppingBag,
	CircleHelp,
	MessageCircle,
	Sun,
	Menu,
	X,
} from 'lucide-react';

const navItems = [
	{ label: 'My Devices', icon: Cpu, active: true },
	{ label: 'Account Settings', icon: UserCircle },
	{ label: 'Order History', icon: Package },
	{ label: 'Schedules', icon: CalendarDays },
	{ label: 'Products', icon: Plug },
];

export default function DashboardPage() {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<main className='flex min-h-screen flex-col bg-[linear-gradient(180deg,#000_0%,#050607_55%,#24272d_130%)] text-white'>
			{/* HEADER */}
			<header className='border-b border-white/15 px-4 py-6 sm:px-6 md:px-10 lg:px-16 xl:px-24'>
				<div className='mx-auto flex max-w-[1440px] items-center justify-between'>
					<Link
						href='/'
						className='font-mona text-[20px] font-black uppercase tracking-[-0.03em] sm:text-[24px]'>
						AQUZERA
						<span className='block font-montserrat text-[6px] font-semibold tracking-[0.28em] sm:text-[7px]'>
							WATER SOLUTIONS
						</span>
					</Link>

					{/* Desktop Icons */}
					<div className='hidden items-center gap-6 text-white md:flex'>
						<div className='relative'>
							<MessageCircle className='h-5 w-5' />
							<span className='absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#a7ff18]' />
						</div>
						<Sun className='h-5 w-5' />
						<ShoppingBag className='h-5 w-5' />
						<CircleHelp className='h-5 w-5' />
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileNavOpen((v) => !v)}
						className='flex h-10 w-10 items-center justify-center border border-white/20 md:hidden'>
						{mobileNavOpen ? (
							<X className='h-5 w-5' />
						) : (
							<Menu className='h-5 w-5' />
						)}
					</button>
				</div>
			</header>

			{/* MOBILE NAV */}
			{mobileNavOpen && (
				<div className='border-b border-white/15 bg-black px-4 py-5 md:hidden'>
					<div className='space-y-4'>
						{navItems.map(({ label, icon: Icon, active }) => (
							<button
								key={label}
								className={`flex w-full items-center gap-3 font-mona text-[13px] font-black uppercase tracking-[0.22em] ${
									active ? 'text-white' : 'text-white/55'
								}`}>
								<Icon className='h-5 w-5' />
								{label}
							</button>
						))}

						<button className='flex w-full items-center gap-3 pt-4 font-mona text-[13px] font-black uppercase tracking-[0.22em] text-[#ff676f]'>
							<LogOut className='h-5 w-5' />
							Sign Out
						</button>
					</div>
				</div>
			)}

			{/* BODY */}
			<section className='mx-auto flex-1 grid w-full max-w-[1440px] px-4 py-10 sm:px-6 md:px-10 lg:grid-cols-[280px_1px_1fr] lg:gap-14 lg:px-16 lg:py-14 xl:grid-cols-[320px_1px_1fr] xl:gap-20 xl:px-24'>
				{/* DESKTOP SIDEBAR */}
				<aside className='hidden min-h-[520px] flex-col justify-between lg:flex'>
					<nav className='space-y-14'>
						{navItems.map(({ label, icon: Icon, active }) => (
							<button
								key={label}
								className={`flex items-center gap-4 font-mona text-[18px] font-black uppercase tracking-[0.24em] transition ${
									active ? 'text-white' : 'text-white/45 hover:text-white'
								}`}>
								<Icon className='h-6 w-6 stroke-[1.5]' />
								{label}
							</button>
						))}
					</nav>

					<button className='flex items-center gap-4 font-mona text-[18px] font-black uppercase tracking-[0.24em] text-[#ff676f]'>
						<LogOut className='h-6 w-6 stroke-[1.5]' />
						Sign Out
					</button>
				</aside>

				{/* Divider */}
				<div className='hidden w-px bg-white/20 lg:block' />

				{/* CONTENT */}
				<div className='min-h-[520px] lg:pl-4'>
					<h1 className='font-mona text-[32px] font-black leading-none tracking-[-0.05em] text-white sm:text-[38px] md:text-[44px]'>
						My Devices
					</h1>

					<p className='mt-4 font-montserrat text-[13px] text-white/45 sm:text-[15px]'>
						A list of your owned activated devices.
					</p>

					{/* Empty state */}
					<div className='mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 md:max-w-[520px]'>
						<Cpu className='h-9 w-9 text-white/45' />
						<h2 className='mt-5 font-mona text-[20px] font-black tracking-[-0.03em] text-white'>
							No devices yet
						</h2>
						<p className='mt-3 font-montserrat text-[13px] leading-[1.5] text-white/45'>
							Once you activate or purchase an Aquzera device, it will appear
							here.
						</p>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className='px-4 py-10 sm:px-6 md:px-10 lg:px-16 xl:px-24'>
				<div className='mx-auto flex max-w-[1440px] flex-col gap-6 font-mona text-[13px] font-black uppercase tracking-[0.24em] text-white sm:text-[15px] md:flex-row md:items-center md:justify-between'>
					<Link href='/' className='underline underline-offset-4'>
						Aquzera © 2026
					</Link>

					<Link
						href='/contact'
						className='inline-flex h-[48px] w-fit items-center gap-3 border border-white/60 px-5 transition hover:bg-white hover:text-black'>
						<CircleHelp className='h-4 w-4' />
						Get Help
					</Link>
				</div>
			</footer>
		</main>
	);
}
