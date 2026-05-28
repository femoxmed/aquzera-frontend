'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
	ArrowLeft,
	CalendarDays,
	Check,
	CircleHelp,
	CircleUserRound,
	LogOut,
	Menu,
	MessageSquareText,
	Moon,
	Package,
	Plus,
	Settings,
	ShoppingBag,
	Sun,
	Ticket,
	X,
} from 'lucide-react';
import { toast } from 'sonner';
import { logout as clearAuthSession } from '@/lib/auth';
import {
	addMyTicketMessage,
	createMyPaymentIntent,
	createMyTicket,
	getMyTicketMessages,
	getMe,
	getMyInvoices,
	getMyOrders,
	getMyPurchasedDevices,
	getMyServiceBookings,
	getMyTickets,
	updateMe,
	type DashboardOrder,
	type Invoice,
	type PurchasedDevice,
	type ServiceBooking,
	type SupportTicket,
} from '@/lib/dashboard';
import { useAuthStore } from '@/store/authStore';
import { useDashboardThemeStore } from '@/store/dashboardThemeStore';

type Tab = 'products' | 'account' | 'orders' | 'schedules' | 'tickets';

const navItems: Array<{ id: Tab; label: string; icon: typeof Settings }> = [
	{ id: 'products', label: 'My Products', icon: Settings },
	{ id: 'account', label: 'Account Settings', icon: CircleUserRound },
	{ id: 'orders', label: 'Order History', icon: Package },
	{ id: 'schedules', label: 'Schedules', icon: CalendarDays },
	{ id: 'tickets', label: 'Tickets', icon: Ticket },
];

const tabPaths: Record<Tab, string> = {
	products: '/dashboard',
	account: '/dashboard/account',
	orders: '/dashboard/orders',
	schedules: '/dashboard/schedules',
	tickets: '/dashboard/tickets',
};

function tabFromPath(pathname: string | null): Tab {
	const segment = pathname?.split('/')[2];
	if (segment === 'account' || segment === 'orders' || segment === 'schedules' || segment === 'tickets') {
		return segment;
	}
	return 'products';
}

function currency(value: number | string | undefined) {
	return `N ${Math.round(Number(value ?? 0)).toLocaleString()}`;
}

function shortDate(value?: string) {
	if (!value) return 'Not set';
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return 'Not set';
	return new Intl.DateTimeFormat('en-NG', {
		day: 'numeric',
		month: 'short',
		year: '2-digit',
	}).format(date);
}

function addMonths(value: string | undefined, months: number) {
	if (!value) return undefined;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return undefined;
	date.setMonth(date.getMonth() + months);
	return date.toISOString();
}

function deviceImage(device: PurchasedDevice) {
	return (
		device.variant?.imageUrl ||
		device.product?.mainImage?.url ||
		device.product?.bannerImage?.url ||
		device.product?.galleryImages?.[0]?.url ||
		'/images/product_placeholder.png'
	);
}

function deviceColour(device: PurchasedDevice) {
	return device.variant?.value || '#101818';
}

function productName(device: PurchasedDevice) {
	return device.product?.name || 'Aquzera Product';
}

function deviceSpecifications(device: PurchasedDevice) {
	const specs = (device.product as any)?.specifications;
	return Array.isArray(specs)
		? specs.filter((spec) => spec?.label && spec?.value)
		: [];
}

function DashboardLogo() {
	return (
		<Link href='/' className='inline-flex flex-col leading-none select-none'>
			<span className='font-mona text-[17px] font-black tracking-[0.18em] text-[#061927]'>
				AQUZERA
			</span>
			<span className='mt-[1px] font-montserrat text-[7px] font-semibold uppercase tracking-[0.25em] text-[#20252c]/70'>
				WATER SOLUTIONS
			</span>
		</Link>
	);
}

function EmptyState({ title, body }: { title: string; body: string }) {
	return (
		<div className='mt-10 max-w-xl border border-[#e3e3e3] p-8 text-[#2d3036]'>
			<h2 className='font-mona text-[24px] font-black'>{title}</h2>
			<p className='mt-3 font-montserrat text-[15px] text-[#5f6268]'>{body}</p>
		</div>
	);
}

function supportStatusStyle(status?: string) {
	const styles: Record<string, string> = {
		open: 'border-[#91c8ff] bg-[#f1f8ff] text-[#0b5cad]',
		'in-progress': 'border-[#ffd36a] bg-[#fff8e8] text-[#8a5b00]',
		resolved: 'border-[#93dda8] bg-[#f0fff4] text-[#137333]',
		closed: 'border-[#d8d8d8] bg-[#f7f7f7] text-[#5f6268]',
	};
	return styles[status || ''] || 'border-[#d8d8d8] bg-white text-[#5f6268]';
}

