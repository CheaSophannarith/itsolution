import type { CategoryTree } from '~/types';

export function useCategories() {
    const config = useRuntimeConfig();

    const { data: categories, status, error } = useFetch<{ data: CategoryTree[] }>(
        `${config.public.apiBaseUrl}/api/v1/categories/tree`,
        {
            key: 'categories-tree',
            transform: (response) => response.data,
        }
    );

    return {
        categories,
        status,
        error,
    };
}