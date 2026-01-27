<template>
    <div
        class="group relative bg-white overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        <!-- Product Image -->
        <div class="relative aspect-square bg-white overflow-hidden cursor-pointer" @click="navigateToDetail">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-300" />

            <!-- Status Badge -->
            <div v-if="!product.in_stock"
                class="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
                Out of Stock
            </div>
            <div v-else-if="product.is_featured"
                class="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
                Featured
            </div>
        </div>

        <!-- Product Info -->
        <div class="px-2 pb-2 pt-1 sm:px-3 sm:pb-3 sm:pt-2 flex flex-col grow">
            <!-- Product Name -->
            <h3 class="text-[11px] sm:text-sm font-medium text-gray-900 mb-1 sm:mb-1.5 line-clamp-2 cursor-pointer group-hover:text-brand transition-colors leading-snug"
                @click="navigateToDetail">
                {{ product.name }}
            </h3>

            <!-- Price & Buttons -->
            <div class="mt-auto">
                <p class="text-xs sm:text-base font-bold text-pink-500 mb-1.5 sm:mb-2">${{ formattedPrice }}</p>

                <!-- Action Buttons -->
                <div class="flex gap-1 sm:gap-1.5">
                    <button @click="handleAddToCart" :disabled="!product.in_stock"
                        class="bg-brand text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded hover:bg-brand/90 active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-[10px] sm:text-xs whitespace-nowrap">
                        Add to cart
                    </button>
                    <button @click="navigateToDetail"
                        class="bg-brand text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded hover:bg-brand/90 active:scale-[0.98] transition-all duration-200 font-semibold text-[10px] sm:text-xs whitespace-nowrap">
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
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

    const handleAddToCart = () => {
        if (!props.product.in_stock) return;
        // Navigate to product detail page to select variant/options and add to cart
        router.push(`/products/${props.product.slug}?action=add-to-cart`);
    };
</script>
