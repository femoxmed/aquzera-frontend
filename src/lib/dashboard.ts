import { api } from '@/lib/api';
import type { AuthUser } from '@/store/authStore';
import type { Product } from '@/features/products/types';

export type DashboardProduct = Pick<
	Product,
	| 'id'
	| 'name'
	| 'slug'
	| 'price'
	| 'stock'
	| 'shortDescription'
	| 'colors'
	| 'mainImage'
	| 'bannerImage'
	| 'galleryImages'
>;

export type DashboardOrder = {
	id: string;
	status: string;
	total: number | string;
	tax?: number | string;
	deliveryFee?: number | string;
	createdAt: string;
	paymentExpiresAt?: string | null;
	paymentExpiresInSeconds?: number;
	canPay?: boolean;
	canCancel?: boolean;
	invoice?: {
		id: string;
		invoiceNumber: string;
		status: string;
		total: number | string;
	} | null;
	paymentIntent?: {
		id: string;
		status: string;
		providerStatus?: string | null;
		providerReference?: string | null;
		authorizationUrl?: string | null;
		paidAt?: string | null;
	} | null;
	items?: Array<{
		id: string;
		orderId?: string;
		productId?: string;
		qty: number;
		unitPrice: number | string;
		variant?: {
			id?: string;
			label?: string;
			value?: string;
			imageUrl?: string;
		} | null;
		product?: DashboardProduct;
	}>;
};

export type DashboardOrderItem = NonNullable<DashboardOrder['items']>[number];

export type DashboardInstallation = {
	id: string;
	installationDate: string;
	nextServiceDate: string;
	nextFilterChangeDate: string;
	product?: DashboardProduct;
};

export type PurchasedDevice = {
	id: string;
	orderItemId?: string;
	orderId: string;
	productId?: string;
	orderDate: string;
	paidAt?: string;
	qty: number;
	unitPrice: number | string;
	totalPaid: number | string;
	variant?: {
		id?: string;
		label?: string;
		value?: string;
		imageUrl?: string;
	} | null;
	deliveredAt?: string | null;
	activatedAt?: string | null;
	installedAt?: string | null;
	installerName?: string | null;
	warrantyMonths?: number;
	warrantyExpiresAt?: string | null;
	maintenanceRequired?: boolean;
	maintenanceStatus?: string;
	nextMaintenanceDate?: string | null;
	deviceSerial?: string | null;
	product?: DashboardProduct;
};

export type ServiceType = {
	id: string;
	name: string;
	description?: string | null;
	basePrice: number | string;
	billingMode: string;
	estimatedDurationMinutes: number;
};

export type ServiceBooking = {
	id: string;
	preferredDate: string;
	status: string;
	issue: string;
	price: number | string;
	serviceType?: ServiceType;
	technician?: AuthUser | null;
	invoice?: Invoice | null;
	paidItem?: {
		id: string;
		product?: DashboardProduct;
		deviceSerial?: string | null;
	};
	createdAt: string;
};

export type Invoice = {
	id: string;
	invoiceNumber: string;
	status: string;
	subtotal: number | string;
	tax: number | string;
	total: number | string;
	issuedAt: string;
	items?: Array<{
		id: string;
		description: string;
		qty: number;
		unitPrice: number | string;
		lineTotal: number | string;
	}>;
	serviceBooking?: { id: string } | null;
};

export type PaymentIntent = {
	id: string;
	status: string;
	authorizationUrl?: string | null;
	providerReference?: string;
};

export type SupportTicket = {
	id: string;
	subject: string;
	description: string;
	status: string;
	priority?: string;
	category?: string;
	request?: ServiceBooking | null;
	product?: DashboardProduct | null;
	chatThreadId?: string | null;
	messages?: SupportTicketMessage[];
	createdAt: string;
	updatedAt?: string;
};

export type SupportTicketMessage = {
	id: string;
	content: string;
	isInternalNote: boolean;
	source?: 'app' | 'email' | 'chat' | 'admin';
	createdAt: string;
	author?: Pick<AuthUser, 'id' | 'fullName' | 'email'>;
};

export function getMe() {
	return api.get<AuthUser>('/auth/me').then((response) => response.data);
}

export function updateMe(payload: { fullName: string; phone?: string }) {
	return api
		.patch<AuthUser>('/auth/me', payload)
		.then((response) => response.data);
}

export function getMyOrders() {
	return api
		.get<DashboardOrder[]>('/orders/me/history')
		.then((response) => response.data);
}

export function getOrderItems(orderId: string) {
	return api
		.get<DashboardOrderItem[]>(`/orders/${orderId}/items`)
		.then((response) => response.data);
}

export function getMyInstallations() {
	return api
		.get<DashboardInstallation[]>('/installations/me')
		.then((response) => response.data);
}

export function getMyPurchasedDevices() {
	return api
		.get<PurchasedDevice[]>('/orders/me/devices')
		.then((response) => response.data);
}

export function getMyServiceBookings() {
	return api
		.get<ServiceBooking[]>('/service-bookings/me')
		.then((response) => response.data);
}

export function createMyServiceBooking(payload: {
	preferredDate: string;
	issue: string;
	serviceTypeId: string;
}) {
	return api
		.post<ServiceBooking>('/service-bookings/me', payload)
		.then((response) => response.data);
}

export function getServiceTypes() {
	return api
		.get<ServiceType[]>('/service-types/public')
		.then((response) => response.data);
}

export function getMyInvoices() {
	return api.get<Invoice[]>('/invoices/me').then((response) => response.data);
}

export function createMyPaymentIntent(invoiceId: string) {
	return api
		.post<PaymentIntent>('/payments/me/intents', {
			invoiceId,
			idempotencyKey: `invoice:${invoiceId}`,
		})
		.then((response) => response.data);
}

export function createMyOrderPaymentIntent(orderId: string) {
	return api
		.post<PaymentIntent>('/payments/me/intents', {
			orderId,
			idempotencyKey: `order:${orderId}`,
		})
		.then((response) => response.data);
}

export function cancelMyPendingOrder(orderId: string) {
	return api
		.post<DashboardOrder>(`/orders/${orderId}/cancel`)
		.then((response) => response.data);
}

export function getMyTickets() {
	return api
		.get<SupportTicket[]>('/support-tickets/me')
		.then((response) => response.data);
}

export function createMyTicket(payload: {
	subject: string;
	description: string;
	requestId?: string;
	productId?: string;
	chatThreadId?: string;
}) {
	return api
		.post<SupportTicket>('/support-tickets/me', payload)
		.then((response) => response.data);
}

export function getMyTicketMessages(ticketId: string) {
	return api
		.get<SupportTicket>(`/support-tickets/me/${ticketId}/messages`)
		.then((response) => response.data);
}

export function addMyTicketMessage(ticketId: string, content: string) {
	return api
		.post<SupportTicketMessage>(`/support-tickets/me/${ticketId}/messages`, {
			content,
			source: 'app',
		})
		.then((response) => response.data);
}
