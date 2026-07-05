const DEFAULT_API_BASE_URL = 'https://aquzera-api.eu-west-2.elasticbeanstalk.com/api';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL;
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

export function resolveMediaUrl(value?: string | null) {
	if (!value) return value;

	if (value.startsWith('/images/') || value.startsWith('data:') || value.startsWith('blob:')) {
		return value;
	}

	if (value.startsWith('/uploads/')) {
		return `${API_ORIGIN}${value}`;
	}

	if (value.startsWith('uploads/')) {
		return `${API_ORIGIN}/${value}`;
	}

	try {
		const url = new URL(value);

		if (
			(url.hostname === 'localhost' || url.hostname === '127.0.0.1') &&
			url.pathname.startsWith('/uploads/')
		) {
			return `${API_ORIGIN}${url.pathname}${url.search}${url.hash}`;
		}
	} catch {
		return value;
	}

	return value;
}

export function normalizeMediaUrls<T>(payload: T): T {
	if (Array.isArray(payload)) {
		return payload.map((item) => normalizeMediaUrls(item)) as T;
	}

	if (!payload || typeof payload !== 'object') {
		return payload;
	}

	const next: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(payload)) {
		if (
			typeof value === 'string' &&
			(key === 'url' || key === 'imageUrl' || key === 'image' || key.endsWith('ImageUrl'))
		) {
			next[key] = resolveMediaUrl(value);
		} else {
			next[key] = normalizeMediaUrls(value);
		}
	}

	return next as T;
}
