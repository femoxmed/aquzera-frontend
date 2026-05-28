import { Suspense } from 'react';
import ProductListClient from './ProductListClient';

export const metadata = { title: 'Products' };

export default function ProductPage() {
	return (
		<Suspense>
			<ProductListClient />
		</Suspense>
	);
}
