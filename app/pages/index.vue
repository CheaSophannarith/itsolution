<template>
    <div class="min-h-screen">
        <!-- Hero Section -->
        <div class="w-full px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24" style="background: linear-gradient(135deg, #459bcc 0%, #172554 100%)">
            <div class="max-w-7xl mx-auto px-2 sm:px-6">
                <div class="max-w-3xl">
                    <h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                        IT Solutions for Your Business Success
                    </h1>
                    <p class="text-base sm:text-lg text-white/90 mb-6 sm:mb-8">
                        From hardware and software to comprehensive IT services, we provide everything your organization needs to thrive in the digital age.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <NuxtLink to="/hardware"
                            class="bg-white text-gray-800 px-6 py-3 rounded-none font-medium hover:bg-gray-100 transition-colors text-center">
                            Shop Hardware
                        </NuxtLink>
                        <NuxtLink to="/software"
                            class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-none font-medium hover:bg-white/10 transition-colors text-center">
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
                <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                    <ProductCard v-for="product in featuredProducts" :key="product.uuid" :product="product" />
                </div>
            </div>
        </div>

        <!-- About Our Services Section -->
        <div class="bg-gray-50 py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-10">
                    <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-950 mb-2">Our Software Solutions</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        We provide comprehensive software solutions and custom development services to help your business
                        thrive in the digital era.
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div v-for="item in softwareServices" :key="item.id"
                        class="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
                        <NuxtLink :to="`/services/${item.slug}`" class="block">
                            <div class="aspect-video overflow-hidden">
                                <img :src="item.image" :alt="item.name"
                                    class="w-full h-full object-fit group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div class="p-4 sm:p-6">
                                <h3 class="text-lg font-bold text-gray-800 group-hover:text-brand transition-colors mb-2">
                                    {{ item.name }}
                                </h3>
                                <p class="text-sm text-gray-600 line-clamp-2">{{ item.description }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                </div>

                <div class="text-center mt-8">
                    <NuxtLink to="/services"
                        class="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-none font-medium hover:bg-brand/90 transition-colors">
                        View All Services
                        <ChevronRight class="w-4 h-4" />
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Why Choose Us Section -->
        <div class="bg-white py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-10">
                    <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-950 mb-2">Why Choose Tan</h2>
                    <p class="text-gray-600">Trusted by businesses worldwide for IT excellence</p>
                </div>

                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <div v-for="feature in whyChooseUs" :key="feature.title" class="text-center">
                        <div class="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <component :is="feature.icon" class="w-8 h-8 text-brand" />
                        </div>
                        <h3 class="font-semibold text-gray-800 mb-2">{{ feature.title }}</h3>
                        <p class="text-sm text-gray-600">{{ feature.description }}</p>
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