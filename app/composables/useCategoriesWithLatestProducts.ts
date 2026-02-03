import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Category } from '~/types';

export interface LatestProduct {
    uuid: string;
    name: string;
    slug: string;
    short_description: string;
    image: string;
    brand: {
        uuid: string;
        name: string;
        slug: string;
    };
    price: string;
    compare_at_price: string | null;
    in_stock: boolean;
    is_featured: boolean;
}

export interface CategoryWithLatestProducts extends Category {
    products: LatestProduct[];
}

export const useCategoriesWithLatestProducts = async (
    categories: Ref<Category[]>
): Promise<{ categoriesWithProducts: Ref<CategoryWithLatestProducts[]> }> => {
    const config = useRuntimeConfig();
    const categoriesWithProducts = ref<CategoryWithLatestProducts[]>([]);

    if (categories.value.length > 0) {
        const productPromises = categories.value.map(async (category) => {
            const { data } = await useFetch<{ data: LatestProduct[] }>(
                `${config.public.apiBaseUrl}/api/v1/categories/${category.slug}/latest-products`
            );

            const products = data.value?.data ?? [];

            // Only return category if it has products
            if (products.length > 0) {
                return {
                    ...category,
                    products
                };
            }
            return null;
        });

        const results = await Promise.all(productPromises);
        categoriesWithProducts.value = results.filter((cat): cat is CategoryWithLatestProducts => cat !== null);
    }

    return { categoriesWithProducts };
};
