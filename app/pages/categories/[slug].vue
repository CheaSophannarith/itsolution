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
                        <NuxtLink v-if="crumb.slug !== slug" :to="`/categories/${crumb.slug}`" class="hover:text-white">
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
        <div v-if="status === 'pending' || filterStatus === 'pending'" class="flex items-center justify-center py-12">
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
                    <aside v-show="filtersOpen || isLargeScreen"
                        class="w-full lg:w-64 shrink-0 relative overflow-hidden">
                        <div
                            class="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-gray-200 pb-16">
                            <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">Filters</h2>

                            <!-- Search Box -->
                            <div class="flex shadow-sm">
                                <input type="text" placeholder="Search products..." v-model="searchQuery"
                                    class="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 focus:outline-none focus:border-brand focus:ring-brand text-sm rounded"
                                />
                            </div>

                            <!-- Categories Navigation with Dropdown -->
                            <div v-if="category && category.children.length > 0" class="mt-4 sm:mt-6">
                                <div
                                    class="text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2">
                                    Categories
                                </div>
                                <div class="space-y-1">
                                    <div v-for="child in displayedCategories" :key="child.uuid">
                                        <!-- Child category with dropdown toggle -->
                                        <div class="flex items-center justify-between">
                                            <NuxtLink :to="`/categories/${child.slug}`"
                                                class="flex-1 text-sm p-1 rounded hover:bg-gray-50 text-gray-700 hover:text-pink-500">
                                                {{ child.name }}
                                            </NuxtLink>
                                            <button v-if="child.children && child.children.length > 0"
                                                @click.prevent="toggleDropdown(child.slug)"
                                                class="p-1 hover:bg-gray-100 rounded">
                                                <ChevronDown
                                                    :class="['w-4 h-4 transition-transform text-gray-500', expandedDropdowns[child.slug] ? 'rotate-180' : '']" />
                                            </button>
                                        </div>
                                        <!-- Grandchildren dropdown -->
                                        <Transition enter-active-class="transition ease-out duration-200"
                                            enter-from-class="opacity-0 max-h-0" enter-to-class="opacity-100 max-h-96"
                                            leave-active-class="transition ease-in duration-150"
                                            leave-from-class="opacity-100 max-h-96" leave-to-class="opacity-0 max-h-0">
                                            <div v-if="expandedDropdowns[child.slug] && child.children && child.children.length > 0"
                                                class="pl-4 space-y-1 overflow-hidden">
                                                <NuxtLink v-for="grandchild in child.children" :key="grandchild.uuid"
                                                    :to="`/categories/${grandchild.slug}`"
                                                    class="block text-sm p-1 rounded hover:bg-gray-50 text-gray-600 hover:text-pink-500">
                                                    {{ grandchild.name }}
                                                </NuxtLink>
                                            </div>
                                        </Transition>
                                    </div>
                                    <button v-if="category.children.length > 5"
                                        @click="showAllCategories = !showAllCategories"
                                        class="text-sm text-pink-500 hover:text-pink-300 font-medium mt-2 flex items-center gap-1">
                                        <ChevronDown
                                            :class="['w-4 h-4 transition-transform', showAllCategories ? 'rotate-180' : '']" />
                                        {{ showAllCategories ? 'Show less' : 'Show more' }}
                                    </button>
                                </div>
                            </div>

                            <!-- Brand Filter -->
                            <FilterCategorySection v-if="brandItems.length > 0" label="Brand" :items="brandItems" v-model="selectedBrands"
                                :expanded="expandedSections.brand ?? true" @toggle="toggleFilterSection('brand')" />

                            <!-- Dynamic Attribute Filters -->
                            <FilterCategorySection v-for="attr in attributeItems" :key="attr.slug" :label="attr.name"
                                :items="attr.items" :model-value="getAttributeSelection(attr.slug)"
                                @update:model-value="setAttributeSelection(attr.slug, $event ?? [])"
                                :expanded="expandedSections[attr.slug] ?? true"
                                @toggle="toggleFilterSection(attr.slug)" />

                            <!-- Price Range Filter -->
                            <FilterPriceRange v-if="priceRange && priceRange.max > priceRange.min" :min="priceRange.min" :max="priceRange.max"
                                v-model:min-value="priceMin" v-model:max-value="priceMax"
                                :expanded="expandedSections.price ?? true" @toggle="toggleFilterSection('price')" />

                            <!-- In Stock Filter -->
                            <div class="mt-4 sm:mt-6">
                                <label class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded p-1">
                                    <input type="checkbox" v-model="inStock"
                                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                    <span class="text-sm font-medium text-gray-700">In Stock Only</span>
                                </label>
                            </div>

                            <!-- Clear All Filters Button (Mobile) -->
                            <button v-if="hasActiveFilters" @click="clearFilters"
                                class="lg:hidden w-full py-2 text-pink-500 border border-pink-500 rounded-lg font-medium mt-4 hover:bg-pink-50 transition-colors">
                                Clear All Filters
                            </button>
                        </div>
                    </aside>
                </Transition>

                <!-- Main Content Area -->
                <main class="flex-1 min-w-0">
                    <!-- All Products Section -->
                    <div ref="allProductsSection" class="mt-12 sm:mt-16">
                        <div class="flex items-center justify-between mb-6 sm:mb-8">
                            <h2 class="text-blue-950 text-xl sm:text-2xl font-bold">All Products</h2>
                            <div class="flex items-center gap-2">
                                <ArrowUpDown class="w-4 h-4 text-gray-500" />
                                <select v-model="sortBy"
                                    class="text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand focus:ring-brand bg-white">
                                    <option value="-created_at">Newest</option>
                                    <option value="created_at">Oldest</option>
                                    <option value="price">Price: Low to High</option>
                                    <option value="-price">Price: High to Low</option>
                                    <option value="name">Name: A–Z</option>
                                    <option value="-name">Name: Z–A</option>
                                </select>
                            </div>
                        </div>
                        <template v-if="products.length > 0">
                            <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                                <ProductCard v-for="product in paginatedProducts" :key="product.uuid" :product="product" />
                            </div>
                        </template>
                        <div v-else class="flex flex-col items-center justify-center py-16 text-center">
                            <p class="text-gray-500 text-lg font-medium">No products available</p>
                            <p class="text-gray-400 text-sm mt-2">Try adjusting your filters or search criteria.</p>
                        </div>

                        <!-- Pagination -->
                        <Pagination v-if="totalPages > 1" v-model:page="currentPage" :total="products.length"
                            :items-per-page="itemsPerPage" :sibling-count="1" show-edges class="mt-6 sm:mt-8">
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
                    </div>
                </main>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { createError } from '#imports';
    import { ChevronRight, ChevronDown, SlidersHorizontal, ArrowUpDown } from 'lucide-vue-next';
    import FilterCategorySection from '~/components/custom/FilterCategorySection.vue';
    import FilterPriceRange from '~/components/custom/FilterPriceRange.vue';
    import type { CategoryTree } from '~/types';

    const route = useRoute();
    const slug = computed(() => route.params.slug as string);

    const { categories, status } = useCategories();

    const {
        brands: apiBrands,
        attributes,
        priceRange,
        breadcrumbs: filterBreadcrumbs,
        status: filterStatus,
    } = useCategoryFilters(slug);

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
        let crumbs: { name: string; slug: string }[] = [];

        if (filterBreadcrumbs.value.length > 0) {
            crumbs = [...filterBreadcrumbs.value];
        } else if (categories.value) {
            crumbs = buildBreadcrumbs(categories.value, slug.value) || [];
        }

        // Ensure the current category is included at the end
        if (category.value && !crumbs.some(c => c.slug === slug.value)) {
            crumbs.push({ name: category.value.name, slug: category.value.slug });
        }

        return crumbs;
    });

    // Search
    const searchQuery = ref('');

    // Sort & in-stock filter state
    const sortBy = ref('-created_at');
    const inStock = ref(false);

    // Filter selections
    const selectedBrands = ref<string[]>([]);
    const selectedAttributes = ref<Record<string, string[]>>({});
    const priceMin = ref<number | undefined>(undefined);
    const priceMax = ref<number | undefined>(undefined);

    // Applied filter params computed from reactive state
    const appliedFilters = computed<Record<string, string | number | boolean | string[]>>(() => {
        const query: Record<string, string | number | boolean | string[]> = {};

        // Search
        if (searchQuery.value.trim()) {
            query['filter[search]'] = searchQuery.value.trim();
        }

        // Brands (UUIDs)
        if (selectedBrands.value.length > 0) {
            query['filter[brands][]'] = selectedBrands.value;
        }

        // Attributes — collect all selected option UUIDs
        const attributeUuids: string[] = [];
        for (const values of Object.values(selectedAttributes.value)) {
            if (values && values.length > 0) {
                attributeUuids.push(...values);
            }
        }
        if (attributeUuids.length > 0) {
            query['filter[attributes][uuid][]'] = attributeUuids;
        }

        // Price range
        if (priceMin.value !== undefined) {
            query['filter[price_min]'] = priceMin.value;
        }
        if (priceMax.value !== undefined) {
            query['filter[price_max]'] = priceMax.value;
        }

        // In-stock
        if (inStock.value) {
            query['filter[in_stock]'] = true;
        }

        // Sort
        if (sortBy.value) {
            query['sort'] = sortBy.value;
        }

        return query;
    });

    // Fetch products from API with filters
    const { products } = useCategoryProducts(slug, appliedFilters);

    // Brand filter items from API
    const brandItems = computed(() => {
        return apiBrands.value.map(b => ({
            uuid: b.uuid,
            id: b.slug,
            name: `${b.name} (${b.count})`,
        }));
    });

    // Dynamic attribute filter items from API
    const attributeItems = computed(() => {
        return attributes.value.map(attr => ({
            slug: attr.slug,
            name: attr.name,
            items: attr.options.map(opt => ({
                uuid: opt.uuid,
                id: opt.value,
                name: `${opt.label} (${opt.count})`,
            })),
        }));
    });

    // Pagination
    const allProductsSection = ref<HTMLElement | null>(null);

    const { currentPage, itemsPerPage, totalPages, paginatedItems: paginatedProducts } = usePagination(
        products,
        { itemsPerPage: 14, scrollTarget: allProductsSection }
    );

    // Mobile/responsive states
    const filtersOpen = ref(false);
    const isLargeScreen = ref(true);
    const showAllCategories = ref(false);
    const expandedDropdowns = ref<Record<string, boolean>>({});

    const toggleDropdown = (slug: string) => {
        expandedDropdowns.value[slug] = !expandedDropdowns.value[slug];
    };

    const displayedCategories = computed(() => {
        if (!category.value) return [];
        return showAllCategories.value
            ? category.value.children
            : category.value.children.slice(0, 5);
    });
    const expandedSections = ref<Record<string, boolean>>({
        brand: true,
        price: true,
    });

    // Initialize attribute sections as expanded when data loads
    watch(attributes, (newAttrs) => {
        newAttrs.forEach(attr => {
            if (!(attr.slug in expandedSections.value)) {
                expandedSections.value[attr.slug] = true;
            }
        });
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

    const toggleFilterSection = (section: string) => {
        if (!isLargeScreen.value) {
            expandedSections.value[section] = !expandedSections.value[section];
        }
    };

    // Helpers for dynamic attribute filter selections
    function getAttributeSelection(attrSlug: string): string[] {
        return selectedAttributes.value[attrSlug] ?? [];
    }

    function setAttributeSelection(attrSlug: string, values: (string | number)[]) {
        selectedAttributes.value[attrSlug] = values as string[];
    }

    // Check if any filters are active
    const hasActiveFilters = computed(() => {
        return searchQuery.value.trim().length > 0
            || selectedBrands.value.length > 0
            || Object.values(selectedAttributes.value).some(arr => arr.length > 0)
            || priceMin.value !== undefined
            || priceMax.value !== undefined
            || inStock.value;
    });

    // Count total active filters
    const activeFilterCount = computed(() => {
        let count = selectedBrands.value.length;
        Object.values(selectedAttributes.value).forEach(arr => {
            count += arr.length;
        });
        if (searchQuery.value.trim()) count++;
        if (priceMin.value !== undefined) count++;
        if (priceMax.value !== undefined) count++;
        if (inStock.value) count++;
        return count;
    });

    // Reset pagination when any filter changes
    watch(appliedFilters, () => {
        currentPage.value = 1;
    }, { deep: true });

    // Clear all filters
    const clearFilters = () => {
        searchQuery.value = '';
        selectedBrands.value = [];
        selectedAttributes.value = {};
        priceMin.value = undefined;
        priceMax.value = undefined;
        inStock.value = false;
        sortBy.value = '-created_at';
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
