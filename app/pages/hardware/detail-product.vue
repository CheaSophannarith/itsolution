<template>
    <div>
        <HardwareProductDetail v-if="product" :product="product" />
        <div v-else class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
                <p class="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
                <NuxtLink to="/hardware" class="text-brand hover:underline">
                    Back to Hardware
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import productsData from '~/assets/data/Hardware/products.json';

interface DescriptionItem {
    label: string;
    value: string;
}

interface Product {
    id: number;
    name: string;
    description: DescriptionItem[];
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

useHead({
    title: 'Product Detail - Hardware',
    meta: [
        {
            name: 'description',
            content: 'Detailed information about the selected hardware product.',
        },
    ],
});

const route = useRoute();
const products = productsData as Product[];

const product = computed(() => {
    const productId = Number(route.query.productId);
    if (!productId) return null;
    return products.find(p => p.id === productId) || null;
});
</script>
