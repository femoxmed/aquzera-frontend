import { api } from '@/lib/api';

export type ContactMessagePayload = {
	fullName: string;
	email: string;
	phone: string;
	message: string;
	source?: string;
};

export async function sendContactMessage(payload: ContactMessagePayload) {
	const { data } = await api.post<{ message: string }>(
		'/contact/messages',
		payload,
	);
	return data;
}
