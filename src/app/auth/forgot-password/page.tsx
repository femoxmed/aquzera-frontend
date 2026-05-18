'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { CircleHelp, Loader2, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
	const router = useRouter();

	const [showOtp, setShowOtp] = useState(false);
	const [otp, setOtp] = useState(['', '', '', '', '', '']);

	// ───────────────── OTP SCREEN ─────────────────
	if (showOtp) {
		return (
			<section className='px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16'>
				<div className='mx-auto w-full max-w-[330px] sm:max-w-[390px] md:max-w-[430px] lg:max-w-[470px]'>
					<h1 className='font-mona text-[32px] font-black leading-none tracking-[-0.05em] text-white sm:text-[38px] md:text-[44px]'>
						OTP Verification
					</h1>

					<p className='mt-4 font-montserrat text-[12px] leading-[1.3] text-white/45 sm:text-[13px]'>
						Enter the 6 digit OTP Code that was sent to{' '}
						<span className='text-[#a7ff18] underline underline-offset-2'>
							ajasa@gmail.com
						</span>
					</p>

					<div className='mt-8'>
						<label className='mb-4 block font-mona text-[11px] font-black uppercase tracking-[0.24em] text-white sm:text-[12px]'>
							Enter Code
						</label>

						<div className='grid grid-cols-6 gap-2 sm:gap-4'>
							{otp.map((value, index) => (
								<input
									key={index}
									value={value}
									maxLength={1}
									onChange={(e) => {
										const next = [...otp];
										next[index] = e.target.value.slice(-1);
										setOtp(next);
									}}
									className='h-[50px] w-full border border-white/35 bg-transparent text-center font-mona text-[18px] font-black text-white outline-none focus:border-white sm:h-[62px]'
								/>
							))}
						</div>
					</div>

					<div className='mt-6 flex items-center justify-between font-montserrat text-[12px] text-white/45 sm:text-[13px]'>
						<p>
							<span className='text-[#a7ff18]'>OTP</span> code Expires in about
							6 mins
						</p>

						<p className='text-[#a7ff18]'>6:53</p>
					</div>

					<button
						onClick={() => {
							toast.success('OTP verified');
							router.push('/auth/reset-password');
						}}
						className='mt-8 flex h-[50px] w-full items-center justify-center gap-3 bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 sm:h-[58px] sm:text-[13px]'>
						<Loader2 className='h-4 w-4 animate-spin' />
						Awaiting Verification..
					</button>

					<p className='mt-9 font-montserrat text-[12px] text-white/45 sm:text-[13px]'>
						I did not receive any OTP code in my Mail box
					</p>

					<div className='mt-6 flex flex-col gap-3 sm:flex-row'>
						<button className='h-[48px] border border-white/70 px-5 font-mona text-[11px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black sm:h-[52px] sm:text-[12px]'>
							Resend OTP
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
							className='h-[49px] w-full border border-white/35 bg-transparent px-4 pr-14 font-montserrat text-[12px] text-white outline-none placeholder:text-white/35 focus:border-white sm:h-[54px] sm:px-5 sm:pr-16 sm:text-[13px]'
						/>

						<div className='absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#1fa7ff] text-white'>
							<UserCircle className='h-5 w-5' />
						</div>
					</div>

					<p className='mt-4 font-montserrat text-[11px] leading-[1.25] text-white/45 sm:text-[12px]'>
						Enter your email address, we would send a 6 digit{' '}
						<span className='text-[#a7ff18]'>OTP</span> code
					</p>
				</div>

				<button
					onClick={() => {
						toast.success('OTP sent successfully');
						setShowOtp(true);
					}}
					className='mt-8 h-[48px] w-full bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 sm:h-[54px] sm:text-[13px]'>
					Recover Password
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
