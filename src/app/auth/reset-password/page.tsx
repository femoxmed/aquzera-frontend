'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { EyeOff, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/auth';

export default function ResetPasswordPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token') || '';
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleResetPassword() {
		if (!token) {
			toast.error('Reset link is missing or invalid');
			return;
		}

		if (password.length < 6) {
			toast.error('Password must be at least 6 characters');
			return;
		}

		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await resetPassword({ token, password });
			toast.success(response.message || 'Password reset successfully');
			router.push('/auth/signin');
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Unable to reset password',
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section className='px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16'>
			<div className='mx-auto w-full max-w-[330px] sm:max-w-[360px] md:max-w-[390px] lg:max-w-[410px]'>
				<h1 className='font-mona-wide text-[32px] font-bold leading-none tracking-[-0.05em] text-white sm:text-[36px] md:text-[40px]'>
					Setup password
				</h1>

				<p className='mt-3 font-montserrat text-[12px] leading-[1.3] text-white/45 sm:text-[13px]'>
					Setup a new Password
				</p>

				<div className='mt-8 space-y-7'>
					<div>
						<div className='mb-3 flex items-center justify-between'>
							<label className='block font-mona text-[10px] font-black uppercase tracking-[0.22em] text-white sm:text-[11px]'>
								Enter Password
							</label>

							<EyeOff className='h-4 w-4 text-white/80' />
						</div>

						<input
							type='password'
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className='h-[49px] w-full border border-white/35 bg-transparent px-4 font-montserrat text-[12px] text-white outline-none placeholder:text-white/35 focus:border-white sm:h-[54px] sm:px-5 sm:text-[13px]'
						/>

						<p className='mt-3 font-montserrat text-[11px] leading-[1.25] text-white/45 sm:text-[12px]'>
							You can use character set such as{' '}
							<span className='text-[#a7ff18]'>#$%@*&amp;^290</span> Would be
							more secured
						</p>
					</div>

					<div>
						<div className='mb-3 flex items-center justify-between'>
							<label className='block font-mona text-[10px] font-black uppercase tracking-[0.22em] text-white sm:text-[11px]'>
								Confirm Password
							</label>

							<EyeOff className='h-4 w-4 text-white/80' />
						</div>

						<input
							type='password'
							value={confirmPassword}
							onChange={(event) => setConfirmPassword(event.target.value)}
							className='h-[49px] w-full border border-white/35 bg-transparent px-4 font-montserrat text-[12px] text-white outline-none placeholder:text-white/35 focus:border-white sm:h-[54px] sm:px-5 sm:text-[13px]'
						/>
					</div>

					<button
						type='button'
						disabled={isSubmitting}
						onClick={handleResetPassword}
						className='flex h-[48px] w-full items-center justify-center gap-3 bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[54px] sm:text-[13px]'>
						{isSubmitting && <Loader2 className='h-4 w-4 animate-spin' />}
						{isSubmitting ? 'Saving...' : 'Save New Password'}
					</button>
				</div>
			</div>
		</section>
	);
}
