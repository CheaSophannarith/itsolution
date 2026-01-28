<template>
    <div class="grid grid-cols-4 gap-4">
        <ProductCard v-for="product in products" :key="product.uuid" :product="product" />
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';

defineProps<{
    products: Product[];
}>();
</script>
