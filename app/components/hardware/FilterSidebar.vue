<template>
    <div>
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
            <aside v-show="filtersOpen || isLargeScreen" class="w-full lg:w-64 shrink-0 overflow-hidden mt-4 lg:mt-0">
                <div class="bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-gray-200">
                    <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-4">Filters</h2>

                    <!-- Search Box -->
                    <div class="flex shadow-sm">
                        <input type="text" placeholder="Search products..." v-model="searchQuery"
                            class="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-r-0 border-gray-300 focus:outline-none focus:border-brand focus:ring-brand text-sm rounded-l" />
                        <button
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
                            <div v-if="!showAllManufacturers" class="space-y-1 sm:space-y-2">
                                <label v-for="manufacturer in manufacturers.slice(0, 10)" :key="manufacturer.id"
                                    class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded p-1">
                                    <input type="checkbox" :value="manufacturer.id" v-model="selectedManufacturers"
                                        class="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-brand" />
                                    <span class="text-sm text-gray-700">{{ manufacturer.name }}</span>
                                </label>
                                <button v-if="manufacturers.length > 10" @click="showAllManufacturers = true"
                                    class="text-sm text-pink-500 hover:text-pink-300 font-medium mt-2 flex items-center gap-1">
                                    <ChevronDown class="w-4 h-4" />
                                    Show more...
                                </button>
                            </div>
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
                    </div>

                    <!-- MSRP Filter -->
                    <div class="mt-4 sm:mt-6">
                        <button @click="toggleFilterSection('msrp')"
                            class="flex items-center justify-between w-full text-base sm:text-lg text-pink-500 font-bold mb-2 sm:mb-3 border-b border-pink-500 py-2">
                            Price Range
                            <ChevronDown
                                :class="['w-5 h-5 transition-transform lg:hidden', expandedSections.msrp ? 'rotate-180' : '']" />
                        </button>
                        <div :class="['space-y-1 sm:space-y-2', { 'hidden lg:block': !expandedSections.msrp }]">
                            <label v-for="range in msrpRanges" :key="range.id"
                                class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded p-1">
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
                                class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded p-1">
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
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Search, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-vue-next';
import manufacturersData from '~/assets/data/Hardware/manufacturers.json';
import msrpData from '~/assets/data/Hardware/msrp.json';
import typesData from '~/assets/data/Hardware/type.json';

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

// Define models for two-way binding with parent
const searchQuery = defineModel<string>('searchQuery', { default: '' });
const selectedManufacturers = defineModel<number[]>('selectedManufacturers', { default: () => [] });
const selectedMsrp = defineModel<number[]>('selectedMsrp', { default: () => [] });
const selectedTypes = defineModel<number[]>('selectedTypes', { default: () => [] });

const manufacturers = manufacturersData as Manufacturer[];
const msrpRanges = msrpData as MsrpRange[];
const types = typesData as ProductType[];

// UI state
const filtersOpen = ref(false);
const isLargeScreen = ref(true);
const showAllManufacturers = ref(false);
const expandedSections = ref({
    manufacturer: true,
    msrp: true,
    type: true
});

// Computed
const hasActiveFilters = computed(() => {
    return searchQuery.value.trim() !== '' ||
        selectedManufacturers.value.length > 0 ||
        selectedMsrp.value.length > 0 ||
        selectedTypes.value.length > 0;
});

const activeFilterCount = computed(() => {
    let count = 0;
    if (searchQuery.value.trim()) count++;
    count += selectedManufacturers.value.length;
    count += selectedMsrp.value.length;
    count += selectedTypes.value.length;
    return count;
});

// Methods
const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 1024;
    if (isLargeScreen.value) {
        filtersOpen.value = false;
    }
};

const toggleFilters = () => {
    filtersOpen.value = !filtersOpen.value;
};

const toggleFilterSection = (section: 'manufacturer' | 'msrp' | 'type') => {
    if (!isLargeScreen.value) {
        expandedSections.value[section] = !expandedSections.value[section];
    }
};

const clearFilters = () => {
    searchQuery.value = '';
    selectedManufacturers.value = [];
    selectedMsrp.value = [];
    selectedTypes.value = [];
};

onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>
