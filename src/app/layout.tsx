import type { Metadata } from 'next';
import { headers } from 'next/headers';
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
	metadataBase: new URL('https://aquzera.com'),
	applicationName: 'Aquzera Water Solutions',
	title: {
		default: 'Aquzera Water Purifiers and Filtration Systems',
		template: '%s | Aquzera Water Solutions',
	},
	description:
		'Aquzera Water Solutions provides refined water purifiers, filtration systems, installation support, and maintenance services for homes and businesses in Nigeria.',
	keywords: [
		'water purifier',
		'Aquzera',
		'water filtration',
		'Neo Sense filter',
		'hot and cold water',
		'Nigeria water purifier',
	],
	authors: [{ name: 'Aquzera Water Solutions' }],
	creator: 'Aquzera Water Solutions',
	publisher: 'Aquzera Water Solutions',
	category: 'Water purification',
	alternates: {
		canonical: '/',
	},
	icons: {
		icon: [
			{ url: '/favicon.svg', type: 'image/svg+xml' },
			{ url: '/icons/icon.svg', type: 'image/svg+xml' },
		],
		apple: [{ url: '/icons/apple-touch-icon.svg', type: 'image/svg+xml' }],
	},
	manifest: '/manifest.webmanifest',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	openGraph: {
		title: 'Aquzera Water Purifiers and Filtration Systems',
		description:
			'Advanced Aquzera water purifiers with hot and cold dispensing, refined filtration, installation support, and maintenance services in Nigeria.',
		url: 'https://aquzera.com',
		siteName: 'Aquzera Water Solutions',
		type: 'website',
		locale: 'en_NG',
		images: [
			{
				url: '/images/home_bg.png',
				width: 1200,
				height: 630,
				alt: 'Aquzera Water Solutions purifier in a modern kitchen',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Aquzera Water Purifiers and Filtration Systems',
		description:
			'Advanced Aquzera water purifiers, filtration systems, installation support, and maintenance services in Nigeria.',
		images: ['/images/home_bg.png'],
	},
	other: {
		'theme-color': '#061927',
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const requestHeaders = await headers();
	const nonce = requestHeaders.get('x-nonce') || undefined;

	return (
		<html
			lang='en'
			className={`${monaSans.variable} ${monaSansWide.variable} ${montserrat.variable} antialiased`}
			suppressHydrationWarning={true}>
			<head>
				<link rel='preconnect' href='https://cdn.jsdelivr.net' />
				<script
					nonce={nonce}
					suppressHydrationWarning
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: 'Aquzera Water Solutions',
							url: 'https://aquzera.com',
							logo: 'https://aquzera.com/icons/icon.svg',
							email: 'info@aquzera.com',
							sameAs: [
								'https://instagram.com/aquzeranigeria',
							],
							contactPoint: [
								{
									'@type': 'ContactPoint',
									telephone: '+2349062024004',
									contactType: 'customer support',
									areaServed: 'NG',
									availableLanguage: ['English'],
								},
							],
						}),
					}}
				/>
				<script
					nonce={nonce}
					suppressHydrationWarning
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebSite',
							name: 'Aquzera Water Solutions',
							url: 'https://aquzera.com',
							publisher: {
								'@type': 'Organization',
								name: 'Aquzera Water Solutions',
							},
						}),
					}}
				/>
			</head>
			<body className={monaSans.variable}>
				<QueryProvider>
					<AuthLayoutClient>{children}</AuthLayoutClient>
				</QueryProvider>
			</body>
		</html>
	);
}
