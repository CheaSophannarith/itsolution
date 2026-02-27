import type { ProductDetail, ProductDetailResponse } from '~/types';

export function useProductDetail(slug: Ref<string> | string) {
    const config = useRuntimeConfig();

    const slugValue = computed(() => typeof slug === 'string' ? slug : slug.value);

    const { data, status, error } = useFetch<ProductDetailResponse>(
        () => `${config.public.apiBaseUrl}/api/v1/products/${slugValue.value}`,
        {
            watch: [slugValue],
        }
    );

    const product = computed<ProductDetail | null>(() => {
        return data.value?.data ?? null;
    });

    return {
        product,
        status,
        error,
    };
}