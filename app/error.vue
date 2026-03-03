<template>
    <div class="min-h-screen bg-white flex items-center justify-center px-4">
        <div class="text-center max-w-md">
            <p class="text-6xl font-bold text-gray-900 mb-2">{{ error.statusCode }}</p>
            <h1 class="text-xl font-semibold text-gray-700 mb-3">
                {{ error.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
            </h1>
            <p class="text-gray-500 text-sm mb-8">
                {{ error.statusCode === 404
                    ? 'The page you are looking for does not exist or has been moved.'
                    : 'An unexpected error occurred. Please try again later.' }}
            </p>
            <NuxtLink
                to="/"
                class="inline-block bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
                Back to Home
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message?: string } }>();
</script>
