<template>
    <div
        class="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 flex flex-col h-full w-full">
        <!-- Product Image -->
        <div class="relative aspect-square bg-gray-50 overflow-hidden cursor-pointer" @click="navigateToDetail">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            
            <!-- Wishlist Button -->
            <button
                @click.stop="toggleWishlist"
                :disabled="wishlistLoading"
                class="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 group/heart"
                :class="{ 'bg-red-50 hover:bg-red-100': isInWishlist }"
                :title="authStore.isAuthenticated ? (isInWishlist ? 'Remove from wishlist' : 'Add to wishlist') : 'Sign in to add to wishlist'"
            >
                <Heart
                    class="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 group-hover/heart:scale-110"
                    :class="isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600 group-hover/heart:text-red-500'"
                />
            </button>
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
                    <button @click="handleAddToCart" :disabled="!product.in_stock || adding || isInCart"
                        class="flex-1 bg-brand text-white px-2.5 py-2.5 rounded hover:bg-brand/90 active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium text-[11px] sm:text-xs text-center whitespace-nowrap"
                        :class="{ 'bg-black ! hover:bg-black !': isInCart }">
                        <span v-if="adding" class="flex items-center justify-center gap-1">
                            <span class="inline-block w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span class="hidden lg:inline">Adding...</span>
                        </span>
                        <span v-else-if="isInCart" class="flex items-center justify-center gap-1">
                            <span class="inline-block text-sm">✓</span>
                            <span class="hidden lg:inline">Added</span>
                        </span>
                        <span v-else>
                            <span class="hidden lg:inline">Add to cart</span>
                            <span class="lg:hidden">Add</span>
                        </span>
                    </button>
                    <button @click="handleBuyNow" :disabled="!product.in_stock || adding"
                        class="flex-1 bg-gray-900 text-white px-2.5 py-1.5 rounded hover:bg-gray-800 active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium text-[11px] sm:text-xs whitespace-nowrap">
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
