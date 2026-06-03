interface AnnouncementBarProps {
	text?: string;
}

export default function AnnouncementBar({
	text = 'STARTING FROM ₦200,000',
}: AnnouncementBarProps) {
	return (
		<div className='bg-gray-100 border-b border-gray-200 py-2 text-center'>
			<p className='text-[10px] font-semibold tracking-[0.2em] text-gray-600 uppercase'>
				{text}
			</p>
		</div>
	);
}
