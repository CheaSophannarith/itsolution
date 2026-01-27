<template>
    <div
        class="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full w-full">
        <!-- Product Image -->
        <div class="relative aspect-square bg-white overflow-hidden cursor-pointer" @click="navigateToDetail">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300" />

            <!-- Status Badge -->
            <div v-if="!product.in_stock"
                class="absolute top-2 left-2 bg-red-500 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Out of Stock
            </div>
            <div v-else-if="product.is_featured"
                class="absolute top-2 left-2 bg-orange-500 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Featured
            </div>
        </div>

        <!-- Product Info -->
        <div class="px-2.5 pb-2.5 pt-2 sm:px-3 sm:pb-3 sm:pt-2 flex flex-col grow">
            <!-- Product Name -->
            <h3 class="text-[11px] sm:text-sm font-medium text-gray-800 mb-1.5 sm:mb-2 line-clamp-2 cursor-pointer group-hover:text-brand transition-colors leading-snug"
                @click="navigateToDetail">
                {{ product.name }}
            </h3>

            <!-- Price & Buttons -->
            <div class="mt-auto">
                <p class="text-sm sm:text-base font-bold text-pink-600 mb-1.5 sm:mb-2">${{ formattedPrice }}</p>

                <!-- Action Buttons -->
                <div class="flex gap-1 sm:gap-1.5">
                    <button @click="handleAddToCart" :disabled="!product.in_stock || adding"
                        class="flex-1 bg-brand text-white px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md hover:bg-brand/90 active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-[10px] sm:text-xs"
                        :class="{ 'bg-green-500!': added }">
                        <span v-if="adding">Adding...</span>
                        <span v-else-if="added">✓ Added</span>
                        <span v-else>Add to cart</span>
                    </button>
                    <button @click="navigateToDetail"
                        class="flex-1 bg-brand text-white px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md hover:bg-brand/90 active:scale-[0.98] transition-all duration-200 font-semibold text-[10px] sm:text-xs">
                        Buy now
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
            });
            added.value = true;
            setTimeout(() => { added.value = false; }, 1500);
        } catch {
            // Fallback to detail page on error
            router.push(`/products/${props.product.slug}?action=add-to-cart`);
        } finally {
            adding.value = false;
        }
    };
</script>
