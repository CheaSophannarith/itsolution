<template>
    <div>
        <!-- Loading -->
        <div v-if="status === 'pending'" class="min-h-screen flex items-center justify-center bg-white">
            <div class="flex flex-col items-center gap-3">
                <div class="w-7 h-7 border-2 border-gray-100 border-t-brand rounded-full animate-spin"></div>
                <p class="text-xs text-gray-400 tracking-widest uppercase">Loading</p>
            </div>
        </div>

        <!-- Product Detail -->
        <div v-else-if="product" class="min-h-screen bg-white">
            <!-- Breadcrumb -->
            <div class="border-b border-gray-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <template v-if="primaryCategory">
                                <template v-for="crumb in primaryCategory.breadcrumbs" :key="crumb.uuid">
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink :href="`/categories/${crumb.slug}`">{{ crumb.name }}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </template>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink :href="`/categories/${primaryCategory.slug}`">{{
                                        primaryCategory.name }}</BreadcrumbLink>
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
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
                <div class="flex flex-col lg:flex-row gap-8 lg:gap-12" data-aos="fade-up">

                    <!-- Left: Product Image -->
                    <div class="lg:w-[48%] flex flex-col gap-3">

                        <!-- Main Image -->
                        <div class="bg-white rounded-xl cursor-zoom-in overflow-hidden aspect-[4/3] border border-gray-300"
                            @click="openLightbox(activeImageIndex)">
                            <img :src="allImages[activeImageIndex]?.original" :alt="product.name"
                                class="w-full h-full object-contain p-3 sm:p-5 hover:scale-105 transition-transform duration-500" />
                        </div>

                        <!-- Thumbnail Strip — bottom -->
                        <div v-if="allImages.length > 1" class="flex gap-2 overflow-x-auto scrollbar-hide">
                            <button v-for="(image, index) in allImages" :key="index" @click="activeImageIndex = index"
                                :class="[
                                    'w-20 h-20 sm:w-24 sm:h-24 rounded-lg shrink-0 overflow-hidden border-2 transition-all duration-200 bg-white',
                                    activeImageIndex === index
                                        ? 'border-gray-800'
                                        : 'border-gray-300 hover:border-gray-500'
                                ]">
                                <img :src="image.thumb" :alt="`${product.name} - ${index + 1}`"
                                    class="w-full h-full object-contain p-1.5" />
                            </button>
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
                                    class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                    <span class="text-white text-sm font-semibold">{{ lightboxIndex + 1 }} / {{
                                        allImages.length
                                        }}</span>
                                </div>
                            </div>
                        </Transition>
                    </Teleport>

                    <!-- Right: Product Info -->
                    <div class="lg:w-[45%] space-y-5">

                        <!-- Brand -->
                        <p class="text-xs font-semibold tracking-[0.18em] uppercase text-gray-400">{{ product.brand.name
                            }}</p>

                        <!-- Product Name -->
                        <h1
                            class="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 tracking-tight leading-tight -mt-1">
                            {{ product.name }}
                        </h1>

                        <!-- Price -->
                        <div class="flex items-baseline gap-3">
                            <span class="text-2xl sm:text-3xl font-bold text-pink-500 tabular-nums">
                                ${{ parseFloat(selectedSku?.price ?? '0').toFixed(2) }}
                            </span>
                            <span v-if="selectedSku?.compare_at_price"
                                class="text-base text-gray-400 line-through font-medium tabular-nums">
                                ${{ parseFloat(selectedSku.compare_at_price).toFixed(2) }}
                            </span>
                        </div>

                        <!-- Stock -->
                        <div class="flex items-center gap-2">
                            <template v-if="selectedSku?.is_in_stock">
                                <span class="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                                <span class="text-sm text-green-700 font-medium">In Stock</span>
                            </template>
                            <template v-else>
                                <span class="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                                <span class="text-sm text-red-500 font-medium">Out of Stock</span>
                            </template>
                        </div>

                        <div class="h-px bg-gray-100"></div>

                        <!-- Variant Selector -->
                        <div v-if="product.skus.length > 1">
                            <p class="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-3">Select
                                Variant</p>
                            <div class="flex flex-wrap gap-2">
                                <button v-for="sku in product.skus" :key="sku.uuid" @click="selectedSkuUuid = sku.uuid"
                                    :class="[
                                        'px-4 py-1.5 text-sm font-semibold rounded-full border-2 transition-all duration-200',
                                        selectedSku?.uuid === sku.uuid
                                            ? 'border-gray-900 bg-gray-900 text-white'
                                            : 'border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
                                    ]">
                                    {{ skuLabel(sku) }}
                                </button>
                            </div>
                        </div>

                        <!-- Quantity + Add to Cart -->
                        <div class="flex items-center gap-3">
                            <!-- Quantity Control -->
                            <div class="flex items-center border border-gray-200 rounded-full bg-gray-50 shrink-0">
                                <button @click="decrementQuantity" :disabled="quantity <= 1"
                                    class="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-30 rounded-l-full hover:bg-gray-100 transition-colors">
                                    <Minus class="w-3.5 h-3.5" />
                                </button>
                                <span
                                    class="w-9 text-center text-sm font-bold text-gray-900 tabular-nums select-none">{{
                                    quantity
                                    }}</span>
                                <button @click="incrementQuantity"
                                    :disabled="quantity >= (selectedSku?.stock_quantity ?? 0)"
                                    class="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-30 rounded-r-full hover:bg-gray-100 transition-colors">
                                    <Plus class="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <!-- Add to Cart Button -->
                            <button @click="() => handleAddToCart()"
                                :disabled="!selectedSku?.is_in_stock || isAddingToCart" :class="[
                                    'flex-1 h-11 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200',
                                    selectedSku?.is_in_stock && !isAddingToCart
                                        ? 'bg-brand text-white hover:bg-brand/90 active:scale-[0.98] shadow-sm hover:shadow-md'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                ]">
                                <div v-if="isAddingToCart"
                                    class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                                </div>
                                <ShoppingCart v-else
                                    :class="['w-4 h-4 transition-transform', buttonClicked && 'animate-cart-shake']" />
                                <span>{{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}</span>
                            </button>
                        </div>

                        <div class="h-px bg-gray-100"></div>

                        <!-- Specifications -->
                        <div>
                            <p class="text-xs font-semibold tracking-[0.12em] uppercase text-gray-400 mb-3">
                                Specifications</p>
                            <div
                                :class="['divide-y divide-gray-50', { 'max-h-52 overflow-y-auto pr-1': productSpecs.length > 5 }]">
                                <div v-for="(item, index) in productSpecs" :key="index"
                                    class="flex items-start gap-4 py-2.5">
                                    <span
                                        class="text-xs text-gray-400 font-medium uppercase tracking-wide w-28 shrink-0 pt-px">{{
                                        item.label }}</span>
                                    <span class="text-sm text-gray-900 font-medium">{{ item.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Description -->
                <div v-if="product.description" class="mt-16 lg:mt-24 max-w-3xl" data-aos="fade-up">
                    <p class="text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-4">About this Product
                    </p>
                    <div class="product-description text-base text-gray-600 leading-relaxed" v-html="product.description"></div>
                </div>
            </div>

            <!-- Related Products -->
            <div v-if="primaryCategory && relatedProducts.length > 0" class="border-t border-gray-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div class="flex items-end justify-between mb-8" data-aos="fade-up">
                        <div>
                            <p class="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-1.5">You might
                                also like
                            </p>
                            <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Related Products</h2>
                        </div>
                        <NuxtLink :to="`/categories/${primaryCategory.slug}`"
                            class="text-sm font-semibold text-brand hover:text-brand/80 flex items-center gap-1 transition-colors group">
                            View all
                            <ChevronRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </NuxtLink>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
                        data-aos="fade-up" data-aos-delay="100">
                        <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.slug"
                            :product="relatedProduct" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Not Found -->
        <div v-else class="min-h-screen flex items-center justify-center bg-white">
            <div class="text-center px-4" data-aos="zoom-in">
                <div class="w-20 h-20 mx-auto mb-5 bg-gray-50 rounded-full flex items-center justify-center">
                    <XCircle class="w-10 h-10 text-gray-300" />
                </div>
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
                <p class="text-gray-400 mb-8 text-sm">The product you're looking for doesn't exist.</p>
                <NuxtLink to="/"
                    class="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors active:scale-95">
                    Back to Home
                    <ChevronRight class="w-4 h-4" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { CheckCircle, ChevronLeft, ChevronRight, Info, Minus, Plus, ShoppingCart, X, XCircle } from 'lucide-vue-next';
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

    useSeoMeta({
        title: computed(() => product.value?.meta_title || product.value?.name || 'Product Detail'),
        description: computed(() => product.value?.meta_description || product.value?.short_description || `Buy ${product.value?.name ?? 'this product'} at IT Solution Digital – best price in Cambodia.`),
        ogTitle: computed(() => product.value ? `${product.value.meta_title || product.value.name} | IT Solution Digital` : 'Product | IT Solution Digital'),
        ogDescription: computed(() => product.value?.meta_description || product.value?.short_description || `Shop ${product.value?.name ?? ''} at IT Solution Digital, Phnom Penh.`),
        ogImage: computed(() => product.value?.images?.featured ?? '/logo.jpg'),
        ogType: 'product',
        twitterCard: 'summary_large_image',
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

    /* Product description HTML content */
    .product-description :deep(p) {
        margin-bottom: 0.75rem;
    }

    .product-description :deep(ul) {
        list-style: disc;
        padding-left: 1.5rem;
        margin-bottom: 0.75rem;
        space-y: 0.25rem;
    }

    .product-description :deep(ul ul) {
        list-style: circle;
        margin-top: 0.25rem;
    }

    .product-description :deep(li) {
        margin-bottom: 0.35rem;
    }

    .product-description :deep(strong) {
        font-weight: 600;
        color: #111827;
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