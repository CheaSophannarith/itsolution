<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <!-- Page Header with Animation -->
            <div class="mb-6 md:mb-8" data-aos="fade-down">
                <div class="flex items-center gap-3 mb-2">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        My Orders
                    </h1>
                </div>
            </div>

            <!-- Orders List with Enhanced Design -->
            <div v-if="orders.length > 0" class="space-y-6">
                <div v-for="(order, index) in orders" :key="order.id"
                    class="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300"
                    data-aos="fade-up"
                    :data-aos-delay="index * 100">
                    <!-- Order Header with Gradient -->
                    <div class="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100">
                        <!-- Mobile Layout -->
                        <div class="block sm:hidden space-y-3">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs text-gray-500 font-medium">Order Date</p>
                                    <p class="font-semibold text-gray-900 text-sm">{{ formatDate(order.date) }}</p>
                                </div>
                                <span :class="[
                                    'px-3 py-1.5 text-xs font-bold rounded-full shadow-sm',
                                    getStatusColor(order.status)
                                ]">
                                    {{ order.status }}
                                </span>
                            </div>
                            <div class="pt-2 border-t border-gray-100">
                                <p class="text-xs text-gray-500 font-medium">Total Amount</p>
                                <p class="font-bold text-brand text-lg">${{ order.total.toFixed(2) }}</p>
                            </div>
                        </div>
                        
                        <!-- Desktop Layout -->
                        <div class="hidden sm:flex items-center justify-between gap-4">
                            <div class="flex items-center gap-6">
                                <div>
                                    <p class="text-xs text-gray-500 font-medium">Order Date</p>
                                    <p class="font-semibold text-gray-900">{{ formatDate(order.date) }}</p>
                                </div>
                                <div class="hidden md:block w-px h-12 bg-gray-200"></div>
                                <div class="hidden md:block">
                                    <p class="text-xs text-gray-500 font-medium">Total Amount</p>
                                    <p class="font-bold text-brand">${{ order.total.toFixed(2) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span :class="[
                                    'px-4 py-2 text-sm font-bold rounded-full shadow-sm',
                                    getStatusColor(order.status)
                                ]">
                                    {{ order.status }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Order Items with Enhanced Design -->
                    <div class="p-4 sm:p-6">
                        <h3 class="text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                            <ShoppingCart class="w-4 h-4" />
                            ORDER ITEMS ({{ order.items.length }})
                        </h3>
                        <div class="space-y-3">
                            <div v-for="item in order.items"
                                :key="item.id"
                                class="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md hover:border-brand/20 transition-all duration-300 group">
                                
                                <!-- Mobile Layout -->
                                <div class="flex gap-3 sm:hidden">
                                    <div class="relative flex-shrink-0">
                                        <img :src="item.image" :alt="item.name"
                                            class="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 group-hover:border-brand/30 transition-all duration-300">
                                        <div class="absolute -top-2 -right-2 w-5 h-5 bg-brand text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                                            {{ item.quantity }}
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <h3 class="font-bold text-gray-900 mb-1 text-sm group-hover:text-brand transition-colors truncate">{{ item.name }}</h3>
                                        <p class="text-xs text-gray-600 mb-2 truncate">{{ item.variant }}</p>
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-1 text-xs">
                                                <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium">
                                                    Qty: {{ item.quantity }}
                                                </span>
                                                <span class="text-gray-400">×</span>
                                                <span class="text-gray-600 font-semibold">${{ item.price.toFixed(2) }}</span>
                                            </div>
                                            <p class="font-bold text-brand">${{ (item.price * item.quantity).toFixed(2) }}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Desktop Layout -->
                                <div class="hidden sm:flex gap-4 w-full">
                                    <div class="relative flex-shrink-0">
                                        <img :src="item.image" :alt="item.name"
                                            class="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 group-hover:border-brand/30 transition-all duration-300">
                                        <div class="absolute -top-2 -right-2 w-6 h-6 bg-brand text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                                            {{ item.quantity }}
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors">{{ item.name }}</h3>
                                        <p class="text-sm text-gray-600 mb-2">{{ item.variant }}</p>
                                        <div class="flex items-center gap-2">
                                            <span class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium">
                                                Qty: {{ item.quantity }}
                                            </span>
                                            <span class="text-xs text-gray-400">×</span>
                                            <span class="text-xs text-gray-600 font-semibold">${{ item.price.toFixed(2) }}</span>
                                        </div>
                                    </div>
                                    <div class="text-right flex flex-col justify-center">
                                        <p class="font-bold text-lg text-brand">${{ (item.price * item.quantity).toFixed(2) }}</p>
                                        <p class="text-xs text-gray-500">Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State with Enhanced Design -->
            <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 md:p-16 text-center" data-aos="fade-up">
                <div class="max-w-md mx-auto">
                    <div class="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-inner">
                        <Package class="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                    </div>
                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">No Orders Found</h3>
                    <p class="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0">
                        You haven't placed any orders yet. Start shopping to see your order history here!
                    </p>
                    <NuxtLink to="/"
                        class="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-brand to-pink-500 text-white rounded-xl hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 font-bold text-base sm:text-lg group">
                        Start Shopping
                        <ArrowRight class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MapPin, Package, DollarSign, ArrowRight, ShoppingCart } from 'lucide-vue-next'
import AOS from 'aos'
import 'aos/dist/aos.css'

definePageMeta({
    middleware: 'auth'
})

// Initialize AOS animations
onMounted(() => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    })
})

