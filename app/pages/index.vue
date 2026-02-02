<template>
    <div class="min-h-screen">
        <!-- Hero Carousel Section -->
        <ClientOnly>
            <div class="relative w-full overflow-hidden" data-aos="fade-in">
                <Carousel
                    class="w-full"
                    :opts="{
                        align: 'start',
                        loop: true,
                    }"
                    @init-api="onCarouselInit"
                >
                <CarouselContent>
                    <CarouselItem v-for="slide in carouselSlides" :key="slide.uuid">
                        <div class="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] overflow-hidden">
                            <img
                                :src="slide.desktop"
                                :alt="slide.title || 'Carousel slide'"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </CarouselItem>
                </CarouselContent>

                <!-- Navigation Arrows - Centered Vertically -->
                <div class="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 z-20">
                    <CarouselPrevious class="relative left-0 translate-x-0 translate-y-0 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 w-12 h-12 sm:w-14 sm:h-14" />
                </div>
                <div class="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 z-20">
                    <CarouselNext class="relative right-0 translate-x-0 translate-y-0 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 w-12 h-12 sm:w-14 sm:h-14" />
                </div>

                <!-- Pagination Dots -->
                <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    <button
                        v-for="(slide, index) in carouselSlides"
                        :key="slide.uuid"
                        @click="() => carouselApi?.scrollTo(index)"
                        :class="[
                            'w-2.5 h-2.5 rounded-full transition-all duration-300',
                            currentSlide === index
                                ? 'bg-white w-8'
                                : 'bg-white/40 hover:bg-white/60'
                        ]"
                        :aria-label="`Go to slide ${index + 1}`"
                    />
                </div>
                </Carousel>
            </div>
        </ClientOnly>

        <!-- Featured Products Section -->
        <div v-if="featuredProducts && featuredProducts.length > 0" class="relative pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
            <!-- Background with diagonal split -->
            <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"></div>

            <!-- Decorative geometric shapes -->
            <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand/5 to-transparent rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <!-- Header Section with asymmetric layout -->
                <ClientOnly>
                    <div class="mb-4 sm:mb-6" data-aos="fade-up">
                        <div class="flex flex-col gap-6">
                            <!-- Left side - Title and description -->
                            <div class="flex-1">
                                <div class="mb-4">
                                    <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                                        Handpicked for you
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Products Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4"
                        data-aos="fade-up" data-aos-delay="200">
                        <ProductCard v-for="product in featuredProducts" :key="product.uuid" :product="product" />
                    </div>
                </ClientOnly>
            </div>
        </div>

        <!-- Popular Categories Section -->
        <div v-if="popularCategories && popularCategories.length > 0" class="bg-gradient-to-b from-gray-50 to-white py-3 sm:py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <ClientOnly>
                    <div class="mb-4 sm:mb-6" data-aos="fade-right">
                        <div class="mb-2">
                            <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                                Shop by category
                            </span>
                        </div>
                    </div>

                    <!-- Categories Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5"
                        data-aos="fade-up" data-aos-delay="200">
                        <CategoryCard v-for="category in popularCategories" :key="category.uuid" :category="category" />
                    </div>
                </ClientOnly>
            </div>
        </div>

        <!-- Category Products Sections -->
        <div v-if="categoriesWithProducts && categoriesWithProducts.length > 0" class="bg-white py-4 sm:py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Section Header -->
                <ClientOnly>
                    <div class="mb-4 sm:mb-6" data-aos="fade-up">
                        <div class="mb-2">
                            <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                                Explore our collection
                            </span>
                        </div>
                    </div>

                    <!-- Categories with Products -->
                    <div class="space-y-12 sm:space-y-16">
                        <div v-for="(category, index) in categoriesWithProducts" :key="category.uuid"
                            data-aos="fade-up" :data-aos-delay="index * 100">
                            <!-- Layout - Flex row on all screens -->
                            <div class="flex items-stretch gap-3 sm:gap-4">
                                <!-- Category Image - Left side -->
                                <div class="w-40 sm:w-52 lg:w-80 shrink-0">
                                    <NuxtLink :to="`/categories/${category.slug}`"
                                        class="group relative block rounded-lg overflow-hidden border-2 border-gray-200 hover:border-brand transition-all duration-300 h-full">
                                        <div class="relative h-full bg-gray-900 overflow-hidden">
                                            <img :src="category.image" :alt="category.name"
                                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />

                                            <div class="absolute inset-0 bg-black/50"></div>

                                            <div class="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-5 z-10">
                                                <h3 class="text-sm sm:text-base lg:text-xl font-bold text-white mb-1 sm:mb-2">
                                                    {{ category.name }}
                                                </h3>
                                                <div class="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-brand transition-all duration-300">
                                                    <ChevronRight class="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </NuxtLink>
                                </div>

                                <!-- Products Row - Right side -->
                                <div class="flex-1 min-w-0">
                                    <CategoryProductsSection :products="category.products" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ClientOnly>
            </div>
        </div>

        <!-- About Our Services Section -->
        <div class="bg-white py-6 sm:py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <ClientOnly>
                    <div class="text-center mb-12 sm:mb-16" data-aos="fade-up">
                        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Software Solutions</h2>
                        <p class="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                            We provide comprehensive software solutions and custom development services to help your business
                            thrive in the digital era.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                        <div v-for="(item, index) in softwareServices" :key="item.id"
                            data-aos="zoom-in" :data-aos-delay="index * 150"
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

                    <div class="text-center mt-12 sm:mt-16" data-aos="fade-up" data-aos-delay="400">
                        <NuxtLink to="/services"
                            class="group inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-2xl font-semibold hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/20 hover:scale-[1.03] transition-all duration-300 shadow-lg">
                            View All Services
                            <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </NuxtLink>
                    </div>
                </ClientOnly>
            </div>
        </div>

        <!-- Why Choose Us Section -->
        <div class="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <ClientOnly>
                    <div class="text-center mb-12 sm:mb-16" data-aos="fade-up">
                        <span class="text-xs font-semibold tracking-widest uppercase text-brand mb-3 block">Our Advantages</span>
                        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Why Choose Tan</h2>
                        <p class="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">Trusted by businesses worldwide for IT excellence</p>
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                        <div v-for="(feature, index) in whyChooseUs" :key="feature.title"
                            data-aos="fade-up" :data-aos-delay="index * 100"
                        class="text-center group hover:-translate-y-2 transition-all duration-500 bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200">
                        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand/10 to-brand/5 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:from-brand/15 group-hover:to-brand/10 transition-all duration-500">
                            <component :is="feature.icon" class="w-8 h-8 sm:w-10 sm:h-10 text-brand" />
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-base sm:text-lg">{{ feature.title }}</h3>
                        <p class="text-sm text-gray-500 leading-relaxed">{{ feature.description }}</p>
                        </div>
                    </div>
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
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
import type { CarouselApi } from '~/components/ui/carousel';

