import type { Product } from '~/types';

interface ProductSearchResponse {
    data: Product[];
}

export function useProductSearch(searchQuery: Ref<string>) {
    const config = useRuntimeConfig();

    const { data, status, error, refresh } = useFetch<ProductSearchResponse>(
        () => `${config.public.apiBaseUrl}/api/v1/products?filter[search]=${searchQuery.value}`,
        {
            immediate: false,
            watch: false,
        }
    );

    const searchResults = computed<Product[]>(() => {
        return data.value?.data ?? [];
    });

    return {
        searchResults,
        status,
        error,
        refresh,
    };
}
