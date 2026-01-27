import type { Product, ProductsResponse } from '~/types';

export function useCategoryProducts(
    slug: Ref<string> | string,
    filters?: Ref<Record<string, string | number | boolean | string[]>>
) {
    const config = useRuntimeConfig();

    const slugValue = computed(() => typeof slug === 'string' ? slug : slug.value);

    const { data, status, error } = useFetch<ProductsResponse>(
        () => `${config.public.apiBaseUrl}/api/v1/categories/${slugValue.value}/products`,
        {
            query: filters,
            watch: filters ? [slugValue, filters] : [slugValue],
        }
    );

    const products = computed<Product[]>(() => {
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
