<template>
    <div
        class="group relative bg-white overflow-hidden transition-all duration-300 flex flex-col h-full w-full">

        <!-- Product Image -->
        <div class="relative aspect-square bg-white overflow-hidden cursor-pointer" @click="navigateToDetail">
            <img :src="product.image || '/placeholder-product.png'" :alt="product.name"
                class="w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-300" />
        </div>

        <!-- Product Info -->
        <div class="px-4 pb-4 pt-3 flex flex-col grow">
            <!-- Best Badge -->
            <div v-if="product.is_featured" class="mb-2">
                <span class="inline-block bg-yellow-600 text-white text-xs font-bold px-3 py-1 uppercase">
                    BEST
                </span>
            </div>

            <!-- Product Name -->
            <h3 class="text-base font-bold text-gray-900 mb-1 cursor-pointer group-hover:text-brand transition-colors duration-300 min-h-10"
                @click="navigateToDetail">
                {{ product.name }}
            </h3>

            <!-- Product Description -->
            <p v-if="product.short_description" class="text-xs text-gray-600 mb-3 line-clamp-2 min-h-10">
                {{ product.short_description }}
            </p>

            <!-- Brand -->
            <p v-if="product.brand" class="text-xs text-gray-500 mb-4">
                {{ product.brand.name }}
            </p>

            <!-- Price & Button -->
            <div class="mt-auto space-y-2">
                <!-- Price Display -->
                <div class="flex items-center gap-2">
                    <span class="font-bold text-lg text-gray-900">${{ formattedPrice }}</span>
                    <span v-if="product.compare_at_price" class="text-sm text-gray-400 line-through">${{ formattedComparePrice }}</span>
                </div>

                <!-- Add to Bag Button -->
                <button @click="handleAddToCart" :disabled="!product.in_stock || adding || isInCart"
                    class="w-full bg-white border-2 border-gray-200 text-gray-900 py-2.5 hover:border-gray-900 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 transition-all duration-300 font-medium text-sm"
                    :class="{ 'border-green-600 bg-green-50 text-green-700': isInCart }">
                    <span v-if="adding" class="flex items-center justify-center gap-2">
                        <span class="inline-block w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                        <span>Adding...</span>
                    </span>
                    <span v-else-if="isInCart" class="flex items-center justify-center gap-2">
                        <span class="text-base">✓</span>
                        <span>Added to Bag</span>
                    </span>
                    <span v-else>
                        Add to Bag
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { Heart } from 'lucide-vue-next';
    import type { Product } from '~/types';
    import type { ProductDetailResponse } from '~/types/models/product-detail';

    const props = defineProps<{
        product: Product;
    }>();

    const router = useRouter();
    const config = useRuntimeConfig();
    const { addItem } = useCart();
    const { addToast } = useToast();
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();

    const adding = ref(false);
    const wishlistLoading = ref(false);

    const formattedPrice = computed(() => {
        return parseFloat(props.product.price).toFixed(2);
    });

    const formattedComparePrice = computed(() => {
        if (!props.product.compare_at_price) return null;
        return parseFloat(props.product.compare_at_price).toFixed(2);
    });

    const discountPercentage = computed(() => {
        if (!props.product.compare_at_price) return 0;
        const original = parseFloat(props.product.compare_at_price);
        const current = parseFloat(props.product.price);
        if (original <= current) return 0;
        return Math.round(((original - current) / original) * 100);
    });

    // Check if product is already in cart
    const isInCart = computed(() => {
        return cartStore.items.some(item => item.sku.product.slug === props.product.slug);
    });

    // Check if product is in wishlist
    const isInWishlist = computed(() => {
        return wishlistStore.isInWishlist(props.product.slug);
    });

    const navigateToDetail = () => {
        router.push(`/products/${props.product.slug}`);
    };

    const handleBuyNow = async () => {
        if (!authStore.isAuthenticated) {
            addToast('Please sign in to continue', 'info');
            router.push('/signin');
            return;
        }

        if (!props.product.in_stock) {
            addToast('Product is out of stock', 'error');
            return;
        }

        try {
            // Fetch product details to get SKU
            const res = await $fetch<ProductDetailResponse>(
                `${config.public.apiBaseUrl}/api/v1/products/${props.product.slug}`
            );
            const detail = res.data;
            const sku = detail.skus.find(s => s.is_in_stock);

            if (!sku) {
                addToast('Product is out of stock', 'error');
                return;
            }

            // Navigate directly to Quick Checkout (Buy Now mode - does NOT add to cart)
            addToast('Proceeding to checkout...', 'success');
            router.push({
                path: '/checkout',
                query: {
                    buyNow: 'true',
                    slug: props.product.slug,
                    sku: sku.uuid,
                    qty: '1'
                }
            });
        } catch (error: any) {
            console.error('Failed to proceed with Buy Now:', error);

            if (error.message?.includes('sign in')) {
                addToast('Please sign in to continue', 'info');
                router.push('/signin');
            } else {
                addToast('Failed to proceed to checkout', 'error');
            }
        }
    };

    const handleAddToCart = async () => {
        if (!props.product.in_stock || adding.value || isInCart.value) return;

        adding.value = true;
        try {
            const res = await $fetch<ProductDetailResponse>(
                `${config.public.apiBaseUrl}/api/v1/products/${props.product.slug}`
            );
            const detail = res.data;
            const sku = detail.skus.find(s => s.is_in_stock);
            if (!sku) return;

            await addItem(sku.uuid, 1);
            addToast(`${detail.name} added to cart!`, 'success');
        } catch (error: any) {
            console.error('Failed to add to cart:', error);

            // Check if error is due to authentication
            if (error.message?.includes('sign in')) {
                addToast('Please sign in to add items to cart', 'info');
            } else {
                addToast('Failed to add to cart', 'error');
            }
        } finally {
            adding.value = false;
        }
    };

    const toggleWishlist = async () => {
        if (!authStore.isAuthenticated) {
            router.push('/signin');
            return;
        }

        wishlistLoading.value = true;
        try {
            await wishlistStore.toggleProduct(props.product.uuid, props.product.slug);
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            addToast('Failed to update wishlist', 'error');
        } finally {
            wishlistLoading.value = false;
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
