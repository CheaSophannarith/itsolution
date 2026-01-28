<template>
    <!-- Horizontal scroll on mobile/tablet, grid on desktop -->
    <div class="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none scrollbar-hide pb-2">
        <div v-for="product in products" :key="product.uuid"
            class="flex-shrink-0 w-[160px] sm:w-[180px] lg:w-auto snap-start">
            <ProductCard :product="product" />
        </div>
    </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

<script setup lang="ts">
import type { Product } from '~/types';

defineProps<{
    products: Product[];
}>();
</script>
