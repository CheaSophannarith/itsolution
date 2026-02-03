<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Page Header -->
        <div class="bg-white border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="py-6 sm:py-8">
                    <div class="flex items-center gap-3">
                        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">My Wishlist</h1>
                    </div>
                    <!-- <p class="text-gray-600 mt-2 text-sm sm:text-base">
                        {{ wishlistStore.totalItems }} {{ wishlistStore.totalItems === 1 ? 'item' : 'items' }} saved for later
                    </p> -->
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <!-- Loading State -->
            <div v-if="wishlistStore.loading && !wishlistStore.initialized" class="text-center py-12">
                <div class="inline-block w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
                <p class="text-gray-500 mt-4">Loading your wishlist...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="wishlistStore.totalItems === 0" class="text-center py-12 sm:py-16">
                <div class="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Heart class="w-12 h-12 text-gray-400" />
                </div>
                <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">Your wishlist is empty</h2>
                <p class="text-gray-500 mb-8 max-w-md mx-auto">
                    Start adding products you love to your wishlist. You can save them for later or share with friends.
                </p>
                <NuxtLink to="/" 
                    class="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-lg font-medium hover:bg-brand/90 transition-colors">
                    <ShoppingBag class="w-5 h-5" />
                    Continue Shopping
                </NuxtLink>
            </div>

            <!-- Wishlist Items -->
            <div v-else class="space-y-4">
                <!-- Grid Layout for larger screens, Stack for mobile -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    <div v-for="item in wishlistStore.items" :key="item.uuid"
                        class="bg-white overflow-hidden transition-all duration-300">

                        <!-- Product Image -->
                        <div v-if="item?.product" class="relative aspect-square bg-white cursor-pointer group"
                            @click="() => navigateToProduct(item.product.slug)">
                            <img :src="item.product.image || '/placeholder-product.png'" :alt="item.product.name"
                                class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />

                            <!-- Remove Button -->
                            <button
                                @click.stop="() => removeFromWishlist(item.product.uuid, item.product.slug)"
                                :disabled="removing === item.product.slug"
                                class="absolute top-3 right-3 p-2 transition-all duration-300 group/remove z-10"
                            >
                                <X class="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover/remove:text-red-500 transition-colors drop-shadow-md" />
                            </button>
                        </div>

                        <!-- Product Info -->
                        <div v-if="item?.product" class="px-4 pb-4 pt-3">
                            <h3 class="text-base font-bold text-gray-900 mb-1 cursor-pointer hover:text-brand transition-colors duration-300 min-h-10"
                                @click="() => navigateToProduct(item.product.slug)">
                                {{ item.product.name }}
                            </h3>

                            <!-- Brand -->
                            <p v-if="item.product.brand" class="text-xs text-gray-500 mb-4">
                                {{ item.product.brand.name }}
                            </p>

                            <!-- Price & Button -->
                            <div class="space-y-2">
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-lg text-gray-900">${{ parseFloat(item.product.price).toFixed(2) }}</span>
                                    <span v-if="item.product.compare_at_price" class="text-sm text-gray-400 line-through">${{ parseFloat(item.product.compare_at_price).toFixed(2) }}</span>
                                </div>

                                <button
                                    @click="() => addToCart(item.product)"
                                    :disabled="addingToCart === item.product.slug || isInCart(item.product.slug)"
                                    class="w-full bg-white border-2 border-gray-200 text-gray-900 py-2.5 hover:border-gray-900 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 transition-all duration-300 font-medium text-sm"
                                    :class="{ 'border-green-600 bg-green-50 text-green-700': isInCart(item.product.slug) }"
                                >
                                    <span v-if="addingToCart === item.product.slug" class="flex items-center justify-center gap-2">
                                        <span class="inline-block w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
                                        <span>Adding...</span>
                                    </span>
                                    <span v-else-if="isInCart(item.product.slug)" class="flex items-center justify-center gap-2">
                                        <Check class="w-4 h-4" />
                                        <span>In Cart</span>
                                    </span>
                                    <span v-else>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Continue Shopping Button -->
                <div class="text-center pt-8">
                    <NuxtLink to="/" 
                        class="inline-flex items-center gap-2 text-brand hover:text-brand/80 font-medium transition-colors">
                        <ArrowLeft class="w-5 h-5" />
                        Continue Shopping
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Heart, X, ShoppingBag, ArrowLeft, Check } from 'lucide-vue-next';
import type { WishlistProduct } from '~/types';
import type { ProductDetailResponse } from '~/types/models/product-detail';

definePageMeta({
    middleware: 'auth',
    title: 'My Wishlist'
});

const router = useRouter();
const config = useRuntimeConfig();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const { addItem } = useCart();
const { addToast } = useToast();

const removing = ref<string | null>(null);
const addingToCart = ref<string | null>(null);

// Initialize wishlist on page load
await wishlistStore.initializeWishlist();

// Check if product is in cart
const isInCart = (productSlug: string) => {
    return cartStore.items.some(item => item.sku.product.slug === productSlug);
};

// Navigate to product detail page
const navigateToProduct = (slug: string) => {
    router.push(`/products/${slug}`);
};

// Remove item from wishlist
const removeFromWishlist = async (productUuid: string, productSlug: string) => {
    if (removing.value) return;

    removing.value = productSlug;
    try {
        await wishlistStore.removeItem(productUuid, productSlug);
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        addToast('Failed to remove item from wishlist', 'error');
    } finally {
        removing.value = null;
    }
};

// Add product to cart
const addToCart = async (product: WishlistProduct) => {
    if (!product.in_stock || addingToCart.value === product.slug || isInCart(product.slug)) return;

    addingToCart.value = product.slug;
    try {
        const res = await $fetch<ProductDetailResponse>(
            `${config.public.apiBaseUrl}/api/v1/products/${product.slug}`
        );
        const detail = res.data;
        const sku = detail.skus.find(s => s.is_in_stock);
        if (!sku) {
            addToast('Product is out of stock', 'error');
            return;
        }

        await addItem(sku.uuid, 1);
        addToast(`${detail.name} added to cart!`, 'success');
    } catch (error: any) {
        console.error('Error adding to cart:', error);

        // Check if error is due to authentication
        if (error.message?.includes('sign in')) {
            addToast('Please sign in to add items to cart', 'info');
        } else {
            addToast('Failed to add to cart', 'error');
        }
    } finally {
        addingToCart.value = null;
    }
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>