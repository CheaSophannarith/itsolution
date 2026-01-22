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
                    <span class="text-white">All Products</span>
                </nav>

                <h1 class="text-3xl font-bold text-white mb-4">
                    All Hardware Products
                </h1>
                <p class="text-white/90 max-w-2xl">
                    Browse our complete collection of hardware products
                </p>
            </div>
        </div>

        <div class="flex mx-auto max-w-7xl px-6 py-12 gap-16">
            <!-- Sidebar Filters -->
            <aside class="w-64 shrink-0">
                <h2 class="text-xl font-bold text-gray-800 mb-4">Filters</h2>

                <div class="flex shadow-sm">
                    <input type="text" placeholder="Search products..."
                        class="flex-1 px-4 py-2.5 border border-r-0 border-gray-300 focus:outline-none focus:border-brand focus:ring-brand text-sm"
                        v-model="searchQuery" />
                    <button
                        class="bg-brand text-white px-4 py-2.5 hover:bg-brand/90 transition-colors flex items-center justify-center">
                        <Search class="w-4 h-4" />
                    </button>
                </div>

                <!-- Manufacturer Filter -->
                <div class="mb-6 mt-6">
                    <h3 class="text-lg text-pink-500 font-bold mb-3 border-b border-pink-500 py-2">Manufacturer</h3>
                    <div class="space-y-2 max-h-48 overflow-y-auto pr-2">
                        <label v-for="manufacturer in manufacturers" :key="manufacturer.id"
                            class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" :value="manufacturer.id" v-model="selectedManufacturers"
                                class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                            <span class="text-sm text-gray-700">{{ manufacturer.name }}</span>
                        </label>
                    </div>
                </div>

                <!-- MSRP Filter -->
                <div class="mb-6">
                    <h3 class="text-lg text-pink-500 font-bold mb-3 border-b border-pink-500 py-2">Price Range</h3>
                    <div class="space-y-2">
                        <label v-for="range in msrpRanges" :key="range.id"
                            class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" :value="range.id" v-model="selectedMsrp"
                                class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                            <span class="text-sm text-gray-700">{{ range.label }}</span>
                        </label>
                    </div>
                </div>

                <!-- Type Filter -->
                <div class="mb-6">
                    <h3 class="text-lg text-pink-500 font-bold mb-3 border-b border-pink-500 py-2">Type</h3>
                    <div class="space-y-2">
                        <label v-for="productType in types" :key="productType.id"
                            class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input type="checkbox" :value="productType.id" v-model="selectedTypes"
                                class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                            <span class="text-sm text-gray-700">{{ productType.slug }}</span>
                        </label>
                    </div>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="flex-1">
                <!-- Active Filters Display -->
                <div v-if="hasActiveFilters" class="mb-6 flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-gray-600">Active filters:</span>
                    <span v-if="searchQuery"
                        class="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full flex items-center gap-1">
                        Search: "{{ searchQuery }}"
                        <button @click="searchQuery = ''" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="id in selectedManufacturers" :key="'m-' + id"
                        class="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full flex items-center gap-1">
                        {{ manufacturers.find(m => m.id === id)?.name }}
                        <button @click="removeManufacturer(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="id in selectedMsrp" :key="'p-' + id"
                        class="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full flex items-center gap-1">
                        {{ msrpRanges.find(r => r.id === id)?.label }}
                        <button @click="removeMsrp(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                    <span v-for="id in selectedTypes" :key="'t-' + id"
                        class="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full flex items-center gap-1">
                        {{ types.find(t => t.id === id)?.slug }}
                        <button @click="removeType(id)" class="hover:text-pink-900">&times;</button>
                    </span>
                </div>

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
                <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8">
                    <button @click="currentPage = currentPage - 1" :disabled="currentPage === 1"
                        class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft class="w-4 h-4" />
                    </button>
                    <button v-for="page in visiblePages" :key="page" @click="currentPage = page"
                        class="px-4 py-2 border rounded transition-colors"
                        :class="currentPage === page ? 'bg-brand text-white border-brand' : 'border-gray-300 hover:bg-gray-50'">
                        {{ page }}
                    </button>
                    <button @click="currentPage = currentPage + 1" :disabled="currentPage === totalPages"
                        class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronRight class="w-4 h-4" />
                    </button>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, watch, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useHead } from '#imports';
    import { ChevronRight, ChevronLeft, Package, Search } from 'lucide-vue-next';
    import manufacturersData from '~/assets/data/Hardware/manufacturers.json';
    import msrpData from '~/assets/data/Hardware/msrp.json';
    import typesData from '~/assets/data/Hardware/type.json';
    import productsData from '~/assets/data/Hardware/products.json';

    interface Manufacturer {
        id: number;
        name: string;
    }

    interface MsrpRange {
        id: number;
        label: string;
        min: number;
        max: number | null;
    }

    interface ProductType {
        id: number;
        slug: string;
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

    // Flag to prevent watch from triggering during initialization
    const isInitialized = ref(false);

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

    onMounted(() => {
        initFiltersFromQuery();
        isInitialized.value = true;
    });

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
                p.description.toLowerCase().includes(search)
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

    const visiblePages = computed(() => {
        const pages: number[] = [];
        const start = Math.max(1, currentPage.value - 2);
        const end = Math.min(totalPages.value, start + 4);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
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
