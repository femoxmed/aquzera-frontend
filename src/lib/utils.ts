import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function formatCurrency(value: number | string | null | undefined) {
	const amount = Number(value ?? 0);
	return new Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
		currencyDisplay: 'narrowSymbol',
		minimumFractionDigits: 0,
		maximumFractionDigits: 4,
	}).format(Number.isFinite(amount) ? amount : 0);
}

export function formatStartingPrice(value: number | string | null | undefined) {
	return `Starting From ${formatCurrency(value)}`;
}
