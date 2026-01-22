<template>
    <div class="bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <!-- Card Link -->
        <NuxtLink :to="categoryLink" class="block p-6">
            <!-- Square Image -->
            <div class="flex justify-center mb-4">
                <div class="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" />
                </div>
            </div>

            <!-- Category Name -->
            <h3
                class="text-center text-blue-950 hover:text-blue-700 font-semibold text-lg h-14 flex items-center justify-center">
                {{ category.name }}
            </h3>
        </NuxtLink>

        <!-- View More Options -->
        <div class="px-6 pb-4">
            <button @click.stop="toggleSubcategories"
                class="text-brand text-sm hover:text-brand/80 flex items-center justify-center w-full gap-1">
                <span class="text-lg">+</span> View more options
            </button>

            <!-- Subcategories Dropdown -->
            <div v-if="showSubcategories" class="mt-3 space-y-1">
                <NuxtLink v-for="subcategory in category.subcategories" :key="subcategory.id"
                    :to="`/hardware/${category.slug}/${subcategory.slug}`"
                    class="block text-sm text-gray-600 hover:text-brand hover:underline py-1">
                    {{ subcategory.name }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';

    interface Subcategory {
        id: number;
        name: string;
        slug: string;
    }

    interface Category {
        id: number;
        name: string;
        slug: string;
        image: string;
        subcategories: Subcategory[];
    }

    const props = defineProps<{
        category: Category;
    }>();

    const showSubcategories = ref(false);

    const categoryLink = computed(() => `/hardware/categories/${props.category.slug}`);

    const toggleSubcategories = () => {
        showSubcategories.value = !showSubcategories.value;
    };
</script>
