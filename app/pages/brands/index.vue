<template>
    <div class="min-h-screen bg-white">
        <!-- Hero -->
        <div
            class="w-full py-8 sm:py-12"
            style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm mb-3">
                    <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
                    <ChevronRight class="w-3.5 h-3.5" />
                    <span class="text-white">All Brands</span>
                </nav>
                <h1 class="text-2xl sm:text-3xl font-bold text-white">All Brands</h1>
                <p v-if="brands.length > 0" class="text-white/60 text-sm mt-1">
                    {{ brands.length }} brands available
                </p>
            </div>
        </div>

        <!-- Brands Grid -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <!-- Loading -->
            <div v-if="status === 'pending'" class="flex items-center justify-center py-24">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
            </div>

            <!-- Grid -->
            <div
                v-else-if="brands.length > 0"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
                <NuxtLink
                    v-for="brand in brands"
                    :key="brand.uuid"
                    :to="`/brands/${brand.slug}`"
                    :title="brand.name"
                    class="group flex items-center justify-center aspect-square p-6 sm:p-8 lg:p-10 bg-white rounded-2xl border border-gray-200 hover:border-brand/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <img
                        v-if="brand.logo"
                        :src="brand.logo"
                        :alt="brand.name"
                        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        width="160"
                        height="160" />
                    <span
                        v-else
                        class="text-sm sm:text-base font-bold text-gray-500 group-hover:text-brand transition-colors text-center leading-tight break-words hyphens-auto px-1">
                        {{ brand.name }}
                    </span>
                </NuxtLink>
            </div>

            <!-- Empty -->
            <div v-else class="flex flex-col items-center justify-center py-24 text-center">
                <p class="text-gray-500 text-lg font-medium">No brands found</p>
                <NuxtLink
                    to="/"
                    class="mt-6 inline-flex items-center gap-2 text-brand hover:text-brand/80 font-semibold transition-colors">
                    Back to Home
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronRight } from 'lucide-vue-next';

    const siteUrl = useRuntimeConfig().public.siteUrl as string;
    const { brands, status } = useBrands();

    useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/brands` }] });

    useSeoMeta({
        title: 'All Brands | IT Solution Digital',
        description: 'Browse all IT hardware brands at IT Solution Digital – HP, Dell, Lenovo, Apple, ASUS, MSI and more. Cambodia\'s #1 IT shop in Phnom Penh.',
        ogTitle: 'All Brands | IT Solution Digital',
        ogDescription: 'Shop IT products by brand at IT Solution Digital, Phnom Penh, Cambodia.',
        ogImage: `${siteUrl}/logo.jpg`,
        ogType: 'website',
        twitterCard: 'summary_large_image',
    });
</script>