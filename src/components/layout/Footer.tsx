import Link from 'next/link';
import Image from 'next/image';
import { HelpCircle } from 'lucide-react';

export default function Footer() {
	return (
		<footer>
			{/* Footer background image with content overlaid */}
			<div className='relative h-52 md:h-74 overflow-hidden'>
				<Image
					src='/images/footer_bg.png'
					alt='Footer background'
					fill
					className='object-cover'
				/>
				<div className='absolute inset-0 backdrop-blur-sm bg-black/30' />

				{/* Footer bar overlaid on the image */}
				<div className='absolute bottom-0 left-0 right-0 bg-black/70 py-10'>
					<div className='container flex flex-wrap items-center justify-between gap-4'>
						{/* Brand */}
						<Link
							href='/'
							className='text-[11px] font-bold tracking-widest text-white underline underline-offset-2'>
							AQUZERA © 2026
						</Link>

						{/* Links */}
						<div className='flex items-center gap-6'>
							<Link
								href='/privacy'
								className='text-[10px] font-medium tracking-[0.12em] text-white/70 hover:text-white transition-colors'>
								PRIVACY POLICY
							</Link>
							<Link
								href='/warranty'
								className='text-[10px] font-medium tracking-[0.12em] text-white/70 hover:text-white transition-colors'>
								WARRANTY
							</Link>
							<Link
								href='/terms'
								className='text-[10px] font-medium tracking-[0.12em] text-white/70 hover:text-white transition-colors'>
								TERMS & CONDITIONS
							</Link>
						</div>

						{/* Get Help */}
						<button className='flex items-center gap-2 rounded-full border border-white/40 px-4 py-1.5 text-[10px] font-medium tracking-widest text-white hover:bg-white/10 transition-colors'>
							<HelpCircle className='h-3.5 w-3.5' />
							GET HELP
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
