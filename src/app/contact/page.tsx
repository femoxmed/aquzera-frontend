'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { contactSchema } from '@/lib/validators';

export default function ContactPage() {
	return (
		<main className='pt-20 flex min-h-screen flex-col bg-[linear-gradient(180deg,#000_0%,#050607_55%,#24272d_130%)] text-white'>
			<section className='flex-1 px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16'>
				<div className='mx-auto grid w-full max-w-[1100px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20'>
					{/* Left */}
					<div>
						<p className='font-montserrat text-[12px] text-[#a7ff18] sm:text-[13px]'>
							We’re here to help
						</p>

						<h1 className='mt-3 font-mona-wide text-[34px] font-bold leading-none tracking-[-0.05em] text-white sm:text-[40px] md:text-[48px]'>
							Contact Us
						</h1>

						<p className='mt-4 max-w-[420px] font-montserrat text-[13px] leading-[1.45] text-white/45 sm:text-[14px]'>
							Send us a message and our team will respond as soon as possible.
						</p>

						<div className='mt-10 space-y-6'>
							<div className='flex items-center gap-4'>
								<Mail className='h-5 w-5 text-white/70' />
								<p className='font-montserrat text-[13px] text-white/55'>
									support@aquzera.com
								</p>
							</div>

							<div className='flex items-center gap-4'>
								<Phone className='h-5 w-5 text-white/70' />
								<p className='font-montserrat text-[13px] text-white/55'>
									+234 000 000 0000
								</p>
							</div>

							<div className='flex items-center gap-4'>
								<MapPin className='h-5 w-5 text-white/70' />
								<p className='font-montserrat text-[13px] text-white/55'>
									Lagos, Nigeria
								</p>
							</div>
						</div>
					</div>

					{/* Form */}
					<Formik
						initialValues={{ name: '', email: '', message: '' }}
						validationSchema={contactSchema}
						onSubmit={() => {
							toast.success('Message sent successfully');
						}}>
						<Form className='space-y-5'>
							<div>
								<label className='mb-3 block font-mona text-[10px] font-black uppercase tracking-[0.22em] text-white sm:text-[11px]'>
									Full Name
								</label>

								<Field
									name='name'
									placeholder='Enter your name'
									className='h-[49px] w-full border border-white/35 bg-transparent px-4 font-montserrat text-[12px] text-white outline-none placeholder:text-white/35 focus:border-white sm:h-[54px] sm:px-5 sm:text-[13px]'
								/>

								<p className='mt-1 text-xs text-red-400'>
									<ErrorMessage name='name' />
								</p>
							</div>

							<div>
								<label className='mb-3 block font-mona text-[10px] font-black uppercase tracking-[0.22em] text-white sm:text-[11px]'>
									Email Address
								</label>

								<Field
									name='email'
									placeholder='example@domain.com'
									className='h-[49px] w-full border border-white/35 bg-transparent px-4 font-montserrat text-[12px] text-white outline-none placeholder:text-white/35 focus:border-white sm:h-[54px] sm:px-5 sm:text-[13px]'
								/>

								<p className='mt-1 text-xs text-red-400'>
									<ErrorMessage name='email' />
								</p>
							</div>

							<div>
								<label className='mb-3 block font-mona text-[10px] font-black uppercase tracking-[0.22em] text-white sm:text-[11px]'>
									Message
								</label>

								<Field
									as='textarea'
									name='message'
									placeholder='Write your message...'
									className='min-h-[150px] w-full resize-none border border-white/35 bg-transparent px-4 py-4 font-montserrat text-[12px] text-white outline-none placeholder:text-white/35 focus:border-white sm:min-h-[170px] sm:px-5 sm:text-[13px]'
								/>

								<p className='mt-1 text-xs text-red-400'>
									<ErrorMessage name='message' />
								</p>
							</div>

							<button
								type='submit'
								className='flex h-[48px] w-full items-center justify-center gap-3 bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 sm:h-[54px] sm:text-[13px]'>
								Send Message
								<Send className='h-4 w-4' />
							</button>
						</Form>
					</Formik>
				</div>
			</section>
		</main>
	);
}
