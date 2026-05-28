'use client';

import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'sonner';
import { Eye } from 'lucide-react';
import { signupSchema } from '@/lib/validators';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/auth';
import { useAuthStore } from '@/store/authStore';

export default function SignUpPage() {
	const router = useRouter();
	const setPendingVerificationEmail = useAuthStore(
		(state) => state.setPendingVerificationEmail,
	);

	return (
		<section className='px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16'>
			<div className='mx-auto w-full max-w-[330px] sm:max-w-[360px] md:max-w-[390px] lg:max-w-[410px]'>
				<p className='font-montserrat text-[12px] text-[#a7ff18] sm:text-[13px]'>
					Step 1 of 2
				</p>

				<h1 className='mt-3 font-mona-wide text-[32px] font-bold leading-none tracking-[-0.05em] text-white sm:text-[36px] md:text-[40px]'>
					Create Account
				</h1>

				<p className='mt-3 font-montserrat text-[12px] leading-[1.3] text-white/45 sm:text-[13px]'>
					Let’s create a free account. It’s quick and easy
				</p>

				<Formik
					initialValues={{ name: '', email: '', password: '' }}
					validationSchema={signupSchema}
					onSubmit={async (values, { setSubmitting }) => {
						let verificationEmail = '';

						try {
							const response = await register({
								fullName: values.name,
								email: values.email,
								password: values.password,
							});

							verificationEmail = response.user?.email || values.email;
						} catch (error: any) {
							toast.error(
								error?.response?.data?.message || 'Unable to create account',
							);
							setSubmitting(false);
							return;
						}

						try {
							setPendingVerificationEmail(verificationEmail);
							toast.success('Account created. Check your email for the code.');
							router.push(
								`/auth/verification?email=${encodeURIComponent(
									verificationEmail,
								)}`,
							);
						} catch (error) {
							console.error('Unable to continue to verification', error);
							router.push(
								`/auth/verification?email=${encodeURIComponent(
									verificationEmail,
								)}`,
							);
						} finally {
							setSubmitting(false);
						}
					}}>
					{({ isSubmitting }) => (
						<Form className='mt-7 space-y-5 sm:mt-8 sm:space-y-6'>
						<div>
							<label className='mb-3 block font-mona text-[10px] font-black uppercase tracking-[0.22em] text-white sm:text-[11px]'>
								Enter Your Full Name
							</label>

							<Field
								name='name'
								placeholder='e.g Yusuf Bello'
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
								You can use character set such as{' '}
								<span className='text-[#a7ff18]'>#$%@*&amp;^290</span> Would be
								more secured
							</p>
						</div>

						<button
							type='submit'
							disabled={isSubmitting}
							className='h-[48px] w-full bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[54px] sm:text-[13px]'>
							{isSubmitting ? 'Creating...' : 'Create Account'}
						</button>

						<p className='font-montserrat text-[12px] text-white/45'>
							I already have an account
						</p>

						<Link
							href='/auth/signin'
							className='flex h-[48px] w-full items-center justify-center border border-white/70 font-mona text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black sm:h-[54px] sm:text-[12px]'>
							Go To Sign In
						</Link>
						</Form>
					)}
				</Formik>
			</div>
		</section>
	);
}
