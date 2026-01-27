import type { Ref } from 'vue';
import type {
    CategoryFilterResponse,
    CategoryFilterData,
    FilterBrand,
    FilterAttribute,
    FilterPriceRange,
    FilterBreadcrumb,
} from '~/types';

export function useCategoryFilters(slug: Ref<string> | string) {
    const config = useRuntimeConfig();

    const slugValue = computed(() => typeof slug === 'string' ? slug : slug.value);

    const { data, status, error } = useFetch<CategoryFilterResponse>(
        () => `${config.public.apiBaseUrl}/api/v1/categories/${slugValue.value}/filters`,
        {
            key: () => `category-filters-${slugValue.value}`,
            watch: [slugValue],
        }
    );

    const filterData = computed<CategoryFilterData | null>(() => {
        return data.value?.data ?? null;
    });

    const brands = computed<FilterBrand[]>(() => {
        return filterData.value?.filters.brands ?? [];
    });

    const attributes = computed<FilterAttribute[]>(() => {
        return filterData.value?.filters.attributes ?? [];
    });

    const priceRange = computed<FilterPriceRange | null>(() => {
        return filterData.value?.filters.price_range ?? null;
    });

    const breadcrumbs = computed<FilterBreadcrumb[]>(() => {
        return filterData.value?.category.breadcrumbs ?? [];
    });

    const categoryInfo = computed(() => {
        if (!filterData.value) return null;
        return filterData.value.category;
    });

    return {
        filterData,
        brands,
        attributes,
        priceRange,
        breadcrumbs,
        categoryInfo,
        status,
        error,
    };
}
