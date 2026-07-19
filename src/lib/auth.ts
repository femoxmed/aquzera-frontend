import { api } from '@/lib/api';
import type { ServerCart } from '@/lib/cart';
import type { CartItem } from '@/store/cartStore';
import type { AuthUser } from '@/store/authStore';
import { API_BASE_URL } from '@/lib/media-url';

type AuthResponse = {
	accessToken: string;
	refreshToken: string;
	user: AuthUser;
	cart?: ServerCart;
	message?: string;
};

type EmailVerificationRequiredResponse = {
	requiresEmailVerification: true;
	email: string;
	message?: string;
};

type OtpRequiredResponse = {
	requiresOtp: true;
	email: string;
	message?: string;
};

type RegisterResponse = {
	accessToken?: string;
	refreshToken?: string;
	user: AuthUser;
	message?: string;
};

type SignInPayload = {
	email: string;
	password: string;
	guestCartItems?: Array<{
		productId: string;
		quantity: number;
		type?: 'machine' | 'filter' | 'accessory' | 'service';
		variant?: {
			id?: string;
			label?: string;
			value?: string;
			imageUrl?: string;
		};
	}>;
};

export async function signIn(payload: SignInPayload) {
	const { data } = await api.post<
		AuthResponse | EmailVerificationRequiredResponse | OtpRequiredResponse
	>('/auth/login', payload);
	if ('requiresEmailVerification' in data || 'requiresOtp' in data) {
		return data;
	}
	if (!data.accessToken || !data.user) {
		throw new Error('Login succeeded but no session was returned.');
	}
	setAuthCookies(data.accessToken, data.refreshToken);
	return data;
}

export async function register(payload: {
	fullName: string;
	email: string;
	password: string;
}) {
	const { data } = await api.post<RegisterResponse>('/auth/register', payload);
	if (data.accessToken) {
		setAuthCookies(data.accessToken, data.refreshToken);
	}
	return data;
}

export async function verifyEmail(payload: { email: string; code: string }) {
	const data = await postAuthJson<AuthResponse>('/auth/verify-email', payload);
	setAuthCookies(data.accessToken, data.refreshToken);
	return data;
}

export async function resendVerification(email: string) {
	return postAuthJson<{ message: string }>('/auth/resend-verification', {
		email,
	});
}

export async function verifyAdminOtp(payload: { email: string; code: string }) {
	const data = await postAuthJson<AuthResponse>('/auth/verify-admin-otp', payload);
	setAuthCookies(data.accessToken, data.refreshToken);
	return data;
}

export async function forgotPassword(email: string) {
	return postAuthJson<{ message: string }>('/auth/forgot-password', {
		email,
	});
}

export async function resetPassword(payload: { token: string; password: string }) {
	return postAuthJson<{ message: string }>('/auth/reset-password', payload);
}

export function logout() {
	clearAuthCookies();
}

export function cartItemsToLoginPayload(items: CartItem[]) {
	return items
		.filter((item) => isUuid(item.id))
		.map((item) => ({
			productId: item.id,
			quantity: item.quantity,
			type: item.type || ('machine' as const),
			variant: item.variant,
		}));
}

export function setAuthCookies(accessToken: string, refreshToken?: string | null) {
	document.cookie = `accessToken=${encodeURIComponent(
		accessToken,
	)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
	if (refreshToken) {
		document.cookie = `refreshToken=${encodeURIComponent(
			refreshToken,
		)}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
	}
}

export function clearAuthCookies() {
	document.cookie = 'accessToken=; path=/; max-age=0; samesite=lax';
	document.cookie = 'refreshToken=; path=/; max-age=0; samesite=lax';
}

function isUuid(value: string) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
		value,
	);
}

async function postAuthJson<T>(path: string, body: unknown) {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(body),
	});

	const data = await response.json().catch(() => null);

	if (!response.ok) {
		throw new Error(
			data?.message ||
				data?.error ||
				`Request failed with status ${response.status}`,
		);
	}

	return data as T;
}
