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
        <div v-else-if="product" class="min-h-screen bg-gray-50">
            <!-- Breadcrumb -->
            <div class="bg-white border-b">
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
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="flex flex-col lg:flex-row gap-8">
                    <!-- Left: Product Image -->
                    <div class="lg:w-1/2">
                        <div class="bg-gray-50 p-8 rounded-lg border border-gray-100 cursor-pointer" @click="openLightbox(activeImageIndex)">
                            <img :src="allImages[activeImageIndex]?.original" :alt="product.name" class="w-full h-96 object-contain hover:scale-105 transition-transform duration-300" />
                        </div>
                        <!-- Thumbnails -->
                        <div v-if="allImages.length > 1" class="mt-4 flex gap-2 overflow-x-auto">
                            <img
                                v-for="(image, index) in allImages"
                                :key="index"
                                :src="image.thumb"
                                :alt="`${product.name} - ${index + 1}`"
                                :class="[
                                    'w-20 h-20 object-contain border-2 rounded cursor-pointer transition-all duration-200',
                                    activeImageIndex === index
                                        ? 'border-brand ring-2 ring-brand/20'
                                        : 'border-gray-200 hover:border-gray-400'
                                ]"
                                @click="activeImageIndex = index"
                            />
                        </div>
                    </div>

                    <!-- Lightbox Modal -->
                    <Teleport to="body">
                        <Transition name="fade">
                            <div v-if="lightboxOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80" @click.self="lightboxOpen = false">
                                <button @click="lightboxOpen = false" class="absolute top-4 right-4 text-white/80 hover:text-white z-10">
                                    <X class="w-8 h-8" />
                                </button>
                                <button v-if="allImages.length > 1" @click="prevImage" class="absolute left-4 text-white/80 hover:text-white z-10">
                                    <ChevronLeft class="w-10 h-10" />
                                </button>
                                <img
                                    :src="allImages[lightboxIndex]?.original"
                                    :alt="product.name"
                                    class="max-h-[90vh] max-w-[90vw] object-contain"
                                />
                                <button v-if="allImages.length > 1" @click="nextImage" class="absolute right-4 text-white/80 hover:text-white z-10">
                                    <ChevronRight class="w-10 h-10" />
                                </button>
                                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                                    {{ lightboxIndex + 1 }} / {{ allImages.length }}
                                </div>
                            </div>
                        </Transition>
                    </Teleport>

                    <!-- Right: Product Info -->
                    <div class="lg:w-1/2 space-y-5">
                        <!-- Product Name -->
                        <h1 class="text-2xl lg:text-3xl font-bold text-gray-800">{{ product.name }}</h1>

                        <!-- Brand -->
                        <p class="text-sm text-gray-500">Brand: <span class="font-medium text-gray-700">{{ product.brand.name }}</span></p>

                        <!-- SKU Selector -->
                        <div v-if="product.skus.length > 1" class="space-y-3">
                            <label class="text-sm font-medium text-gray-700">Select Variant:</label>
                            <div class="flex flex-wrap gap-2">
                                <button
                                    v-for="sku in product.skus"
                                    :key="sku.uuid"
                                    @click="selectedSkuUuid = sku.uuid"
                                    :class="[
                                        'px-4 py-2 text-sm border rounded-lg transition-colors',
                                        selectedSkuUuid === sku.uuid
                                            ? 'border-brand bg-brand/5 text-brand font-medium'
                                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                                    ]"
                                >
                                    {{ skuLabel(sku) }}
                                </button>
                            </div>
                        </div>

                        <!-- Price & Stock Section -->
                        <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div class="flex items-baseline gap-3">
                                <span v-if="selectedSku?.compare_at_price" class="text-sm text-gray-500 line-through">
                                    ${{ parseFloat(selectedSku.compare_at_price).toFixed(2) }}
                                </span>
                                <span class="text-3xl font-bold text-pink-500">${{ parseFloat(selectedSku?.price ?? '0').toFixed(2) }}</span>
                            </div>
                            <div class="flex items-center gap-4 pt-2 border-t border-gray-200">
                                <div v-if="selectedSku?.is_in_stock" class="flex items-center gap-2">
                                    <CheckCircle class="w-5 h-5 text-green-500" />
                                    <span class="text-green-600 font-medium">In Stock</span>
                                </div>
                                <div v-else class="flex items-center gap-2">
                                    <XCircle class="w-5 h-5 text-red-500" />
                                    <span class="text-red-600 font-medium">Out of Stock</span>
                                </div>
                                <span class="text-gray-500 text-sm">{{ selectedSku?.stock_quantity.toLocaleString() }} available</span>
                            </div>
                        </div>

                        <!-- Product Detail Box (SKU attributes) -->
                        <div class="border border-gray-200 rounded-lg overflow-hidden">
                            <div class="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                                <Info class="w-5 h-5 text-blue-950" />
                                <h2 class="text-base font-bold text-gray-800">Product Detail</h2>
                            </div>
                            <div class="p-4">
                                <div :class="['space-y-2', { 'max-h-52 overflow-y-auto pr-2': productSpecs.length > 5 }]">
                                    <div v-for="(item, index) in productSpecs" :key="index"
                                        class="flex items-center text-sm py-2 border-b border-gray-100 last:border-0">
                                        <span class="font-medium text-gray-600 w-40 shrink-0">{{ item.label }}</span>
                                        <span class="text-gray-800">{{ item.value }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div v-if="product.description" class="prose prose-sm max-w-none text-gray-600">
                            <p>{{ product.description }}</p>
                        </div>

                        <!-- Quantity and Add to Cart -->
                        <div class="flex items-center gap-4 pt-2">
                            <div class="flex items-center border border-gray-300 rounded bg-white">
                                <button @click="decrementQuantity"
                                    class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                    :disabled="quantity <= 1">
                                    <Minus class="w-4 h-4" />
                                </button>
                                <input type="number" v-model.number="quantity" min="1" :max="selectedSku?.stock_quantity"
                                    class="w-16 h-10 text-center border-x border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand" />
                                <button @click="incrementQuantity"
                                    class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                    :disabled="quantity >= (selectedSku?.stock_quantity ?? 0)">
                                    <Plus class="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                @click="handleAddToCart"
                                :disabled="!selectedSku?.is_in_stock"
                                :class="[
                                    'flex-1 px-6 py-2.5 font-semibold transition-colors flex items-center justify-center gap-2 rounded',
                                    selectedSku?.is_in_stock
                                        ? 'bg-blue-950 text-white hover:bg-blue-800'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                ]">
                                <ShoppingCart class="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Not Found -->
        <div v-else class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
                <p class="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
                <NuxtLink to="/" class="text-brand hover:underline">
                    Back to Home
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CheckCircle, ChevronLeft, ChevronRight, Info, Minus, Plus, ShoppingCart, X, XCircle } from 'lucide-vue-next';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { ProductSku } from '~/types';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { product, status } = useProductDetail(slug);

useHead({
    title: computed(() => product.value?.meta_title || product.value?.name || 'Product Detail'),
    meta: [
        {
            name: 'description',
            content: computed(() => product.value?.meta_description || product.value?.short_description || ''),
        },
    ],
});

const { addItem: addToCart } = useCart();

const quantity = ref(1);
const selectedSkuUuid = ref('');

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

const handleAddToCart = () => {
    if (!product.value || !selectedSku.value) return;
    addToCart({
        skuUuid: selectedSku.value.uuid,
        productUuid: product.value.uuid,
        productName: product.value.name,
        productSlug: product.value.slug,
        variantLabel: skuLabel(selectedSku.value),
        image: allImages.value[0]?.thumb ?? '',
        price: parseFloat(selectedSku.value.price),
        maxQuantity: selectedSku.value.stock_quantity,
    }, quantity.value);
    quantity.value = 1;
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
</style>