function scheduleStatusStyle(status?: string) {
	const styles: Record<string, string> = {
		requested: 'bg-[#eef6ff] text-[#0b5cad]',
		assigned: 'bg-[#fff5d9] text-[#8a5b00]',
		completed: 'bg-[#eaffef] text-[#137333]',
		cancelled: 'bg-[#f4f4f4] text-[#666a70]',
	};
	return styles[status || ''] || 'bg-[#f4f4f4] text-[#666a70]';
}

function ProductCard({
	device,
	onOpen,
}: {
	device: PurchasedDevice;
	onOpen: () => void;
}) {
	const maintenanceRequired = Boolean(device.maintenanceRequired);

	return (
		<div>
			<button
				type='button'
				onClick={onOpen}
				className='relative flex h-[320px] w-[260px] flex-col items-start rounded-[8px] border border-[#dedede] bg-white px-7 pb-8 pt-6 text-left transition hover:border-[#bdbdbd]'>
				<span className='absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#8cff00] text-black'>
					{maintenanceRequired ? (
						<Settings className='h-3.5 w-3.5' />
					) : (
						<Check className='h-4 w-4' strokeWidth={3} />
					)}
				</span>
				<img
					src={deviceImage(device)}
					alt={productName(device)}
					className='mx-auto h-[170px] w-full object-contain'
				/>
				<h2 className='mt-4 max-w-[190px] font-mona text-[24px] font-black leading-[0.9] tracking-[-0.04em] text-black'>
					{productName(device)}
				</h2>
				<span className='mt-auto border-b border-black font-montserrat text-[15px] text-[#3d4148]'>
					Learn More
				</span>
			</button>
			<div className='mt-4 flex w-[260px] items-center justify-between px-4 font-montserrat text-[14px] text-[#2d3036]'>
				<span className='font-semibold'>Purchased</span>
				<span>{shortDate(device.orderDate)}</span>
			</div>
			<p className='mt-2 px-4 font-montserrat text-[12px] text-[#666a70]'>
				Unit #{device.deviceSerial || device.id.slice(0, 8)}
			</p>
			{maintenanceRequired ? (
				<p className='mt-5 px-4 font-montserrat text-[14px] font-semibold text-[#ff5a5f]'>
					Device Maintenance Required
				</p>
			) : null}
		</div>
	);
}

