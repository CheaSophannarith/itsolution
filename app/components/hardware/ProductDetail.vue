<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Breadcrumb -->
        <div class="bg-white border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/hardware">Hardware</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink :href="`/hardware/categories/${category?.slug}`">
                                {{ category?.name }}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink :href="`/hardware/categories/${category?.slug}/${subcategory?.slug}`">
                                {{ subcategory?.name }}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
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
                        <div class="bg-gray-50 p-8 rounded-lg border border-gray-100">
                            <img :src="product.image" :alt="product.name" class="w-full h-96 object-contain" />
                        </div>
                        <!-- Mfr Part -->
                        <div class="mt-4 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded">
                            <span class="font-medium">Mfr Part #:</span> {{ product.name }}
                        </div>
                    </div>

                    <!-- Right: Product Info -->
                    <div class="lg:w-1/2 space-y-5">
                        <!-- Product Name -->
                        <h1 class="text-2xl lg:text-3xl font-bold text-gray-800">{{ product.name }}</h1>

                        <!-- Price & Stock Section -->
                        <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div class="flex items-baseline gap-3">
                                <span class="text-sm text-gray-500 line-through">MSRP ${{ (product.price * 1.1).toFixed(2) }}</span>
                                <span class="text-3xl font-bold text-pink-500">${{ product.price.toFixed(2) }}</span>
                            </div>
                            <div class="flex items-center gap-4 pt-2 border-t border-gray-200">
                                <div class="flex items-center gap-2">
                                    <CheckCircle class="w-5 h-5 text-green-500" />
                                    <span class="text-green-600 font-medium">In Stock</span>
                                </div>
                                <span class="text-gray-500 text-sm">{{ product.stock.toLocaleString() }} available</span>
                            </div>
                        </div>

                        <!-- Product Detail Box -->
                        <div class="border border-gray-200 rounded-lg overflow-hidden">
                            <div class="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
                                <Info class="w-5 h-5 text-blue-950" />
                                <h2 class="text-base font-bold text-gray-800">Product Detail</h2>
                            </div>
                            <div class="p-4">
                                <div :class="['space-y-2', { 'max-h-52 overflow-y-auto pr-2': productSpecs.length > 5 }]">
                                    <div v-for="(item, index) in productSpecs" :key="index"
                                        class="flex items-center text-sm py-2 border-b border-gray-100 last:border-0">
                                        <span class="font-medium text-gray-600 w-24 shrink-0">{{ item.label }}</span>
                                        <span class="text-gray-800">{{ item.value }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Quantity and Add to Cart -->
                        <div class="flex items-center gap-4 pt-2">
                            <!-- Quantity Control -->
                            <div class="flex items-center border border-gray-300 rounded bg-white">
                                <button @click="decrementQuantity"
                                    class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                    :disabled="quantity <= 1">
                                    <Minus class="w-4 h-4" />
                                </button>
                                <input type="number" v-model.number="quantity" min="1" :max="product.stock"
                                    class="w-16 h-10 text-center border-x border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand" />
                                <button @click="incrementQuantity"
                                    class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                    :disabled="quantity >= product.stock">
                                    <Plus class="w-4 h-4" />
                                </button>
                            </div>

                            <!-- Add to Cart Button -->
                            <button
                                class="flex-1 bg-blue-950 text-white px-6 py-2.5 font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 rounded">
                                <ShoppingCart class="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

            <!-- Similar Products Section -->
            <div class="mt-12 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <!-- Header -->
                <div class="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-white">Similar Products</h2>
                        <NuxtLink v-if="category" :to="`/hardware/categories/${category.slug}`"
                            class="text-white/90 text-sm font-medium hover:text-white flex items-center gap-1 transition-colors">
                            View All
                            <ChevronRight class="w-4 h-4" />
                        </NuxtLink>
                    </div>
                </div>
                <!-- Products Grid -->
                <div class="p-6 bg-gray-50">
                    <div v-if="similarProducts.length > 0"
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        <div v-for="similarProduct in similarProducts" :key="similarProduct.id"
                            class="transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                            <HardwareProductCard :product="similarProduct" />
                        </div>
                    </div>
                    <div v-else class="text-center py-12">
                        <Package class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p class="text-gray-500">No similar products found</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { CheckCircle, ChevronRight, Info, Minus, Package, Plus, ShoppingCart } from 'lucide-vue-next';
    import {
        Breadcrumb,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbList,
        BreadcrumbPage,
        BreadcrumbSeparator,
    } from '@/components/ui/breadcrumb';
    import categoriesData from '~/assets/data/Hardware/categories.json';
    import brandsData from '~/assets/data/Hardware/brand.json';
    import productsData from '~/assets/data/Hardware/products.json';

    interface DescriptionItem {
        label: string;
        value: string;
    }

    interface Product {
        id: number;
        name: string;
        description: DescriptionItem[];
        price: number;
        manufacturer_id: number;
        brand_id: number;
        category_id: number;
        subcategory_ids: number[];
        type_ids: number[];
        image: string;
        stock: number;
        rating: number;
        featured: boolean;
    }

    interface Category {
        id: number;
        name: string;
        slug: string;
        subcategories: { id: number; name: string; slug: string }[];
    }

    interface Brand {
        id: number;
        name: string;
        image: string;
    }

    const props = defineProps<{
        product: Product;
    }>();

    const quantity = ref(1);

    const categories = categoriesData as Category[];
    const brands = brandsData as Brand[];
    const products = productsData as Product[];

    const category = computed(() => {
        return categories.find(c => c.id === props.product.category_id);
    });

    const subcategory = computed(() => {
        if (!category.value) return null;
        const subcatId = props.product.subcategory_ids[0];
        return category.value.subcategories.find(s => s.id === subcatId);
    });

    const brand = computed(() => {
        return brands.find(b => b.id === props.product.brand_id);
    });

    const productSpecs = computed(() => {
        const specs = [...props.product.description];
        if (brand.value) {
            specs.unshift({ label: 'Brand', value: brand.value.name });
        }
        return specs;
    });

    const similarProducts = computed(() => {
        return products
            .filter(p => p.category_id === props.product.category_id && p.id !== props.product.id)
            .slice(0, 6);
    });

    const incrementQuantity = () => {
        if (quantity.value < props.product.stock) {
            quantity.value++;
        }
    };

    const decrementQuantity = () => {
        if (quantity.value > 1) {
            quantity.value--;
        }
    };
</script>
