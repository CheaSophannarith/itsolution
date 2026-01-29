import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Category } from '~/types';

export const usePopularCategories = async (): Promise<{ popularCategories: Ref<Category[]> }> => {
    const config = useRuntimeConfig();
    const popularCategories = ref<Category[]>([]);

    const { data: categoriesData } = await useFetch<{ data: Category[] }>(
        `${config.public.apiBaseUrl}/api/v1/categories/popular`
    );

    if (categoriesData.value?.data) {
        popularCategories.value = categoriesData.value.data;
    }

    return { popularCategories };
};