function ProductDetail({
	device,
	onBack,
}: {
	device: PurchasedDevice;
	onBack: () => void;
}) {
	const [openSections, setOpenSections] = useState({
		warranty: false,
		maintenance: false,
		info: false,
	});
	const installedDate = shortDate(device.installedAt || device.activatedAt || device.orderDate);
	const warrantyExpiry = shortDate(
		device.warrantyExpiresAt ||
			addMonths(device.installedAt || device.activatedAt || device.orderDate, device.warrantyMonths || 12),
	);
	const nextVisit = shortDate(
		device.nextMaintenanceDate ||
			addMonths(device.installedAt || device.activatedAt || device.orderDate, 12),
	);

	const toggle = (key: keyof typeof openSections) => {
		setOpenSections((current) => ({ ...current, [key]: !current[key] }));
	};

	return (
		<div>
			<button
				type='button'
				onClick={onBack}
				className='mb-9 inline-flex items-center gap-3 font-mona text-[14px] font-black uppercase tracking-[0.22em] text-[#2d3036]'>
				<ArrowLeft className='h-4 w-4' />
				Back
			</button>
			<div className='grid gap-16 xl:grid-cols-[280px_1fr]'>
				<div>
					<ProductCard device={device} onOpen={() => undefined} />
					<span
						className='ml-8 mt-8 block h-11 w-11 rounded-full border border-black'
						style={{ backgroundColor: deviceColour(device) }}
					/>
				</div>
				<div className='max-w-[680px] pt-2'>
					<section className='border-b border-[#dedede] pb-8'>
						<h2 className='flex items-center gap-5 font-mona text-[24px] font-black tracking-[-0.03em] text-black'>
							Purchase Information
							<X className='h-5 w-5 rounded-full border border-[#2d3036] p-0.5' />
						</h2>
						<div className='mt-10 grid grid-cols-2 gap-8 font-montserrat text-[#2d3036] md:grid-cols-4'>
							<div>
								<p className='font-semibold'>Purchased</p>
								<p className='mt-3 text-[13px] text-[#666a70]'>{shortDate(device.orderDate)}</p>
							</div>
							<div>
								<p className='font-semibold'>Delivered</p>
								<p className='mt-3 text-[13px] text-[#666a70]'>{shortDate(device.deliveredAt || device.orderDate)}</p>
							</div>
							<div>
								<p className='font-semibold'>Activated</p>
								<p className='mt-3 text-[13px] text-[#666a70]'>{shortDate(device.activatedAt || device.installedAt || device.orderDate)}</p>
							</div>
							<div>
								<p className='font-semibold'>Installed</p>
								<p className='mt-3 text-[13px] text-[#666a70]'>{installedDate}</p>
							</div>
							<div className='md:col-span-4'>
								<p className='font-semibold'>Installer</p>
								<p className='mt-3 text-[13px] text-[#666a70]'>{device.installerName || 'Not assigned'}</p>
							</div>
						</div>
					</section>

					<DetailSection title='Warranty' open={openSections.warranty} onToggle={() => toggle('warranty')}>
						<div className='grid gap-8 font-montserrat text-[#2d3036] sm:grid-cols-3'>
							<div>
								<p className='font-semibold'>Status</p>
								<p className='mt-3 flex items-center gap-2 text-[13px] text-[#666a70]'>
									<span className='flex h-3 w-3 items-center justify-center rounded-full bg-[#8cff00] text-[9px] text-black'>✓</span>
									Covered
								</p>
							</div>
							<div>
								<p className='font-semibold'>Expires</p>
								<p className='mt-3 text-[13px] text-[#666a70]'>{warrantyExpiry}</p>
							</div>
							<div>
								<p className='font-semibold'>Duration</p>
								<p className='mt-3 text-[13px] text-[#666a70]'>{device.warrantyMonths || 12} Months</p>
							</div>
						</div>
					</DetailSection>

					<DetailSection title='Maintenance' open={openSections.maintenance} onToggle={() => toggle('maintenance')}>
						<div className='grid gap-8 font-montserrat text-[#2d3036] sm:grid-cols-2'>
							<div>
								<p className='font-semibold'>Status</p>
								<p className='mt-3 text-[13px] text-[#666a70]'>
									{device.maintenanceRequired ? device.maintenanceStatus || 'Required' : 'Not required'}
								</p>
							</div>
							<div>
								<p className='font-semibold'>Next Tech.Visit</p>
								<p className='mt-3 text-[13px] text-[#666a70]'>{nextVisit}</p>
							</div>
						</div>
					</DetailSection>

					<DetailSection title='Device Info' open={openSections.info} onToggle={() => toggle('info')}>
						{deviceSpecifications(device).length > 0 ? (
							<div className='grid gap-x-10 gap-y-8 font-montserrat text-[#2d3036] sm:grid-cols-2 lg:grid-cols-4'>
								{deviceSpecifications(device).map((spec: any) => (
									<Info
										key={`${spec.label}-${spec.value}`}
										label={spec.label}
										value={spec.value}
									/>
								))}
								<Info
									label='Device ID'
									value={
										device.deviceSerial ||
										device.id.slice(0, 12).toUpperCase()
									}
								/>
							</div>
						) : (
							<div className='grid gap-x-10 gap-y-8 font-montserrat text-[#2d3036] sm:grid-cols-2 lg:grid-cols-4'>
								<Info
									label='Device ID'
									value={
										device.deviceSerial ||
										device.id.slice(0, 12).toUpperCase()
									}
								/>
							</div>
						)}
					</DetailSection>
				</div>
			</div>
		</div>
	);
}

function DetailSection({
	title,
	open,
	onToggle,
	children,
}: {
	title: string;
	open: boolean;
	onToggle: () => void;
	children: React.ReactNode;
}) {
	return (
		<section className='border-b border-[#dedede] py-8'>
			<button
				type='button'
				onClick={onToggle}
				className='flex items-center gap-5 font-mona text-[24px] font-black tracking-[-0.03em] text-black'>
				{title}
				{open ? (
					<X className='h-5 w-5 rounded-full border border-[#2d3036] p-0.5' />
				) : (
					<Plus className='h-5 w-5 rounded-full border border-[#2d3036] p-0.5' />
				)}
			</button>
			{open ? <div className='mt-8'>{children}</div> : null}
		</section>
	);
}

function Info({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className='font-semibold'>{label}</p>
			<p className='mt-3 whitespace-pre-line text-[13px] leading-[1.15] text-[#666a70]'>{value}</p>
		</div>
	);
}

