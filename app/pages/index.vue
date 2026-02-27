<template>
    <div class="min-h-screen">
        <!-- Hero Carousel Section -->
        <ClientOnly>
            <div class="relative w-full overflow-hidden" data-aos="fade-in">
                <Carousel class="w-full" :opts="{
                    align: 'start',
                    loop: true,
                }" @init-api="onCarouselInit">
                    <CarouselContent>
                        <CarouselItem v-for="slide in carouselSlides" :key="slide.uuid">
                            <div class="relative w-full aspect-[4/3] sm:aspect-[16/7] lg:aspect-[21/8] overflow-hidden">
                                <picture>
                                    <source :srcset="slide.desktop" media="(min-width: 640px)" />
                                    <img :src="slide.mobile || slide.desktop" :alt="slide.title || 'Carousel slide'"
                                        class="w-full h-full object-cover" />
                                </picture>
                            </div>
                        </CarouselItem>
                    </CarouselContent>

                    <!-- Navigation Arrows - Centered Vertically -->
                    <div class="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 z-20">
                        <CarouselPrevious
                            class="relative left-0 translate-x-0 translate-y-0 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 hover:border-white/40 w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13" />
                    </div>
                    <div class="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 z-20">
                        <CarouselNext
                            class="relative right-0 translate-x-0 translate-y-0 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 hover:border-white/40 w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13" />
                    </div>

                    <!-- Pagination Dots -->
                    <div class="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20">
                        <button v-for="(slide, index) in carouselSlides" :key="slide.uuid"
                            @click="() => carouselApi?.scrollTo(index)" :class="[
                                'h-1.5 sm:h-2 rounded-full transition-all duration-300',
                                currentSlide === index
                                    ? 'bg-white w-5 sm:w-7'
                                    : 'bg-white/50 hover:bg-white/70 w-1.5 sm:w-2'
                            ]" :aria-label="`Go to slide ${index + 1}`" />
                    </div>
                </Carousel>
            </div>
        </ClientOnly>

        <!-- Featured Products Section -->
        <div v-if="featuredProducts && featuredProducts.length > 0"
            class="relative pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
            <!-- Background with diagonal split -->
            <div class="absolute inset-0 bg-linear-to-br from-gray-50 via-white to-blue-50/30"></div>

            <!-- Decorative geometric shapes -->
            <div
                class="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-brand/5 to-transparent rounded-full blur-3xl">
            </div>
            <div
                class="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl">
            </div>

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

        <!-- Category Products Sections -->
        <div v-if="categoriesWithProducts && categoriesWithProducts.length > 0" class="bg-white py-4 sm:py-0">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Section Header -->
                <ClientOnly>
                    <div class="mb-4 sm:mb-6" data-aos="fade-up">
                        <div class="mb-2">
                            <span class="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand">
                                Explore our popular categories
                            </span>
                        </div>
                    </div>

                    <!-- Categories with Products -->
                    <div class="space-y-8 sm:space-y-16">
                        <div v-for="(category, index) in categoriesWithProducts" :key="category.uuid" data-aos="fade-up"
                            :data-aos-delay="index * 100">
                            <!-- Category Banner - Above products -->
                            <div class="mb-6">
                                <NuxtLink :to="`/categories/${category.slug}`"
                                    class="group relative block overflow-hidden border-2 border-gray-200 hover:border-brand transition-all duration-300">
                                    <div class="relative h-48 sm:h-56 lg:h-64 bg-gray-900 overflow-hidden">
                                        <img :src="category.image" :alt="category.name"
                                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />

                                        <div
                                            class="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent">
                                        </div>

                                        <div class="absolute inset-0 flex items-center px-6 sm:px-8 lg:px-12 z-10">
                                            <div>
                                                <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                                                    {{ category.name }}
                                                </h3>
                                                <div
                                                    class="inline-flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                                                    <span class="text-sm sm:text-base font-medium">Explore
                                                        collection</span>
                                                    <div
                                                        class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-brand group-hover:translate-x-1 transition-all duration-300">
                                                        <ChevronRight class="w-5 h-5 sm:w-6 sm:h-6" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>

                            <!-- Products Grid - Full width below -->
                            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                                <ProductCard v-for="product in category.products" :key="product.uuid"
                                    :product="product" />
                            </div>

                            <!-- View All Link -->
                            <div class="mt-6 text-center">
                                <NuxtLink :to="`/categories/${category.slug}`"
                                    class="inline-flex items-center gap-2 text-brand hover:text-brand/80 font-semibold transition-colors group">
                                    <span>View all {{ category.name }}</span>
                                    <ChevronRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </ClientOnly>
            </div>
        </div>


        <!-- Why Choose Us Section -->
        <div class="bg-linear-to-b from-gray-50 to-white py-16 sm:py-24">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <ClientOnly>
                    <div class="text-center mb-12 sm:mb-16" data-aos="fade-up">
                        <span class="text-xs font-semibold tracking-widest uppercase text-brand mb-3 block">Our
                            Advantages</span>
                        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Why
                            Choose Tan</h2>
                        <p class="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">Trusted by businesses worldwide
                            for IT excellence</p>
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                        <div v-for="(feature, index) in whyChooseUs" :key="feature.title" data-aos="fade-up"
                            :data-aos-delay="index * 100"
                            class="text-center group transition-all duration-500 bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200">
                            <div
                                class="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-brand/10 to-brand/5 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:from-brand/15 group-hover:to-brand/10 transition-all duration-500">
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
        ChevronRight,
        Truck,
        Shield,
        Headset,
        Award,
    } from 'lucide-vue-next';
    import softwareServicesData from '~/assets/data/Service/system.json';
    import type { Product } from '~/types';
    import type { CarouselApi } from '~/components/ui/carousel';

    const { carouselSlides } = useCarousel();
    const { featuredProducts } = useFeaturedProducts();
    const { popularCategories } = await usePopularCategories();
    const { categoriesWithProducts } = await useCategoriesWithLatestProducts(popularCategories);

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