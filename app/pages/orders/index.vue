<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <!-- Page Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">My Orders</h1>
                <p class="text-gray-600 mt-2">View and track your order history</p>
            </div>

            <!-- Filter Tabs -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div class="flex border-b border-gray-200 overflow-x-auto">
                    <button v-for="status in orderStatuses" :key="status.value" @click="selectedStatus = status.value"
                        :class="[
                            'px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2',
                            selectedStatus === status.value
                                ? 'border-brand text-brand'
                                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                        ]">
                        {{ status.label }}
                        <span v-if="status.count > 0"
                            class="ml-2 px-2 py-0.5 text-xs rounded-full"
                            :class="selectedStatus === status.value ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-600'">
                            {{ status.count }}
                        </span>
                    </button>
                </div>
            </div>

            <!-- Orders List -->
            <div v-if="filteredOrders.length > 0" class="space-y-4">
                <div v-for="order in filteredOrders" :key="order.id"
                    class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <!-- Order Header -->
                    <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <div>
                                <p class="text-sm text-gray-600">Order Number</p>
                                <p class="font-semibold text-gray-900">#{{ order.orderNumber }}</p>
                            </div>
                            <div class="hidden sm:block w-px h-10 bg-gray-200"></div>
                            <div class="hidden sm:block">
                                <p class="text-sm text-gray-600">Order Date</p>
                                <p class="font-medium text-gray-900">{{ formatDate(order.date) }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span :class="[
                                'px-3 py-1 text-sm font-medium rounded-full',
                                getStatusColor(order.status)
                            ]">
                                {{ order.status }}
                            </span>
                            <button @click="toggleOrderDetails(order.id)"
                                class="text-brand hover:text-brand/80 transition-colors">
                                <ChevronDown :class="['w-5 h-5 transition-transform', expandedOrders.has(order.id) ? 'rotate-180' : '']" />
                            </button>
                        </div>
                    </div>

                    <!-- Order Items -->
                    <div class="p-6">
                        <div class="space-y-4">
                            <div v-for="item in order.items.slice(0, expandedOrders.has(order.id) ? undefined : 2)"
                                :key="item.id" class="flex gap-4">
                                <img :src="item.image" :alt="item.name"
                                    class="w-20 h-20 object-cover rounded-lg border border-gray-200">
                                <div class="flex-1">
                                    <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                                    <p class="text-sm text-gray-600">{{ item.variant }}</p>
                                    <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold text-gray-900">${{ item.price.toFixed(2) }}</p>
                                    <p class="text-sm text-gray-600">${{ (item.price * item.quantity).toFixed(2) }} total
                                    </p>
                                </div>
                            </div>

                            <!-- Show more items button -->
                            <button v-if="order.items.length > 2 && !expandedOrders.has(order.id)"
                                @click="toggleOrderDetails(order.id)"
                                class="text-brand hover:text-brand/80 text-sm font-medium">
                                + {{ order.items.length - 2 }} more items
                            </button>
                        </div>

                        <!-- Order Details (Expanded) -->
                        <Transition enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0" enter-to-class="opacity-100"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                            <div v-if="expandedOrders.has(order.id)" class="mt-6 pt-6 border-t border-gray-200">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Shipping Address -->
                                    <div>
                                        <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            <MapPin class="w-4 h-4" />
                                            Shipping Address
                                        </h4>
                                        <p class="text-sm text-gray-600">{{ order.shippingAddress.name }}</p>
                                        <p class="text-sm text-gray-600">{{ order.shippingAddress.street }}</p>
                                        <p class="text-sm text-gray-600">{{ order.shippingAddress.city }}, {{
                                            order.shippingAddress.state }} {{ order.shippingAddress.zip }}</p>
                                        <p class="text-sm text-gray-600">{{ order.shippingAddress.phone }}</p>
                                    </div>

                                    <!-- Order Summary -->
                                    <div>
                                        <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            <DollarSign class="w-4 h-4" />
                                            Order Summary
                                        </h4>
                                        <div class="space-y-1 text-sm">
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Subtotal</span>
                                                <span class="text-gray-900">${{ order.subtotal.toFixed(2) }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Shipping</span>
                                                <span class="text-gray-900">${{ order.shipping.toFixed(2) }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-600">Tax</span>
                                                <span class="text-gray-900">${{ order.tax.toFixed(2) }}</span>
                                            </div>
                                            <div class="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                                                <span class="text-gray-900">Total</span>
                                                <span class="text-brand">${{ order.total.toFixed(2) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tracking Information -->
                                <div v-if="order.trackingNumber" class="mt-6 pt-6 border-t border-gray-200">
                                    <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <Package class="w-4 h-4" />
                                        Tracking Information
                                    </h4>
                                    <div class="flex items-center gap-3">
                                        <p class="text-sm text-gray-600">Tracking Number: <span class="font-medium text-gray-900">{{ order.trackingNumber }}</span></p>
                                        <button class="text-brand hover:text-brand/80 text-sm font-medium">
                                            Track Package
                                        </button>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="mt-6 flex flex-wrap gap-3">
                                    <button
                                        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                        View Invoice
                                    </button>
                                    <button v-if="order.status === 'Delivered'"
                                        class="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-sm font-medium">
                                        Reorder
                                    </button>
                                    <button v-if="order.status === 'Processing' || order.status === 'Pending'"
                                        class="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                                        Cancel Order
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Package class="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 class="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p class="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                <NuxtLink to="/"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium">
                    Start Shopping
                    <ArrowRight class="w-4 h-4" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown, MapPin, Package, DollarSign, ArrowRight } from 'lucide-vue-next'

definePageMeta({
    middleware: 'auth'
})

const selectedStatus = ref('all')
const expandedOrders = ref(new Set<string>())

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

const orderStatuses = computed(() => [
    { value: 'all', label: 'All Orders', count: orders.value.length },
    { value: 'processing', label: 'Processing', count: orders.value.filter(o => o.status === 'Processing').length },
    { value: 'shipped', label: 'Shipped', count: orders.value.filter(o => o.status === 'Shipped').length },
    { value: 'delivered', label: 'Delivered', count: orders.value.filter(o => o.status === 'Delivered').length },
    { value: 'cancelled', label: 'Cancelled', count: orders.value.filter(o => o.status === 'Cancelled').length }
])

const filteredOrders = computed(() => {
    if (selectedStatus.value === 'all') {
        return orders.value
    }
    return orders.value.filter(order =>
        order.status.toLowerCase() === selectedStatus.value.toLowerCase()
    )
})

function toggleOrderDetails(orderId: string) {
    if (expandedOrders.value.has(orderId)) {
        expandedOrders.value.delete(orderId)
    } else {
        expandedOrders.value.add(orderId)
    }
}

function getStatusColor(status: string) {
    const colors: Record<string, string> = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Processing': 'bg-blue-100 text-blue-800',
        'Shipped': 'bg-purple-100 text-purple-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
}

function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