export default function DashboardPage() {
	const router = useRouter();
	const pathname = usePathname();
	const user = useAuthStore((state) => state.user);
	const accessToken = useAuthStore((state) => state.accessToken);
	const refreshToken = useAuthStore((state) => state.refreshToken);
	const hasHydrated = useAuthStore((state) => state.hasHydrated);
	const setAuth = useAuthStore((state) => state.setAuth);
	const logout = useAuthStore((state) => state.logout);
	const isDarkMode = useDashboardThemeStore((state) => state.isDarkMode);
	const toggleDarkMode = useDashboardThemeStore((state) => state.toggleDarkMode);
	const activeTab = tabFromPath(pathname);
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [orders, setOrders] = useState<DashboardOrder[]>([]);
	const [products, setProducts] = useState<PurchasedDevice[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<PurchasedDevice | null>(null);
	const [bookings, setBookings] = useState<ServiceBooking[]>([]);
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [tickets, setTickets] = useState<SupportTicket[]>([]);
	const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
	const [ticketReply, setTicketReply] = useState('');
	const [accountForm, setAccountForm] = useState({
		fullName: user?.fullName || '',
		phone: user?.phone || '',
	});
	const [ticketForm, setTicketForm] = useState({
		subject: '',
		description: '',
		requestId: '',
		productId: '',
	});

	const pageDescription = useMemo(() => {
		if (activeTab === 'products') return 'A list of Products you owned.';
		if (activeTab === 'account') return 'Manage your profile information.';
		if (activeTab === 'orders') return 'Review your purchases and invoices.';
		if (activeTab === 'schedules') return 'Track or request service visits.';
		return 'Create and review support requests.';
	}, [activeTab]);

	const sortedTickets = useMemo(
		() =>
			[...tickets].sort(
				(a, b) =>
					new Date(b.updatedAt || b.createdAt).getTime() -
					new Date(a.updatedAt || a.createdAt).getTime(),
			),
		[tickets],
	);

	useEffect(() => {
		if (!hasHydrated) return;

		if (!accessToken && !refreshToken) {
			router.push(`/auth/signin?returnTo=${encodeURIComponent(pathname || '/dashboard')}`);
			return;
		}

		let isMounted = true;
		setIsLoading(true);
		Promise.all([
			getMe(),
			getMyOrders(),
			getMyPurchasedDevices(),
			getMyServiceBookings(),
			getMyInvoices(),
			getMyTickets(),
		])
			.then(async ([me, orderRows, productRows, bookingRows, invoiceRows, ticketRows]) => {
				if (!isMounted) return;
				const ticketsWithMessages = await Promise.all(
					ticketRows.map((ticket) =>
						getMyTicketMessages(ticket.id).catch(() => ticket),
					),
				);
				if (!isMounted) return;
				const currentAccessToken = useAuthStore.getState().accessToken;
				if (currentAccessToken) setAuth(me, currentAccessToken);
				setAccountForm({ fullName: me.fullName || '', phone: me.phone || '' });
				setOrders(orderRows);
				setProducts(productRows);
				setBookings(bookingRows);
				setInvoices(invoiceRows);
				setTickets(ticketsWithMessages);
			})
			.catch((error: any) => {
				toast.error(error?.response?.data?.message || 'Unable to load dashboard');
			})
			.finally(() => {
				if (isMounted) setIsLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, [accessToken, hasHydrated, refreshToken, router, setAuth]);

	const handleLogout = () => {
		clearAuthSession();
		logout();
		router.push('/auth/signin');
	};

	const selectTab = (tab: Tab) => {
		setSelectedProduct(null);
		setSelectedTicket(null);
		setMobileNavOpen(false);
		router.push(tabPaths[tab]);
	};

	const saveAccount = async (event: FormEvent) => {
		event.preventDefault();
		setIsSaving(true);
		try {
			const updated = await updateMe(accountForm);
			if (accessToken) setAuth(updated, accessToken);
			toast.success('Account updated');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Unable to update account');
		} finally {
			setIsSaving(false);
		}
	};

	const submitTicket = async (event: FormEvent) => {
		event.preventDefault();
		if (!ticketForm.subject || !ticketForm.description) {
			toast.error('Add a subject and description');
			return;
		}
		try {
			const ticket = await createMyTicket(ticketForm);
			setTickets((current) => [ticket, ...current]);
			setTicketForm({ subject: '', description: '', requestId: '', productId: '' });
			toast.success('Support ticket created');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Unable to create ticket');
		}
	};

	const openTicket = async (ticket: SupportTicket) => {
		setSelectedTicket(ticket);
		try {
			const ticketWithMessages = await getMyTicketMessages(ticket.id);
			setSelectedTicket(ticketWithMessages);
			setTickets((current) =>
				current.map((item) => (item.id === ticket.id ? ticketWithMessages : item)),
			);
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Unable to load ticket');
		}
	};

	const submitTicketReply = async (event: FormEvent) => {
		event.preventDefault();
		if (!selectedTicket || !ticketReply.trim()) return;

		try {
			const message = await addMyTicketMessage(selectedTicket.id, ticketReply);
			const updatedTicket = {
				...selectedTicket,
				messages: [...(selectedTicket.messages ?? []), message],
			};
			setSelectedTicket(updatedTicket);
			setTickets((current) =>
				current.map((ticket) =>
					ticket.id === selectedTicket.id ? updatedTicket : ticket,
				),
			);
			setTicketReply('');
			toast.success('Reply sent');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Unable to send reply');
		}
	};

	const payInvoice = async (invoiceId: string) => {
		try {
			const intent = await createMyPaymentIntent(invoiceId);
			if (intent.authorizationUrl) {
				window.location.href = intent.authorizationUrl;
				return;
			}
			toast.success('Invoice is already paid');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Unable to start payment');
		}
	};

	return (
		<main className={`dashboard-scope min-h-screen bg-white text-[#2d3036] ${isDarkMode ? 'dashboard-dark' : ''}`}>
			<header className='border-b border-[#e7e7e7] px-6 md:px-16 lg:px-28'>
				<div className='mx-auto flex h-[100px] max-w-[1500px] items-center justify-between'>
					<DashboardLogo />
					<div className='hidden items-center gap-5 text-[#22262d] md:flex'>
						<button type='button' onClick={() => selectTab('tickets')} className='relative' aria-label='Tickets'>
							<MessageSquareText className='h-[18px] w-[18px]' strokeWidth={1.8} />
							<span className='absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-[#8cff00]' />
						</button>
						<button
							type='button'
							onClick={toggleDarkMode}
							aria-label='Toggle dark mode'>
							{isDarkMode ? (
								<Sun className='h-[18px] w-[18px]' strokeWidth={1.8} />
							) : (
								<Moon className='h-[18px] w-[18px]' strokeWidth={1.8} />
							)}
						</button>
						<Link href='/cart' className='relative' aria-label='Cart'>
							<ShoppingBag className='h-[18px] w-[18px]' strokeWidth={1.8} />
							<span className='absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-[#8cff00]' />
						</Link>
						<Link href='/contact' aria-label='Help'>
							<CircleHelp className='h-[18px] w-[18px]' strokeWidth={1.8} />
						</Link>
					</div>
					<button
						type='button'
						onClick={() => setMobileNavOpen((value) => !value)}
						className='flex h-9 w-9 items-center justify-center rounded-full border border-[#d9d9d9] md:hidden'
						aria-label='Toggle dashboard menu'>
						{mobileNavOpen ? <X className='h-6 w-6' strokeWidth={1.8} /> : <Menu className='h-6 w-6' strokeWidth={1.8} />}
					</button>
				</div>
			</header>

			{mobileNavOpen ? (
				<div className='border-b border-[#e7e7e7] px-6 py-6 md:hidden'>
					<div className='space-y-2'>
						{navItems.map(({ id, label, icon: Icon }) => (
							<button
								key={id}
								type='button'
								onClick={() => selectTab(id)}
								className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 font-mona text-[20px] font-semibold uppercase tracking-[0.15em] ${
									activeTab === id ? 'text-[#2d3036]' : 'text-[#a6a6a6]'
								}`}>
								<Icon className='h-5 w-5' strokeWidth={1.8} />
								{label}
							</button>
						))}
						<button type='button' onClick={handleLogout} className='flex w-full items-center gap-3 rounded-lg px-4 py-3 font-mona text-[20px] font-semibold uppercase tracking-[0.15em] text-[#ff5a5f]'>
							<LogOut className='h-5 w-5' strokeWidth={1.8} />
							Sign Out
						</button>
					</div>
				</div>
			) : null}

			<section className='mx-auto grid max-w-[1500px] px-6 py-16 md:px-16 lg:grid-cols-[230px_1px_1fr] lg:gap-16 lg:px-28'>
				<aside className='hidden min-h-[470px] flex-col justify-between lg:flex'>
					<nav className='space-y-12'>
						{navItems.map(({ id, label, icon: Icon }) => (
							<button
								key={id}
								type='button'
								onClick={() => selectTab(id)}
								className={`flex items-center gap-3 text-left font-mona text-[14px] font-black uppercase tracking-[0.24em] transition ${
									activeTab === id ? 'text-[#2d3036]' : 'text-[#a6a6a6] hover:text-[#2d3036]'
								}`}>
								<Icon className='h-5 w-5 stroke-[1.4]' />
								{label}
							</button>
						))}
					</nav>
					<button type='button' onClick={handleLogout} className='flex items-center gap-4 font-mona text-[14px] font-black uppercase tracking-[0.24em] text-[#ff5a5f]'>
						<LogOut className='h-5 w-5 stroke-[1.5]' />
						Sign Out
					</button>
				</aside>
				<div className='hidden w-px bg-[#e2e2e2] lg:block' />

				<div className='min-h-[640px]'>
					{isLoading ? (
						<p className='font-montserrat text-[15px] text-[#666a70]'>Loading dashboard...</p>
					) : activeTab === 'products' && selectedProduct ? (
						<ProductDetail device={selectedProduct} onBack={() => setSelectedProduct(null)} />
					) : activeTab === 'tickets' && selectedTicket ? (
						<div>
							<button type='button' onClick={() => setSelectedTicket(null)} className='mb-8 flex items-center gap-2 font-mona text-[13px] font-black uppercase tracking-[0.2em] text-[#666a70]'>
								<ArrowLeft className='h-4 w-4' />
								Back to tickets
							</button>
							<div className='border border-[#e0e0e0] p-5'>
								<p className='font-mona text-[22px] font-black text-black'>{selectedTicket.subject}</p>
								<p className='mt-2 text-sm text-[#666a70]'>{selectedTicket.status} • {shortDate(selectedTicket.createdAt)}</p>
								<p className='mt-4 whitespace-pre-line text-sm text-[#666a70]'>{selectedTicket.description}</p>
								{selectedTicket.request || selectedTicket.product ? (
									<div className='mt-4 grid gap-3 text-sm text-[#666a70] sm:grid-cols-2'>
										{selectedTicket.request ? <span>Request: {selectedTicket.request.serviceType?.name || selectedTicket.request.id.slice(0, 8)}</span> : null}
										{selectedTicket.product ? <span>Product: {selectedTicket.product.name}</span> : null}
									</div>
								) : null}
							</div>
							<div className='mt-6 space-y-4'>
								{selectedTicket.messages?.length ? selectedTicket.messages.map((message) => (
									<div key={message.id} className='border border-[#e0e0e0] p-4'>
										<div className='flex flex-wrap items-center justify-between gap-2'>
											<p className='font-mona text-[14px] font-black text-black'>{message.author?.fullName || message.author?.email || 'Aquzera'}</p>
											<p className='text-xs uppercase tracking-[0.18em] text-[#888]'>{message.source || 'app'} • {shortDate(message.createdAt)}</p>
										</div>
										<p className='mt-3 whitespace-pre-line text-sm text-[#666a70]'>{message.content}</p>
									</div>
								)) : <EmptyState title='No replies yet' body='Admin responses and your replies will appear here.' />}
							</div>
							<form onSubmit={submitTicketReply} className='mt-6 border border-[#e0e0e0] p-5'>
								<h2 className='font-mona text-[20px] font-black text-black'>Reply</h2>
								<textarea value={ticketReply} onChange={(event) => setTicketReply(event.target.value)} placeholder='Write your response' className='mt-4 min-h-28 w-full border border-[#d9d9d9] bg-white p-3 text-[#2d3036] outline-none' />
								<button className='mt-4 h-12 bg-black px-6 font-mona text-[13px] font-black uppercase tracking-[0.2em] text-white'>Send Reply</button>
							</form>
						</div>
					) : (
						<>
							<h1 className='font-mona text-[32px] font-black tracking-[-0.04em] text-black'>
								{navItems.find((item) => item.id === activeTab)?.label}
							</h1>
							<p className='mt-2 font-montserrat text-[17px] text-[#4d5158]'>{pageDescription}</p>

							{activeTab === 'products' && (
								products.length ? (
									<div className='mt-10 grid gap-x-14 gap-y-12 md:grid-cols-2 xl:grid-cols-3'>
										{products.map((product, index) => (
											<ProductCard
												key={product.id}
												device={product}
												onOpen={() => setSelectedProduct(product)}
											/>
										))}
									</div>
								) : <EmptyState title='No products yet' body='Products you have bought and paid for will appear here.' />
							)}

							{activeTab === 'account' && (
								<form onSubmit={saveAccount} className='mt-10 max-w-xl space-y-6'>
									<label className='block'>
										<span className='font-mona text-[13px] font-black uppercase tracking-[0.2em] text-[#696d73]'>Full Name</span>
										<input value={accountForm.fullName} onChange={(event) => setAccountForm((current) => ({ ...current, fullName: event.target.value }))} className='mt-3 h-12 w-full border border-[#d9d9d9] bg-white px-4 text-[#2d3036] outline-none focus:border-black' />
									</label>
									<label className='block'>
										<span className='font-mona text-[13px] font-black uppercase tracking-[0.2em] text-[#696d73]'>Email</span>
										<input value={user?.email || ''} disabled className='mt-3 h-12 w-full border border-[#e2e2e2] bg-[#f7f7f7] px-4 text-[#777]' />
									</label>
									<label className='block'>
										<span className='font-mona text-[13px] font-black uppercase tracking-[0.2em] text-[#696d73]'>Phone</span>
										<input value={accountForm.phone} onChange={(event) => setAccountForm((current) => ({ ...current, phone: event.target.value }))} className='mt-3 h-12 w-full border border-[#d9d9d9] bg-white px-4 text-[#2d3036] outline-none focus:border-black' />
									</label>
									<button disabled={isSaving} className='h-12 bg-black px-6 font-mona text-[13px] font-black uppercase tracking-[0.2em] text-white disabled:opacity-60'>
										{isSaving ? 'Saving...' : 'Save Changes'}
									</button>
								</form>
							)}

							{activeTab === 'orders' && (
								<div className='mt-10 space-y-5'>
									{orders.length ? orders.map((order) => (
										<div key={order.id} className='border border-[#e0e0e0] p-5'>
											<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
												<div>
													<p className='font-mona text-[18px] font-black text-black'>Order #{order.id.slice(0, 8)}</p>
													<p className='mt-2 text-sm text-[#666a70]'>{shortDate(order.createdAt)} • {order.status}</p>
												</div>
												<p className='font-mona text-[22px] font-black text-black'>{currency(order.total)}</p>
											</div>
											<p className='mt-4 text-sm text-[#666a70]'>{order.items?.length || 0} item(s)</p>
										</div>
									)) : <EmptyState title='No orders yet' body='Completed checkout orders will appear here.' />}
									{invoices.length > 0 ? (
										<div className='pt-6'>
											<h2 className='font-mona text-[22px] font-black text-black'>Invoices</h2>
											<div className='mt-4 grid gap-3'>
												{invoices.map((invoice) => (
													<div key={invoice.id} className='flex justify-between border border-[#e0e0e0] p-4 text-sm text-[#666a70]'>
														<span>{invoice.invoiceNumber} • {invoice.status}</span>
														<span>{currency(invoice.total)}</span>
													</div>
												))}
											</div>
										</div>
									) : null}
								</div>
							)}

							{activeTab === 'schedules' && (
								<div className='mt-10'>
									<div className='grid gap-5 xl:grid-cols-2'>
										{bookings.length ? bookings.map((booking) => (
											<div key={booking.id} className='overflow-hidden rounded-[8px] border border-[#dce8ee] bg-white shadow-[0_14px_40px_rgba(16,24,40,0.06)]'>
												<div className='h-2 bg-[#8cff00]' />
												<div className='p-5'>
													<div className='flex flex-wrap items-start justify-between gap-3'>
														<div>
															<p className='font-mona text-[20px] font-black text-black'>{booking.serviceType?.name || 'Service visit'}</p>
															<p className='mt-2 text-sm text-[#666a70]'>Preferred date: {shortDate(booking.preferredDate)}</p>
														</div>
														<span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${scheduleStatusStyle(booking.status)}`}>{booking.status}</span>
													</div>
													{booking.paidItem?.product ? (
														<p className='mt-3 text-sm font-semibold text-[#20252c]'>For: {booking.paidItem.product.name}{booking.paidItem.deviceSerial ? ` • ${booking.paidItem.deviceSerial}` : ''}</p>
													) : null}
													<p className='mt-4 text-sm leading-6 text-[#4f545c]'>{booking.issue}</p>
													{booking.invoice && booking.invoice.status !== 'paid' ? (
														<div className='mt-5 rounded-[8px] border border-[#ffe2a3] bg-[#fff9ec] p-4'>
															<div className='flex flex-wrap items-center justify-between gap-3'>
																<div>
																	<p className='font-mona text-[15px] font-black text-black'>Service payment due</p>
																	<p className='mt-1 text-sm text-[#7a5a13]'>{booking.invoice.invoiceNumber} • {currency(booking.invoice.total)}</p>
																</div>
																<button type='button' onClick={() => payInvoice(booking.invoice!.id)} className='h-10 bg-black px-4 font-mona text-[12px] font-black uppercase tracking-[0.18em] text-white'>Pay Now</button>
															</div>
														</div>
													) : null}
													<div className='mt-5 flex items-center gap-3 border-t border-[#e8eef2] pt-4'>
														<div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#061927] text-white'>
															<Settings className='h-5 w-5' />
														</div>
														<div>
															<p className='text-xs uppercase tracking-[0.2em] text-[#8b929b]'>Technician</p>
															<p className='text-sm font-semibold text-[#20252c]'>{booking.technician?.fullName || 'Awaiting assignment'}</p>
														</div>
													</div>
												</div>
											</div>
										)) : <EmptyState title='No schedules yet' body='Scheduled service visits created by the Aquzera team will appear here.' />}
									</div>
								</div>
							)}

							{activeTab === 'tickets' && (
								<div className='mt-10 grid gap-8 xl:grid-cols-[1fr_380px]'>
									<div className='space-y-4'>
										{sortedTickets.length ? sortedTickets.map((ticket) => (
											<button type='button' key={ticket.id} onClick={() => openTicket(ticket)} className={`block w-full rounded-[8px] border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(16,24,40,0.08)] ${supportStatusStyle(ticket.status)}`}>
												<div className='flex flex-wrap items-start justify-between gap-3'>
													<div>
														<p className='font-mona text-[19px] font-black text-black'>{ticket.subject}</p>
														<p className='mt-2 text-xs font-bold uppercase tracking-[0.16em]'>{ticket.status} • Updated {shortDate(ticket.updatedAt || ticket.createdAt)}</p>
													</div>
													<span className='rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#20252c]'>{ticket.messages?.length || 0} replies</span>
												</div>
												<p className='mt-3 line-clamp-2 text-sm leading-6 text-[#4f545c]'>{ticket.description}</p>
												{ticket.product || ticket.request ? (
													<div className='mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[#20252c]'>
														{ticket.product ? <span className='rounded-full bg-white/80 px-3 py-1'>{ticket.product.name}</span> : null}
														{ticket.request ? <span className='rounded-full bg-white/80 px-3 py-1'>{ticket.request.serviceType?.name || 'Service request'}</span> : null}
													</div>
												) : null}
											</button>
										)) : <EmptyState title='No tickets yet' body='Create a support ticket and the Aquzera team will follow up.' />}
									</div>
									<form onSubmit={submitTicket} className='rounded-[8px] border border-[#dce8ee] bg-[#fbfdff] p-5 shadow-[0_14px_40px_rgba(16,24,40,0.05)]'>
										<h2 className='font-mona text-[20px] font-black text-black'>New Ticket</h2>
										<select value={ticketForm.requestId} onChange={(event) => setTicketForm((current) => ({ ...current, requestId: event.target.value }))} className='mt-5 h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[#2d3036]'>
											<option value=''>Link request (optional)</option>
											{bookings.map((booking) => <option key={booking.id} value={booking.id}>{booking.serviceType?.name || 'Service request'} • {shortDate(booking.createdAt)}</option>)}
										</select>
										<select value={ticketForm.productId} onChange={(event) => setTicketForm((current) => ({ ...current, productId: event.target.value }))} className='mt-4 h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[#2d3036]'>
											<option value=''>Link product (optional)</option>
											{products.map((device) => <option key={device.id} value={device.product?.id || ''}>{device.product?.name || `Product ${device.id.slice(0, 8)}`}</option>)}
										</select>
										<input value={ticketForm.subject} onChange={(event) => setTicketForm((current) => ({ ...current, subject: event.target.value }))} placeholder='Subject' className='mt-5 h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[#2d3036] outline-none' />
										<textarea value={ticketForm.description} onChange={(event) => setTicketForm((current) => ({ ...current, description: event.target.value }))} placeholder='How can we help?' className='mt-4 min-h-28 w-full border border-[#d9d9d9] bg-white p-3 text-[#2d3036] outline-none' />
										<button className='mt-4 h-12 w-full bg-black font-mona text-[13px] font-black uppercase tracking-[0.2em] text-white'>Create Ticket</button>
									</form>
								</div>
							)}
						</>
					)}
				</div>
			</section>

			<footer className='mx-auto w-full max-w-[1500px] px-6 pb-12 pt-8 md:px-16 lg:px-28'>
				<div className='border-t border-[#dedede] pt-10 font-montserrat text-[20px] text-[#2d3036]'>
					Aquzera <span className='underline underline-offset-2'>©</span> 2026
				</div>
			</footer>
		</main>
	);
}
