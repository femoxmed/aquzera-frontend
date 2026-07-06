import { api } from '@/lib/api';

export type Faq = {
	id: string;
	question: string;
	answer: string;
	category: string;
	sortOrder: number;
	isPublished: boolean;
};

export async function getPublicFaqs() {
	const response = await api.get<Faq[]>('/faqs/public');
	return response.data;
}
