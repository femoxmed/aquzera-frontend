import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DashboardThemeState = {
	isDarkMode: boolean;
	hasHydrated: boolean;
	setDarkMode: (value: boolean) => void;
	toggleDarkMode: () => void;
	setHasHydrated: (value: boolean) => void;
};

export const useDashboardThemeStore = create<DashboardThemeState>()(
	persist(
		(set) => ({
			isDarkMode: true,
			hasHydrated: false,
			setDarkMode: (value) => set({ isDarkMode: value }),
			toggleDarkMode: () =>
				set((state) => ({ isDarkMode: !state.isDarkMode })),
			setHasHydrated: (value) => set({ hasHydrated: value }),
		}),
		{
			name: 'aquzera-dashboard-theme',
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
			partialize: (state) => ({ isDarkMode: state.isDarkMode }),
		},
	),
);
