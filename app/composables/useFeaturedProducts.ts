import type { Product } from '~/types';

interface FeaturedProductsResponse {
    data: Product[];
}

export function useFeaturedProducts() {
    const config = useRuntimeConfig();

    const { data, status, error } = useFetch<FeaturedProductsResponse>(
        `${config.public.apiBaseUrl}/api/v1/products/featured`,
        {
            key: 'featured-products',
        }
    );

    const featuredProducts = computed<Product[]>(() => {
        return data.value?.data ?? [];
    });

    return {
        featuredProducts,
        status,
        error,
    };
}