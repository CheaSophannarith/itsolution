<template>
    <div class="container mx-auto py-8">
        <h1 class="text-3xl font-bold mb-6">Desktop Products</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import ProductCard from '~/components/hardware/ProductCard.vue';

    const products = ref([]);

    onMounted(async () => {
        const res = await fetch('/app/assets/data/Hardware/products.json');
        products.value = await res.json();
    });
</script>