<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28 relative overflow-hidden" style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <!-- Decorative Elements -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                <div class="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div class="max-w-7xl mx-auto px-2 sm:px-6 relative z-10">
                <div class="max-w-3xl">
                    <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-5 sm:mb-7 leading-tight">
                        IT Solutions for Your Business Success
                    </h1>
                    <p class="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed">
                        From hardware and software to comprehensive IT services, we provide everything your organization needs to thrive in the digital age.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 sm:gap-5">
                        <NuxtLink to="/hardware"
                            class="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center shadow-xl">
                            Shop Hardware
                        </NuxtLink>
                        <NuxtLink to="/software"
                            class="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center">
                            Explore Software
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <!-- Featured Products Section -->
        <div v-if="featuredProducts && featuredProducts.length > 0" class="bg-white py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Products Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-2 lg:gap-2">
                    <ProductCard v-for="product in featuredProducts" :key="product.uuid" :product="product" />
                </div>
            </div>
        </div>

        <!-- About Our Services Section -->
        <div class="bg-white py-16 sm:py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12 sm:mb-14">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Software Solutions</h2>
                    <p class="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                        We provide comprehensive software solutions and custom development services to help your business
                        thrive in the digital era.
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                    <div v-for="item in softwareServices" :key="item.id"
                        class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:border-brand/20 hover:-translate-y-1">
                        <NuxtLink :to="`/services/${item.slug}`" class="block">
                            <div class="aspect-video overflow-hidden bg-gray-100">
                                <img :src="item.image" :alt="item.name"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div class="p-5 sm:p-7">
                                <h3 class="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-brand transition-colors mb-3">
                                    {{ item.name }}
                                </h3>
                                <p class="text-sm sm:text-base text-gray-600 line-clamp-2 leading-relaxed">{{ item.description }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                </div>

                <div class="text-center mt-10 sm:mt-12">
                    <NuxtLink to="/services"
                        class="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand/90 hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
                        View All Services
                        <ChevronRight class="w-5 h-5" />
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Why Choose Us Section -->
        <div class="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12 sm:mb-14">
                    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Tan</h2>
                    <p class="text-gray-600 text-sm sm:text-base">Trusted by businesses worldwide for IT excellence</p>
                </div>

                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                    <div v-for="feature in whyChooseUs" :key="feature.title"
                        class="text-center group hover:-translate-y-2 transition-transform duration-300">
                        <div class="w-20 h-20 bg-gradient-to-br from-brand/10 to-brand/5 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <component :is="feature.icon" class="w-10 h-10 text-brand" />
                        </div>
                        <h3 class="font-bold text-gray-900 mb-2 text-base sm:text-lg">{{ feature.title }}</h3>
                        <p class="text-sm text-gray-600 leading-relaxed">{{ feature.description }}</p>
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

const { featuredProducts } = useFeaturedProducts();

const softwareServices = softwareServicesData as { id: number; name: string; description: string; image: string; slug: string }[];

const whyChooseUs = [
    { title: 'Fast Shipping', description: 'Quick delivery on all orders', icon: Truck },
    { title: 'Secure Shopping', description: 'Protected transactions', icon: Shield },
    { title: 'Expert Support', description: '24/7 technical assistance', icon: Headset },
    { title: 'Quality Products', description: 'Top brands guaranteed', icon: Award },
];
</script>