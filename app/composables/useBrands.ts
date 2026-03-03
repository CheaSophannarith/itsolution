import type { Brand } from '~/types';

interface BrandsResponse {
    data: Brand[];
}

export function useBrands() {
    const config = useRuntimeConfig();

    const { data, status, error } = useFetch<BrandsResponse>(
        `${config.public.apiBaseUrl}/api/v1/brands`,
    );

    const brands = computed<Brand[]>(() => {
        return data.value?.data ?? [];
    });

    return {
        brands,
        status,
        error,
    };
}
