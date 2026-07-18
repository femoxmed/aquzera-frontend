import { formatCurrency } from '@/lib/utils';

type ProductPriceDisplayProps = {
	price: number;
	regularPrice?: number | null;
	saleLabel?: string | null;
	prefix?: string;
	className?: string;
	regularClassName?: string;
	currentClassName?: string;
	labelClassName?: string;
};

export default function ProductPriceDisplay({
	price,
	regularPrice,
	saleLabel,
	prefix = 'Starting From',
	className = '',
	regularClassName = '',
	currentClassName = '',
	labelClassName = '',
}: ProductPriceDisplayProps) {
	const hasSale = Boolean(regularPrice && regularPrice > price);
	const currentLabel = prefix
		? `${prefix} ${formatCurrency(price)}`
		: formatCurrency(price);

	if (!hasSale) {
		return <span className={currentClassName}>{currentLabel}</span>;
	}

	return (
		<span className={`inline-flex flex-col items-center gap-1 ${className}`}>
			{saleLabel ? (
				<span
					className={`text-[0.62em] uppercase tracking-[0.18em] ${labelClassName}`}>
					{saleLabel}
				</span>
			) : null}
			<span
				className={`text-[0.72em] opacity-60 line-through ${regularClassName}`}>
				{prefix
					? `${prefix} ${formatCurrency(regularPrice)}`
					: formatCurrency(regularPrice)}
			</span>
			<span className={currentClassName}>{currentLabel}</span>
		</span>
	);
}
