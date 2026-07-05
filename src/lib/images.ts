import { resolveMediaUrl } from '@/lib/media-url';

export function shouldBypassImageOptimizer(src?: string | null) {
	if (!src) return false;

	return src.startsWith('http://') || src.startsWith('https://');
}

export function imageUrl(src?: string | null) {
	return resolveMediaUrl(src) || '/images/product_placeholder.png';
}
