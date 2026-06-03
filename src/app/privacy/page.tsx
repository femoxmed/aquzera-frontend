import LegalPage from '@/components/common/LegalPage';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
	return (
		<LegalPage
			title='Privacy Policy'
			date='18th May, 2026'
			introTitle='Privacy Policy — Aquzera Water Solutions'
			intro='Aquzera Water Solutions values your privacy and is committed to protecting your personal information.'
			sections={[
				{
					title: 'Information We Collect',
					body: 'We may collect:',
					items: [
						'Name',
						'Phone number',
						'Email address',
						'Delivery or installation address',
						'Payment and transaction details',
						'Messages or inquiries submitted through our website',
					],
				},
				{
					title: 'How We Use Your Information',
					body: 'Your information may be used to:',
					items: [
						'Process orders and bookings',
						'Provide installation and support services',
						'Respond to inquiries',
						'Improve our services and customer experience',
						'Send important service updates when necessary',
					],
				},
				{
					title: 'Data Protection',
					body: 'We take reasonable steps to protect your information and prevent unauthorized access, misuse, or disclosure.',
				},
				{
					title: 'Third-Party Services',
					body: 'Some services, including payment processing, may be handled through trusted third-party providers.',
				},
				{
					title: 'Consent',
					body: 'By using our website and services, you agree to the collection and use of information in accordance with this policy.',
				},
			]}
		/>
	);
}
