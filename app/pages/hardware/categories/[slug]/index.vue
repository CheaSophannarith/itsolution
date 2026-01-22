<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-12 py-16" style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-6">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-2 text-white/80 text-sm mb-4">
                    <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
                    <ChevronRight class="w-4 h-4" />
                    <NuxtLink to="/hardware" class="hover:text-white">Hardware</NuxtLink>
                    <ChevronRight class="w-4 h-4" />
                    <span class="text-white">{{ category?.name }}</span>
                </nav>

                <h1 class="text-3xl font-bold text-white mb-4">
                    {{ category?.name }}
                </h1>
                <p class="text-white/90 max-w-2xl">
                    {{ category?.description }}
                </p>
            </div>
        </div>

        <div class="flex mx-auto max-w-7xl px-6 py-12 gap-16">
            <!-- Sidebar Filters -->
            <aside class="w-64 shrink-0">

                <!-- Current Category & Subcategories -->
                <div class="mb-6" v-if="category">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">{{ category.name }}</h2>
                    <div class="space-y-1">
                        <NuxtLink
                            v-for="sub in category.subcategories"
                            :key="sub.id"
                            :to="`/hardware/categories/${category.slug}/${sub.slug}`"
                            class="block py-2 px-3 text-sm text-gray-600 hover:text-brand hover:bg-gray-50 rounded transition-colors border-b border-gray-100 last:border-b-0"
                        >
                            {{ sub.name }}
                        </NuxtLink>
                    </div>
                </div>

                <h2 class="text-xl font-bold text-gray-800 mb-4">Filters</h2>

                <div class="flex shadow-sm">
                    <input type="text" placeholder="Search products..."
                        class="flex-1 px-4 py-2.5 border border-r-0 border-gray-300 focus:outline-none focus:border-brand focus:ring-brand text-sm"
                        v-model="nameSearch" />
                    <button
                        class="bg-brand text-white px-4 py-2.5 hover:bg-brand/90 transition-colors flex items-center justify-center"
                        @click="applyFilters">
                        <Search class="w-4 h-4" />
                    </button>
                </div>

                <!-- Brand Filter -->
                <div class="mb-6">
                    <h3 class="text-lg text-pink-500 font-bold mb-3 border-b border-pink-500 py-2">Brand</h3>
                    <div class="space-y-2 max-h-48 overflow-y-auto pr-2">
                        <label v-for="brand in brands" :key="brand.id"
                            class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" :value="brand.id" v-model="selectedBrands"
                                class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                            <span class="text-sm text-gray-700">{{ brand.name }}</span>
                        </label>
                    </div>
                </div>

                <!-- Price Range Filter -->
                <div class="mb-6">
                    <h3 class="text-lg text-pink-500 font-bold mb-3 border-b border-pink-500 py-2">Price Range</h3>
                    <div class="space-y-2">
                        <label v-for="range in priceRanges" :key="range.id"
                            class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" :value="range.id" v-model="selectedPriceRanges"
                                class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                            <span class="text-sm text-gray-700">{{ range.label }}</span>
                        </label>
                    </div>
                </div>

                <!-- Rating Filter -->
                <div class="mb-6">
                    <h3 class="text-lg text-pink-500 font-bold mb-3 border-b border-pink-500 py-2">Rating</h3>
                    <div class="space-y-2">
                        <label v-for="rating in ratingOptions" :key="rating"
                            class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" :value="rating" v-model="selectedRatings"
                                class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                            <span class="text-sm text-gray-700 flex items-center gap-1">
                                {{ rating }}+
                                <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </span>
                        </label>
                    </div>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="flex-1">
                <!-- Sort and View Options -->
                <div class="flex items-center justify-between mb-6">
                    <p class="text-gray-600">
                        Showing <span class="font-semibold">{{ filteredProducts.length }}</span> products
                    </p>
                    <div class="flex items-center gap-4">
                        <select v-model="sortBy"
                            class="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand">
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="name">Name A-Z</option>
                        </select>
                    </div>
                </div>

                <!-- Products Grid -->
                <div class="grid grid-cols-3 gap-6">
                    <HardwareProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
                </div>

                <!-- Empty State -->
                <div v-if="filteredProducts.length === 0" class="text-center py-12">
                    <Package class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 class="text-lg font-semibold text-gray-600">No products found</h3>
                    <p class="text-gray-500 mt-2">Try adjusting your filters</p>
                </div>

                <!-- Pagination -->
                <Pagination
                    v-if="totalPages > 1"
                    v-model:page="currentPage"
                    :total="filteredProducts.length"
                    :items-per-page="itemsPerPage"
                    :sibling-count="1"
                    show-edges
                    class="mt-8"
                >
                    <PaginationContent v-slot="{ items }">
                        <PaginationPrevious />
                        <template v-for="(item, index) in items" :key="index">
                            <PaginationItem
                                v-if="item.type === 'page'"
                                :value="item.value"
                                :is-active="item.value === currentPage"
                            >
                                {{ item.value }}
                            </PaginationItem>
                            <PaginationEllipsis v-else :index="index" />
                        </template>
                        <PaginationNext />
                    </PaginationContent>
                </Pagination>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { useHead, createError } from '#imports';
    import { ChevronRight, ChevronDown, Star, Package, Search } from 'lucide-vue-next';
    import {
        Pagination,
        PaginationContent,
        PaginationEllipsis,
        PaginationItem,
        PaginationNext,
        PaginationPrevious,
    } from '~/components/ui/pagination';
    import categoriesData from '~/assets/data/Hardware/categories.json';
    import productsData from '~/assets/data/Hardware/products.json';
    import brand from '~/assets/data/Hardware/brand.json';
    import msrpData from '~/assets/data/Hardware/msrp.json';

    interface Subcategory {
        id: number;
        name: string;
        slug: string;
    }

    interface Category {
        id: number;
        name: string;
        slug: string;
        image: string;
        description: string;
        subcategories: Subcategory[];
    }

    interface Product {
        id: number;
        name: string;
        description: string;
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

    interface brand {
        id: number;
        name: string;
        image: string;
        isPopular: boolean;
    }

    interface MsrpRange {
        id: number;
        label: string;
        min: number;
        max: number | null;
    }

    const route = useRoute();
    const slug = computed(() => route.params.slug as string);

    const categories = categoriesData as Category[];
    const products = productsData as Product[];
    const brands = brand as brand[];

    const nameSearch = ref('');
    const appliedSearch = ref('');
    const expandedCategories = ref<number[]>([]);

    const toggleCategory = (categoryId: number) => {
        const index = expandedCategories.value.indexOf(categoryId);
        if (index === -1) {
            expandedCategories.value.push(categoryId);
        } else {
            expandedCategories.value.splice(index, 1);
        }
    };

    const isCategoryExpanded = (categoryId: number) => {
        return expandedCategories.value.includes(categoryId);
    };

    // Find the current category based on slug
    const category = computed(() => {
        return categories.find(c => c.slug === slug.value);
    });

    // Get products for this category
    const categoryProducts = computed(() => {
        if (!category.value) return [];
        return products.filter(p => p.category_id === category.value!.id);
    });

    // Filter states
    const selectedBrands = ref<number[]>([]);
    const selectedPriceRanges = ref<number[]>([]);
    const selectedRatings = ref<number[]>([]);
    const sortBy = ref('featured');
    const currentPage = ref(1);
    const itemsPerPage = 12;

    // Price range options from msrp.json
    const priceRanges = msrpData as MsrpRange[];

    // Rating options
    const ratingOptions = [4, 3, 2, 1];

    // Filtered products
    const filteredProducts = computed(() => {
        let result = [...categoryProducts.value];

        // Filter by name search (partial match, case-insensitive)
        if (appliedSearch.value.trim()) {
            const searchTerm = appliedSearch.value.toLowerCase().trim();
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by subcategories
        if (selectedBrands.value.length > 0) {
            result = result.filter(p =>
                selectedBrands.value.includes(p.brand_id)
            );
        }

        // Filter by price range
        if (selectedPriceRanges.value.length > 0) {
            const selectedRanges = priceRanges.filter(r => selectedPriceRanges.value.includes(r.id));
            result = result.filter(p =>
                selectedRanges.some(range => p.price >= range.min && (range.max === null || p.price < range.max))
            );
        }

        // Filter by rating
        if (selectedRatings.value.length > 0) {
            const minRating = Math.min(...selectedRatings.value);
            result = result.filter(p => p.rating >= minRating);
        }

        // Sort products
        switch (sortBy.value) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'featured':
            default:
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        return result;
    });

    // Pagination
    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

    const paginatedProducts = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        return filteredProducts.value.slice(start, start + itemsPerPage);
    });

    const applyFilters = () => {
        appliedSearch.value = nameSearch.value;
        currentPage.value = 1;
    };

    // Reset page when filters change
    watch([selectedBrands, selectedPriceRanges, selectedRatings], () => {
        currentPage.value = 1;
    });

    watch(nameSearch, (newVal, oldVal) => {
        if (newVal === '') {
            appliedSearch.value = '';
            currentPage.value = 1;
        }
    });

    // Handle 404 if category not found
    if (!category.value) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Category Not Found'
        });
    }

    // SEO
    useHead({
        title: `${category.value?.name} - Hardware | Tan`,
        meta: [
            { name: 'description', content: category.value?.description }
        ]
    });
</script>

<style scoped>

    .slide-up-enter-active,
    .slide-up-leave-active {
        transition: all 0.3s ease;
    }

    .slide-up-enter-from,
    .slide-up-leave-to {
        transform: translateY(100%);
        opacity: 0;
    }
</style>
