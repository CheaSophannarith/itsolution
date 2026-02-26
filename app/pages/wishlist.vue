<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">

            <!-- Page Header -->
            <div class="mb-8" data-aos="fade-down">
                <div class="flex items-center gap-2 text-xs text-gray-400 mb-4 font-medium tracking-wide">
                    <NuxtLink to="/" class="hover:text-brand transition-colors">Home</NuxtLink>
                    <ChevronRight class="w-3 h-3" />
                    <span class="text-gray-600">My Wishlist</span>
                </div>
                <div class="flex items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">My Wishlist</h1>
                        <p class="text-sm text-gray-500 mt-1">
                            <template v-if="wishlistStore.totalItems > 0">
                                {{ wishlistStore.totalItems }} item{{ wishlistStore.totalItems !== 1 ? 's' : '' }} saved
                            </template>
                            <template v-else>Items you love, saved for later</template>
                        </p>
                    </div>
                    <div v-if="!wishlistStore.loading && wishlistStore.totalItems > 0"
                        class="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <Heart class="w-4 h-4 text-rose-400 fill-rose-400" />
                        <span class="text-sm font-bold text-gray-800">{{ wishlistStore.totalItems }}</span>
                        <span class="text-sm text-gray-500 hidden sm:inline">Saved</span>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="wishlistStore.loading && !wishlistStore.initialized">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    <div v-for="n in 8" :key="n"
                        class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                        <div class="aspect-square bg-gray-100"></div>
                        <div class="p-4 space-y-3">
                            <div class="h-2.5 w-16 bg-gray-200 rounded-full"></div>
                            <div class="h-4 w-full bg-gray-200 rounded-full"></div>
                            <div class="h-3.5 w-3/4 bg-gray-100 rounded-full"></div>
                            <div class="h-5 w-24 bg-gray-200 rounded-full"></div>
                            <div class="h-9 w-full bg-gray-100 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="wishlistStore.totalItems === 0"
                class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 sm:p-16 text-center"
                data-aos="fade-up">
                <div class="max-w-xs mx-auto">
                    <div class="relative w-24 h-24 mx-auto mb-6">
                        <div class="absolute inset-0 bg-rose-100/60 rounded-3xl rotate-6"></div>
                        <div class="absolute inset-0 bg-rose-50/60 rounded-3xl -rotate-3"></div>
                        <div class="relative w-24 h-24 bg-white border-2 border-gray-100 rounded-3xl flex items-center justify-center shadow-sm">
                            <Heart class="w-10 h-10 text-gray-300" />
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h3>
                    <p class="text-sm text-gray-500 mb-8 leading-relaxed">
                        Save items you love and come back to them anytime.
                    </p>
                    <NuxtLink to="/"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand/90 transition-all font-semibold text-sm group shadow-sm hover:shadow-md hover:shadow-brand/20">
                        <ShoppingBag class="w-4 h-4" />
                        Browse Products
                        <ArrowRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </NuxtLink>
                </div>
            </div>

            <!-- Wishlist Grid -->
            <div v-else>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    <div v-for="(item, index) in wishlistStore.items" :key="item.uuid"
                        class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 group flex flex-col"
                        data-aos="fade-up" :data-aos-delay="(index % 8) * 50">

                        <!-- Product Image -->
                        <div v-if="item?.product"
                            class="relative aspect-square bg-gray-50 cursor-pointer overflow-hidden"
                            @click="navigateToProduct(item.product.slug)">

                            <img :src="item.product.image || '/placeholder-product.png'"
                                :alt="item.product.name"
                                class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />

                            <!-- Discount Badge -->
                            <div v-if="item.product.compare_at_price && parseFloat(item.product.compare_at_price) > parseFloat(item.product.price)"
                                class="absolute top-2.5 left-2.5 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                                -{{ Math.round((1 - parseFloat(item.product.price) / parseFloat(item.product.compare_at_price)) * 100) }}%
                            </div>

                            <!-- Remove Button -->
                            <button
                                @click.stop="removeFromWishlist(item.product.uuid, item.product.slug)"
                                :disabled="removing === item.product.slug"
                                class="absolute top-3 right-3 p-2 transition-all duration-300 z-10">
                                <span v-if="removing === item.product.slug"
                                    class="w-4 h-4 sm:w-5 sm:h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin block">
                                </span>
                                <Trash2 v-else class="w-5 h-5 sm:w-6 sm:h-6 text-red-500 drop-shadow-md transition-all duration-300 hover:scale-125" />
                            </button>

                            <!-- Out of Stock Overlay -->
                            <div v-if="!item.product.in_stock"
                                class="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
                                <span class="px-3 py-1 bg-gray-800/80 text-white text-xs font-semibold rounded-full">
                                    Out of Stock
                                </span>
                            </div>
                        </div>

                        <!-- Product Info -->
                        <div v-if="item?.product" class="p-4 flex flex-col flex-1">
                            <p v-if="item.product.brand" class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
                                {{ item.product.brand.name }}
                            </p>

                            <h3 class="text-sm font-semibold text-gray-800 mb-3 line-clamp-2 cursor-pointer hover:text-brand transition-colors leading-snug flex-1"
                                @click="navigateToProduct(item.product.slug)">
                                {{ item.product.name }}
                            </h3>

                            <!-- Price -->
                            <div class="flex items-center gap-2 mb-3">
                                <span class="text-base font-extrabold text-gray-900">
                                    ${{ parseFloat(item.product.price).toFixed(2) }}
                                </span>
                                <span v-if="item.product.compare_at_price && parseFloat(item.product.compare_at_price) > parseFloat(item.product.price)"
                                    class="text-xs text-gray-400 line-through">
                                    ${{ parseFloat(item.product.compare_at_price).toFixed(2) }}
                                </span>
                            </div>

                            <!-- Out of Stock -->
                            <div v-if="!item.product.in_stock"
                                class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed select-none">
                                <PackageX class="w-4 h-4" />
                                Out of Stock
                            </div>

                            <template v-else>
                                <!-- In Cart: split button -->
                                <div v-if="isInCart(item.product.slug)" class="flex gap-2">
                                    <div class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-semibold shadow-sm shadow-emerald-200 select-none">
                                        In Cart
                                    </div>
                                    <button @click="openCartDrawer"
                                        class="px-3 py-2.5 rounded-xl border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
                                        title="View cart">
                                        <ShoppingCart class="w-4 h-4" />
                                    </button>
                                </div>

                                <!-- Add to Cart -->
                                <button v-else @click="addToCart(item.product)" :disabled="addingToCart === item.product.slug"
                                    class="w-full relative flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 overflow-hidden bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100">
                                    <span class="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    <span v-if="addingToCart === item.product.slug" class="flex items-center gap-2">
                                        <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

                <!-- Footer CTA -->
                <div class="text-center pt-10" data-aos="fade-up">
                    <NuxtLink to="/"
                        class="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand transition-colors group">
                        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Continue Shopping
                    </NuxtLink>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Heart, Trash2, ShoppingBag, ShoppingCart, ArrowLeft, ArrowRight, PackageX, ChevronRight } from 'lucide-vue-next';
import type { WishlistProduct } from '~/types';
import type { ProductDetailResponse } from '~/types/models/product-detail';
import AOS from 'aos';
import 'aos/dist/aos.css';

definePageMeta({
    middleware: 'auth',
    title: 'My Wishlist'
});

const router = useRouter();
const config = useRuntimeConfig();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const { addItem } = useCart();
const { addToast } = useToast();

const removing = ref<string | null>(null);
const addingToCart = ref<string | null>(null);
const { openCartDrawer } = useCartDrawer();

await wishlistStore.initializeWishlist();

onMounted(() => {
    AOS.init({ duration: 600, once: true, offset: 30 });
});

const isInCart = (productSlug: string) => {
    return cartStore.items.some(item => item.sku.product.slug === productSlug);
};

const navigateToProduct = (slug: string) => {
    router.push(`/products/${slug}`);
};

const removeFromWishlist = async (productUuid: string, productSlug: string) => {
    if (removing.value) return;
    removing.value = productSlug;
    try {
        await wishlistStore.removeItem(productUuid, productSlug);
    } catch (error) {
        addToast('Failed to remove item from wishlist', 'error');
    } finally {
        removing.value = null;
    }
};

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
    @reference '~/assets/css/tailwind.css';

    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
