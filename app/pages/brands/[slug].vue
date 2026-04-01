<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-4 sm:py-4 lg:py-4 border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-1 sm:gap-2 text-brand text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
                    <NuxtLink to="/" class="hover:text-brand">Home</NuxtLink>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <NuxtLink to="/#brands" class="hover:text-brand">Brands</NuxtLink>
                    <ChevronRight class="w-3 h-3 sm:w-4 sm:h-4" />
                    <span class="text-brand">{{ brand?.name ?? slug }}</span>
                </nav>

                <div class="flex items-center gap-4">
                    <div v-if="brand?.logo"
                        class="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center p-2 shrink-0">
                        <img :src="brand.logo" :alt="brand.name" class="w-full h-full object-contain" width="64"
                            height="64" />
                    </div>
                    <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-brand">
                        {{ brand?.name ?? slug }} Products
                    </h1>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="flex items-center justify-center py-24">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
        </div>

        <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
            <!-- Toolbar -->
            <div class="flex items-center justify-between mb-6">
                <p class="text-sm text-gray-500">
                    {{ meta?.total ?? 0 }} product{{ (meta?.total ?? 0) !== 1 ? 's' : '' }} found
                </p>
                <div class="flex items-center gap-2">
                    <ArrowUpDown class="w-4 h-4 text-gray-500" />
                    <select v-model="sortBy"
                        class="text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-brand focus:ring-brand bg-white">
                        <option value="-created_at">Newest</option>
                        <option value="created_at">Oldest</option>
                        <option value="name">Name: A–Z</option>
                        <option value="-name">Name: Z–A</option>
                    </select>
                </div>
            </div>

            <!-- Products Grid -->
            <template v-if="products.length > 0">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    <ProductCard v-for="product in products" :key="product.uuid" :product="product" />
                </div>

                <!-- Pagination -->
                <Pagination v-if="(meta?.last_page ?? 1) > 1" v-model:page="currentPage" :total="(meta?.total ?? 0)"
                    :items-per-page="perPage" :sibling-count="1" show-edges class="mt-8">
                    <PaginationContent v-slot="{ items }" class="flex-wrap justify-center gap-1">
                        <PaginationPrevious />
                        <template v-for="(item, index) in items" :key="index">
                            <PaginationItem v-if="item.type === 'page'" :value="item.value"
                                :is-active="item.value === currentPage">
                                {{ item.value }}
                            </PaginationItem>
                            <PaginationEllipsis v-else :index="index" />
                        </template>
                        <PaginationNext />
                    </PaginationContent>
                </Pagination>
            </template>

            <div v-else class="flex flex-col items-center justify-center py-24 text-center">
                <p class="text-gray-500 text-lg font-medium">No products found</p>
                <p class="text-gray-400 text-sm mt-2">This brand has no active products yet.</p>
                <NuxtLink to="/"
                    class="mt-6 inline-flex items-center gap-2 text-brand hover:text-brand/80 font-semibold transition-colors">
                    Back to Home
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { ChevronRight, ArrowUpDown } from 'lucide-vue-next';
    import type { Product, Brand } from '~/types';

    const siteUrl = useRuntimeConfig().public.siteUrl as string;
    const config = useRuntimeConfig();
    const route = useRoute();

    const slug = computed(() => route.params.slug as string);
    const currentPage = ref(1);
    const perPage = 20;
    const sortBy = ref('-created_at');

    interface BrandProductsResponse {
        data: Product[];
        brand: Brand;
        meta: {
            current_page: number;
            per_page: number;
            total: number;
            last_page: number;
        };
    }

    const { data, pending, refresh } = useFetch<BrandProductsResponse>(
        () => `${config.public.apiBaseUrl}/api/v1/brands/${slug.value}/products`,
        {
            query: computed(() => ({
                page: currentPage.value,
                per_page: perPage,
                sort: sortBy.value,
            })),
        }
    );

    const brand = computed<Brand | null>(() => data.value?.brand ?? null);
    const products = computed<Product[]>(() => data.value?.data ?? []);
    const meta = computed(() => data.value?.meta ?? null);

    // Reset to page 1 when sort changes
    watch(sortBy, () => {
        currentPage.value = 1;
    });

    // SEO
    useHead({
        link: computed(() => [{ rel: 'canonical', href: `${siteUrl}/brands/${slug.value}` }]),
    });

    useSeoMeta({
        title: computed(() => brand.value ? `${brand.value.name} Products | IT Solution Digital` : 'Brand Products | IT Solution Digital'),
        description: computed(() => brand.value
            ? `Shop all ${brand.value.name} products at IT Solution Digital. Best prices on genuine ${brand.value.name} IT hardware and accessories in Phnom Penh, Cambodia.`
            : 'Browse brand products at IT Solution Digital, Phnom Penh, Cambodia.'),
        ogTitle: computed(() => brand.value ? `${brand.value.name} | IT Solution Digital` : 'Brand | IT Solution Digital'),
        ogDescription: computed(() => brand.value
            ? `Buy genuine ${brand.value.name} products at IT Solution Digital – Cambodia's #1 IT shop.`
            : 'Brand products at IT Solution Digital.'),
        ogImage: computed(() => brand.value?.logo ?? `${siteUrl}/logo.jpg`),
        ogType: 'website',
        ogUrl: computed(() => `${siteUrl}/brands/${slug.value}`),
        twitterCard: 'summary_large_image',
    });
</script>