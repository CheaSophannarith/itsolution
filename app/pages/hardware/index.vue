<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-12 py-16" style="background: linear-gradient(135deg, 
#459bcc
 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-6">
                <h1 class="text-3xl font-bold text-white mb-6">
                    Computer Hardware for Your Business Workplace
                </h1>
                <button
                    class="bg-white text-gray-800 px-6 py-3 rounded-none font-medium hover:bg-gray-100 transition-colors">
                    Shop all hardware
                </button>
            </div>
        </div>

        <div class="flex mx-auto max-w-7xl px-6 py-12 gap-16">
            <!-- Sidebar Filters -->
            <aside class="w-64 shrink-0 relative">
                <div class="pb-16">
                    <h2 class="text-xl font-bold text-gray-800 mb-2">Filters</h2>
                    <!-- Search Box -->
                    <div class="flex shadow-sm">
                        <input type="text" placeholder="Search products..." v-model="searchQuery"
                            class="flex-1 px-4 py-2.5 border border-r-0 border-gray-300 focus:outline-none focus:border-brand focus:ring-brand text-sm"
                            @keyup.enter="applyFilters" />
                        <button @click="applyFilters"
                            class="bg-brand text-white px-4 py-2.5 hover:bg-brand/90 transition-colors flex items-center justify-center">
                            <Search class="w-4 h-4" />
                        </button>
                    </div>

                    <!-- Manufacturer Filter -->
                    <div class="mt-6">
                        <h3 class="text-lg text-pink-500 font-bold mb-3 border-b border-pink-500 py-2">Manufacturer</h3>

                        <!-- Collapsed View: Show first 10 -->
                        <div v-if="!showAllManufacturers" class="space-y-2">
                            <label v-for="manufacturer in manufacturers.slice(0, 10)" :key="manufacturer.id"
                                class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded">
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
                                    <input type="checkbox" :value="manufacturer.id" v-model="selectedManufacturers"
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

                    <!-- MSRP Filter -->
                    <div class="mt-6">
                        <h3 class="text-lg text-pink-500 font-bold mb-3 border-b border-pink-500 py-2">MSRP</h3>
                        <div class="space-y-2">
                            <label v-for="range in msrp" :key="range.id"
                                class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded">
                                <input type="checkbox" :value="range.id" v-model="selectedMsrp"
                                    class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                <span class="text-sm text-gray-700">{{ range.label }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Type Filter -->
                    <div class="mt-6">
                        <h3 class="text-lg text-pink-500 font-bold mb-3 border-b border-pink-500 py-2">Type</h3>
                        <div class="space-y-2">
                            <label v-for="productType in types" :key="productType.id"
                                class="flex items-center gap-1 cursor-pointer hover:bg-gray-50 rounded">
                                <input type="checkbox" :value="productType.id" v-model="selectedTypes"
                                    class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                <span class="text-sm text-gray-700">{{ productType.slug }}</span>
                            </label>
                        </div>
                    </div>
                </div>

            </aside>

            <!-- Apply Filter Button - Fixed at bottom of page -->
            <Transition name="slide-up">
                <div v-if="hasActiveFilters"
                    class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
                    <div class="max-w-7xl mx-auto flex items-center justify-between">
                        <span class="text-sm text-gray-600">{{ activeFilterCount }} filter(s) selected</span>
                        <div class="flex gap-3">
                            <button @click="clearFilters"
                                class="px-6 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                Clear All
                            </button>
                            <button @click="applyFilters"
                                class="px-6 py-2 bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors flex items-center gap-2">
                                <Filter class="w-4 h-4" />
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- Main Content Area -->
            <main class="flex-1">
                <div class="mx-auto max-w-7xl px-8">
                    <h1 class=" text-blue-950 text-2xl font-bold">Hardware by Tan</h1>
                    <p class="text-sm mt-4">Built for real-world work, our hardware delivers the strength, durability,
                        and reliability you
                        need—whether you're handling daily repairs or large-scale construction projects.</p>
                </div>

                <!-- Categories Section -->
                <div class="mt-12">
                    <!-- Categories Grid - Show 4 initially -->
                    <div class="grid grid-cols-4 gap-6 items-start">
                        <HardwareCategoriesCard v-for="category in displayedCategories" :key="category.id"
                            :category="category" />
                    </div>

                    <!-- Show More Button -->
                    <div v-if="categories.length > 4" class="mt-8 flex items-center justify-center">
                        <div class="flex-1 border-t border-pink-500"></div>
                        <button @click="showAllCategories = !showAllCategories"
                            class="px-6 text-pink-500 font-bold hover:text-pink-300 flex items-center gap-2">
                            {{ showAllCategories ? 'Show less categories' : 'Show more categories' }}
                            <ChevronDown v-if="!showAllCategories" class="w-5 h-5 text-pink-500" />
                            <ChevronUp v-else class="w-5 h-5 text-pink-500" />
                        </button>
                        <div class="flex-1 border-t border-pink-500"></div>
                    </div>
                </div>

                <div class="mx-auto max-w-7xl px-8 mt-12">
                    <h1 class="text-2xl font-bold">Future picked:</h1>
                </div>

                <div class="mt-12">
                    <!-- Custom Tabs -->
                    <div class="bg-brand grid grid-cols-4">
                        <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
                            class="flex flex-col items-center gap-2 py-4 px-6 transition-colors border-2"
                            :class="activeTab === tab.value ? 'bg-gray-100 border-brand text-brand border-b-[5px]' : 'border-transparent text-white hover:bg-white/10'">
                            <component :is="tab.icon" class="w-8 h-8"
                                :class="activeTab === tab.value ? 'text-brand' : 'text-white'" />
                            <span>{{ tab.label }}</span>
                        </button>
                    </div>
                    <div class="bg-gray-100 p-6">
                        <div class="grid grid-cols-3 gap-6">
                            <HardwareProductCard v-for="product in filteredProducts" :key="product.id"
                                :product="product" />
                        </div>
                        <div class="flex justify-end mt-6">
                            <NuxtLink :to="`/hardware/${activeTab}`" class="text-brand font-semibold hover:underline">
                                Shop all {{tabs.find(t => t.value === activeTab)?.label}} →
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Popular Brands Section -->
                <div class="mt-12 bg-white py-8">
                    <div class="mx-auto max-w-7xl px-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-8">Browse popular brands:</h2>

                        <div class="grid grid-cols-6 gap-8 items-center">
                            <div v-for="brand in popularBrands" :key="brand.id"
                                class="flex items-center justify-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <img :src="brand.image" :alt="brand.name"
                                    class="h-12 object-contain grayscale hover:grayscale-0 transition-all" />
                            </div>
                        </div>

                        <div class="flex justify-end mt-6">
                            <NuxtLink to="/hardware/brands"
                                class="text-brand font-semibold hover:underline flex items-center gap-1">
                                Shop all brands
                                <ChevronRight class="w-4 h-4" />
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- About Hardware Section -->
                <div class="mt-12 bg-white py-8">
                    <div class="mx-auto max-w-7xl px-8">
                        <h2 class="text-2xl font-bold text-blue-950">About Hardware from Tan</h2>
                        <p class="text-sm mt-4 text-gray-700">
                            At Tan, we are committed to providing top-notch hardware solutions for every need.
                            Our team of experts is always ready to help you select the right products for your
                            specific requirements. Trust Tan for all your computer hardware needs, and experience
                            our commitment to quality and customer satisfaction.
                        </p>

                        <div class="flex justify-end mt-4">
                            <button @click="showMoreAbout = !showMoreAbout"
                                class="text-pink-500 font-medium hover:text-pink-600 flex items-center gap-1">
                                {{ showMoreAbout ? '- View less' : '+ Read more about our hardware offerings' }}
                            </button>
                        </div>

                        <!-- Expanded Category Descriptions -->
                        <div v-if="showMoreAbout" class="mt-6 border-t border-gray-200 pt-6 space-y-6">
                            <div v-for="category in categories" :key="category.id">
                                <h3 class="text-lg font-semibold text-pink-500 mb-2">{{ category.name }}</h3>
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
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { Search, ChevronDown, ChevronUp, ChevronRight, Monitor, Cable, Network, Headphones, Filter } from 'lucide-vue-next';
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
