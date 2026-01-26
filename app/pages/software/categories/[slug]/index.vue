<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16" style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
                    <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <NuxtLink to="/software" class="hover:text-white">Software</NuxtLink>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <span class="text-white">{{ category?.name }}</span>
                </nav>

                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
                    {{ category?.name }}
                </h1>
                <p class="text-white/90 max-w-2xl text-sm sm:text-base">
                    Browse our selection of {{ category?.name?.toLowerCase() }} products.
                </p>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 lg:py-12 gap-6 lg:gap-16">
            <!-- Mobile Filter Toggle Button -->
            <button
                @click="toggleFilters"
                class="lg:hidden flex items-center justify-center gap-2 w-full py-3 bg-brand text-white rounded-lg font-medium"
            >
                <SlidersHorizontal class="w-5 h-5" />
                {{ filtersOpen ? 'Hide Filters' : 'Show Filters' }}
                <span v-if="activeFilterCount > 0" class="bg-white text-brand text-xs rounded-full px-2 py-0.5">
                    {{ activeFilterCount }}
                </span>
            </button>

            <!-- Sidebar Filters -->
            <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-2 max-h-0"
                enter-to-class="opacity-100 translate-y-0 max-h-[2000px]"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0 max-h-[2000px]"
                leave-to-class="opacity-0 -translate-y-2 max-h-0"
            >
                <aside
                    v-show="filtersOpen || isLargeScreen"
                    class="w-full lg:w-64 shrink-0 overflow-hidden"
                >
                    <div class="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-gray-200">
                        <!-- Current Category & Subcategories -->
                        <div class="mb-4 sm:mb-6" v-if="category && category.subcategories.length > 0">
                            <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">{{ category.name }}</h2>
                            <div class="space-y-1">
                                <NuxtLink
                                    v-for="sub in category.subcategories"
                                    :key="sub.id"
                                    :to="`/software/categories/${category.slug}/${sub.slug}`"
                                    class="block py-2 px-3 text-sm text-gray-600 hover:text-brand hover:bg-gray-50 rounded transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                    {{ sub.name }}
                                </NuxtLink>
                            </div>
                        </div>

                        <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Filters</h2>

                        <div class="flex shadow-sm">
                            <input type="text" placeholder="Search products..."
                                class="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-r-0 border-gray-300 focus:outline-none focus:border-brand focus:ring-brand text-sm rounded-l"
                                v-model="nameSearch"
                                @keyup.enter="applyFilters" />
                            <button
                                class="bg-brand text-white px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-brand/90 transition-colors flex items-center justify-center rounded-r"
                                @click="applyFilters">
                                <Search class="w-4 h-4" />
                            </button>
                        </div>

                        <!-- Brand Filter -->
                        <div class="mb-4 sm:mb-6 mt-4 sm:mt-6">
                            <button
                                @click="toggleFilterSection('brand')"
                                class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2"
                            >
                                Brand
                                <ChevronDown :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.brand ? 'rotate-180' : '']" />
                            </button>
                            <div :class="['space-y-1 sm:space-y-2 max-h-48 overflow-y-auto pr-2', { 'hidden lg:block': !expandedSections.brand }]">
                                <label v-for="brand in brands" :key="brand.id"
                                    class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                    <input type="checkbox" :value="brand.id" v-model="selectedBrands"
                                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                    <span class="text-sm text-gray-700">{{ brand.name }}</span>
                                </label>
                            </div>
                        </div>

                        <!-- Price Range Filter -->
                        <div class="mb-4 sm:mb-6">
                            <button
                                @click="toggleFilterSection('price')"
                                class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2"
                            >
                                Price Range
                                <ChevronDown :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.price ? 'rotate-180' : '']" />
                            </button>
                            <div :class="['space-y-1 sm:space-y-2', { 'hidden lg:block': !expandedSections.price }]">
                                <label v-for="range in priceRanges" :key="range.id"
                                    class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                    <input type="checkbox" :value="range.id" v-model="selectedPriceRanges"
                                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                    <span class="text-sm text-gray-700">{{ range.label }}</span>
                                </label>
                            </div>
                        </div>

                        <!-- Rating Filter -->
                        <div class="mb-4 sm:mb-6">
                            <button
                                @click="toggleFilterSection('rating')"
                                class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2"
                            >
                                Rating
                                <ChevronDown :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.rating ? 'rotate-180' : '']" />
                            </button>
                            <div :class="['space-y-1 sm:space-y-2', { 'hidden lg:block': !expandedSections.rating }]">
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

                        <!-- Clear All Filters Button (Mobile) -->
                        <button
                            v-if="hasActiveFilters"
                            @click="clearAllFilters"
                            class="lg:hidden w-full py-2 text-pink-500 border border-pink-500 rounded-lg font-medium mt-2 hover:bg-pink-50 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                </aside>
            </Transition>

            <!-- Main Content -->
            <main class="flex-1 min-w-0">
                <!-- Active Filters Display -->
                <div v-if="hasActiveFilters" class="mb-4 sm:mb-6 flex flex-wrap gap-2 items-center">
                    <span class="text-xs sm:text-sm text-gray-600">Active filters:</span>
                    <span v-if="appliedSearch"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        Search: "{{ appliedSearch }}"
                        <button @click="nameSearch = ''; applyFilters()" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="id in selectedBrands" :key="'b-' + id"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        {{ brands.find(b => b.id === id)?.name }}
                        <button @click="removeBrand(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="id in selectedPriceRanges" :key="'p-' + id"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        {{ priceRanges.find(r => r.id === id)?.label }}
                        <button @click="removePriceRange(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="rating in selectedRatings" :key="'r-' + rating"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        {{ rating }}+ stars
                        <button @click="removeRating(rating)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <button
                        @click="clearAllFilters"
                        class="hidden lg:inline-flex px-3 py-1 text-pink-500 text-sm hover:underline"
                    >
                        Clear all
                    </button>
                </div>

                <!-- Sort and View Options -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <p class="text-gray-600 text-sm sm:text-base">
                        Showing <span class="font-semibold">{{ paginatedProducts.length }}</span> of <span class="font-semibold">{{ filteredProducts.length }}</span> products
                    </p>
                    <div class="flex items-center gap-2 sm:gap-4">
                        <label class="text-sm text-gray-600 hidden sm:inline">Sort by:</label>
                        <select v-model="sortBy"
                            class="flex-1 sm:flex-none border border-gray-300 rounded px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand">
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="name">Name A-Z</option>
                        </select>
                    </div>
                </div>

                <!-- Products Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    <SoftwareProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
                </div>

                <!-- Empty State -->
                <div v-if="filteredProducts.length === 0" class="text-center py-8 sm:py-12">
                    <Package class="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                    <h3 class="text-base sm:text-lg font-semibold text-gray-600">No products found</h3>
                    <p class="text-gray-500 mt-2 text-sm sm:text-base">Try adjusting your filters</p>
                    <button
                        v-if="hasActiveFilters"
                        @click="clearAllFilters"
                        class="mt-4 px-4 py-2 bg-brand text-white rounded-lg text-sm hover:bg-brand/90 transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>

                <!-- Pagination -->
                <Pagination
                    v-if="totalPages > 1"
                    v-model:page="currentPage"
                    :total="filteredProducts.length"
                    :items-per-page="itemsPerPage"
                    :sibling-count="isMobile ? 0 : 1"
                    show-edges
                    class="mt-6 sm:mt-8"
                >
                    <PaginationContent v-slot="{ items }" class="flex-wrap justify-center gap-1">
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
    import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useHead, createError } from '#imports';
    import { ChevronRight, ChevronDown, Star, Package, Search, SlidersHorizontal } from 'lucide-vue-next';
    import {
        Pagination,
        PaginationContent,
        PaginationEllipsis,
        PaginationItem,
        PaginationNext,
        PaginationPrevious,
    } from '~/components/ui/pagination';
    import categoriesData from '~/assets/data/Software/categories.json';
    import productsData from '~/assets/data/Software/products.json';
    import brandData from '~/assets/data/Software/brand.json';
    import msrpData from '~/assets/data/Software/msrp.json';

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

    interface Brand {
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
    const brands = brandData as Brand[];

    const nameSearch = ref('');
    const appliedSearch = ref('');

    // Mobile/responsive states
    const filtersOpen = ref(false);
    const isLargeScreen = ref(true);
    const isMobile = ref(false);
    const expandedSections = ref({
        brand: true,
        price: true,
        rating: true
    });

    // Handle screen resize
    const handleResize = () => {
        isLargeScreen.value = window.innerWidth >= 1024;
        isMobile.value = window.innerWidth < 640;
        if (isLargeScreen.value) {
            filtersOpen.value = false;
        }
    };

    onMounted(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
    });

    const toggleFilters = () => {
        filtersOpen.value = !filtersOpen.value;
    };

    const toggleFilterSection = (section: 'brand' | 'price' | 'rating') => {
        if (!isLargeScreen.value) {
            expandedSections.value[section] = !expandedSections.value[section];
        }
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

    // Check if any filters are active
    const hasActiveFilters = computed(() => {
        return appliedSearch.value.trim() !== '' ||
            selectedBrands.value.length > 0 ||
            selectedPriceRanges.value.length > 0 ||
            selectedRatings.value.length > 0;
    });

    // Count active filters for badge
    const activeFilterCount = computed(() => {
        let count = 0;
        if (appliedSearch.value.trim()) count++;
        count += selectedBrands.value.length;
        count += selectedPriceRanges.value.length;
        count += selectedRatings.value.length;
        return count;
    });

    // Remove individual filters
    const removeBrand = (id: number) => {
        selectedBrands.value = selectedBrands.value.filter(b => b !== id);
    };

    const removePriceRange = (id: number) => {
        selectedPriceRanges.value = selectedPriceRanges.value.filter(p => p !== id);
    };

    const removeRating = (rating: number) => {
        selectedRatings.value = selectedRatings.value.filter(r => r !== rating);
    };

    // Clear all filters
    const clearAllFilters = () => {
        nameSearch.value = '';
        appliedSearch.value = '';
        selectedBrands.value = [];
        selectedPriceRanges.value = [];
        selectedRatings.value = [];
        currentPage.value = 1;
    };

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

        // Filter by brands
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

    watch(currentPage, () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

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

    watch(nameSearch, (newVal) => {
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
        title: `${category.value?.name} - Software | Tan`,
        meta: [
            { name: 'description', content: `Browse our selection of ${category.value?.name?.toLowerCase()} products.` }
        ]
    });
</script>