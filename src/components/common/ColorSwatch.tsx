import { cn } from '@/lib/utils';

type ColorSwatchProps = {
	value?: string | null;
	className?: string;
};

export default function ColorSwatch({ value, className }: ColorSwatchProps) {
	return (
		<svg
			viewBox='0 0 16 16'
			className={cn(
				'block shrink-0 rounded-full border border-black/50',
				className,
			)}
			aria-hidden='true'>
			<circle cx='8' cy='8' r='8' fill={value || '#ffffff'} />
		</svg>
	);
}
