<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16" style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
                    <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <NuxtLink to="/hardware" class="hover:text-white">Hardware</NuxtLink>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <span class="text-white">All Products</span>
                </nav>

                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
                    All Hardware Products
                </h1>
                <p class="text-white/90 max-w-2xl text-sm sm:text-base">
                    Browse our complete collection of hardware products
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
                        <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-4">Filters</h2>

                        <div class="flex shadow-sm">
                            <input type="text" placeholder="Search products..."
                                class="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-r-0 border-gray-300 focus:outline-none focus:border-brand focus:ring-brand text-sm rounded-l"
                                v-model="searchQuery"
                                @keyup.enter="updateFilters"
                            />
                            <button
                                @click="updateFilters"
                                class="bg-brand text-white px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-brand/90 transition-colors flex items-center justify-center rounded-r">
                                <Search class="w-4 h-4" />
                            </button>
                        </div>

                        <!-- Manufacturer Filter -->
                        <div class="mb-4 sm:mb-6 mt-4 sm:mt-6">
                            <button
                                @click="toggleFilterSection('manufacturer')"
                                class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2"
                            >
                                Manufacturer
                                <ChevronDown :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.manufacturer ? 'rotate-180' : '']" />
                            </button>
                            <div :class="['space-y-1 sm:space-y-2 max-h-48 overflow-y-auto pr-2', { 'hidden lg:block': !expandedSections.manufacturer }]">
                                <label v-for="manufacturer in manufacturers" :key="manufacturer.id"
                                    class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                    <input type="checkbox" :value="manufacturer.id" v-model="selectedManufacturers"
                                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                    <span class="text-sm text-gray-700">{{ manufacturer.name }}</span>
                                </label>
                            </div>
                        </div>

                        <!-- MSRP Filter -->
                        <div class="mb-4 sm:mb-6">
                            <button
                                @click="toggleFilterSection('price')"
                                class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2"
                            >
                                Price Range
                                <ChevronDown :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.price ? 'rotate-180' : '']" />
                            </button>
                            <div :class="['space-y-1 sm:space-y-2', { 'hidden lg:block': !expandedSections.price }]">
                                <label v-for="range in msrpRanges" :key="range.id"
                                    class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                    <input type="checkbox" :value="range.id" v-model="selectedMsrp"
                                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                    <span class="text-sm text-gray-700">{{ range.label }}</span>
                                </label>
                            </div>
                        </div>

                        <!-- Type Filter -->
                        <div class="mb-4 sm:mb-6">
                            <button
                                @click="toggleFilterSection('type')"
                                class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2"
                            >
                                Type
                                <ChevronDown :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.type ? 'rotate-180' : '']" />
                            </button>
                            <div :class="['space-y-1 sm:space-y-2', { 'hidden lg:block': !expandedSections.type }]">
                                <label v-for="productType in types" :key="productType.id"
                                    class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                    <input type="checkbox" :value="productType.id" v-model="selectedTypes"
                                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                    <span class="text-sm text-gray-700">{{ productType.slug }}</span>
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
                    <span v-if="searchQuery"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        Search: "{{ searchQuery }}"
                        <button @click="searchQuery = ''; updateFilters()" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="id in selectedManufacturers" :key="'m-' + id"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        {{ manufacturers.find(m => m.id === id)?.name }}
                        <button @click="removeManufacturer(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="id in selectedMsrp" :key="'p-' + id"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        {{ msrpRanges.find(r => r.id === id)?.label }}
                        <button @click="removeMsrp(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="id in selectedTypes" :key="'t-' + id"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        {{ types.find(t => t.id === id)?.slug }}
                        <button @click="removeType(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <!-- Clear All (Desktop) -->
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
                    <HardwareProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
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
    import { useRoute, useRouter } from 'vue-router';
    import { useHead } from '#imports';
    import { ChevronRight, ChevronDown, Package, Search, SlidersHorizontal } from 'lucide-vue-next';
    import {
        Pagination,
        PaginationContent,
        PaginationEllipsis,
        PaginationItem,
        PaginationNext,
        PaginationPrevious,
    } from '~/components/ui/pagination';
    import type { Manufacturer } from '~/types/models/manufacturer';
    import type { MsrpRange } from '~/types/models/msrp-range';
    import type { ProductType } from '~/types/models/product-type';
    import type { Product } from '~/types/models/product';
    import manufacturersData from '~/assets/data/Hardware/manufacturers.json';
    import msrpData from '~/assets/data/Hardware/msrp.json';
    import typesData from '~/assets/data/Hardware/type.json';
    import productsData from '~/assets/data/Hardware/products.json';

    const route = useRoute();
    const router = useRouter();

    const manufacturers = manufacturersData as Manufacturer[];
    const products = productsData as Product[];
    const msrpRanges = msrpData as MsrpRange[];
    const types = typesData as ProductType[];

    // Filter states
    const searchQuery = ref('');
    const selectedManufacturers = ref<number[]>([]);
    const selectedMsrp = ref<number[]>([]);
    const selectedTypes = ref<number[]>([]);
    const sortBy = ref('featured');
    const currentPage = ref(1);
    const itemsPerPage = 12;

    // Mobile/responsive states
    const filtersOpen = ref(false);
    const isLargeScreen = ref(true);
    const isMobile = ref(false);
    const expandedSections = ref({
        manufacturer: true,
        price: true,
        type: true
    });

    // Handle screen resize
    const handleResize = () => {
        isLargeScreen.value = window.innerWidth >= 1024;
        isMobile.value = window.innerWidth < 640;
        // Auto-close filters on large screens
        if (isLargeScreen.value) {
            filtersOpen.value = false;
        }
    };

    onMounted(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        initFiltersFromQuery();
        isInitialized.value = true;
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
    });

    const toggleFilters = () => {
        filtersOpen.value = !filtersOpen.value;
    };

    const toggleFilterSection = (section: 'manufacturer' | 'price' | 'type') => {
        if (!isLargeScreen.value) {
            expandedSections.value[section] = !expandedSections.value[section];
        }
    };

    // Flag to prevent watch from triggering during initialization
    const isInitialized = ref(false);

    // Count active filters for badge
    const activeFilterCount = computed(() => {
        let count = 0;
        if (searchQuery.value.trim()) count++;
        count += selectedManufacturers.value.length;
        count += selectedMsrp.value.length;
        count += selectedTypes.value.length;
        return count;
    });

    // Initialize filters from query params
    const initFiltersFromQuery = () => {
        const query = route.query;

        searchQuery.value = (query.search as string) || '';
        selectedManufacturers.value = query.manufacturers
            ? (query.manufacturers as string).split(',').map(Number)
            : [];
        selectedMsrp.value = query.msrp
            ? (query.msrp as string).split(',').map(Number)
            : [];
        selectedTypes.value = query.types
            ? (query.types as string).split(',').map(Number)
            : [];
    };

    // Check if any filters are active
    const hasActiveFilters = computed(() => {
        return searchQuery.value.trim() !== '' ||
            selectedManufacturers.value.length > 0 ||
            selectedMsrp.value.length > 0 ||
            selectedTypes.value.length > 0;
    });

    // Update URL with current filters
    const updateFilters = () => {
        const query: Record<string, string> = {};

        if (searchQuery.value.trim()) {
            query.search = searchQuery.value.trim();
        }
        if (selectedManufacturers.value.length > 0) {
            query.manufacturers = selectedManufacturers.value.join(',');
        }
        if (selectedMsrp.value.length > 0) {
            query.msrp = selectedMsrp.value.join(',');
        }
        if (selectedTypes.value.length > 0) {
            query.types = selectedTypes.value.join(',');
        }

        router.replace({ query });
        currentPage.value = 1;
    };

    // Clear all filters
    const clearAllFilters = () => {
        searchQuery.value = '';
        selectedManufacturers.value = [];
        selectedMsrp.value = [];
        selectedTypes.value = [];
        router.replace({ query: {} });
        currentPage.value = 1;
    };

    // Watch filters and auto-update URL when they change
    watch([selectedManufacturers, selectedMsrp, selectedTypes], () => {
        if (isInitialized.value) {
            updateFilters();
        }
    });

    // Watch search query with debounce effect (update on clear)
    watch(searchQuery, (newVal, oldVal) => {
        if (isInitialized.value && newVal === '' && oldVal !== '') {
            updateFilters();
        }
    });

    // Remove individual filters
    const removeManufacturer = (id: number) => {
        selectedManufacturers.value = selectedManufacturers.value.filter(m => m !== id);
    };

    const removeMsrp = (id: number) => {
        selectedMsrp.value = selectedMsrp.value.filter(m => m !== id);
    };

    const removeType = (id: number) => {
        selectedTypes.value = selectedTypes.value.filter(t => t !== id);
    };

    // Filtered products
    const filteredProducts = computed(() => {
        let result = [...products];

        // Filter by search query
        if (searchQuery.value.trim()) {
            const search = searchQuery.value.toLowerCase().trim();
            result = result.filter(p =>
                p.name.toLowerCase().includes(search) ||
                p.description.some(d => d.value.toLowerCase().includes(search))
            );
        }

        // Filter by manufacturer
        if (selectedManufacturers.value.length > 0) {
            result = result.filter(p => selectedManufacturers.value.includes(p.manufacturer_id));
        }

        // Filter by MSRP
        if (selectedMsrp.value.length > 0) {
            const selectedRanges = msrpRanges.filter(r => selectedMsrp.value.includes(r.id));
            result = result.filter(p =>
                selectedRanges.some(range => p.price >= range.min && (range.max === null || p.price < range.max))
            );
        }

        // Filter by type
        if (selectedTypes.value.length > 0) {
            result = result.filter(p =>
                p.type_ids.some(tid => selectedTypes.value.includes(tid))
            );
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

    // Watch for query changes (e.g., browser back/forward)
    watch(() => route.query, () => {
        initFiltersFromQuery();
    });

    // SEO
    useHead({
        title: 'All Products - Hardware | Tan',
        meta: [
            { name: 'description', content: 'Browse all hardware products' }
        ]
    });
</script>