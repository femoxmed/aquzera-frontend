'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { CircleHelp, Loader2 } from 'lucide-react';
import { resendVerification, verifyEmail } from '@/lib/auth';
import { useAuthStore } from '@/store/authStore';

export default function VerificationPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const [code, setCode] = useState(['', '', '', '', '', '']);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const setAuth = useAuthStore((state) => state.setAuth);
	const pendingVerificationEmail = useAuthStore(
		(state) => state.pendingVerificationEmail,
	);
	const setPendingVerificationEmail = useAuthStore(
		(state) => state.setPendingVerificationEmail,
	);
	const email = searchParams.get('email') || pendingVerificationEmail || '';
	const returnTo = searchParams.get('returnTo') || '/dashboard';
	const verificationCode = code.join('');

	useEffect(() => {
		if (!email) {
			router.replace('/auth/signup');
		}
	}, [email, router]);

	const handleCodeChange = (index: number, value: string) => {
		const digit = value.replace(/\D/g, '').slice(-1);
		const next = [...code];
		next[index] = digit;
		setCode(next);

		if (digit && index < inputRefs.current.length - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleVerify = async () => {
		if (!email) return;

		if (verificationCode.length !== 6) {
			toast.error('Enter the 6-digit verification code');
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await verifyEmail({ email, code: verificationCode });
			setAuth(response.user, response.accessToken, response.refreshToken);
			if (typeof setPendingVerificationEmail === 'function') {
				setPendingVerificationEmail(null);
			}
			toast.success('Account verified');
			router.push(returnTo);
			router.refresh();
		} catch (error: any) {
			console.error('Verify account failed', error);
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					'Unable to verify account',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResend = async () => {
		if (!email) return;

		setIsResending(true);
		try {
			await resendVerification(email);
			toast.success('Verification code sent');
		} catch (error: any) {
			console.error('Resend verification failed', error);
			toast.error(
				error?.response?.data?.message ||
					error?.message ||
					'Unable to resend verification code',
			);
		} finally {
			setIsResending(false);
		}
	};

	return (
		<section className='px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16'>
			<div className='mx-auto w-full max-w-[330px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[470px]'>
				<p className='font-montserrat text-[12px] text-[#a7ff18] sm:text-[13px]'>
					Step 2 of 2
				</p>

				<h1 className='mt-3 font-mona text-[32px] font-black leading-none tracking-[-0.05em] text-white sm:text-[38px] md:text-[44px]'>
					Verify Your Email
				</h1>

				<p className='mt-4 font-montserrat text-[12px] leading-[1.3] text-white/45 sm:text-[13px]'>
					Enter verification code sent to{' '}
					<span className='text-[#a7ff18] underline underline-offset-2'>
						{email || 'your email'}
					</span>
				</p>

				<div className='mt-8'>
					<label className='mb-4 block font-mona text-[11px] font-black uppercase tracking-[0.24em] text-white sm:text-[12px]'>
						Enter Code
					</label>

					<div className='grid grid-cols-6 gap-2 sm:gap-4'>
						{code.map((value, index) => (
							<input
								key={index}
								ref={(element) => {
									inputRefs.current[index] = element;
								}}
								value={value}
								inputMode='numeric'
								maxLength={1}
								onChange={(event) => handleCodeChange(index, event.target.value)}
								onKeyDown={(event) => {
									if (event.key === 'Backspace' && !code[index] && index > 0) {
										inputRefs.current[index - 1]?.focus();
									}
								}}
								className='h-[50px] w-full border border-white/35 bg-transparent text-center font-mona text-[18px] font-black text-white outline-none focus:border-white sm:h-[62px]'
							/>
						))}
					</div>
				</div>

				<div className='mt-6 flex items-center justify-between font-montserrat text-[12px] text-white/45 sm:text-[13px]'>
					<p>Verification code expires in 10 mins</p>
				</div>

				<button
					type='button'
					onClick={handleVerify}
					disabled={isSubmitting || verificationCode.length !== 6}
					className='mt-8 flex h-[50px] w-full items-center justify-center gap-3 bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[58px] sm:text-[13px]'>
					{isSubmitting ? <Loader2 className='h-4 w-4 animate-spin' /> : null}
					{isSubmitting ? 'Verifying...' : 'Verify Account'}
				</button>

				<p className='mt-9 font-montserrat text-[12px] text-white/45 sm:text-[13px]'>
					I did not receive any verification email
				</p>

				<div className='mt-6 flex flex-col gap-3 sm:flex-row'>
					<button
						type='button'
						onClick={handleResend}
						disabled={isResending}
						className='h-[48px] border border-white/70 px-5 font-mona text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60 sm:h-[52px] sm:text-[12px]'>
						{isResending ? 'Sending...' : 'Resend Email'}
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
