<template>
    <div
        class="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 flex flex-col h-full w-full">
        <!-- Product Image -->
        <div class="relative aspect-square bg-gray-50 overflow-hidden cursor-pointer" @click="navigateToDetail">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-contain p-4 sm:p-5 group-hover:scale-105 transition-transform duration-300" />

            <!-- Status Badge -->
            <div v-if="!product.in_stock"
                class="absolute top-3 left-3 bg-red-500 text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-md">
                Out of Stock
            </div>
            <div v-else-if="product.is_featured"
                class="absolute top-3 left-3 bg-amber-500 text-white text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-md">
                Featured
            </div>
        </div>

        <!-- Product Info -->
        <div class="px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5 flex flex-col grow border-t border-gray-100">
            <!-- Product Name -->
            <h3 class="text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 cursor-pointer group-hover:text-brand transition-colors duration-200 leading-relaxed"
                @click="navigateToDetail">
                {{ product.name }}
            </h3>

            <!-- Price & Buttons -->
            <div class="mt-auto">
                <p class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-3.5">${{ formattedPrice }}</p>

                <!-- Action Buttons -->
                <div class="flex gap-2">
                    <button @click="handleAddToCart" :disabled="!product.in_stock || adding"
                        class="flex-1 bg-brand text-white px-2.5 py-1.5 rounded hover:bg-brand/90 active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium text-[11px] sm:text-xs text-center whitespace-nowrap"
                        :class="{ 'bg-green-500!': added }">
                        <span v-if="adding" class="flex items-center justify-center gap-1">
                            <span class="inline-block w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span class="hidden lg:inline">Adding...</span>
                        </span>
                        <span v-else-if="added" class="flex items-center justify-center gap-1">
                            <span class="inline-block animate-scale-in text-sm">✓</span>
                            <span class="hidden lg:inline">Added</span>
                        </span>
                        <span v-else>
                            <span class="hidden lg:inline">Add to cart</span>
                            <span class="lg:hidden">Add</span>
                        </span>
                    </button>
                    <button @click="navigateToDetail"
                        class="flex-1 bg-gray-900 text-white px-2.5 py-1.5 rounded hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 font-medium text-[11px] sm:text-xs whitespace-nowrap">
                        <span class="hidden lg:inline">Buy now</span>
                        <span class="lg:hidden">Buy</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import type { Product } from '~/types';
    import type { ProductDetailResponse } from '~/types/models/product-detail';

    const props = defineProps<{
        product: Product;
    }>();

    const router = useRouter();
    const config = useRuntimeConfig();
    const { addItem } = useCart();
    const { addToast } = useToast();

    const adding = ref(false);
    const added = ref(false);

    const formattedPrice = computed(() => {
        return parseFloat(props.product.price).toFixed(2);
    });

    const navigateToDetail = () => {
        router.push(`/products/${props.product.slug}`);
    };

    const handleAddToCart = async () => {
        if (!props.product.in_stock || adding.value) return;

        adding.value = true;
        try {
            const res = await $fetch<ProductDetailResponse>(
                `${config.public.apiBaseUrl}/api/v1/products/${props.product.slug}`
            );
            const detail = res.data;
            const sku = detail.skus.find(s => s.is_in_stock);
            if (!sku) return;

            addItem({
                skuUuid: sku.uuid,
                productUuid: detail.uuid,
                productName: detail.name,
                productSlug: detail.slug,
                variantLabel: sku.attribute_options.map(o => o.label).join(' / '),
                image: detail.images.featured?.thumb ?? props.product.image,
                price: parseFloat(sku.price),
                maxQuantity: sku.stock_quantity,
                category: detail.categories[0]?.name,
            });
            added.value = true;
            addToast(`${detail.name} added to cart!`, 'success');
            setTimeout(() => { added.value = false; }, 1500);
        } catch {
            // Fallback to detail page on error
            router.push(`/products/${props.product.slug}?action=add-to-cart`);
        } finally {
            adding.value = false;
        }
    };
</script>

<style scoped>
@keyframes bounce-once {
    0%, 100% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-8px);
    }
    50% {
        transform: translateY(0);
    }
    75% {
        transform: translateY(-4px);
    }
}

@keyframes scale-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
}

.animate-bounce-once {
    animation: bounce-once 0.6s ease-in-out;
}

.animate-scale-in {
    animation: scale-in 0.4s ease-out;
}
</style>
