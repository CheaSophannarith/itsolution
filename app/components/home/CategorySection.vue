<template>
    <div>
        <!-- Category Banner -->
        <div class="mb-6">
            <NuxtLink
                :to="`/categories/${category.slug}`"
                class="group relative block overflow-hidden border-2 border-gray-200 hover:border-brand transition-all duration-300">
                <div class="relative h-48 sm:h-56 lg:h-64 bg-gray-900 overflow-hidden">
                    <img
                        :src="category.image"
                        :alt="category.name"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />

                    <div class="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent"></div>

                    <div class="absolute inset-0 flex items-center px-6 sm:px-8 lg:px-12 z-10">
                        <div>
                            <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                                {{ category.name }}
                            </h3>
                            <div class="inline-flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                                <span class="text-sm sm:text-base font-medium">Explore collection</span>
                                <div class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-brand group-hover:translate-x-1 transition-all duration-300">
                                    <ChevronRight class="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            <ProductCard
                v-for="product in category.products"
                :key="product.uuid"
                :product="product" />
        </div>

        <!-- View All -->
        <div class="mt-6 text-center">
            <NuxtLink
                :to="`/categories/${category.slug}`"
                class="inline-flex items-center gap-2 text-brand hover:text-brand/80 font-semibold transition-colors group">
                <span>View all {{ category.name }}</span>
                <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronRight } from 'lucide-vue-next';
    import type { Category, Product } from '~/types';

    defineProps<{
        category: Category & { products: Product[] };
    }>();
</script>