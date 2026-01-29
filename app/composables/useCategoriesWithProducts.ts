import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Category, Product } from '~/types';

export interface CategoryWithProducts extends Category {
    products: Product[];
}

export const useCategoriesWithProducts = async (
    categories: Ref<Category[]>
): Promise<{ categoriesWithProducts: Ref<CategoryWithProducts[]> }> => {
    const config = useRuntimeConfig();
    const categoriesWithProducts = ref<CategoryWithProducts[]>([]);

    if (categories.value.length > 0) {
        const productPromises = categories.value.map(async (category) => {
            const { data } = await useFetch<{ data: Product[] }>(
                `${config.public.apiBaseUrl}/api/v1/categories/${category.slug}/products`
            );

            const products = data.value?.data ?? [];

            // Only return category if it has products
            if (products.length > 0) {
                return {
                    ...category,
                    products: products.slice(0, 4) // Limit to 4 products
                };
            }
            return null;
        });

        const results = await Promise.all(productPromises);
        categoriesWithProducts.value = results.filter((cat): cat is CategoryWithProducts => cat !== null);
    }

    return { categoriesWithProducts };
};
