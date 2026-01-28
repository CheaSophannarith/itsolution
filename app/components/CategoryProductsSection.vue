<template>
    <div>
        <!-- Section Header -->
        <div class="mb-5 sm:mb-6">
            <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {{ categoryName }}
            </h3>
            <p class="text-sm sm:text-base text-gray-600">
                Explore our top products in this category
            </p>
        </div>

        <!-- Products Grid -->
        <div v-if="limitedProducts && limitedProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <ProductCard v-for="product in limitedProducts" :key="product.uuid" :product="product" />
        </div>

        <!-- View All Link -->
        <div v-if="limitedProducts && limitedProducts.length > 0" class="mt-6 text-center">
            <NuxtLink :to="`/categories/${categorySlug}`"
                class="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all duration-300">
                View all {{ categoryName }} products
                <ChevronRight class="w-4 h-4" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';
import type { Product } from '~/types';

const props = defineProps<{
    categorySlug: string;
    categoryName: string;
}>();

const config = useRuntimeConfig();

// Fetch all products from the API (no pagination parameter)
const { data } = await useLazyFetch<{ data: Product[] }>(
    `${config.public.apiBaseUrl}/api/v1/categories/${props.categorySlug}/products`,
    {
        key: `category-products-${props.categorySlug}`,
        server: false, // Only fetch on client side to avoid hydration issues
    }
);

// Limit to first 4 products on the client side
const limitedProducts = computed(() => {
    const allProducts = data.value?.data ?? [];
    return allProducts.slice(0, 4);
});
</script>
