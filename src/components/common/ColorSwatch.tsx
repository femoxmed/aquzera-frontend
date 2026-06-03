import { cn } from '@/lib/utils';

type ColorSwatchProps = {
	value?: string | null;
	className?: string;
};

export default function ColorSwatch({ value, className }: ColorSwatchProps) {
	return (
		<span
			className={cn(
				'block shrink-0 rounded-full border border-black/50',
				className,
			)}
			style={{ backgroundColor: value || '#ffffff' }}
		/>
	);
}
