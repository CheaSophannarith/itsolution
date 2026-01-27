<template>
    <div class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 p-6 flex flex-col items-center h-full transition-all duration-300">
        <div class="w-full aspect-square max-w-[20rem] mb-5 rounded-xl items-center justify-center overflow-hidden cursor-pointer"
            @click="navigateToDetail">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-contain  group-hover:scale-110 transition-transform duration-500" />
        </div>
        <h3 class="text-base font-semibold text-gray-800 text-center mb-2 h-12 line-clamp-2 cursor-pointer group-hover:text-brand transition-colors duration-200"
            @click="navigateToDetail">
            {{ product.name }}
        </h3>
        <p class="text-sm text-gray-400 text-center mb-3 h-10 line-clamp-2 grow leading-relaxed">{{ product.short_description }}</p>
        <div class="mt-auto w-full flex flex-col items-center">
            <p class="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">${{ formattedPrice }}</p>
            <button @click="navigateToDetail"
                class="w-full bg-blue-950 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand hover:shadow-lg hover:shadow-brand/25 transition-all duration-200 font-medium text-sm">
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
import type { Product } from '~/types';

const props = defineProps<{
    product: Product;
}>();

const router = useRouter();

const formattedPrice = computed(() => {
    return parseFloat(props.product.price).toFixed(2);
});

const navigateToDetail = () => {
    router.push(`/products/${props.product.slug}`);
};
</script>
