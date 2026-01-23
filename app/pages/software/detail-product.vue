<template>
    <div>
        <SoftwareProductDetail v-if="product" :product="product" />
        <div v-else class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
                <p class="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
                <NuxtLink to="/software" class="text-brand hover:underline">
                    Back to Software
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import productsData from '~/assets/data/Software/products.json';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    manufacturer_id: number;
    brand_id: number;
    category_id: number;
    subcategory_ids: number[];
    type_ids: number[];
    image: string;
    stock: number;
    rating: number;
    featured: boolean;
}

const route = useRoute();
const products = productsData as Product[];

const product = computed(() => {
    const productId = Number(route.query.productId);
    if (!productId) return null;
    return products.find(p => p.id === productId) || null;
});
</script>