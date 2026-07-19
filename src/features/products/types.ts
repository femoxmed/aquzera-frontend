export type ProductImage = {
	id?: string;
	key?: string;
	url?: string;
	path?: string;
	originalName?: string;
	variants?: Array<{
		name?: string;
		url?: string;
		width?: number;
		height?: number;
	}>;
};

export type ProductColor = {
	id: string;
	label: string;
	value: string;
	status?: 'active' | 'inactive';
	image?: ProductImage;
	imageUrl?: string;
};

export type ProductFeature = {
	title: string;
	titleLine2?: string;
	description: string;
	image?: ProductImage;
	imageUrl?: string;
	imageAlt?: string;
	imageClassName?: string;
};

export type ProductSpecification = {
	label: string;
	value: string;
};

export type ProductBoxItem = {
	title: string;
	image?: ProductImage;
	imageUrl?: string;
	description?: string;
	imageAlt?: string;
};

export type ProductAddOn = {
	productId: string;
	name?: string;
	slug?: string;
	price?: number | string;
	regularPrice?: number | string;
	salePrice?: number | string | null;
	saleLabel?: string | null;
	image?: string;
	shortDescription?: string | null;
	isCompulsory?: boolean;
};

export type Product = {
	id: string;
	name: string;
	slug?: string;
	sku: string;
	price: number | string;
	salePrice?: number | string | null;
	saleLabel?: string | null;
	saleStartsAt?: string | null;
	saleEndsAt?: string | null;
	stock: number;
	shortDescription?: string | null;
	description?: string | null;
	startingPriceLabel?: string | null;
	colors?: ProductColor[] | null;
	features?: ProductFeature[] | null;
	specifications?: ProductSpecification[] | null;
	boxItems?: ProductBoxItem[] | null;
	addOns?: ProductAddOn[] | null;
	status?: 'draft' | 'active' | 'archived';
	featuredAt?: string | null;
	sortOrder?: number;
	bannerImage?: ProductImage | null;
	mainImage?: ProductImage | null;
	galleryImages?: ProductImage[];
};
