import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthUser = {
	id: string;
	fullName: string;
	email: string;
	phone?: string | null;
	role?: string;
	isActive?: boolean;
	verifiedAt?: string | null;
};

type AuthState = {
	user: AuthUser | null;
	accessToken: string | null;
	refreshToken: string | null;
	hasHydrated: boolean;
	pendingVerificationEmail: string | null;
	setAuth: (user: AuthUser, accessToken: string, refreshToken?: string | null) => void;
	setTokens: (accessToken: string, refreshToken?: string | null) => void;
	setHasHydrated: (value: boolean) => void;
	setPendingVerificationEmail: (email: string | null) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			hasHydrated: false,
			pendingVerificationEmail: null,
			setAuth: (user, accessToken, refreshToken) =>
				set((state) => ({
					user,
					accessToken,
					refreshToken: refreshToken ?? state.refreshToken,
				})),
			setTokens: (accessToken, refreshToken) =>
				set((state) => ({
					accessToken,
					refreshToken: refreshToken ?? state.refreshToken,
				})),
			setHasHydrated: (value) => set({ hasHydrated: value }),
			setPendingVerificationEmail: (email) =>
				set({ pendingVerificationEmail: email }),
			logout: () =>
				set({
					user: null,
					accessToken: null,
					refreshToken: null,
					pendingVerificationEmail: null,
				}),
		}),
		{
			name: 'aquzera-auth',
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
			partialize: (state) => ({
				user: state.user,
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
				pendingVerificationEmail: state.pendingVerificationEmail,
			}),
		},
	),
);
