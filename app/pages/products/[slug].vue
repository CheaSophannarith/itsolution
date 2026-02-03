<template>
    <div>
        <!-- Loading -->
        <div v-if="status === 'pending'" class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
                <p class="text-gray-600">Loading product...</p>
            </div>
        </div>

        <!-- Product Detail -->
        <div v-else-if="product" class="min-h-screen bg-linear-to-b from-gray-50 via-white to-blue-50/30">
            <!-- Breadcrumb -->
            <div class="bg-white border-b border-gray-100 shadow-sm">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <template v-if="primaryCategory">
                                <template v-for="crumb in primaryCategory.breadcrumbs" :key="crumb.uuid">
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink :href="`/categories/${crumb.slug}`">
                                            {{ crumb.name }}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </template>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink :href="`/categories/${primaryCategory.slug}`">
                                        {{ primaryCategory.name }}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </template>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{{ product.name }}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12" data-aos="fade-up">
                    <!-- Left: Product Image -->
                    <div class="lg:w-1/2">
                        <div class="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 cursor-pointer transition-all duration-500 group"
                            @click="openLightbox(activeImageIndex)">
                            <img :src="allImages[activeImageIndex]?.original" :alt="product.name"
                                class="w-full h-64 sm:h-80 lg:h-96 object-contain group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <!-- Thumbnails -->
                        <div v-if="allImages.length > 1"
                            class="mt-3 sm:mt-4 flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <img v-for="(image, index) in allImages" :key="index" :src="image.thumb"
                                :alt="`${product.name} - ${index + 1}`" :class="[
                                    'w-20 h-20 sm:w-32 sm:h-32 object-contain border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 shrink-0 p-2',
                                    activeImageIndex === index
                                        ? 'border-brand ring-2 sm:ring-4 ring-brand/20 shadow-lg mt-2'
                                        : 'border-gray-200 hover:border-brand/50 hover:shadow-md mt-2'
                                ]" @click="activeImageIndex = index" />
                        </div>
                    </div>

                    <!-- Lightbox Modal -->
                    <Teleport to="body">
                        <Transition name="fade">
                            <div v-if="lightboxOpen"
                                class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                                @click.self="lightboxOpen = false">
                                <button @click="lightboxOpen = false"
                                    class="absolute top-6 right-6 text-white/80 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-md">
                                    <X class="w-6 h-6" />
                                </button>
                                <button v-if="allImages.length > 1" @click="prevImage"
                                    class="absolute left-6 text-white/80 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-300 backdrop-blur-md hover:scale-110">
                                    <ChevronLeft class="w-8 h-8" />
                                </button>
                                <img :src="allImages[lightboxIndex]?.original" :alt="product.name"
                                    class="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl" />
                                <button v-if="allImages.length > 1" @click="nextImage"
                                    class="absolute right-6 text-white/80 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-300 backdrop-blur-md hover:scale-110">
                                    <ChevronRight class="w-8 h-8" />
                                </button>
                                <div
                                    class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
                                    <span class="text-white font-bold">{{ lightboxIndex + 1 }} / {{ allImages.length
                                        }}</span>
                                </div>
                            </div>
                        </Transition>
                    </Teleport>

                    <!-- Right: Product Info -->
                    <div class="lg:w-1/2 space-y-4 sm:space-y-6">
                        <!-- Product Name -->
                        <div data-aos="fade-left" data-aos-delay="100">
                            <h1 class="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">{{
                                product.name }}
                            </h1>
                        </div>

                        <!-- Brand -->
                        <div data-aos="fade-left" data-aos-delay="150" class="flex items-center gap-2">
                            <span class="text-xs font-semibold tracking-widest uppercase text-brand">Brand:</span>
                            <span class="font-bold text-gray-900 text-base sm:text-lg">{{ product.brand.name }}</span>
                        </div>

                        <!-- SKU Selector -->
                        <div v-if="product.skus.length > 1" class="space-y-3 sm:space-y-4" data-aos="fade-left"
                            data-aos-delay="200">
                            <label class="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide">Select
                                Variant:</label>
                            <div class="flex flex-wrap gap-2 sm:gap-3">
                                <button v-for="sku in product.skus" :key="sku.uuid" @click="selectedSkuUuid = sku.uuid"
                                    :class="[
                                        'px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm border-2 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold',
                                        selectedSkuUuid === sku.uuid
                                            ? 'border-brand bg-brand text-white shadow-lg shadow-brand/30 scale-105'
                                            : 'border-gray-200 text-gray-700 hover:border-brand hover:shadow-md bg-white'
                                    ]">
                                    {{ skuLabel(sku) }}
                                </button>
                            </div>
                        </div>

                        <!-- Price & Stock Section -->
                        <div class="rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4 border border-gray-200 "
                            data-aos="fade-left" data-aos-delay="250">
                            <div class="flex items-baseline gap-2 sm:gap-4">
                                <span v-if="selectedSku?.compare_at_price"
                                    class="text-sm sm:text-lg text-gray-400 line-through font-medium">
                                    ${{ parseFloat(selectedSku.compare_at_price).toFixed(2) }}
                                </span>
                                <span
                                    class="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">${{
                                        parseFloat(selectedSku?.price ?? '0').toFixed(2) }}</span>
                            </div>
                            <div
                                class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2 sm:pt-3 border-t-2 border-gray-100">
                                <div v-if="selectedSku?.is_in_stock"
                                    class="flex items-center gap-2 bg-green-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl w-fit">
                                    <CheckCircle class="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                    <span class="text-green-700 font-bold text-sm sm:text-base">In Stock</span>
                                </div>
                                <div v-else
                                    class="flex items-center gap-2 bg-red-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl w-fit">
                                    <XCircle class="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                                    <span class="text-red-700 font-bold text-sm sm:text-base">Out of Stock</span>
                                </div>
                            </div>
                        </div>

                        <!-- Product Detail Box (SKU attributes) -->
                        <div class="border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden"
                            data-aos="fade-left" data-aos-delay="300">
                            <div
                                class="flex items-center gap-2 sm:gap-3 px-3 py-3 sm:px-5 sm:py-4 bg-linear-to-r from-gray-50 to-white border-b-2 border-gray-100">
                                <div
                                    class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                                    <Info class="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
                                </div>
                                <h2 class="text-base sm:text-lg font-bold text-gray-900">Product Details</h2>
                            </div>
                            <div class="p-3 sm:p-5">
                                <div
                                    :class="['space-y-2 sm:space-y-3', { 'max-h-52 overflow-y-auto pr-2': productSpecs.length > 5 }]">
                                    <div v-for="(item, index) in productSpecs" :key="index"
                                        class="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm py-2 sm:py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors gap-1 sm:gap-0">
                                        <span
                                            class="font-bold text-gray-700 sm:w-40 sm:shrink-0 uppercase tracking-wide">{{
                                            item.label }}</span>
                                        <span class="text-gray-900 font-medium">{{ item.value }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quantity and Add to Cart -->
                        <div class="space-y-3" data-aos="fade-left" data-aos-delay="400">
                            <!-- Quantity Selector -->
                            <div
                                class="flex items-center justify-center border-2 border-gray-300 rounded-xl bg-white shadow-sm w-fit mx-auto sm:mx-0">
                                <button @click="decrementQuantity"
                                    class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300 rounded-l-xl font-bold active:scale-95"
                                    :disabled="quantity <= 1">
                                    <Minus class="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <input type="number" v-model.number="quantity" min="1"
                                    :max="selectedSku?.stock_quantity"
                                    class="w-16 h-10 sm:w-20 sm:h-12 text-center border-x-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand font-bold text-base sm:text-lg" />
                                <button @click="incrementQuantity"
                                    class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300 rounded-r-xl font-bold active:scale-95"
                                    :disabled="quantity >= (selectedSku?.stock_quantity ?? 0)">
                                    <Plus class="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex gap-2 sm:gap-3 lg:gap-4">
                                <button @click="() => handleAddToCart()"
                                    :disabled="!selectedSku?.is_in_stock || isAddingToCart" :class="[
                                        'flex-1 px-3 py-3 sm:px-6 sm:py-3.5 font-bold text-xs sm:text-base lg:text-lg transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 rounded-lg sm:rounded-xl active:scale-[0.98]',
                                        selectedSku?.is_in_stock && !isAddingToCart
                                            ? 'bg-brand text-white hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/30 sm:hover:scale-[1.02]'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    ]">
                                    <div v-if="isAddingToCart"
                                        class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-white border-t-transparent rounded-full animate-spin">
                                    </div>
                                    <ShoppingCart v-else
                                        :class="['w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform', buttonClicked && 'animate-cart-shake']" />
                                    <span class="whitespace-nowrap">{{ isAddingToCart ? 'Adding...' : 'Add to Cart'
                                        }}</span>
                                </button>
                                <button @click="handleBuyNow" :disabled="!selectedSku?.is_in_stock || isAddingToCart"
                                    :class="[
                                        'flex-1 px-3 py-3 sm:px-6 sm:py-3.5 font-bold text-xs sm:text-base lg:text-lg transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 rounded-lg sm:rounded-xl active:scale-[0.98]',
                                        selectedSku?.is_in_stock && !isAddingToCart
                                            ? 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30 sm:hover:scale-[1.02]'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    ]">
                                    <ShoppingBag class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                    <span class="whitespace-nowrap">Buy Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Description -->
                <div v-if="product.description"
                    class=" rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-5 mt-10" data-aos="fade-left"
                    data-aos-delay="350">
                    <h3 class="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">
                        Description</h3>
                    <p class="text-sm sm:text-base text-gray-700 leading-relaxed">{{ product.description }}</p>
                </div>
            </div>

            <!-- Related Products Section -->
            <div v-if="primaryCategory && relatedProducts.length > 0"
                class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mt-6 sm:mt-8">
                <div class="border-t-2 border-gray-200 pt-8 sm:pt-12" data-aos="fade-up">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                        <div>
                            <span
                                class="text-xs font-semibold tracking-widest uppercase text-brand mb-1 sm:mb-2 block">You
                                might
                                also like</span>
                            <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Related Products</h2>
                        </div>
                        <NuxtLink :to="`/categories/${primaryCategory.slug}`"
                            class="text-xs sm:text-sm text-brand hover:text-brand/80 font-bold flex items-center gap-1 sm:gap-2 bg-brand/5 px-3 py-2 sm:px-4 rounded-lg sm:rounded-xl hover:bg-brand/10 transition-all duration-300 group w-fit">
                            <span class="line-clamp-1">View all</span>
                            <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                        </NuxtLink>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6"
                        data-aos="fade-up" data-aos-delay="200">
                        <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.slug"
                            :product="relatedProduct" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Not Found -->
        <div v-else class="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
            <div class="text-center px-4" data-aos="zoom-in">
                <div class="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                    <XCircle class="w-12 h-12 text-red-500" />
                </div>
                <h1 class="text-3xl font-bold text-gray-900 mb-3">Product Not Found</h1>
                <p class="text-gray-600 mb-8 text-lg">The product you're looking for doesn't exist.</p>
                <NuxtLink to="/"
                    class="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-xl font-bold hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 active:scale-95">
                    Back to Home
                    <ChevronRight class="w-5 h-5" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { CheckCircle, ChevronLeft, ChevronRight, Info, Minus, Plus, ShoppingBag, ShoppingCart, X, XCircle } from 'lucide-vue-next';
    import ProductCard from '~/components/ProductCard.vue';
    import {
        Breadcrumb,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } from '@/components/ui/breadcrumb';
    import type { ProductSku } from '~/types';

    // Custom page transition
    definePageMeta({
        pageTransition: {
            name: 'slide-left',
            mode: 'out-in'
        }
    })

    const route = useRoute();
    const slug = computed(() => route.params.slug as string);

    const { product, status } = useProductDetail(slug);

    // Fetch related products from the primary category
    const categorySlug = computed(() => product.value?.categories[0]?.slug ?? '');
    const { products: categoryProducts } = useCategoryProducts(categorySlug, ref({ per_page: 6 }));

    // Filter out current product and limit to 5 related products
    const relatedProducts = computed(() => {
        if (!product.value || !categoryProducts.value) return [];
        return categoryProducts.value
            .filter(p => p.slug !== product.value?.slug)
            .slice(0, 5);
    });

    useHead({
        title: computed(() => product.value?.meta_title || product.value?.name || 'Product Detail'),
        meta: [
            {
                name: 'description',
                content: computed(() => product.value?.meta_description || product.value?.short_description || ''),
            },
        ],
    });

    const { addItem: addToCart, isSyncing } = useCart();
    const { addToast } = useToast();

    const quantity = ref(1);
    const selectedSkuUuid = ref('');
    const buttonClicked = ref(false);
    const isAddingToCart = ref(false);

    watch(product, (val) => {
        if (val && val.skus?.length > 0) {
            selectedSkuUuid.value = val.skus[0]?.uuid ?? '';
        }
    }, { immediate: true });

    const selectedSku = computed(() => {
        return product.value?.skus.find(s => s.uuid === selectedSkuUuid.value) ?? product.value?.skus[0] ?? null;
    });

    const primaryCategory = computed(() => {
        return product.value?.categories[0] ?? null;
    });

    // Image gallery
    const allImages = computed(() => {
        if (!product.value) return [];
        return [product.value.images.featured, ...product.value.images.gallery];
    });
    const activeImageIndex = ref(0);

    // Lightbox
    const lightboxOpen = ref(false);
    const lightboxIndex = ref(0);

    const openLightbox = (index: number) => {
        lightboxIndex.value = index;
        lightboxOpen.value = true;
    };

    const nextImage = () => {
        lightboxIndex.value = (lightboxIndex.value + 1) % allImages.value.length;
    };

    const prevImage = () => {
        lightboxIndex.value = (lightboxIndex.value - 1 + allImages.value.length) % allImages.value.length;
    };

    const skuLabel = (sku: ProductSku) => {
        return sku.attribute_options.map(opt => opt.label).join(' / ');
    };

    const productSpecs = computed(() => {
        if (!product.value || !selectedSku.value) return [];
        const specs: { label: string; value: string }[] = [
            { label: 'Brand', value: product.value.brand.name },
        ];
        for (const opt of selectedSku.value.attribute_options) {
            specs.push({ label: opt.attribute.name, value: opt.label });
        }
        return specs;
    });

    const incrementQuantity = () => {
        if (selectedSku.value && quantity.value < selectedSku.value.stock_quantity) {
            quantity.value++;
        }
    };

    const decrementQuantity = () => {
        if (quantity.value > 1) {
            quantity.value--;
        }
    };

    const handleAddToCart = async (showToast = true) => {
        if (!product.value || !selectedSku.value || isAddingToCart.value) return;

        try {
            isAddingToCart.value = true;
            await addToCart(selectedSku.value.uuid, quantity.value);
            if (showToast) {
                addToast(`${quantity.value} x ${product.value.name} added to cart!`, 'success');
            }
            buttonClicked.value = true;
            setTimeout(() => { buttonClicked.value = false; }, 600);
            quantity.value = 1;
        } catch (error: any) {
            console.error('Failed to add to cart:', error);

            // Check if error is due to authentication
            if (error.message?.includes('sign in')) {
                addToast('Please sign in to add items to cart', 'info');
            } else {
                addToast('Failed to add to cart', 'error');
            }
        } finally {
            isAddingToCart.value = false;
        }
    };

    const handleBuyNow = async () => {
        if (!product.value || !selectedSku.value) return;

        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
            // Redirect to login page with return URL
            navigateTo({
                path: '/signin',
                query: { redirect: route.fullPath }
            });
            addToast('Please sign in to continue', 'info');
            return;
        }

        // Navigate directly to checkout in Buy Now mode (does NOT add to cart)
        addToast('Proceeding to checkout...', 'success');
        navigateTo({
            path: '/checkout',
            query: {
                buyNow: 'true',
                slug: product.value.slug,
                sku: selectedSku.value.uuid,
                qty: quantity.value.toString()
            }
        });
    };

    // Lightbox keyboard navigation
    const onKeydown = (e: KeyboardEvent) => {
        if (!lightboxOpen.value) return;
        if (e.key === 'Escape') lightboxOpen.value = false;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    };

    onMounted(() => window.addEventListener('keydown', onKeydown));
    onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<style scoped>

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    @keyframes cart-shake {

        0%,
        100% {
            transform: translateX(0);
        }

        10%,
        30%,
        50%,
        70%,
        90% {
            transform: translateX(-3px);
        }

        20%,
        40%,
        60%,
        80% {
            transform: translateX(3px);
        }
    }

    .animate-cart-shake {
        animation: cart-shake 0.6s ease-in-out;
    }

    /* Hide scrollbar for thumbnails on mobile */
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
</style>