// Mock data - replace with API call
const orders = ref([
    {
        id: '1',
        orderNumber: 'ORD-2024-001',
        date: '2024-01-15',
        status: 'Delivered',
        items: [
            { id: '1', name: 'Samsung Galaxy S23 Ultra', variant: '256GB, Black', quantity: 1, price: 1199.99, image: '/placeholder-product.jpg' },
            { id: '2', name: 'Wireless Charger', variant: 'Fast Charging', quantity: 1, price: 29.99, image: '/placeholder-product.jpg' }
        ],
        shippingAddress: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            phone: '+1 234-567-8900'
        },
        subtotal: 1229.98,
        shipping: 15.00,
        tax: 98.40,
        total: 1343.38,
        trackingNumber: 'TRK123456789'
    },
    {
        id: '2',
        orderNumber: 'ORD-2024-002',
        date: '2024-01-20',
        status: 'Processing',
        items: [
            { id: '3', name: 'Laptop Pro M2', variant: '16GB RAM, 512GB SSD', quantity: 1, price: 1899.99, image: '/placeholder-product.jpg' }
        ],
        shippingAddress: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            phone: '+1 234-567-8900'
        },
        subtotal: 1899.99,
        shipping: 0.00,
        tax: 151.99,
        total: 2051.98,
        trackingNumber: null
    },
    {
        id: '3',
        orderNumber: 'ORD-2024-003',
        date: '2024-01-22',
        status: 'Shipped',
        items: [
            { id: '4', name: 'Mechanical Keyboard', variant: 'RGB, Cherry MX Blue', quantity: 1, price: 149.99, image: '/placeholder-product.jpg' },
            { id: '5', name: 'Gaming Mouse', variant: 'Wireless, 16000 DPI', quantity: 1, price: 79.99, image: '/placeholder-product.jpg' },
            { id: '6', name: 'Mouse Pad', variant: 'Extended, RGB', quantity: 1, price: 24.99, image: '/placeholder-product.jpg' }
        ],
        shippingAddress: {
            name: 'John Doe',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            phone: '+1 234-567-8900'
        },
        subtotal: 254.97,
        shipping: 10.00,
        tax: 20.40,
        total: 285.37,
        trackingNumber: 'TRK987654321'
    }
])

function getStatusColor(status: string) {
    const colors: Record<string, string> = {
        'Pending': 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700 border border-yellow-200',
        'Processing': 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200',
        'Shipped': 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border border-purple-200',
        'Delivered': 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200',
        'Cancelled': 'bg-gradient-to-r from-red-100 to-red-50 text-red-700 border border-red-200'
    }
    return colors[status] || 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border border-gray-200'
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

/* Smooth animations */
.group:hover .group-hover\:translate-x-1 {
    transform: translateX(0.25rem);
}

/* Custom border width */
.border-b-3 {
    border-bottom-width: 3px;
}
</style>
