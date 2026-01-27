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


        <!-- Quick Links Section -->
        <div class="bg-white py-8 sm:py-12 border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <NuxtLink v-for="category in categories" :key="category.slug" 
                        class="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border border-gray-200 hover:border-brand hover:shadow-md transition-all group">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-brand/10 rounded-full flex items-center justify-center group-hover:bg-brand transition-colors">
                            <!-- <component :is="category." class="w-5 h-5 sm:w-6 sm:h-6 text-brand group-hover:text-white transition-colors" /> -->
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800 text-sm sm:text-base">{{ category.name }}</h3>
                            <!-- <p class="text-xs sm:text-sm text-gray-500">{{ link.description }}</p> -->
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Main Categories Section -->
        <div class="bg-gray-50 py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-950 mb-2">Shop by Category</h2>
                <p class="text-gray-600 mb-8">Browse our extensive catalog of IT products and solutions</p>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NuxtLink v-for="category in mainCategories" :key="category.title" :to="category.href"
                        class="relative overflow-hidden rounded-lg group">
                        <div class="aspect-[4/3] bg-gradient-to-br from-brand to-blue-950 p-6 sm:p-8 flex flex-col justify-end">
                            <component :is="category.icon" class="w-12 h-12 sm:w-16 sm:h-16 text-white/80 mb-4" />
                            <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">{{ category.title }}</h3>
                            <p class="text-sm text-white/80">{{ category.description }}</p>
                            <div class="mt-4 flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                                Shop Now
                                <ChevronRight class="w-5 h-5" />
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>

     


        <!-- Services Section -->
        <div class="bg-gray-900 py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-10">
                    <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">IT Services & Solutions</h2>
                    <p class="text-gray-400">Comprehensive technology services to power your business</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="service in services" :key="service.title"
                        class="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors">
                        <component :is="service.icon" class="w-10 h-10 text-brand mb-4" />
                        <h3 class="text-lg font-semibold text-white mb-2">{{ service.title }}</h3>
                        <p class="text-sm text-gray-400 mb-4">{{ service.description }}</p>
                        <NuxtLink :to="service.href" class="text-brand font-medium hover:underline text-sm">
                            Learn More →
                        </NuxtLink>
                    </div>
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
const { categories,status,error} = useCategories();



const softwareServices = softwareServicesData as { id: number; name: string; description: string; image: string; slug: string }[];

const quickLinks = [
    { title: 'Hardware', description: 'Computers & devices', href: '/hardware', icon: Laptop },
    { title: 'Software', description: 'Applications & licenses', href: '/software', icon: HardDrive },
    { title: 'IT Solutions', description: 'Enterprise services', href: '/it-solutions', icon: Server },
    { title: 'Support', description: 'Help & resources', href: '/contact', icon: Headset },
];

const mainCategories = [
    {
        title: 'Hardware',
        description: 'Computers, servers, networking equipment, and peripherals',
        href: '/hardware',
        icon: Monitor
    },
    {
        title: 'Software',
        description: 'Operating systems, productivity tools, and security solutions',
        href: '/software',
        icon: HardDrive
    },
    {
        title: 'IT Services',
        description: 'Cloud solutions, managed services, and technical support',
        href: '/services',
        icon: Cloud
    },
];


const services = [
    {
        title: 'Cloud Solutions',
        description: 'Migrate, manage, and optimize your cloud infrastructure with our expert team.',
        href: '/services/cloud',
        icon: Cloud
    },
    {
        title: 'Managed Services',
        description: 'Let us handle your IT operations while you focus on growing your business.',
        href: '/services/managed',
        icon: Settings
    },
    {
        title: 'Technical Support',
        description: '24/7 support from certified professionals to keep your systems running.',
        href: '/services/support',
        icon: Headset
    },
];

const whyChooseUs = [
    { title: 'Fast Shipping', description: 'Quick delivery on all orders', icon: Truck },
    { title: 'Secure Shopping', description: 'Protected transactions', icon: Shield },
    { title: 'Expert Support', description: '24/7 technical assistance', icon: Headset },
    { title: 'Quality Products', description: 'Top brands guaranteed', icon: Award },
];
</script>