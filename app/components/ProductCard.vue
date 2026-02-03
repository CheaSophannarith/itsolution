<template>
    <div
        class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-500 flex flex-col h-full w-full">
        <!-- Product Image -->
        <div class="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100/50 overflow-hidden cursor-pointer" @click="navigateToDetail">
            <img :src="product.image" :alt="product.name"
                class="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-out" />

            <!-- Image Overlay on Hover -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <!-- Wishlist Button -->
            <button
                @click.stop="toggleWishlist"
                :disabled="wishlistLoading"
                class="absolute top-3 right-3 p-2.5 bg-white/90 hover:bg-white backdrop-blur-md rounded-full shadow-md hover:shadow-xl transition-all duration-300 group/heart z-10 border border-gray-100"
                :class="{ 'bg-red-50/90 hover:bg-red-50 border-red-100': isInWishlist }"
                :title="authStore.isAuthenticated ? (isInWishlist ? 'Remove from wishlist' : 'Add to wishlist') : 'Sign in to add to wishlist'"
            >
                <Heart
                    class="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 group-hover/heart:scale-125"
                    :class="isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-700 group-hover/heart:text-red-500'"
                />
            </button>
        </div>

        <!-- Product Info -->
        <div class="px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6 flex flex-col grow">
            <!-- Product Name -->
            <h3 class="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 cursor-pointer group-hover:text-brand transition-colors duration-300 leading-snug"
                @click="navigateToDetail">
                {{ product.name }}
            </h3>

            <!-- Price & Buttons -->
            <div class="mt-auto space-y-4">
                <p class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">${{ formattedPrice }}</p>

                <!-- Action Buttons -->
                <div class="flex gap-1.5 sm:gap-2.5">
                    <button @click="handleAddToCart" :disabled="!product.in_stock || adding || isInCart"
                        class="flex-1 bg-brand text-white px-1.5 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl hover:bg-brand/90 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300 font-semibold text-[9px] sm:text-xs lg:text-sm text-center whitespace-nowrap"
                        :class="{ 'bg-black ! hover:bg-black !': isInCart }">
                        <span v-if="adding" class="flex items-center justify-center gap-1 sm:gap-2">
                            <span class="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Adding...</span>
                        </span>
                        <span v-else-if="isInCart" class="flex items-center justify-center gap-1 sm:gap-1.5">
                            <span class="inline-block text-sm sm:text-base">✓</span>
                            <span>Added</span>
                        </span>
                        <span v-else>
                            Add to cart
                        </span>
                    </button>
                    <button @click="handleBuyNow" :disabled="!product.in_stock || adding"
                        class="flex-1 bg-gray-900 text-white px-1.5 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all duration-300 font-semibold text-[9px] sm:text-xs lg:text-sm text-center whitespace-nowrap">
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
