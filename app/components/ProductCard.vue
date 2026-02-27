<template>
    <div
        class="group relative bg-white overflow-hidden transition-all duration-300 flex flex-col h-full w-full shadow-xs rounded-lg hover:shadow-sm">

        <!-- Product Image -->
        <div class="relative aspect-square bg-white overflow-hidden cursor-pointer" @click="navigateToDetail">
            <img
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-300"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                <ImageOff class="w-12 h-12" />
            </div>

            <!-- Wishlist Button -->
            <button @click.stop="toggleWishlist" :disabled="wishlistLoading"
                class="absolute top-3 right-3 p-2 transition-all duration-300 group/heart z-10"
                :title="authStore.isAuthenticated ? (isInWishlist ? 'Remove from wishlist' : 'Add to wishlist') : 'Sign in to add to wishlist'">
                <Heart
                    class="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover/heart:scale-125 drop-shadow-md"
                    :class="isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-700 group-hover/heart:text-red-500'" />
            </button>
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

            <!-- Brand -->
            <p v-if="product.brand" class="text-xs text-gray-500 mb-4">
                {{ product.brand.name }}
            </p>

            <!-- Price & Button -->
            <div class="mt-auto space-y-3">
                <!-- Price Display -->
                <div class="flex items-baseline gap-2">
                    <span class="font-bold text-lg text-gray-900">${{ formattedPrice }}</span>
                    <span v-if="product.compare_at_price" class="text-sm text-gray-400 line-through">${{
                        formattedComparePrice }}</span>
                    <span v-if="discountPercent"
                        class="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        -{{ discountPercent }}%
                    </span>
                </div>

                <!-- Out of Stock -->
                <div v-if="!product.in_stock"
                    class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed select-none">
                    <PackageX class="w-4 h-4" />
                    Out of Stock
                </div>

                <!-- Add to Cart / In Cart Button -->
                <template v-else>
                    <!-- Already in cart: split button -->
                    <div v-if="isInCart" class="flex gap-2">
                        <div
                            class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold shadow-sm shadow-emerald-200 select-none">
                            In Cart
                        </div>
                        <button @click="openCartDrawer"
                            class="px-3 py-2.5 rounded-xl border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors duration-200 text-sm font-medium"
                            title="View cart">
                            <ShoppingCart class="w-4 h-4" />
                        </button>
                    </div>

                    <!-- Add button with loading state -->
                    <button v-else @click="handleAddToCart" :disabled="adding" class="w-full relative flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 overflow-hidden
                               bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.97]
                               disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                        :aria-label="adding ? 'Adding to cart…' : 'Add to cart'">

                        <!-- Shimmer on hover -->
                        <span
                            class="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <span v-if="adding" class="flex items-center gap-2">
                            <span
                                class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Adding…
                        </span>
                        <span v-else class="flex items-center gap-2">
                            <ShoppingCart class="w-4 h-4" />
                            Add to Cart
                        </span>
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { Heart, ShoppingCart, Check, PackageX, ImageOff } from 'lucide-vue-next';
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

    const discountPercent = computed(() => {
        if (!props.product.compare_at_price) return null;
        const orig = parseFloat(props.product.compare_at_price);
        const curr = parseFloat(props.product.price);
        if (!orig || orig <= curr) return null;
        return Math.round(((orig - curr) / orig) * 100);
    });

    const { openCartDrawer } = useCartDrawer();

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

        0%,
        100% {
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
