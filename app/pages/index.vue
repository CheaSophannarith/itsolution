<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36 relative overflow-hidden" style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <!-- Decorative Elements -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
                <div class="absolute bottom-10 left-10 w-[28rem] h-[28rem] bg-white rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
            </div>

            <div class="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
                <div class="max-w-3xl">
                    <span class="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-white/70 mb-4 sm:mb-6">
                        Your Trusted IT Partner
                    </span>
                    <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight">
                        IT Solutions for Your
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Business Success</span>
                    </h1>
                    <p class="text-base sm:text-lg lg:text-xl text-white/80 mb-10 sm:mb-12 leading-relaxed max-w-2xl font-light">
                        From hardware and software to comprehensive IT services, we provide everything your organization needs to thrive in the digital age.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 sm:gap-5">
                        <NuxtLink to="/hardware"
                            class="group bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-white/20 hover:scale-[1.03] transition-all duration-300 text-center shadow-xl inline-flex items-center justify-center gap-2">
                            Shop Hardware
                            <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </NuxtLink>
                        <NuxtLink to="/software"
                            class="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 hover:border-white/50 hover:shadow-2xl hover:shadow-white/10 hover:scale-[1.03] transition-all duration-300 text-center">
                            Explore Software
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <!-- Featured Products Section -->
        <div v-if="featuredProducts && featuredProducts.length > 0" class="relative pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
            <!-- Background with diagonal split -->
            <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"></div>

            <!-- Decorative geometric shapes -->
            <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand/5 to-transparent rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <!-- Header Section with asymmetric layout -->
                <div class="mb-12 sm:mb-16">
                    <div class="flex flex-col gap-6">
                        <!-- Left side - Title and description -->
                        <div class="flex-1">
                            <div class="mb-4">
                                <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                                    Handpicked for you
                                </span>
                            </div>
                            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                Featured Products
                            </h2>
                            <p class="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                                Discover our carefully selected collection of premium IT products.
                                Each item is chosen for its exceptional quality, performance, and value.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Products Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
                    <ProductCard v-for="product in featuredProducts" :key="product.uuid" :product="product" />
                </div>
            </div>
        </div>

        <!-- Popular Categories Section -->
        <div v-if="popularCategories && popularCategories.length > 0" class="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-6 sm:mb-8">
                    <div class="mb-2">
                        <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                            Shop by category
                        </span>
                    </div>
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                        Popular Categories
                    </h2>
                    <p class="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                        Browse our most popular product categories to find exactly what you need.
                    </p>
                </div>

                <!-- Categories Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
                    <CategoryCard v-for="category in popularCategories" :key="category.uuid" :category="category" />
                </div>
            </div>
        </div>

        <!-- Category Products Sections -->
        <div v-if="categoriesWithProducts && categoriesWithProducts.length > 0" class="bg-white py-10 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Section Header -->
                <div class="mb-10 sm:mb-12">
                    <div class="mb-2">
                        <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                            Explore our collection
                        </span>
                    </div>
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                        Shop by Category
                    </h2>
                    <p class="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                        Discover top products from each category, handpicked just for you.
                    </p>
                </div>

                <!-- Categories with Products -->
                <div class="space-y-12 sm:space-y-16">
                    <div v-for="category in categoriesWithProducts" :key="category.uuid">
                    <!-- Layout -->
                    <div class="flex flex-col lg:flex-row items-stretch gap-4">
                        <!-- Category Image - Always Left -->
                        <div class="w-full lg:w-auto lg:shrink-0">
                            <NuxtLink :to="`/categories/${category.slug}`"
                                class="group relative block rounded-lg overflow-hidden border-2 border-gray-200 hover:border-brand transition-all duration-300 h-full lg:h-auto">
                                <div class="relative aspect-4/3 lg:aspect-3/4 lg:h-full lg:w-70 bg-gray-900 overflow-hidden">
                                    <img :src="category.image" :alt="category.name"
                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />

                                    <div class="absolute inset-0 bg-black/50"></div>

                                    <div class="absolute inset-x-0 bottom-0 p-5 z-10">
                                        <h3 class="text-xl font-bold text-white mb-2">
                                            {{ category.name }}
                                        </h3>
                                        <div class="inline-flex items-center justify-center w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-brand transition-all duration-300">
                                            <ChevronRight class="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>

                        <!-- Products Row -->
                        <div class="flex-1">
                            <CategoryProductsSection :products="category.products" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- About Our Services Section -->
        <div class="bg-white py-6 sm:py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12 sm:mb-16">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Software Solutions</h2>
                    <p class="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        We provide comprehensive software solutions and custom development services to help your business
                        thrive in the digital era.
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                    <div v-for="item in softwareServices" :key="item.id"
                        class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100 hover:border-gray-200 hover:-translate-y-1.5">
                        <NuxtLink :to="`/services/${item.slug}`" class="block">
                            <div class="aspect-video overflow-hidden bg-gray-50">
                                <img :src="item.image" :alt="item.name"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                            </div>
                            <div class="p-6 sm:p-8">
                                <h3 class="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-brand transition-colors duration-300 mb-2.5">
                                    {{ item.name }}
                                </h3>
                                <p class="text-sm sm:text-base text-gray-500 line-clamp-2 leading-relaxed">{{ item.description }}</p>
                                <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    Learn more
                                    <ChevronRight class="w-4 h-4" />
                                </span>
                            </div>
                        </NuxtLink>
                    </div>
                </div>

                <div class="text-center mt-12 sm:mt-16">
                    <NuxtLink to="/services"
                        class="group inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-2xl font-semibold hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/20 hover:scale-[1.03] transition-all duration-300 shadow-lg">
                        View All Services
                        <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Why Choose Us Section -->
        <div class="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12 sm:mb-16">
                    <span class="text-xs font-semibold tracking-widest uppercase text-brand mb-3 block">Our Advantages</span>
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Why Choose Tan</h2>
                    <p class="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">Trusted by businesses worldwide for IT excellence</p>
                </div>

                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                    <div v-for="feature in whyChooseUs" :key="feature.title"
                        class="text-center group hover:-translate-y-2 transition-all duration-500 bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200">
                        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand/10 to-brand/5 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:from-brand/15 group-hover:to-brand/10 transition-all duration-500">
                            <component :is="feature.icon" class="w-8 h-8 sm:w-10 sm:h-10 text-brand" />
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-base sm:text-lg">{{ feature.title }}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
    Monitor,
    Cable,
    Network,
    Headphones,
    ChevronRight,
    Truck,
    Shield,
    Headset,
    Award,
    Server,
    Cloud,
    Settings,
    HardDrive,
    Laptop,
    ShoppingCart
} from 'lucide-vue-next';
import softwareServicesData from '~/assets/data/Service/system.json';
import type { Product } from '~/types';

