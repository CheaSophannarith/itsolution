<template>
    <div
        v-if="products && products.length > 0"
        class="relative pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
        <!-- Background -->
        <div class="absolute inset-0 bg-linear-to-br from-gray-50 via-white to-blue-50/30"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-brand/5 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ClientOnly>
                <div class="mb-4 sm:mb-6" data-aos="fade-up">
                    <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                        Handpicked for you
                    </span>
                </div>
                <div
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
                    data-aos="fade-up"
                    data-aos-delay="200">
                    <ProductCard
                        v-for="product in products"
                        :key="product.uuid"
                        :product="product" />
                </div>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Product } from '~/types';

    defineProps<{
        products: Product[];
    }>();
</script>