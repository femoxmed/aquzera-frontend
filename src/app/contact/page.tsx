'use client';

import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CircleHelp } from 'lucide-react';
import { toast } from 'sonner';
import * as Yup from 'yup';
import { useAuthStore } from '@/store/authStore';
import { sendContactMessage } from '@/lib/contact';

const contactSchema = Yup.object({
	fullName: Yup.string().required('Full name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	phone: Yup.string().required('Mobile number is required'),
	message: Yup.string()
		.min(10, 'Minimum 10 characters')
		.required('Message is required'),
});

function SupportTicketLink({
	className,
	children,
}: {
	className: string;
	children: React.ReactNode;
}) {
	const user = useAuthStore((state) => state.user);
	const href = user
		? '/dashboard/tickets'
		: '/auth/signin?returnTo=/dashboard/tickets';

	return (
		<Link href={href} className={className}>
			{children}
		</Link>
	);
}

function ContactInfoGrid() {
	const contactItems = [
		{
			title: 'Email Us',
			content: (
				<p>
					Write to us at{' '}
					<a
						href='mailto:aquzerawatersolutions@gmail.com'
						className='font-semibold text-[#0b43ff] underline underline-offset-2'>
						aquzerawatersolutions@gmail.com
					</a>
				</p>
			),
		},
		{
			title: 'Visit Us At',
			content: <p>Block 1, flat 5 Dankama close area 2, garki Abuja</p>,
		},
		{
			title: 'Service & Warranty',
			content: (
				<p>
					For Service and Warranty purposes, open a ticket{' '}
					<SupportTicketLink className='font-semibold text-[#0b43ff] underline underline-offset-2'>
						Here
					</SupportTicketLink>
				</p>
			),
		},
		{
			title: 'Hot Line',
			content: (
				<a
					href='tel:+2349062024004'
					className='font-semibold text-[#0b43ff] underline underline-offset-2'>
					(+234) 9062024004
				</a>
			),
		},
		{
			title: 'Instagram',
			content: (
				<a
					href='https://instagram.com/aquzeranigeria'
					target='_blank'
					rel='noreferrer'
					className='font-semibold text-[#0b43ff]'>
					@aquzeranigeria
				</a>
			),
		},
		{
			title: 'Submit A Ticket',
			content: (
				<SupportTicketLink className='inline-flex h-[54px] items-center gap-3 rounded-[4px] border border-[#2f3338] px-6 font-mona text-[14px] font-black uppercase tracking-[0.22em] text-[#2f3338] transition hover:bg-[#2f3338] hover:text-white'>
					<CircleHelp className='h-5 w-5' strokeWidth={1.8} />
					Get Help
				</SupportTicketLink>
			),
		},
	];

	return (
		<div className='mt-16 grid gap-x-24 gap-y-12 md:grid-cols-2'>
			{contactItems.map((item) => (
				<div key={item.title}>
					<h2 className='font-mona text-[20px] font-black uppercase tracking-[0.24em] text-[#2f3338]'>
						{item.title}
					</h2>
					<div className='mt-6 max-w-[360px] font-montserrat text-[16px] leading-snug text-[#3f4349]'>
						{item.content}
					</div>
				</div>
			))}
		</div>
	);
}

export default function ContactPage() {
	return (
		<div className='bg-white pt-[100px]'>
			<section className='px-6 py-20 sm:px-10 md:py-28'>
				<div className='mx-auto max-w-[990px]'>
					<div className='flex flex-col gap-8 md:flex-row md:items-start md:justify-between'>
						<h1 className='font-mona-wide text-[48px] font-black leading-none tracking-[-0.05em] text-black sm:text-[62px]'>
							Contact us
						</h1>
						<a
							href='https://wa.me/2349062024004'
							target='_blank'
							rel='noreferrer'
							className='inline-flex h-[50px] items-center justify-center rounded-[4px] border border-[#2f3338] px-7 font-mona text-[13px] font-black uppercase tracking-[0.22em] text-[#2f3338] transition hover:bg-[#2f3338] hover:text-white'>
							Chat On WhatsApp
						</a>
					</div>

					<ContactInfoGrid />
				</div>
			</section>

			<section className='bg-[linear-gradient(145deg,#1738e6_0%,#263f9d_100%)] px-6 py-20 text-white sm:px-10 md:py-28'>
				<div className='mx-auto max-w-[990px]'>
					<h2 className='font-mona-wide text-[42px] font-black tracking-[-0.04em] sm:text-[56px]'>
						Write to us
					</h2>
					<p className='mt-6 font-montserrat text-[24px] text-white/85 sm:text-[30px]'>
						We would love to hear from you
					</p>

					<Formik
						initialValues={{
							fullName: '',
							email: '',
							phone: '',
							message: '',
						}}
						validationSchema={contactSchema}
						onSubmit={async (values, helpers) => {
							try {
								const response = await sendContactMessage({
									...values,
									source: 'Contact page',
								});
								toast.success(response.message || 'Message sent successfully');
								helpers.resetForm();
							} catch (error: any) {
								toast.error(
									error?.response?.data?.message ||
										error?.message ||
										'Unable to send message',
								);
							} finally {
								helpers.setSubmitting(false);
							}
						}}>
						{({ isSubmitting }) => (
							<Form className='mt-20 space-y-12'>
								<div>
									<label className='mb-5 block font-mona text-[14px] font-black uppercase tracking-[0.24em] text-white'>
										Full Name
									</label>
									<Field
										name='fullName'
										placeholder='Write your Full name'
										className='h-[76px] w-full rounded-[4px] border border-white/80 bg-transparent px-8 font-montserrat text-[15px] text-white outline-none placeholder:text-white/75 focus:border-white'
									/>
									<p className='mt-2 text-sm text-white'>
										<ErrorMessage name='fullName' />
									</p>
								</div>

								<div className='grid gap-10 md:grid-cols-2'>
									<div>
										<label className='mb-5 block font-mona text-[14px] font-black uppercase tracking-[0.24em] text-white'>
											Email Address
										</label>
										<Field
											name='email'
											placeholder='example@domain.com'
											className='h-[76px] w-full rounded-[4px] border border-white/80 bg-transparent px-8 font-montserrat text-[15px] text-white outline-none placeholder:text-white/75 focus:border-white'
										/>
										<p className='mt-2 text-sm text-white'>
											<ErrorMessage name='email' />
										</p>
									</div>

									<div>
										<label className='mb-5 block font-mona text-[14px] font-black uppercase tracking-[0.24em] text-white'>
											Mobile Number
										</label>
										<Field
											name='phone'
											placeholder='+234'
											className='h-[76px] w-full rounded-[4px] border border-white/80 bg-transparent px-8 font-montserrat text-[15px] text-white outline-none placeholder:text-white/75 focus:border-white'
										/>
										<p className='mt-2 text-sm text-white'>
											<ErrorMessage name='phone' />
										</p>
									</div>
								</div>

								<div>
									<label className='mb-5 block font-mona text-[14px] font-black uppercase tracking-[0.24em] text-white'>
										Your Message
									</label>
									<Field
										as='textarea'
										name='message'
										placeholder='Tell Us Anything'
										className='min-h-[250px] w-full resize-none rounded-[4px] border border-white/80 bg-transparent px-8 py-8 font-montserrat text-[15px] text-white outline-none placeholder:text-white/75 focus:border-white'
									/>
									<p className='mt-2 text-sm text-white'>
										<ErrorMessage name='message' />
									</p>
								</div>

								<div className='flex justify-end'>
									<button
										type='submit'
										disabled={isSubmitting}
										className='inline-flex h-[74px] min-w-[210px] items-center justify-center rounded-[4px] border border-white/85 px-8 font-mona text-[14px] font-black uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-[#1738e6]'>
										{isSubmitting ? 'Sending...' : 'Send Message'}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</section>
		</div>
	);
}
