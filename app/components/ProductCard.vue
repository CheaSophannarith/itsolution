<template>
    <div
        class="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full w-full hover:-translate-y-1">
        <!-- Product Image -->
        <div class="relative aspect-square bg-gray-50/50 overflow-hidden cursor-pointer" @click="navigateToDetail">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-contain p-4 sm:p-5 group-hover:scale-110 transition-transform duration-700 ease-out" />

            <!-- Status Badge -->
            <div v-if="!product.in_stock"
                class="absolute top-2.5 left-2.5 bg-red-500/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-semibold px-2.5 py-1 rounded-lg tracking-wide">
                Out of Stock
            </div>
            <div v-else-if="product.is_featured"
                class="absolute top-2.5 left-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] sm:text-[10px] font-semibold px-2.5 py-1 rounded-lg tracking-wide">
                Featured
            </div>
        </div>

        <!-- Divider -->
        <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <!-- Product Info -->
        <div class="px-3 pb-3 pt-2.5 sm:px-4 sm:pb-4 sm:pt-3 flex flex-col grow">
            <!-- Product Name -->
            <h3 class="text-[11px] sm:text-sm font-medium text-gray-700 mb-2 sm:mb-2.5 line-clamp-2 cursor-pointer group-hover:text-brand transition-colors duration-300 leading-snug"
                @click="navigateToDetail">
                {{ product.name }}
            </h3>

            <!-- Price & Buttons -->
            <div class="mt-auto">
                <p class="text-sm sm:text-base font-bold text-pink-600 mb-2 sm:mb-3 tracking-tight">${{ formattedPrice }}</p>

                <!-- Action Buttons -->
                <div class="flex gap-1.5 sm:gap-2">
                    <button @click="handleAddToCart" :disabled="!product.in_stock || adding"
                        class="flex-1 bg-brand text-white px-1.5 sm:px-2.5 py-1.5 sm:py-2 rounded-xl hover:bg-brand/90 hover:shadow-md hover:shadow-brand/20 active:scale-[0.97] disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 font-semibold text-[10px] sm:text-xs whitespace-nowrap"
                        :class="{ 'bg-green-500! shadow-green-500/20!': added }">
                        <span v-if="adding">Adding...</span>
                        <span v-else-if="added">&#10003; Added</span>
                        <span v-else>Add to cart</span>
                    </button>
                    <button @click="navigateToDetail"
                        class="flex-1 bg-gray-900 text-white px-1.5 sm:px-2.5 py-1.5 sm:py-2 rounded-xl hover:bg-gray-800 hover:shadow-md active:scale-[0.97] transition-all duration-300 font-semibold text-[10px] sm:text-xs whitespace-nowrap">
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
