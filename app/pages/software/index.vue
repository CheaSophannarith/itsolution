<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16"
            style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                    Software
                </h1>
                <button
                    class="bg-white text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-none font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
                    Shop all software
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
                        <FilterCategorySection label="Manufacturer" :items="manufacturers"
                            v-model="selectedManufacturers" :expanded="expandedSections.manufacturer"
                            @toggle="toggleFilterSection('manufacturer')" />

                        <!-- MSRP Filter -->
                        <FilterCategorySection label="MSRP"
                            :items="msrp.map(range => ({ id: range.id, name: range.label }))" v-model="selectedMsrp"
                            :expanded="expandedSections.msrp" @toggle="toggleFilterSection('msrp')" />

                        <!-- Type Filter -->
                        <FilterCategorySection label="Type"
                            :items="types.map(type => ({ id: type.id, name: type.slug ?? '' }))" v-model="selectedTypes"
                            :expanded="expandedSections.type" @toggle="toggleFilterSection('type')" />

                        <!-- Platform Filter -->
                        <FilterCategorySection label="Platform" :items="platforms" v-model="selectedPlatforms"
                            :expanded="expandedSections.platform" @toggle="toggleFilterSection('platform')" />

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
                        <SoftwareCategoriesCard v-for="category in displayedCategories" :key="category.id"
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
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronDown, ChevronUp, Search, SlidersHorizontal } from 'lucide-vue-next';
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import categoriesData from '~/assets/data/Software/categories.json';
    import manufacturersData from '~/assets/data/Software/manufacturers.json';
    import msrpData from '~/assets/data/Software/msrp.json';
    import platformData from '~/assets/data/Software/platform.json';
    import typesData from '~/assets/data/Software/type.json';
    import FilterApplyBar from '~/components/ui/FilterApplyBar.vue';
    import FilterCategorySection from '~/components/ui/FilterCategorySection.vue';
    import type { Category, SubCategory } from '~/types';


    interface MsrpRange {
        id: number;
        label: string;
        min: number;
        max: number | null;
    }


    const router = useRouter();
    const manufacturers = manufacturersData as SubCategory[];
    const msrp = msrpData as MsrpRange[];
    const types = typesData as SubCategory[];
    // Map 'subcategories' to 'subCategories' to match the Category interface, and type as Category[]
    const categories: Category[] = (categoriesData as any[]).map((cat) => ({
        ...cat,
        subCategories: cat.subcategories || [],
    }));
    const platforms = platformData as SubCategory[];
    const searchQuery = ref('');

    // Mobile/responsive states
    const filtersOpen = ref(false);
    const isLargeScreen = ref(true);
    const expandedSections = ref({
        manufacturer: true,
        msrp: true,
        type: true,
        platform: true,
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

    const toggleFilterSection = (section: 'manufacturer' | 'msrp' | 'type' | 'platform') => {
        if (!isLargeScreen.value) {
            expandedSections.value[section] = !expandedSections.value[section];
        }
    };

    const selectedManufacturers = ref<number[]>([]);
    const selectedMsrp = ref<number[]>([]);
    const selectedTypes = ref<number[]>([]);
    const selectedPlatforms = ref<number[]>([]);
    // Removed showAllManufacturers, now handled in FilterCategorySection
    const showAllCategories = ref(false);
    const expandedCategoryId = ref<number | null>(null);

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

    // Check if any filters are active
    const hasActiveFilters = computed(() => {
        return selectedManufacturers.value.length > 0 ||
            selectedMsrp.value.length > 0 ||
            selectedTypes.value.length > 0 ||
            selectedPlatforms.value.length > 0;
    });

    // Count total active filters
    const activeFilterCount = computed(() => {
        return selectedManufacturers.value.length +
            selectedMsrp.value.length +
            selectedTypes.value.length + selectedPlatforms.value.length;
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
        if (selectedPlatforms.value.length > 0) {
            query.platforms = selectedPlatforms.value.join(',');
        }

        router.push({
            path: '/software/all-products',
            query
        });
    };

    // Clear all filters
    const clearFilters = () => {
        selectedManufacturers.value = [];
        selectedMsrp.value = [];
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