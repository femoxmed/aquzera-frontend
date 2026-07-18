import LegalPage from '@/components/common/LegalPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Aquzera Terms and Conditions of Service',
	description:
		'Read the Aquzera Water Solutions terms for products, orders, payments, installation, support, product usage, and website content.',
	alternates: { canonical: '/terms' },
};

export default function TermsPage() {
	return (
		<LegalPage
			title='Terms & Conditions'
			date='18th May, 2026'
			introTitle='Terms & Conditions — Aquzera Water Solutions'
			intro='By accessing or using Aquzera’s website and services, you agree to the following terms:'
			sections={[
				{
					title: 'Products & Services',
					body: 'Aquzera provides water purification systems, installation, maintenance, and related support services.',
				},
				{
					title: 'Orders & Payments',
					body: 'All payments must be completed through approved payment methods before processing or installation.',
				},
				{
					title: 'Installation & Support',
					body: 'Installation timelines may vary depending on location and availability. Customers are expected to provide accurate information during booking.',
				},
				{
					title: 'Product Usage',
					body: 'Customers are responsible for proper usage and maintenance of installed systems.',
				},
				{
					title: 'Intellectual Property',
					body: 'All website content, branding, logos, and materials remain the property of Aquzera Water Solutions.',
				},
				{
					title: 'Limitation of Liability',
					body: 'Aquzera shall not be held responsible for damages resulting from misuse, unauthorized modifications, or failure to follow maintenance recommendations.',
				},
				{
					title: 'Updates',
					body: 'Aquzera reserves the right to update these terms when necessary.',
				},
			]}
		/>
	);
}
