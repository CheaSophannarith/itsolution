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
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    <div v-for="item in wishlistStore.items" :key="item.uuid" 
                        class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                        
                        <!-- Product Image -->
                        <div v-if="item?.product" class="relative aspect-square bg-gray-50 cursor-pointer group" 
                            @click="() => navigateToProduct(item.product.slug)">
                            <img :src="item.product.image" :alt="item.product.name"
                                class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                            
                            <!-- Remove Button -->
                            <button
                                @click.stop="() => removeFromWishlist(item.product.uuid, item.product.slug)"
                                :disabled="removing === item.product.slug"
                                class="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 group/remove"
                            >
                                <X class="w-4 h-4 text-gray-600 group-hover/remove:text-red-500 transition-colors" />
                            </button>
                        </div>

                        <!-- Product Info -->
                        <div v-if="item?.product" class="p-4">
                            <h3 class="font-medium text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base cursor-pointer hover:text-brand transition-colors"
                                @click="() => navigateToProduct(item.product.slug)">
                                {{ item.product.name }}
                            </h3>
                            
                            <p class="text-lg font-semibold text-gray-900 mb-3">
                                ${{ parseFloat(item.product.price).toFixed(2) }}
                            </p>

                            <!-- Action Buttons -->
                            <div class="flex gap-2">
                                <button 
                                    @click="() => addToCart(item.product)"
                                    :disabled="addingToCart === item.product.slug || isInCart(item.product.slug)"
                                    class="flex-1 bg-brand text-white px-3 py-2 rounded text-sm font-medium hover:bg-brand/90 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200"
                                    :class="{ 'bg-green-600 hover:bg-green-700': isInCart(item.product.slug) }"
                                >
                                    <span v-if="addingToCart === item.product.slug" class="flex items-center justify-center gap-2">
                                        <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Adding...
                                    </span>
                                    <span v-else-if="isInCart(item.product.slug)" class="flex items-center justify-center gap-1">
                                        <Check class="w-4 h-4" />
                                        In Cart
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
    return cartStore.items.some(item => item.productSlug === productSlug);
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

        addItem({
            skuUuid: sku.uuid,
            productUuid: detail.uuid,
            productName: detail.name,
            productSlug: detail.slug,
            variantLabel: sku.attribute_options.map(o => o.label).join(' / '),
            image: detail.images.featured?.thumb ?? product.image,
            price: parseFloat(sku.price),
            maxQuantity: sku.stock_quantity,
            category: detail.categories[0]?.name,
        });
        addToast(`${detail.name} added to cart!`, 'success');
    } catch (error) {
        console.error('Error adding to cart:', error);
        // Fallback to detail page on error
        router.push(`/products/${product.slug}?action=add-to-cart`);
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