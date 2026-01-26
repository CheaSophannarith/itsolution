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
                        <NuxtLink v-if="crumb.slug !== slug" :to="`/categories/${crumb.slug}`"
                            class="hover:text-white">
                            {{ crumb.name }}
                        </NuxtLink>
                        <span v-else class="text-white">{{ crumb.name }}</span>
                    </template>
                </nav>

                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                    {{ category?.name }}
                </h1>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="status === 'pending'" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
        </div>

        <template v-else-if="category">
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
                        <div class="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-gray-200 pb-16">
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
                    <!-- Categories Section -->
                    <div v-if="filteredChildren.length > 0" class="mt-8 sm:mt-12">
                        <!-- Categories Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-start">
                                <CategoriesCard v-for="child in displayedChildren" :key="child.uuid"
                                :category="child" :is-expanded="!!expandedCards[child.uuid]"
                                @toggle="toggleExpand" />
                        </div>

                        <!-- Show More Button -->
                        <div v-if="filteredChildren.length > 8" class="mt-6 sm:mt-8 flex items-center justify-center">
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

                    <!-- Empty State -->
                    <div v-else class="text-center py-12">
                        <Package class="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                        <h3 class="text-base sm:text-lg font-semibold text-gray-600">No categories found</h3>
                        <p class="text-gray-500 mt-2 text-sm sm:text-base">Try adjusting your search</p>
                    </div>

                    <!-- All Products Section -->
                    <div ref="allProductsSection" class="mt-12 sm:mt-16">
                        <h2 class="text-blue-950 text-xl sm:text-2xl font-bold mb-6 sm:mb-8">All Products</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            <ProductCard v-for="product in paginatedProducts" :key="product.id"
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
        </template>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { createError } from '#imports';
    import { ChevronRight, ChevronDown, ChevronUp, Search, SlidersHorizontal, Package } from 'lucide-vue-next';
    import brandData from '~/assets/data/Desktops/brand.json';
    import processorData from '~/assets/data/Desktops/processor.json';
    import productsData from '~/assets/data/Desktops/products.json';
    import FilterApplyBar from '~/components/ui/FilterApplyBar.vue';
    import FilterCategorySection from '~/components/ui/FilterCategorySection.vue';
    import type { CategoryTree } from '~/types';

    const route = useRoute();
    const router = useRouter();
    const slug = computed(() => route.params.slug as string);

    const { categories, status } = useCategories();

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

    // Search
    const searchQuery = ref('');

    const filteredChildren = computed(() => {
        if (!category.value) return [];
        if (!searchQuery.value.trim()) return category.value.children;
        const query = searchQuery.value.toLowerCase().trim();
        return category.value.children.filter(child =>
            child.name.toLowerCase().includes(query)
        );
    });

    // Show more / less
    const showAllCategories = ref(false);

    const displayedChildren = computed(() => {
        return showAllCategories.value
            ? filteredChildren.value
            : filteredChildren.value.slice(0, 4);
    });

    // Expandable card state
    const expandedCards = reactive<Record<string, boolean>>({});

    function toggleExpand(uuid: string) {
        expandedCards[uuid] = !expandedCards[uuid];
    }

    // Product data
    const brands = brandData as { id: number; name: string; slug: string }[];
    const processors = processorData as { id: number; name: string; slug: string }[];
    const products = productsData as any[];

    // Pagination
    const allProductsSection = ref<HTMLElement | null>(null);

    const { currentPage, itemsPerPage, totalPages, paginatedItems: paginatedProducts } = usePagination(
        products,
        { itemsPerPage: 4, scrollTarget: allProductsSection }
    );

    // Mobile/responsive states
    const filtersOpen = ref(false);
    const isLargeScreen = ref(true);
    const selectedBrands = ref<number[]>([]);
    const selectedProcessor = ref<number[]>([]);
    const expandedSections = ref({
        brand: true,
        processor: true,
    });

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

    const toggleFilterSection = (section: 'brand' | 'processor') => {
        if (!isLargeScreen.value) {
            expandedSections.value[section] = !expandedSections.value[section];
        }
    };

    // Check if any filters are active
    const hasActiveFilters = computed(() => {
        return selectedBrands.value.length > 0 ||
            selectedProcessor.value.length > 0;
    });

    // Count total active filters
    const activeFilterCount = computed(() => {
        return selectedBrands.value.length +
            selectedProcessor.value.length;
    });

    // Apply filters function
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

        router.push({
            path: `/categories/${slug.value}/all-products`,
            query
        });
    };

    // Clear all filters
    const clearFilters = () => {
        selectedBrands.value = [];
        selectedProcessor.value = [];
    };

    // 404 handling - only after data is loaded
    if (status.value !== 'pending' && !category.value) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Category Not Found',
        });
    }

    // SEO
    useHead({
        title: computed(() => category.value ? `${category.value.name} | Tan` : 'Categories | Tan'),
        meta: [
            {
                name: 'description',
                content: computed(() => category.value ? `Browse ${category.value.name} categories` : 'Browse categories'),
            },
        ],
    });
</script>
