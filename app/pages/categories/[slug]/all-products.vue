<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16"
            style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-1 sm:gap-2 text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
                    <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
                    <template v-for="crumb in breadcrumbs" :key="crumb.slug">
                        <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                        <NuxtLink :to="`/categories/${crumb.slug}`" class="hover:text-white">
                            {{ crumb.name }}
                        </NuxtLink>
                    </template>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <span class="text-white">All Products</span>
                </nav>

                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4">
                    {{ category?.name }} - All Products
                </h1>
                <p class="text-white/90 max-w-2xl text-sm sm:text-base">
                    Browse our complete collection of {{ category?.name }} products
                </p>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8 lg:py-12 gap-6 lg:gap-16">
            <!-- Mobile Filter Toggle Button -->
            <button @click="toggleFilters"
                class="lg:hidden flex items-center justify-center gap-2 w-full py-3 bg-brand text-white rounded-lg font-medium">
                <SlidersHorizontal class="w-5 h-5" />
                {{ filtersOpen ? 'Hide Filters' : 'Show Filters' }}
                <span v-if="activeFilterCount > 0" class="bg-white text-brand text-xs rounded-full px-2 py-0.5">
                    {{ activeFilterCount }}
                </span>
            </button>

            <!-- Sidebar Filters -->
            <Transition enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-2 max-h-0"
                enter-to-class="opacity-100 translate-y-0 max-h-[2000px]"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0 max-h-[2000px]"
                leave-to-class="opacity-0 -translate-y-2 max-h-0">
                <aside v-show="filtersOpen || isLargeScreen" class="w-full lg:w-64 shrink-0 overflow-hidden">
                    <div
                        class="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-gray-200">
                        <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-4">Filters</h2>

                        <div class="flex shadow-sm">
                            <input type="text" placeholder="Search products..." v-model="searchQuery"
                                class="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-r-0 border-gray-300 focus:outline-none focus:border-brand focus:ring-brand text-sm rounded-l"
                                @keyup.enter="updateFilters" />
                            <button @click="updateFilters"
                                class="bg-brand text-white px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-brand/90 transition-colors flex items-center justify-center rounded-r">
                                <Search class="w-4 h-4" />
                            </button>
                        </div>

                        <!-- Brand Filter -->
                        <FilterCategorySection label="Brand" :items="brands" v-model="selectedBrands"
                            :expanded="expandedSections.brand" @toggle="toggleFilterSection('brand')" />

                        <!-- Processor Filter -->
                        <FilterCategorySection label="Processor" :items="processors" v-model="selectedProcessors"
                            :expanded="expandedSections.processor" @toggle="toggleFilterSection('processor')" />

                        <!-- Clear All Filters Button (Mobile) -->
                        <button v-if="hasActiveFilters" @click="clearAllFilters"
                            class="lg:hidden w-full py-2 text-pink-500 border border-pink-500 rounded-lg font-medium mt-4 hover:bg-pink-50 transition-colors">
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
                    <span v-for="id in selectedBrands" :key="'b-' + id"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        {{ brands.find(b => b.id === id)?.name }}
                        <button @click="removeBrand(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="id in selectedProcessors" :key="'p-' + id"
                        class="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 text-xs sm:text-sm rounded-full flex items-center gap-1">
                        {{ processors.find(p => p.id === id)?.name }}
                        <button @click="removeProcessor(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <!-- Clear All (Desktop) -->
                    <button @click="clearAllFilters"
                        class="hidden lg:inline-flex px-3 py-1 text-pink-500 text-sm hover:underline">
                        Clear all
                    </button>
                </div>

                <!-- Sort and View Options -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <p class="text-gray-600 text-sm sm:text-base">
                        Showing <span class="font-semibold">{{ paginatedProducts.length }}</span> of
                        <span class="font-semibold">{{ filteredProducts.length }}</span> products
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
                    <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
                </div>

                <!-- Empty State -->
                <div v-if="filteredProducts.length === 0" class="text-center py-8 sm:py-12">
                    <Package class="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                    <h3 class="text-base sm:text-lg font-semibold text-gray-600">No products found</h3>
                    <p class="text-gray-500 mt-2 text-sm sm:text-base">Try adjusting your filters</p>
                    <button v-if="hasActiveFilters" @click="clearAllFilters"
                        class="mt-4 px-4 py-2 bg-brand text-white rounded-lg text-sm hover:bg-brand/90 transition-colors">
                        Clear All Filters
                    </button>
                </div>

                <!-- Pagination -->
                <Pagination v-if="totalPages > 1" v-model:page="currentPage" :total="filteredProducts.length"
                    :items-per-page="itemsPerPage" :sibling-count="isMobile ? 0 : 1" show-edges class="mt-6 sm:mt-8">
                    <PaginationContent v-slot="{ items }" class="flex-wrap justify-center gap-1">
                        <PaginationPrevious />
                        <template v-for="(item, index) in items" :key="index">
                            <PaginationItem v-if="item.type === 'page'" :value="item.value"
                                :is-active="item.value === currentPage">
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
    import brandData from '~/assets/data/Desktops/brand.json';
    import processorData from '~/assets/data/Desktops/processor.json';
    import productsData from '~/assets/data/Desktops/products.json';
    import FilterCategorySection from '~/components/ui/FilterCategorySection.vue';
    import type { CategoryTree } from '~/types';

    interface Brand {
        id: number;
        name: string;
    }

    interface Processor {
        id: number;
        name: string;
    }

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

    const route = useRoute();
    const router = useRouter();
    const slug = computed(() => route.params.slug as string);

    const { categories } = useCategories();

    // Recursively find a category by slug in the tree
    function findBySlug(nodes: CategoryTree[], target: string): CategoryTree | null {
        for (const node of nodes) {
            if (node.slug === target) return node;
            const found = findBySlug(node.children, target);
            if (found) return found;
        }
        return null;
    }

    // Build breadcrumb path from root to the target slug
    function buildBreadcrumbs(nodes: CategoryTree[], target: string, path: { name: string; slug: string }[] = []): { name: string; slug: string }[] | null {
        for (const node of nodes) {
            const current = [...path, { name: node.name, slug: node.slug }];
            if (node.slug === target) return current;
            const found = buildBreadcrumbs(node.children, target, current);
            if (found) return found;
        }
        return null;
    }

    const category = computed(() => {
        if (!categories.value) return null;
        return findBySlug(categories.value, slug.value);
    });

    const breadcrumbs = computed(() => {
        if (!categories.value) return [];
        return buildBreadcrumbs(categories.value, slug.value) || [];
    });

    const brands = brandData as Brand[];
    const processors = processorData as Processor[];
    const products = productsData as Product[];

    // Filter states
    const searchQuery = ref('');
    const selectedBrands = ref<number[]>([]);
    const selectedProcessors = ref<number[]>([]);
    const sortBy = ref('featured');
    const currentPage = ref(1);
    const itemsPerPage = 12;

    // Mobile/responsive states
    const filtersOpen = ref(false);
    const isLargeScreen = ref(true);
    const isMobile = ref(false);
    const expandedSections = ref({
        brand: true,
        processor: true,
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
        initFiltersFromQuery();
        isInitialized.value = true;
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
    });

    const toggleFilters = () => {
        filtersOpen.value = !filtersOpen.value;
    };

    const toggleFilterSection = (section: 'brand' | 'processor') => {
        if (!isLargeScreen.value) {
            expandedSections.value[section] = !expandedSections.value[section];
        }
    };

    const isInitialized = ref(false);

    const activeFilterCount = computed(() => {
        let count = 0;
        if (searchQuery.value.trim()) count++;
        count += selectedBrands.value.length;
        count += selectedProcessors.value.length;
        return count;
    });

    const initFiltersFromQuery = () => {
        const query = route.query;
        searchQuery.value = (query.search as string) || '';
        selectedBrands.value = query.brand
            ? (query.brand as string).split(',').map(Number)
            : [];
        selectedProcessors.value = query.processor
            ? (query.processor as string).split(',').map(Number)
            : [];
    };

    const hasActiveFilters = computed(() => {
        return searchQuery.value.trim() !== '' ||
            selectedBrands.value.length > 0 ||
            selectedProcessors.value.length > 0;
    });

    const updateFilters = () => {
        const query: Record<string, string> = {};
        if (searchQuery.value.trim()) {
            query.search = searchQuery.value.trim();
        }
        if (selectedBrands.value.length > 0) {
            query.brand = selectedBrands.value.join(',');
        }
        if (selectedProcessors.value.length > 0) {
            query.processor = selectedProcessors.value.join(',');
        }
        router.replace({ query });
        currentPage.value = 1;
    };

    const clearAllFilters = () => {
        searchQuery.value = '';
        selectedBrands.value = [];
        selectedProcessors.value = [];
        router.replace({ query: {} });
        currentPage.value = 1;
    };

    watch([selectedBrands, selectedProcessors], () => {
        if (isInitialized.value) {
            updateFilters();
        }
    });

    watch(searchQuery, (newVal, oldVal) => {
        if (isInitialized.value && newVal === '' && oldVal !== '') {
            updateFilters();
        }
    });

    const removeBrand = (id: number) => {
        selectedBrands.value = selectedBrands.value.filter(b => b !== id);
    };

    const removeProcessor = (id: number) => {
        selectedProcessors.value = selectedProcessors.value.filter(p => p !== id);
    };

    const filteredProducts = computed(() => {
        let result = [...products];

        if (searchQuery.value.trim()) {
            const search = searchQuery.value.toLowerCase().trim();
            result = result.filter(p =>
                p.name.toLowerCase().includes(search) ||
                p.description.some(d => d.value.toLowerCase().includes(search))
            );
        }

        if (selectedBrands.value.length > 0) {
            result = result.filter(p => selectedBrands.value.includes(p.brand_id));
        }

        if (selectedProcessors.value.length > 0) {
            const selectedProcessorNames = processors
                .filter(p => selectedProcessors.value.includes(p.id))
                .map(p => p.name.toLowerCase());
            result = result.filter(p =>
                p.description.some(d =>
                    d.label === 'Processor' &&
                    selectedProcessorNames.some(name => d.value.toLowerCase().includes(name))
                )
            );
        }

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

    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

    watch(currentPage, () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const paginatedProducts = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        return filteredProducts.value.slice(start, start + itemsPerPage);
    });

    watch(() => route.query, () => {
        initFiltersFromQuery();
    });

    useHead({
        title: computed(() => category.value ? `All Products - ${category.value.name} | Tan` : 'All Products | Tan'),
        meta: [
            {
                name: 'description',
                content: computed(() => category.value ? `Browse all ${category.value.name} products` : 'Browse all products'),
            },
        ],
    });
</script>
