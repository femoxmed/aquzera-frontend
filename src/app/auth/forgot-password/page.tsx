'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { CircleHelp, Loader2, MailCheck, UserCircle } from 'lucide-react';
import { forgotPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	const [emailSent, setEmailSent] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSendResetEmail() {
		if (!email.trim()) {
			toast.error('Please enter your email address');
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await forgotPassword(email.trim());
			toast.success(response.message || 'Password reset email sent');
			setEmailSent(true);
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: 'Unable to send password reset email',
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	// ───────────────── EMAIL SENT SCREEN ─────────────────
	if (emailSent) {
		return (
			<section className='px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16'>
				<div className='mx-auto w-full max-w-[330px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[470px]'>
					<h1 className='font-mona text-[32px] font-black leading-none tracking-[-0.05em] text-white sm:text-[38px] md:text-[44px]'>
						Check Your Email
					</h1>

					<p className='mt-4 font-montserrat text-[12px] leading-[1.3] text-white/45 sm:text-[13px]'>
						We sent a password reset link to{' '}
						<span className='text-[#a7ff18] underline underline-offset-2'>
							{email}
						</span>
					</p>

					<div className='mt-8 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#1738e6] text-white'>
						<MailCheck className='h-10 w-10' />
					</div>

					<p className='mt-9 font-montserrat text-[12px] text-white/45 sm:text-[13px]'>
						I did not receive any reset link in my mail box
					</p>

					<div className='mt-6 flex flex-col gap-3 sm:flex-row'>
						<button
							type='button'
							disabled={isSubmitting}
							onClick={handleSendResetEmail}
							className='flex h-[48px] items-center justify-center gap-3 border border-white/70 px-5 font-mona text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60 sm:h-[52px] sm:text-[12px]'>
							{isSubmitting && <Loader2 className='h-4 w-4 animate-spin' />}
							Resend Link
						</button>

						<Link
							href='/contact'
							className='flex h-[48px] items-center justify-center gap-3 border border-white/70 px-5 font-mona text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black sm:h-[52px] sm:text-[12px]'>
							<CircleHelp className='h-4 w-4' />
							Get Help
						</Link>
					</div>
				</div>
			</section>
		);
	}

	// ───────────────── RECOVERY SCREEN ─────────────────
	return (
		<section className='px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16'>
			<div className='mx-auto w-full max-w-[330px] sm:max-w-[360px] md:max-w-[390px] lg:max-w-[410px]'>
				<h1 className='font-mona-wide text-[32px] font-bold leading-none tracking-[-0.05em] text-white sm:text-[36px] md:text-[40px]'>
					Password Recovery
				</h1>

				<p className='mt-3 font-montserrat text-[12px] leading-[1.3] text-white/45 sm:text-[13px]'>
					Let’s help you recover your lost account
				</p>

				<div className='mt-8'>
					<label className='mb-3 block font-mona text-[10px] font-black uppercase tracking-[0.22em] text-white sm:text-[11px]'>
						Email Address
					</label>

					<div className='relative'>
						<input
						type='email'
						placeholder='example@domain.com'
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className='h-[49px] w-full border border-white/35 bg-transparent px-4 pr-14 font-montserrat text-[12px] text-white outline-none placeholder:text-white/35 focus:border-white sm:h-[54px] sm:px-5 sm:pr-16 sm:text-[13px]'
					/>

						<div className='absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#1fa7ff] text-white'>
							<UserCircle className='h-5 w-5' />
						</div>
					</div>

					<p className='mt-4 font-montserrat text-[11px] leading-[1.25] text-white/45 sm:text-[12px]'>
						Enter your email address, we would send a secure{' '}
						<span className='text-[#a7ff18]'>reset link</span>
					</p>
				</div>

				<button
					type='button'
					disabled={isSubmitting}
					onClick={handleSendResetEmail}
					className='mt-8 flex h-[48px] w-full items-center justify-center gap-3 bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[54px] sm:text-[13px]'>
					{isSubmitting && <Loader2 className='h-4 w-4 animate-spin' />}
					{isSubmitting ? 'Sending...' : 'Recover Password'}
				</button>

				<div className='pt-8 sm:pt-10'>
					<p className='font-montserrat text-[12px] text-white/45'>
						I already have an account
					</p>

					<Link
						href='/auth/signin'
						className='mt-5 flex h-[48px] w-full items-center justify-center border border-white/70 font-mona text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black sm:h-[54px] sm:text-[12px]'>
						Sign In
					</Link>
				</div>
			</div>
		</section>
	);
}
