<template>
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
</template>

<script setup lang="ts">
    import { Filter } from 'lucide-vue-next';
    const props = defineProps<{
        hasActiveFilters: boolean;
        activeFilterCount: number;
    }>();
    const emit = defineEmits(['clearFilters', 'applyFilters']);
    const clearFilters = () => emit('clearFilters');
    const applyFilters = () => emit('applyFilters');
</script>
