<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16"
            style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                    Computer Hardware for Your Business Workplace
                </h1>
                <button
                    class="bg-white text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-none font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
                    Shop all hardware
                </button>
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

                        <!-- Manufacturer Filter -->
                        <div class="mt-4 sm:mt-6">
                            <button @click="toggleFilterSection('manufacturer')"
                                class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2">
                                Manufacturer
                                <ChevronDown
                                    :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.manufacturer ? 'rotate-180' : '']" />
                            </button>

                            <div :class="{ 'hidden lg:block': !expandedSections.manufacturer }">
                                <!-- Collapsed View: Show first 10 -->
                                <div v-if="!showAllManufacturers" class="space-y-1 sm:space-y-2">
                                    <label v-for="manufacturer in manufacturers.slice(0, 10)" :key="manufacturer.id"
                                        class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded p-1">
                                        <input type="checkbox" :value="manufacturer.id" v-model="selectedManufacturers"
                                            class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                        <span class="text-sm text-gray-700">{{ manufacturer.name }}</span>
                                    </label>

                                    <button @click="showAllManufacturers = true"
                                        class="text-sm text-pink-500 hover:text-pink-300 font-medium mt-2 flex items-center gap-1">
                                        <ChevronDown class="w-4 h-4" />
                                        Show more...
                                    </button>
                                </div>

                                <!-- Expanded View: Scrollable box with all manufacturers -->
                                <div v-else class="border border-gray-300 rounded-lg p-3 bg-white">
                                    <div class="max-h-64 overflow-y-auto space-y-2 pr-2">
                                        <label v-for="manufacturer in manufacturers" :key="manufacturer.id"
                                            class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            <input type="checkbox" :value="manufacturer.id"
                                                v-model="selectedManufacturers"
                                                class="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand" />
                                            <span class="text-sm text-gray-700">{{ manufacturer.name }}</span>
                                        </label>
                                    </div>

                                    <button @click="showAllManufacturers = false"
                                        class="text-sm text-pink-500 hover:text-pink-300 font-medium mt-3 flex items-center gap-1 w-full justify-center border-t pt-2">
                                        <ChevronUp class="w-4 h-4" />
                                        Show less
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- MSRP Filter -->
                        <div class="mt-4 sm:mt-6">
                            <button @click="toggleFilterSection('msrp')"
                                class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2">
                                MSRP
                                <ChevronDown
                                    :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.msrp ? 'rotate-180' : '']" />
                            </button>
                            <div :class="['space-y-1 sm:space-y-2', { 'hidden lg:block': !expandedSections.msrp }]">
                                <label v-for="range in msrp" :key="range.id"
                                    class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded p-1">
                                    <input type="checkbox" :value="range.id" v-model="selectedMsrp"
                                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                    <span class="text-sm text-gray-700">{{ range.label }}</span>
                                </label>
                            </div>
                        </div>

                        <!-- Type Filter -->
                        <div class="mt-4 sm:mt-6">
                            <button @click="toggleFilterSection('type')"
                                class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2">
                                Type
                                <ChevronDown
                                    :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.type ? 'rotate-180' : '']" />
                            </button>
                            <div :class="['space-y-1 sm:space-y-2', { 'hidden lg:block': !expandedSections.type }]">
                                <label v-for="productType in types" :key="productType.id"
                                    class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded p-1">
                                    <input type="checkbox" :value="productType.id" v-model="selectedTypes"
                                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                    <span class="text-sm text-gray-700">{{ productType.slug }}</span>
                                </label>
                            </div>
                        </div>

                        <!-- Clear All Filters Button (Mobile) -->
                        <button v-if="hasActiveFilters" @click="clearFilters"
                            class="lg:hidden w-full py-2 text-pink-500 border border-pink-500 rounded-lg font-medium mt-4 hover:bg-pink-50 transition-colors">
                            Clear All Filters
                        </button>
                    </div>
                </aside>
            </Transition>

            <!-- Apply Filter Button - Fixed at bottom of page -->
            <Transition name="slide-up">
                <div v-if="hasActiveFilters"
                    class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-3 sm:p-4">
                    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span class="text-sm text-gray-600">{{ activeFilterCount }} filter(s) selected</span>
                        <div class="flex gap-2 sm:gap-3 w-full sm:w-auto">
                            <button @click="clearFilters"
                                class="flex-1 sm:flex-none px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base">
                                Clear All
                            </button>
                            <button @click="applyFilters"
                                class="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                                <Filter class="w-4 h-4" />
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- Main Content Area -->
            <main class="flex-1 min-w-0">
                <div class="mx-auto max-w-7xl px-0 sm:px-4 lg:px-8">
                    <h1 class="text-blue-950 text-xl sm:text-2xl font-bold">Hardware by Tan</h1>
                    <p class="text-sm mt-3 sm:mt-4 text-gray-700">Built for real-world work, our hardware delivers the
                        strength, durability,
                        and reliability you need—whether you're handling daily repairs or large-scale construction
                        projects.</p>
                </div>

                <!-- Categories Section -->
                <div class="mt-8 sm:mt-12">
                    <!-- Categories Grid -->
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-start">
                        <HardwareCategoriesCard v-for="category in displayedCategories" :key="category.id"
                            :category="category" />
                    </div>

                    <!-- Show More Button -->
                    <div v-if="categories.length > 4" class="mt-6 sm:mt-8 flex items-center justify-center">
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

                <div class="mx-auto max-w-7xl px-0 sm:px-4 lg:px-8 mt-8 sm:mt-12">
                    <h1 class="text-xl sm:text-2xl font-bold">Featured picks:</h1>
                </div>

                <div class="mt-6 sm:mt-12">
                    <!-- Custom Tabs - Horizontal scroll on mobile -->
                    <div class="bg-brand overflow-x-auto">
                        <div class="grid grid-cols-4 min-w-[500px] sm:min-w-0">
                            <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
                                class="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-6 transition-colors border-2 text-xs sm:text-base"
                                :class="activeTab === tab.value ? 'bg-gray-100 border-brand text-brand border-b-[5px]' : 'border-transparent text-white hover:bg-white/10'">
                                <component :is="tab.icon" class="w-5 h-5 sm:w-8 sm:h-8"
                                    :class="activeTab === tab.value ? 'text-brand' : 'text-white'" />
                                <span class="text-center leading-tight">{{ tab.label }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="bg-gray-100 p-4 sm:p-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <HardwareProductCard v-for="product in filteredProducts" :key="product.id"
                                :product="product" />
                        </div>
                        <div class="flex justify-end mt-4 sm:mt-6">
                            <NuxtLink :to="`/hardware/categories/${activeTab}`"
                                class="text-brand font-semibold hover:underline text-sm sm:text-base">
                                Shop all {{tabs.find(t => t.value === activeTab)?.label}} →
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Popular Brands Section -->
                <div class="mt-8 sm:mt-12 bg-white py-6 sm:py-8">
                    <div class="mx-auto max-w-7xl px-0 sm:px-4 lg:px-8">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Browse popular brands:</h2>

                        <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-8 items-center">
                            <div v-for="brand in popularBrands" :key="brand.id"
                                class="flex items-center justify-center p-2 sm:p-4 transition-shadow cursor-pointer">
                                <button @click="applyBrandFiter(brand.id)" class="bg-transparent border-none p-0">
                                    <img :src="brand.image" :alt="brand.name"
                                        class="h-8 sm:h-12 object-contain grayscale hover:grayscale-0 transition-all" />
                                </button>
                            </div>
                        </div>

                        <div class="flex justify-end mt-4 sm:mt-6">
                            <NuxtLink to="/hardware/all-products"
                                class="text-brand font-semibold hover:underline flex items-center gap-1 text-sm sm:text-base">
                                Shop all brands
                                <ChevronRight class="w-4 h-4" />
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- About Hardware Section -->
                <div class="mt-8 sm:mt-12 bg-white py-6 sm:py-8">
                    <div class="mx-auto max-w-7xl px-0 sm:px-4 lg:px-8">
                        <h2 class="text-xl sm:text-2xl font-bold text-blue-950">About Hardware from Tan</h2>
                        <p class="text-sm mt-3 sm:mt-4 text-gray-700">
                            At Tan, we are committed to providing top-notch hardware solutions for every need.
                            Our team of experts is always ready to help you select the right products for your
                            specific requirements. Trust Tan for all your computer hardware needs, and experience
                            our commitment to quality and customer satisfaction.
                        </p>

                        <div class="flex justify-end mt-4">
                            <button @click="showMoreAbout = !showMoreAbout"
                                class="text-pink-500 font-medium hover:text-pink-600 flex items-center gap-1 text-sm sm:text-base">
                                {{ showMoreAbout ? '- View less' : '+ Read more' }}
                            </button>
                        </div>

                        <!-- Expanded Category Descriptions -->
                        <div v-if="showMoreAbout"
                            class="mt-4 sm:mt-6 border-t border-gray-200 pt-4 sm:pt-6 space-y-4 sm:space-y-6">
                            <div v-for="category in categories" :key="category.id">
                                <h3 class="text-base sm:text-lg font-semibold text-pink-500 mb-2">{{ category.name }}
                                </h3>
                                <p class="text-sm text-gray-700">
                                    {{ category.description.split('.')[0] }}.
                                    <NuxtLink :to="`/hardware/${category.slug}`" class="text-brand hover:underline">
                                        {{ category.name.toLowerCase() }}
                                    </NuxtLink>.
                                    {{ category.description.split('.').slice(1).join('.') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import { useRouter } from 'vue-router';
    import { Search, ChevronDown, ChevronUp, ChevronRight, Monitor, Cable, Network, Headphones, Filter, SlidersHorizontal } from 'lucide-vue-next';
    import manufacturersData from '~/assets/data/Hardware/manufacturers.json';
    import msrpData from '~/assets/data/Hardware/msrp.json';
    import typesData from '~/assets/data/Hardware/type.json';
    import categories from '~/assets/data/Hardware/categories.json';
    import productsData from '~/assets/data/Hardware/products.json';
    import brandsData from '~/assets/data/Hardware/brand.json';

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

    interface Category {
        id: number;
        name: string;
        slug: string;
        image: string;
        description: string;
        subcategories: { id: number; name: string; slug: string }[];
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

    const router = useRouter();
    const manufacturers = manufacturersData as Manufacturer[];
    const products = productsData as Product[];
    const msrp = msrpData as MsrpRange[];
    const types = typesData as ProductType[];
    const brands = brandsData as Brand[];
    const searchQuery = ref('');

    // Mobile/responsive states
    const filtersOpen = ref(false);
    const isLargeScreen = ref(true);
    const expandedSections = ref({
        manufacturer: true,
        msrp: true,
        type: true
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

    const toggleFilterSection = (section: 'manufacturer' | 'msrp' | 'type') => {
        if (!isLargeScreen.value) {
            expandedSections.value[section] = !expandedSections.value[section];
        }
    };

    const popularBrands = computed(() => {
        return brands.filter(brand => brand.isPopular);
    });
    const selectedManufacturers = ref<number[]>([]);
    const selectedMsrp = ref<number[]>([]);
    const selectedTypes = ref<number[]>([]);
    const showAllManufacturers = ref(false);
    const showMoreAbout = ref(false);
    const showAllCategories = ref(false);
    const activeTab = ref('computers-tablets');

    const tabs = [
        { value: 'computers-tablets', label: 'Computer & Tablets', icon: Monitor },
        { value: 'cables', label: 'Cables', icon: Cable },
        { value: 'computer-accessories', label: 'Computer Accessories', icon: Network },
        { value: 'server-components', label: 'Server Components', icon: Headphones },
    ];

    const displayedCategories = computed(() => {
        return showAllCategories.value ? categories : categories.slice(0, 4);
    });

    // Check if any filters are active
    const hasActiveFilters = computed(() => {
        return selectedManufacturers.value.length > 0 ||
            selectedMsrp.value.length > 0 ||
            selectedTypes.value.length > 0;
    });

    // Count total active filters
    const activeFilterCount = computed(() => {
        return selectedManufacturers.value.length +
            selectedMsrp.value.length +
            selectedTypes.value.length;
    });

    // Apply filters function - navigate to all-products page with query params
    const applyFilters = () => {
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

        router.push({
            path: '/hardware/all-products',
            query
        });
    };

    //apply brand filter
    const applyBrandFiter = (brandId: number) => {
        const query: Record<string, string> = {};

        if (brandId) {
            query.manufacturers = brandId.toString();
        }

        router.push({
            path: '/hardware/all-products',
            query
        });
    };

    // Clear all filters
    const clearFilters = () => {
        selectedManufacturers.value = [];
        selectedMsrp.value = [];
        selectedTypes.value = [];
    };

    const tabToCategoryId: Record<string, number> = {
        'computers-tablets': 1,
        'cables': 2,
        'computer-accessories': 3,
        'server-components': 5,
    };

    const filteredProducts = computed(() => {
        const categoryId = tabToCategoryId[activeTab.value];
        return products.filter(p => p.category_id === categoryId).slice(0, 6);
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