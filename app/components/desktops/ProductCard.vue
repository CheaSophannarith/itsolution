<template>
    <div class="bg-white border border-gray-200 p-6 flex flex-col items-center h-full">
        <img :src="product.image" :alt="product.name"
            class="w-40 h-40 object-contain mb-4 cursor-pointer hover:scale-105 transition-transform"
            @click="navigateToDetail" />
        <h3 class="text-lg font-bold text-gray-800 text-center mb-2 h-14 line-clamp-2 cursor-pointer hover:text-brand transition-colors"
            @click="navigateToDetail">
            {{ product.name }}
        </h3>
        <p class="text-sm text-gray-600 text-center mb-2 h-10 line-clamp-2 grow">{{ descriptionText }}</p>
        <div class="mt-auto">
            <p class="text-xl font-bold text-pink-500 mb-4 text-center">${{ product.price.toFixed(2) }}</p>
            <button @click="navigateToDetail"
                class="bg-blue-950 text-white px-6 py-2 flex items-center gap-2 hover:bg-blue-900 transition-colors">
                <ShoppingCart class="w-4 h-4" />
                Shop now
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ShoppingCart } from 'lucide-vue-next';

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
    category_id: number;
    subcategory_ids: number[];
    type_ids: number[];
    image: string;
    stock: number;
    rating: number;
    featured: boolean;
}

const props = defineProps<{
    product: Product;
}>();

const router = useRouter();

const descriptionText = computed(() => {
    return props.product.description.map(d => d.value).join(', ');
});

const navigateToDetail = () => {
    router.push({
        path: '/desktops/detail-product',
        query: { productId: props.product.id }
    });
};
</script>