interface Category {
    uuid: string;
    name: string;
    slug: string;
    description: string | null;
    image: string;
    is_popular: boolean;
}

interface CategoryWithProducts extends Category {
    products: Product[];
}

const config = useRuntimeConfig();
const { featuredProducts } = useFeaturedProducts();

// Fetch popular categories
const popularCategories = ref<Category[]>([]);
const { data: categoriesData } = await useFetch<{ data: Category[] }>(
    `${config.public.apiBaseUrl}/api/v1/categories/popular`
);

if (categoriesData.value?.data) {
    popularCategories.value = categoriesData.value.data;
}

// Fetch products for each category
const categoriesWithProducts = ref<CategoryWithProducts[]>([]);

if (popularCategories.value.length > 0) {
    const productPromises = popularCategories.value.map(async (category) => {
        const { data } = await useFetch<{ data: Product[] }>(
            `${config.public.apiBaseUrl}/api/v1/categories/${category.slug}/products`
        );

        const products = data.value?.data ?? [];

        // Only return category if it has products
        if (products.length > 0) {
            return {
                ...category,
                products: products.slice(0, 4) // Limit to 4 products
            };
        }
        return null;
    });

    const results = await Promise.all(productPromises);
    categoriesWithProducts.value = results.filter((cat): cat is CategoryWithProducts => cat !== null);
}

const softwareServices = softwareServicesData as { id: number; name: string; description: string; image: string; slug: string }[];

const whyChooseUs = [
    { title: 'Fast Shipping', description: 'Quick delivery on all orders', icon: Truck },
    { title: 'Secure Shopping', description: 'Protected transactions', icon: Shield },
    { title: 'Expert Support', description: '24/7 technical assistance', icon: Headset },
    { title: 'Quality Products', description: 'Top brands guaranteed', icon: Award },
];
</script>