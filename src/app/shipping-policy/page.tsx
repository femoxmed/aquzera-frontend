import LegalPage from '@/components/common/LegalPage';

export const metadata = { title: 'Shipping & Return Policy' };

export default function ShippingPolicyPage() {
	return (
		<LegalPage
			title='SHIPPING & RETURN POLICY'
			date='18th May, 2026'
			introTitle='Shipping & Return Policy — Aquzera Water Solutions'
			sections={[
				{
					title: 'Delivery & Installation',
					body: 'Delivery and installation timelines may vary depending on customer location and product availability.',
				},
				{
					title: 'Returns',
					body: 'Returns may only be accepted for eligible products in unused condition and within the approved return period.',
				},
				{
					title: 'Damaged Items',
					body: 'Customers should report damaged or incorrect items immediately upon delivery.',
				},
				{
					title: 'Non-Returnable Items',
					body: 'Used filters, installed systems, and customized services may not be eligible for return.',
				},
				{
					title: 'Support',
					body: 'For delivery, installation, or return-related concerns, customers can contact Aquzera support directly.',
				},
			]}
		/>
	);
}
