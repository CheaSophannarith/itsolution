import type { Ref } from 'vue';
import type { CategoryTree } from '~/types';

interface CategoriesResponse {
    data: CategoryTree[];
}

export function useCategories() {
    const config = useRuntimeConfig();

    const { data, status, error } = useFetch<CategoriesResponse>(
        `${config.public.apiBaseUrl}/api/v1/categories/tree`,
        {
            key: 'categories-tree',
        }
    );

    const categories = computed<CategoryTree[] | null>(() => {
        return data.value?.data ?? null;
    });

    return {
        categories,
        status,
        error,
    };
}