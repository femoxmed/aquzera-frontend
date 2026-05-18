'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AuthLayoutClient({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isAuth = pathname?.startsWith('/auth');
	const isDashboardRoute = pathname?.startsWith('/dashboard');

	return (
		<>
			{!isAuth && !isDashboardRoute && <Header />}
			<main className='min-h-screen'>{children}</main>
			{!isAuth && !isDashboardRoute && <Footer />}
		</>
	);
}
