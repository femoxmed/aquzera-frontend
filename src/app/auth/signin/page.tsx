'use client';

import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'sonner';
import { Eye } from 'lucide-react';
import { signinSchema } from '@/lib/validators';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
	const pathname = useRouter();
	return (
		<section className='px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16'>
			<div className='mx-auto w-full max-w-[330px] sm:max-w-[360px] md:max-w-[390px] lg:max-w-[410px]'>
				<h1 className='font-mona text-[32px] font-black leading-none tracking-[-0.05em] text-white sm:text-[36px] md:text-[40px]'>
					Sign In
				</h1>

				<p className='mt-3 max-w-[360px] font-montserrat text-[12px] leading-[1.3] text-white/45 sm:text-[13px]'>
					Sign in to your already existing account; Manage all Devices all in
					one account
				</p>

				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={signinSchema}
					onSubmit={() => {
						toast.success('Signed in successfully');
						pathname.push('/dashboard');
					}}>
					<Form className='mt-7 space-y-5 sm:mt-8 sm:space-y-6'>
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
							<div className='mb-3 flex items-center justify-between'>
								<label className='block font-mona text-[10px] font-black uppercase tracking-[0.22em] text-white sm:text-[11px]'>
									Password ***
								</label>

								<Eye className='h-4 w-4 text-white/80' />
							</div>

							<Field
								name='password'
								type='password'
								className='h-[49px] w-full border border-white/35 bg-transparent px-4 font-montserrat text-[12px] text-white outline-none placeholder:text-white/35 focus:border-white sm:h-[54px] sm:px-5 sm:text-[13px]'
							/>

							<p className='mt-1 text-xs text-red-400'>
								<ErrorMessage name='password' />
							</p>

							<p className='mt-3 font-montserrat text-[11px] leading-[1.25] text-white/45 sm:text-[12px]'>
								I Forgot my password, recover{' '}
								<Link href='/auth/forgot-password' className='text-[#a7ff18]'>
									HERE
								</Link>
							</p>
						</div>

						<button
							type='submit'
							className='h-[48px] w-full bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 sm:h-[54px] sm:text-[13px]'>
							Sign Me In
						</button>

						<div className='pt-3 sm:pt-4'>
							<p className='font-montserrat text-[12px] text-white/45'>
								I don’t have an account yet
							</p>

							<Link
								href='/auth/signup'
								className='mt-5 flex h-[48px] w-full items-center justify-center border border-white/70 font-mona text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black sm:h-[54px] sm:text-[12px]'>
								Create My Account
							</Link>
						</div>
					</Form>
				</Formik>
			</div>
		</section>
	);
}
