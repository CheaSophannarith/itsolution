import type { ApiProduct, ApiProductsResponse } from '~/types';

export function useCategoryProducts(slug: Ref<string> | string) {
    const config = useRuntimeConfig();

    const slugValue = computed(() => typeof slug === 'string' ? slug : slug.value);

    const { data, status, error } = useFetch<ApiProductsResponse>(
        () => `${config.public.apiBaseUrl}/api/v1/categories/${slugValue.value}/products`,
        {
            key: () => `category-products-${slugValue.value}`,
            watch: [slugValue],
        }
    );

    const products = computed<ApiProduct[]>(() => {
        return data.value?.data ?? [];
    });

    const meta = computed(() => {
        return data.value?.meta ?? null;
    });

    return {
        products,
        meta,
        status,
        error,
    };
}
