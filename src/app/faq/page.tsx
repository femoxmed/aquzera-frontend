'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { getPublicFaqs, type Faq } from '@/features/faqs/api';

type FaqTopic = Pick<Faq, 'id' | 'question' | 'answer'>;

const fallbackTopics: FaqTopic[] = [
	{
		id: 'warranty',
		question: 'How many months warranty do I get with Aquzera?',
		answer:
			'Aquzera provides water purification systems, installation, maintenance, and related support services. Warranty terms may vary by product and installation package.',
	},
	{
		id: 'installation',
		question: 'How do I request installation support?',
		answer:
			'Sign in to your dashboard and open a support ticket. Our team will review your request and follow up with next steps.',
	},
	{
		id: 'damaged-item',
		question: 'Can I report a damaged or incorrect item?',
		answer:
			'Yes. Report damaged or incorrect items as soon as they are delivered so the support team can review and resolve the issue.',
	},
	{
		id: 'filter-changes',
		question: 'How do filter changes work?',
		answer:
			'Filter change timing depends on your product and usage. Your dashboard can help you track service requests and maintenance support.',
	},
];

function useSupportTicketHref() {
	const user = useAuthStore((state) => state.user);
	return user ? '/dashboard/tickets' : '/auth/signin?returnTo=/dashboard/tickets';
}

export default function FAQPage() {
	const [openIndex, setOpenIndex] = useState(0);
	const [topics, setTopics] = useState<FaqTopic[]>(fallbackTopics);
	const supportHref = useSupportTicketHref();

	useEffect(() => {
		getPublicFaqs()
			.then((items) => {
				if (items.length) setTopics(items);
			})
			.catch(() => undefined);
	}, []);

	return (
		<div className='bg-white pt-[100px]'>
			<section className='px-6 py-20 sm:px-10 md:py-24'>
				<div className='mx-auto max-w-[940px]'>
					<div className='flex flex-col gap-8 md:flex-row md:items-start md:justify-between'>
						<h1 className='font-mona-wide text-[46px] font-black leading-none tracking-[-0.05em] text-black sm:text-[58px]'>
							Help centre
						</h1>
						<a
							href='https://wa.me/2349032664160'
							target='_blank'
							rel='noreferrer'
							className='inline-flex h-[48px] items-center justify-center rounded-[4px] border border-[#2f3338] px-7 font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#2f3338] transition hover:bg-[#2f3338] hover:text-white'>
							Chat On Whatsapp
						</a>
					</div>

					<h2 className='mt-16 font-montserrat text-[27px] font-medium tracking-[-0.02em] text-[#2f3338] sm:text-[34px]'>
						Knowledge Base topics
					</h2>

					<div className='mt-12 border-t border-[#d7d7d7]'>
						{topics.map((topic, index) => {
							const isOpen = openIndex === index;
							return (
								<div key={topic.id} className='border-b border-[#d7d7d7] py-8'>
									<button
										type='button'
										onClick={() => setOpenIndex(isOpen ? -1 : index)}
										className='flex w-full items-center justify-between gap-6 text-left'>
										<span className='font-mona-wide text-[20px] font-black leading-tight tracking-[-0.03em] text-[#1738e6] sm:text-[25px]'>
											{topic.question}
										</span>
										<span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2f3338] text-[#2f3338]'>
											{isOpen ? (
												<X className='h-5 w-5' strokeWidth={1.5} />
											) : (
												<Plus className='h-5 w-5' strokeWidth={1.5} />
											)}
										</span>
									</button>
									{isOpen ? (
										<p className='mt-7 max-w-[640px] font-montserrat text-[14px] leading-snug text-[#3f4349]'>
											{topic.answer}
										</p>
									) : null}
								</div>
							);
						})}
					</div>

					<div className='mt-20'>
						<h2 className='font-mona-wide text-[36px] font-black leading-tight tracking-[-0.05em] text-black sm:text-[50px]'>
							Still need more help ?
						</h2>
						<p className='mt-6 max-w-[470px] font-montserrat text-[14px] leading-snug text-[#3f4349]'>
							Still need more help to find a solution to purchases and after sales
							services and warranty, contact us or file a support ticket.
						</p>
						<div className='mt-10 flex flex-wrap gap-4'>
							<Link
								href='/contact'
								className='inline-flex h-[58px] min-w-[150px] items-center justify-center rounded-[4px] border border-[#2f3338] px-7 font-mona text-[12px] font-black uppercase tracking-[0.22em] text-[#2f3338] transition hover:bg-[#2f3338] hover:text-white'>
								Contact Us
							</Link>
							<Link
								href={supportHref}
								className='inline-flex h-[58px] min-w-[190px] items-center justify-center rounded-[4px] bg-[#1738e6] px-7 font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition hover:opacity-90'>
								Open Support Ticket
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
