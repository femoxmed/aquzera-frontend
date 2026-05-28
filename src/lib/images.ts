export function shouldBypassImageOptimizer(src?: string | null) {
	if (!src) return false;

	return src.startsWith('http://') || src.startsWith('https://');
}
