<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <!-- Page Header with Animation -->
            <div class="mb-8" data-aos="fade-down">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-12 h-12 bg-gradient-to-br from-brand to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
                        <Package class="w-6 h-6 text-white" />
                    </div>
                    <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        My Orders
                    </h1>
                </div>
                <p class="text-gray-600 ml-15">Track and manage your order history</p>
            </div>

            <!-- Orders List with Enhanced Design -->
            <div v-if="orders.length > 0" class="space-y-6">
                <div v-for="(order, index) in orders" :key="order.id"
                    class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
                    data-aos="fade-up"
                    :data-aos-delay="index * 100">
                    <!-- Order Header with Gradient -->
                    <div class="px-6 py-5 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-6">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-gradient-to-br from-brand/10 to-pink-500/10 rounded-lg flex items-center justify-center">
                                    <Package class="w-5 h-5 text-brand" />
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 font-medium">Order Number</p>
                                    <p class="font-bold text-gray-900">#{{ order.orderNumber }}</p>
                                </div>
                            </div>
                            <div class="hidden sm:block w-px h-12 bg-gray-200"></div>
                            <div class="hidden sm:block">
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

                    <!-- Order Items with Enhanced Design -->
                    <div class="p-6">
                        <h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <ShoppingCart class="w-4 h-4" />
                            ORDER ITEMS ({{ order.items.length }})
                        </h3>
                        <div class="space-y-3">
                            <div v-for="item in order.items"
                                :key="item.id"
                                class="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md hover:border-brand/20 transition-all duration-300 group">
                                <div class="relative">
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

                        <!-- Order Details (Always Visible) -->
                        <div class="mt-6 pt-6 border-t border-gray-100">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <!-- Shipping Address -->
                                <div class="p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                                    <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <MapPin class="w-5 h-5 text-brand" />
                                        Shipping Address
                                    </h4>
                                    <div class="space-y-1 text-sm">
                                        <p class="text-gray-900 font-semibold">{{ order.shippingAddress.name }}</p>
                                        <p class="text-gray-600">{{ order.shippingAddress.street }}</p>
                                        <p class="text-gray-600">{{ order.shippingAddress.city }}, {{
                                            order.shippingAddress.state }} {{ order.shippingAddress.zip }}</p>
                                        <p class="text-gray-600 flex items-center gap-1 mt-2">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {{ order.shippingAddress.phone }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Order Summary -->
                                <div class="p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100">
                                    <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <DollarSign class="w-5 h-5 text-brand" />
                                        Payment Summary
                                    </h4>
                                    <div class="space-y-2 text-sm">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Subtotal</span>
                                            <span class="text-gray-900 font-semibold">${{ order.subtotal.toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Shipping</span>
                                            <span class="text-gray-900 font-semibold">${{ order.shipping.toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600">Tax</span>
                                            <span class="text-gray-900 font-semibold">${{ order.tax.toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between pt-2 border-t border-green-200 font-bold text-base">
                                            <span class="text-gray-900">Total Paid</span>
                                            <span class="text-brand text-lg">${{ order.total.toFixed(2) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tracking Information -->
                            <div v-if="order.trackingNumber" class="mb-6 p-4 bg-gradient-to-r from-purple-50 to-white rounded-xl border border-purple-100">
                                <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <Package class="w-5 h-5 text-brand" />
                                    Tracking Information
                                </h4>
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm text-gray-600">Tracking Number</p>
                                        <p class="font-bold text-gray-900">{{ order.trackingNumber }}</p>
                                    </div>
                                    <button class="px-5 py-2.5 bg-brand text-white rounded-xl hover:bg-brand/90 transition-all duration-300 text-sm font-bold shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30">
                                        Track Package
                                    </button>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex flex-wrap gap-3">
                                <button v-if="order.status === 'Delivered'"
                                    class="px-6 py-3 bg-gradient-to-r from-brand to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-brand/30 transition-all duration-300 text-sm font-bold flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Reorder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State with Enhanced Design -->
            <div v-else class="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 md:p-16 text-center" data-aos="fade-up">
                <div class="max-w-md mx-auto">
                    <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Package class="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3">No Orders Found</h3>
                    <p class="text-gray-600 mb-8">
                        You haven't placed any orders yet. Start shopping to see your order history here!
                    </p>
                    <NuxtLink to="/"
                        class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand to-pink-500 text-white rounded-xl hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 font-bold text-lg group">
                        Start Shopping
                        <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
