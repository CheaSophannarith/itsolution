<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16"
            style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                    Laptops
                </h1>
                <NuxtLink to="/laptops/all-products"
                    class="bg-white text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-none font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base inline-block">
                    Shop all Laptops
                </NuxtLink>
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
                <aside v-show="filtersOpen || isLargeScreen" class="w-full lg:w-64 shrink-0 relative overflow-hidden">
                    <div
                        class="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-gray-200 pb-16">
                        <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">Filters</h2>
                        <!-- Search Box -->
                        <div class="flex shadow-sm">
                            <input type="text" placeholder="Search products..." v-model="searchQuery"
                                class="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-r-0 border-gray-300 focus:outline-none focus:border-brand focus:ring-brand text-sm rounded-l"
                                @keyup.enter="applyFilters" />
                            <button @click="applyFilters"
                                class="bg-brand text-white px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-brand/90 transition-colors flex items-center justify-center rounded-r">
                                <Search class="w-4 h-4" />
                            </button>
                        </div>

                        <!-- Brand Filter -->
                        <FilterCategorySection label="Brand" :items="brands" v-model="selectedBrands"
                            :expanded="expandedSections.brand" @toggle="toggleFilterSection('brand')" />

                        <!-- Processor Filter -->
                        <FilterCategorySection label="Processor" :items="processors" v-model="selectedProcessor"
                            :expanded="expandedSections.processor" @toggle="toggleFilterSection('processor')" />

                        <!-- Type Filter -->
                        <FilterCategorySection label="Type"
                            :items="types.map(type => ({ id: type.id, name: type.slug ?? '' }))" v-model="selectedTypes"
                            :expanded="expandedSections.type" @toggle="toggleFilterSection('type')" />

                        <!-- Clear All Filters Button (Mobile) -->
                        <button v-if="hasActiveFilters" @click="clearFilters"
                            class="lg:hidden w-full py-2 text-pink-500 border border-pink-500 rounded-lg font-medium mt-4 hover:bg-pink-50 transition-colors">
                            Clear All Filters
                        </button>
                    </div>
                </aside>
            </Transition>

            <!-- Apply Filter Button - Fixed at bottom of page -->
            <FilterApplyBar :hasActiveFilters="hasActiveFilters" :activeFilterCount="activeFilterCount"
                @clearFilters="clearFilters" @applyFilters="applyFilters" />

            <!-- Main Content Area -->
            <main class="flex-1 min-w-0">
                <div class="mx-auto max-w-7xl px-0 sm:px-4 lg:px-8">
                    <h1 class="text-blue-950 text-xl sm:text-2xl font-bold">Shop by category</h1>
                </div>

                <!-- Categories Section -->
                <div class="mt-8 sm:mt-12">
                    <!-- Categories Grid -->
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-start">
                        <LaptopsCategoriesCard v-for="category in displayedCategories" :key="category.id"
                            :category="category" :is-expanded="expandedCategoryId === category.id"
                            @toggle="handleCategoryToggle" />
                    </div>

                    <!-- Show More Button -->
                    <div v-if="categories.length > 8" class="mt-6 sm:mt-8 flex items-center justify-center">
                        <div class="flex-1 border-t border-pink-500"></div>
                        <button @click="showAllCategories = !showAllCategories"
                            class="px-4 sm:px-6 text-pink-500 font-bold hover:text-pink-300 flex items-center gap-2 text-sm sm:text-base whitespace-nowrap">
                            {{ showAllCategories ? 'Show less' : 'Show more' }}
                            <ChevronDown v-if="!showAllCategories" class="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                            <ChevronUp v-else class="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                        </button>
                        <div class="flex-1 border-t border-pink-500"></div>
                    </div>
                </div>

                <!-- All Products Section -->
                <div ref="allProductsSection" class="mt-12 sm:mt-16">
                    <h2 class="text-blue-950 text-xl sm:text-2xl font-bold mb-6 sm:mb-8">All Products</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        <LaptopsProductCard v-for="product in paginatedProducts" :key="product.id"
                            :product="product" />
                    </div>

                    <!-- Pagination -->
                    <Pagination
                        v-if="totalPages > 1"
                        v-model:page="currentPage"
                        :total="products.length"
                        :items-per-page="itemsPerPage"
                        :sibling-count="1"
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
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronDown, ChevronUp, Search, SlidersHorizontal } from 'lucide-vue-next';
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import brandData from '~/assets/data/Laptops/brand.json';
    import categoriesData from '~/assets/data/Laptops/categories.json';
    import processorData from '~/assets/data/Laptops/processor.json';
    import productsData from '~/assets/data/Laptops/products.json';
    import typesData from '~/assets/data/Laptops/type.json';
    import FilterApplyBar from '~/components/ui/FilterApplyBar.vue';
    import FilterCategorySection from '~/components/ui/FilterCategorySection.vue';
    import {
        Pagination,
        PaginationContent,
        PaginationEllipsis,
        PaginationItem,
        PaginationNext,
        PaginationPrevious,
    } from '~/components/ui/pagination';

    interface SubCategory {
        id: number;
        name: string;
        slug: string;
    }

    interface Category {
        id: number;
        name: string;
        slug: string;
        image: string;
        subcategories: SubCategory[];
    }

    useHead({
        title: 'Laptops | Tan',
    });

    const router = useRouter();
    const brands = brandData as SubCategory[];
    const processors = processorData as SubCategory[];
    const types = typesData as SubCategory[];
    const categories = categoriesData as Category[];
    const products = productsData as any[];
    const searchQuery = ref('');

    // Mobile/responsive states
    const filtersOpen = ref(false);
    const isLargeScreen = ref(true);
    const expandedSections = ref({
        brand: true,
        processor: true,
        type: true,
    });

    // Handle screen resize
    const handleResize = () => {
        isLargeScreen.value = window.innerWidth >= 1024;
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

    const toggleFilterSection = (section: 'brand' | 'processor' | 'type') => {
        if (!isLargeScreen.value) {
            expandedSections.value[section] = !expandedSections.value[section];
        }
    };

    const selectedBrands = ref<number[]>([]);
    const selectedProcessor = ref<number[]>([]);
    const selectedTypes = ref<number[]>([]);
    const showAllCategories = ref(false);
    const allProductsSection = ref<HTMLElement | null>(null);
    const expandedCategoryId = ref<number | null>(null);

    const { currentPage, itemsPerPage, totalPages, paginatedItems: paginatedProducts } = usePagination(
        products,
        { itemsPerPage: 8, scrollTarget: allProductsSection }
    );

    const handleCategoryToggle = (categoryId: number) => {
        if (expandedCategoryId.value === categoryId) {
            expandedCategoryId.value = null;
        } else {
            expandedCategoryId.value = categoryId;
        }
    };

    const displayedCategories = computed(() => {
        return showAllCategories.value ? categories : categories.slice(0, 8);
    });

    const featuredProducts = computed(() => {
        return products.filter(p => p.featured);
    });

    // Check if any filters are active
    const hasActiveFilters = computed(() => {
        return selectedBrands.value.length > 0 ||
            selectedProcessor.value.length > 0 ||
            selectedTypes.value.length > 0;
    });

    // Count total active filters
    const activeFilterCount = computed(() => {
        return selectedBrands.value.length +
            selectedProcessor.value.length +
            selectedTypes.value.length;
    });

    // Apply filters function - navigate to all-products page with query params
    const applyFilters = () => {
        const query: Record<string, string> = {};

        if (searchQuery.value.trim()) {
            query.search = searchQuery.value.trim();
        }
        if (selectedBrands.value.length > 0) {
            query.brand = selectedBrands.value.join(',');
        }
        if (selectedProcessor.value.length > 0) {
            query.processor = selectedProcessor.value.join(',');
        }
        if (selectedTypes.value.length > 0) {
            query.types = selectedTypes.value.join(',');
        }

        router.push({
            path: '/laptops/all-products',
            query
        });
    };

    // Clear all filters
    const clearFilters = () => {
        selectedBrands.value = [];
        selectedProcessor.value = [];
        selectedTypes.value = [];
    };
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