<template>
    <div class="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 min-h-[300px] flex flex-col justify-between">
        <!-- Card Link -->
        <NuxtLink :to="`/categories/${category.slug}`" class="block px-6 pt-6 pb-2 group">
            <!-- Category Icon -->
            <div class="flex justify-center mb-4">
                <div class="w-28 h-28 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-xl overflow-hidden shadow group-hover:scale-105 group-hover:shadow-lg transition-transform duration-300 flex items-center justify-center">
                    <Layers class="w-12 h-12 text-blue-400" />
                </div>
            </div>
            <!-- Category Name -->
            <h3
                class="text-center text-blue-900 group-hover:text-blue-600 font-bold text-xl h-14 flex items-center justify-center transition-colors duration-200">
                {{ category.name }}
            </h3>
        </NuxtLink>

        <!-- View More Options -->
        <div v-if="category.children && category.children.length > 0" class="px-4 pb-5">
            <button @click.stop="toggleSubcategories"
                class="mt-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg px-1 py-1.5 text-sm font-medium flex items-center justify-center w-full gap-2 transition-colors duration-200 shadow-sm">
                <span class="inline-block flex items-center justify-center text-lg font-bold">{{ isExpanded ? '-' : '+' }}</span>
                <span>View more options</span>
            </button>

            <!-- Subcategories Dropdown -->
            <div v-if="isExpanded" class="mt-3 space-y-1 animate-fade-in">
                <NuxtLink v-for="child in category.children" :key="child.uuid"
                    :to="`/categories/${child.slug}`"
                    class="block text-sm text-gray-700 hover:text-blue-700 hover:underline px-2 py-1 rounded transition-colors duration-150">
                    {{ child.name }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Layers } from 'lucide-vue-next';
    import type { CategoryTree } from '~/types';

    const props = defineProps<{
        category: CategoryTree;
        isExpanded?: boolean;
    }>();

    const emit = defineEmits<{
        toggle: [categoryUuid: string];
    }>();

    const toggleSubcategories = () => {
        emit('toggle', props.category.uuid);
    };
</script>

<style scoped>
@keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fade-in 0.3s ease;
}
</style>