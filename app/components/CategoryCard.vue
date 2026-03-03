<template>
    <NuxtLink :to="`/categories/${category.slug}`"
        class="group relative rounded-lg overflow-hidden border-2 border-gray-200 hover:border-brand transition-all duration-300 h-full">
        <!-- Category Image with Overlay -->
        <div class="relative aspect-4/3 bg-linear-to-br from-gray-900 to-gray-700 overflow-hidden">
            <NuxtImg :src="category.image" :alt="category.name"
                width="400"
                height="300"
                format="webp"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-90" />

            <!-- Gradient Overlay - Always visible -->
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

            <!-- Category Name - Overlaid on image -->
            <div class="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10">
                <h3 class="text-base sm:text-lg font-bold text-white mb-1 group-hover:-translate-y-1 transition-transform duration-300">
                    {{ category.name }}
                </h3>
                <p v-if="category.description" class="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
                    {{ category.description }}
                </p>
                <p v-else class="text-xs sm:text-sm text-white/70 font-medium">
                    Explore products
                </p>

                <!-- Arrow Icon -->
                <div class="mt-2 inline-flex items-center justify-center w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-brand group-hover:scale-110 transition-all duration-300">
                    <svg class="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            <!-- Shine effect on hover -->
            <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
interface Category {
    uuid: string;
    name: string;
    slug: string;
    description: string | null;
    image: string;
    is_popular: boolean;
}

defineProps<{
    category: Category;
}>();
</script>
