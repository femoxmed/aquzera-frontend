'use client';

import { toast } from 'sonner';
import { EyeOff } from 'lucide-react';

export default function ResetPasswordPage() {
	return (
		<section className='px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:py-16'>
			<div className='mx-auto w-full max-w-[330px] sm:max-w-[360px] md:max-w-[390px] lg:max-w-[410px]'>
				<h1 className='font-mona text-[32px] font-black leading-none tracking-[-0.05em] text-white sm:text-[36px] md:text-[40px]'>
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
							className='h-[49px] w-full border border-white/35 bg-transparent px-4 font-montserrat text-[12px] text-white outline-none placeholder:text-white/35 focus:border-white sm:h-[54px] sm:px-5 sm:text-[13px]'
						/>
					</div>

					<button
						onClick={() => toast.success('Password reset successfully')}
						className='h-[48px] w-full bg-[#1738e6] font-mona text-[12px] font-black uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-90 sm:h-[54px] sm:text-[13px]'>
						Save New Password
					</button>
				</div>
			</div>
		</section>
	);
}
