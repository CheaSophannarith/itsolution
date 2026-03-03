<template>
    <div
        class="group relative bg-white overflow-hidden transition-all duration-300 flex flex-col h-full w-full shadow-xs rounded-lg hover:shadow-sm">

        <!-- Product Image -->
        <div class="relative aspect-square bg-white overflow-hidden cursor-pointer" @click="navigateToDetail">
            <NuxtImg
                v-if="product.image"
                :src="product.image"
                :alt="product.name"
                width="400"
                height="400"
                format="webp"
                loading="lazy"
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
                    <button v-else ref="addToCartBtnRef" @click="handleAddToCart" :disabled="adding" class="w-full relative flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 overflow-hidden
                               bg-gray-900 text-white hover:bg-gray-700 active:scale-[0.97]
                               disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                        :aria-label="adding ? 'Adding to cart…' : 'Add to cart'">

                        <!-- Shimmer on hover -->
                        <span
                            class="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/10 to-transparent" />

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
    import { Heart, ShoppingCart, PackageX, ImageOff } from 'lucide-vue-next';
    import gsap from 'gsap';
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
    const addToCartBtnRef = ref<HTMLElement | null>(null);

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
    const { withHeaderVisible } = useHeaderVisibility();

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

    const flyToCart = (startRect: DOMRect) => {
        const cartBtn = document.getElementById('cart-icon-btn');
        if (!cartBtn) return;

        const endRect = cartBtn.getBoundingClientRect();

        const size = 52;
        const startX = startRect.left + startRect.width / 2 - size / 2;
        const startY = startRect.top + startRect.height / 2 - size / 2;
        const endX = endRect.left + endRect.width / 2 - size / 2;
        const endY = endRect.top + endRect.height / 2 - size / 2;
        const dx = endX - startX;
        const dy = endY - startY;

        // Arc height scales with horizontal distance so it always looks natural
        const arcHeight = Math.min(140, Math.abs(dx) * 0.45 + 60);

        // Build flying element with product image (or cart icon fallback)
        const flyEl = document.createElement('div');
        flyEl.style.cssText = `
            position: fixed;
            z-index: 9999;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            overflow: hidden;
            border: 2.5px solid #111827;
            box-shadow: 0 8px 24px rgba(0,0,0,0.28);
            pointer-events: none;
            left: ${startX}px;
            top: ${startY}px;
            background: #f9fafb;
        `;

        if (props.product.image) {
            const img = document.createElement('img');
            img.src = props.product.image;
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
            flyEl.appendChild(img);
        } else {
            flyEl.style.background = '#111827';
            flyEl.style.display = 'flex';
            flyEl.style.alignItems = 'center';
            flyEl.style.justifyContent = 'center';
            flyEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`;
        }

        document.body.appendChild(flyEl);

        // 3-phase arc animation:
        // 1. Pop in  2. Rise along arc  3. Fall into cart and shrink
        gsap.timeline()
            .fromTo(flyEl,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.28, ease: 'back.out(4)' }
            )
            .to(flyEl, {
                x: dx * 0.42,
                y: dy * 0.22 - arcHeight,
                duration: 0.58,
                ease: 'power2.out',
            })
            .to(flyEl, {
                x: dx,
                y: dy,
                scale: 0.5,
                opacity: 0.8,
                duration: 1.5,
                ease: 'power3.in',
                onComplete: () => {
                    flyEl.remove();
                    // Elastic bounce on the cart icon
                    gsap.timeline()
                        .to(cartBtn, { scale: 1.5,  duration: 0.4, ease: 'power2.out' })
                        .to(cartBtn, { scale: 0.85, duration: 0.4, ease: 'power1.in' })
                        .to(cartBtn, { scale: 1,    duration: 0.4,  ease: 'elastic.out(1.3, 0.4)' });
                },
            });
    };

    const handleAddToCart = async () => {
        if (!props.product.in_stock || adding.value || isInCart.value) return;

        // Capture button position immediately before any async work
        const btnRect = addToCartBtnRef.value?.getBoundingClientRect();

        adding.value = true;
        try {
            const res = await $fetch<ProductDetailResponse>(
                `${config.public.apiBaseUrl}/api/v1/products/${props.product.slug}`
            );
            const detail = res.data;
            const sku = detail.skus.find(s => s.is_in_stock);
            if (!sku) return;

            await addItem(sku.uuid, 1);
            if (btnRect) withHeaderVisible(() => flyToCart(btnRect), 3600);
        } catch (error: any) {
            console.error('Failed to add to cart:', error);
            if (error.message?.includes('sign in')) {
                router.push('/signin');
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