const { carouselSlides } = useCarousel();
const { featuredProducts } = useFeaturedProducts();
const { popularCategories } = await usePopularCategories();
const { categoriesWithProducts } = await useCategoriesWithProducts(popularCategories);

const softwareServices = softwareServicesData as { id: number; name: string; description: string; image: string; slug: string }[];

const whyChooseUs = [
    { title: 'Fast Shipping', description: 'Quick delivery on all orders', icon: Truck },
    { title: 'Secure Shopping', description: 'Protected transactions', icon: Shield },
    { title: 'Expert Support', description: '24/7 technical assistance', icon: Headset },
    { title: 'Quality Products', description: 'Top brands guaranteed', icon: Award },
];

// Carousel state
const carouselApi = ref<CarouselApi>();
const currentSlide = ref(0);
let autoplayInterval: NodeJS.Timeout | null = null;

// Initialize carousel API and setup autoplay
function onCarouselInit(api: CarouselApi) {
    if (!api) return;

    carouselApi.value = api;
    currentSlide.value = api.selectedScrollSnap();

    // Update current slide on select
    api.on('select', () => {
        currentSlide.value = api.selectedScrollSnap();
    });

    // Setup autoplay - slide every 4 seconds
    startAutoplay();
}

function startAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }

    autoplayInterval = setInterval(() => {
        if (carouselApi.value) {
            carouselApi.value.scrollNext();
        }
    }, 4000); // 4 seconds
}

// Stop autoplay when user interacts
function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// Cleanup on component unmount
onUnmounted(() => {
    stopAutoplay();
});
</script>