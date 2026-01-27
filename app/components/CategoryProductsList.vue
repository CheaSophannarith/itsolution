<template>
    <div class="w-full">
        <!-- Loading State -->
        <div v-if="status === 'pending'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
            <div v-for="i in 12" :key="i" class="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl h-[340px] sm:h-[380px] animate-pulse shadow-sm">
                <div class="h-2/3 bg-gray-200/50 rounded-t-2xl"></div>
                <div class="p-3 space-y-2">
                    <div class="h-4 bg-gray-200/70 rounded-lg w-3/4"></div>
                    <div class="h-4 bg-gray-200/70 rounded-lg w-1/2"></div>
                    <div class="h-8 bg-gray-200/70 rounded-lg w-full mt-3"></div>
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20 px-4">
            <div class="max-w-md mx-auto">
                <div class="w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <p class="text-red-600 font-bold text-xl mb-3">Failed to load products</p>
                <p class="text-gray-600 text-sm">Please try refreshing the page</p>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="products.length === 0" class="text-center py-20 px-4">
            <div class="max-w-md mx-auto">
                <div class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                </div>
                <p class="text-gray-900 font-bold text-xl mb-3">No products available</p>
                <p class="text-gray-600 text-sm">Check back soon for new items</p>
            </div>
        </div>

        <!-- Products Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
            <ProductCard v-for="product in products.slice(0, 12)" :key="product.uuid" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CategoryTree } from '~/types';

const props = defineProps<{
    category: CategoryTree;
}>();

// Fetch products for this category (limit to first 12)
const filters = computed(() => ({
    per_page: 12,
}));

const { products, status, error } = useCategoryProducts(
    computed(() => props.category.slug),
    filters
);
</script>