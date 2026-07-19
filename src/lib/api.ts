import axios from 'axios';
import { useAuthStore, type AuthUser } from '@/store/authStore';
import { API_BASE_URL, normalizeMediaUrls } from '@/lib/media-url';

export const api = axios.create({
	baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
	(response) => {
		response.data = normalizeMediaUrls(response.data);
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		const status = error.response?.status;

		if (
			status !== 401 ||
			!originalRequest ||
			originalRequest._retry ||
			originalRequest.url?.includes('/auth/login') ||
			originalRequest.url?.includes('/auth/refresh')
		) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		try {
			const accessToken = await refreshAccessToken();
			if (!accessToken) {
				throw error;
			}

			originalRequest.headers = originalRequest.headers ?? {};
			originalRequest.headers.Authorization = `Bearer ${accessToken}`;
			return api(originalRequest);
		} catch (refreshError) {
			useAuthStore.getState().logout();
			clearAuthCookies();
			return Promise.reject(refreshError);
		}
	},
);

async function refreshAccessToken() {
	if (!refreshPromise) {
		refreshPromise = requestRefreshToken().finally(() => {
			refreshPromise = null;
		});
	}

	return refreshPromise;
}

async function requestRefreshToken() {
	const refreshToken = useAuthStore.getState().refreshToken || getCookie('refreshToken');
	if (!refreshToken) return null;

	const response = await axios.post<{
		accessToken: string;
		refreshToken?: string;
		user: AuthUser;
	}>(
		`${api.defaults.baseURL}/auth/refresh`,
		{ refreshToken },
	);

	const nextRefreshToken = response.data.refreshToken ?? refreshToken;
	useAuthStore
		.getState()
		.setAuth(response.data.user, response.data.accessToken, nextRefreshToken);
	setAuthCookies(response.data.accessToken, nextRefreshToken);

	return response.data.accessToken;
}

function setAuthCookies(accessToken: string, refreshToken?: string | null) {
	document.cookie = `accessToken=${encodeURIComponent(
		accessToken,
	)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
	if (refreshToken) {
		document.cookie = `refreshToken=${encodeURIComponent(
			refreshToken,
		)}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
	}
}

function clearAuthCookies() {
	document.cookie = 'accessToken=; path=/; max-age=0; samesite=lax';
	document.cookie = 'refreshToken=; path=/; max-age=0; samesite=lax';
}

function getCookie(name: string) {
	if (typeof document === 'undefined') return null;
	return (
		document.cookie
			.split('; ')
			.find((row) => row.startsWith(`${name}=`))
			?.split('=')[1] || null
	);
}
