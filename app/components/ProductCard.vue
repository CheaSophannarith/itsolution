<template>
    <div class="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/60 hover:border-brand/40 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        <!-- Product Image -->
        <div class="relative aspect-square bg-white overflow-hidden cursor-pointer"
            @click="navigateToDetail">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-300" />

            <!-- Status Badge -->
            <div v-if="!product.in_stock" class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                Out of Stock
            </div>
            <div v-else-if="product.is_featured" class="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                Featured
            </div>
        </div>

        <!-- Product Info -->
        <div class="p-3 sm:p-4 flex flex-col flex-grow">
            <!-- Brand -->
            <p class="text-[10px] sm:text-xs text-gray-500 font-medium mb-1 uppercase tracking-wide">{{ product.brand.name }}</p>

            <!-- Product Name -->
            <h3 class="text-xs sm:text-sm font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer group-hover:text-brand transition-colors min-h-[36px] sm:min-h-[40px] leading-snug"
                @click="navigateToDetail">
                {{ product.name }}
            </h3>

            <!-- Price Section -->
            <div class="mt-auto">
                <div class="mb-3">
                    <div v-if="product.compare_at_price" class="flex items-center gap-2 mb-1">
                        <span class="text-[10px] sm:text-xs text-gray-400 line-through">${{ formatPrice(product.compare_at_price) }}</span>
                        <span class="text-[10px] sm:text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">{{ discountPercentage }}% OFF</span>
                    </div>
                    <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">${{ formattedPrice }}</p>
                </div>

                <!-- Action Button -->
                <button @click="handleAddToCart" :disabled="!product.in_stock"
                    class="w-full bg-brand text-white px-4 py-2.5 sm:py-3 rounded-xl hover:bg-brand/90 active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                    <ShoppingCart class="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    <span>{{ product.in_stock ? 'Add to Cart' : 'Out of Stock' }}</span>
                </button>
            </div>
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

const formatPrice = (price: string) => {
    return parseFloat(price).toFixed(2);
};

const discountPercentage = computed(() => {
    if (!props.product.compare_at_price) return 0;
    const original = parseFloat(props.product.compare_at_price);
    const current = parseFloat(props.product.price);
    return Math.round(((original - current) / original) * 100);
});

const navigateToDetail = () => {
    router.push(`/products/${props.product.slug}`);
};

const handleAddToCart = () => {
    if (!props.product.in_stock) return;
    // Navigate to product detail page to select variant/options and add to cart
    router.push(`/products/${props.product.slug}?action=add-to-cart`);
};
</script>
