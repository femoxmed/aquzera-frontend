import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import AuthLayoutClient from '@/components/common/AuthLayoutClient';

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const monaSans = localFont({
	src: [
		// Core weights (Regular width)
		{
			path: '../../public/mona-sans/Mona-Sans-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-SemiBold.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-ExtraBold.ttf',
			weight: '800',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-Black.ttf',
			weight: '900',
			style: 'normal',
		},

		// Narrow variants
		{
			path: '../../public/mona-sans/Mona-Sans-RegularNarrow.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-MediumNarrow.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-SemiBoldNarrow.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-BoldNarrow.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-BlackNarrow.ttf',
			weight: '900',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--font-mona-sans',
});

const monaSansWide = localFont({
	src: [
		{
			path: '../../public/mona-sans/Mona-Sans-RegularWide.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-MediumWide.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-SemiBoldWide.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-BoldWide.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-ExtraBoldWide.ttf',
			weight: '800',
			style: 'normal',
		},
		{
			path: '../../public/mona-sans/Mona-Sans-BlackWide.ttf',
			weight: '900',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--font-mona-sans-wide',
});

export const metadata: Metadata = {
	title: { default: 'Aquzera Water Solutions', template: '%s | Aquzera' },
	description:
		'Aquzera purification systems elevate your everyday hydration through advanced filtration and refined engineering. Starting from ₦200,000.',
	keywords: [
		'water purifier',
		'Aquzera',
		'water filtration',
		'Neo Sense filter',
		'hot and cold water',
		'Nigeria water purifier',
	],
	openGraph: {
		title: 'Aquzera Water Solutions',
		description:
			'Aquzera Water Purifier — Advanced filtration, hot & cold always. Starting from ₦200,000.',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={`${monaSans.variable} ${monaSansWide.variable} ${montserrat.variable} antialiased`}
			suppressHydrationWarning={true}>
			<head>
				<link rel='preconnect' href='https://cdn.jsdelivr.net' />
			</head>
			<body className={monaSans.variable}>
				<QueryProvider>
					<AuthLayoutClient>{children}</AuthLayoutClient>
				</QueryProvider>
			</body>
		</html>
	);
}
