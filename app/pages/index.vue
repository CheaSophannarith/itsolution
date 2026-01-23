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
                    <NuxtLink v-for="link in quickLinks" :key="link.title" :to="link.href"
                        class="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 border border-gray-200 hover:border-brand hover:shadow-md transition-all group">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-brand/10 rounded-full flex items-center justify-center group-hover:bg-brand transition-colors">
                            <component :is="link.icon" class="w-5 h-5 sm:w-6 sm:h-6 text-brand group-hover:text-white transition-colors" />
                        </div>
                        <div>
                            <h3 class="font-semibold text-gray-800 text-sm sm:text-base">{{ link.title }}</h3>
                            <p class="text-xs sm:text-sm text-gray-500">{{ link.description }}</p>
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

        <!-- Featured Hardware Categories -->
        <div class="bg-white py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-bold text-blue-950">Popular Hardware Categories</h2>
                        <p class="text-gray-600 mt-1">Computer hardware for your business workplace</p>
                    </div>
                    <NuxtLink to="/hardware" class="hidden sm:flex items-center gap-1 text-brand font-semibold hover:underline">
                        View All
                        <ChevronRight class="w-4 h-4" />
                    </NuxtLink>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <HardwareCategoriesCard v-for="category in hardwareCategories.slice(0, 4)" :key="category.id"
                        :category="category" />
                </div>

                <div class="mt-6 sm:hidden text-center">
                    <NuxtLink to="/hardware" class="text-brand font-semibold hover:underline">
                        View All Hardware →
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Featured Products Section -->
        <div class="bg-gray-50 py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 class="text-xl sm:text-2xl font-bold text-blue-950 mb-2">Featured Products</h2>
                <p class="text-gray-600 mb-8">Top picks from our experts</p>

                <!-- Custom Tabs -->
                <div class="bg-brand overflow-x-auto">
                    <div class="grid grid-cols-4 min-w-[500px] sm:min-w-0">
                        <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
                            class="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-6 transition-colors border-2 text-xs sm:text-base"
                            :class="activeTab === tab.value ? 'bg-gray-100 border-brand text-brand border-b-[5px]' : 'border-transparent text-white hover:bg-white/10'">
                            <component :is="tab.icon" class="w-5 h-5 sm:w-8 sm:h-8"
                                :class="activeTab === tab.value ? 'text-brand' : 'text-white'" />
                            <span class="text-center leading-tight">{{ tab.label }}</span>
                        </button>
                    </div>
                </div>
                <div class="bg-gray-100 p-4 sm:p-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <HardwareProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
                    </div>
                    <div class="flex justify-end mt-4 sm:mt-6">
                        <NuxtLink :to="`/hardware/${activeTab}`" class="text-brand font-semibold hover:underline text-sm sm:text-base">
                            Shop all {{ tabs.find(t => t.value === activeTab)?.label }} →
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <!-- Popular Brands Section -->
        <div class="bg-white py-12 sm:py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Browse popular brands</h2>

                <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-8 items-center">
                    <div v-for="brand in popularBrands" :key="brand.id"
                        class="flex items-center justify-center p-2 sm:p-4 hover:shadow-md transition-shadow cursor-pointer rounded-lg border border-transparent hover:border-gray-200">
                        <img :src="brand.image" :alt="brand.name"
                            class="h-8 sm:h-12 object-contain grayscale hover:grayscale-0 transition-all" />
                    </div>
                </div>

                <div class="flex justify-end mt-4 sm:mt-6">
                    <NuxtLink to="/hardware/brands" class="text-brand font-semibold hover:underline flex items-center gap-1 text-sm sm:text-base">
                        Shop all brands
                        <ChevronRight class="w-4 h-4" />
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
import hardwareCategoriesData from '~/assets/data/Hardware/categories.json';
import productsData from '~/assets/data/Hardware/products.json';
import brandsData from '~/assets/data/Hardware/brand.json';

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    subcategories: { id: number; name: string; slug: string }[];
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    manufacturer_id: number;
    brand_id: number;
    category_id: number;
    subcategory_ids: number[];
    type_ids: number[];
    image: string;
    stock: number;
    rating: number;
    featured: boolean;
}

interface Brand {
    id: number;
    name: string;
    image: string;
    isPopular: boolean;
}

const hardwareCategories = hardwareCategoriesData as Category[];
const products = productsData as Product[];
const brands = brandsData as Brand[];

const activeTab = ref('computers-tablets');

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

const tabs = [
    { value: 'computers-tablets', label: 'Computers & Tablets', icon: Monitor },
    { value: 'cables', label: 'Cables', icon: Cable },
    { value: 'computer-accessories', label: 'Computer Accessories', icon: Network },
    { value: 'server-components', label: 'Server Components', icon: Headphones },
];

const tabToCategoryId: Record<string, number> = {
    'computers-tablets': 1,
    'cables': 2,
    'computer-accessories': 3,
    'server-components': 5,
};

const filteredProducts = computed(() => {
    const categoryId = tabToCategoryId[activeTab.value];
    return products.filter(p => p.category_id === categoryId).slice(0, 6);
});

const popularBrands = computed(() => {
    return brands.filter(brand => brand.isPopular);
});

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