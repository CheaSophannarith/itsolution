<template>
    <div class="min-h-screen bg-gray-50/60 py-6 sm:py-10">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            <!-- Page Header -->
            <div class="mb-6 sm:mb-8" data-aos="fade-down">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">My Orders</h1>
                <p class="text-sm text-gray-500 mt-1">
                    <template v-if="total > 0">{{ total }} order{{ total !== 1 ? 's' : '' }} placed</template>
                    <template v-else>Track and manage your orders</template>
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="space-y-4">
                <div v-for="n in 3" :key="n"
                    class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 animate-pulse">
                    <div class="flex items-center justify-between mb-5">
                        <div class="space-y-2">
                            <div class="h-3 w-24 bg-gray-200 rounded-full"></div>
                            <div class="h-4 w-36 bg-gray-200 rounded-full"></div>
                        </div>
                        <div class="h-7 w-20 bg-gray-200 rounded-full"></div>
                    </div>
                    <div class="border-t border-gray-100 pt-4 space-y-3">
                        <div class="h-3 w-32 bg-gray-100 rounded-full"></div>
                        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <div class="w-12 h-12 bg-gray-200 rounded-lg shrink-0"></div>
                            <div class="flex-1 space-y-2">
                                <div class="h-3.5 w-40 bg-gray-200 rounded-full"></div>
                                <div class="h-3 w-24 bg-gray-100 rounded-full"></div>
                            </div>
                            <div class="h-4 w-16 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-white rounded-2xl border border-red-100 p-8 sm:p-12 text-center"
                data-aos="fade-up">
                <div class="max-w-sm mx-auto">
                    <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle class="w-8 h-8 text-red-400" />
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
                    <p class="text-sm text-gray-500 mb-6">{{ error }}</p>
                    <button @click="fetchOrders(1)"
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-medium rounded-xl hover:bg-brand/90 transition-colors">
                        <RefreshCw class="w-4 h-4" />
                        Try Again
                    </button>
                </div>
            </div>

            <!-- Orders List -->
            <div v-else-if="orders.length > 0" class="space-y-4">
                <div v-for="(order, index) in orders" :key="order.uuid"
                    class="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100 transition-all duration-300"
                    data-aos="fade-up" :data-aos-delay="index * 80">

                    <!-- Order Header -->
                    <div class="px-5 sm:px-6 py-4 border-b border-gray-100">
                        <div class="flex flex-wrap items-start sm:items-center justify-between gap-3">
                            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5">
                                <div>
                                    <p class="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Order</p>
                                    <p class="font-semibold text-gray-900 text-sm">{{ order.order_number }}</p>
                                </div>
                                <div class="hidden sm:block w-px h-8 bg-gray-200"></div>
                                <div>
                                    <p class="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Date</p>
                                    <p class="text-sm text-gray-700">{{ formatDate(order.created_at) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span :class="['order-badge', getStatusClass(order.status)]">
                                    {{ formatStatus(order.status) }}
                                </span>
                                <span :class="['order-badge', getPaymentStatusClass(order.payment_status)]">
                                    {{ formatStatus(order.payment_status) }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Order Items -->
                    <div class="px-5 sm:px-6 py-4">
                        <p class="text-[11px] uppercase tracking-wider text-gray-400 font-medium mb-3">
                            {{ order.items.length }} Item{{ order.items.length !== 1 ? 's' : '' }}
                        </p>

                        <div class="space-y-2.5">
                            <div v-for="item in order.items" :key="item.uuid"
                                class="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-50 transition-colors group">
                                <!-- Item icon placeholder -->
                                <div
                                    class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-brand/30 transition-colors">
                                    <Package
                                        class="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-brand/50 transition-colors" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4
                                        class="text-sm font-semibold text-gray-900 truncate group-hover:text-brand transition-colors">
                                        {{ item.product_name }}
                                    </h4>
                                    <p v-if="item.variant_name" class="text-xs text-gray-500 truncate mt-0.5">
                                        {{ item.variant_name }}
                                    </p>
                                    <div class="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                                        <span>{{ item.quantity }} × ${{ item.unit_price }}</span>
                                    </div>
                                </div>
                                <div class="text-right shrink-0">
                                    <p class="text-sm font-bold text-gray-900">${{ item.subtotal }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Order Summary Footer -->
                    <div class="px-5 sm:px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <!-- Shipping Address Preview -->
                            <div class="flex items-start gap-2 text-xs text-gray-500">
                                <MapPin class="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                <span class="line-clamp-1">
                                    {{ order.shipping_address.full_name }},
                                    {{ order.shipping_address.address_line_1 }},
                                    {{ order.shipping_address.city }}
                                </span>
                            </div>
                            <!-- Price Summary -->
                            <div class="flex items-center gap-4 sm:gap-6">
                                <div v-if="parseFloat(order.discount_amount) > 0" class="text-right">
                                    <p class="text-[10px] uppercase tracking-wider text-gray-400">Discount</p>
                                    <p class="text-xs font-semibold text-green-600">-${{ order.discount_amount }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-[10px] uppercase tracking-wider text-gray-400">Total</p>
                                    <p class="text-base sm:text-lg font-bold text-brand">${{ order.total }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div v-if="lastPage > 1" class="mt-8 flex justify-center">
                    <Pagination v-model:page="paginationPage" :total="total" :items-per-page="perPage"
                        :sibling-count="1" show-edges>
                        <PaginationContent v-slot="{ items }" class="flex-wrap justify-center gap-1">
                            <PaginationPrevious />
                            <template v-for="(item, index) in items" :key="index">
                                <PaginationItem v-if="item.type === 'page'" :value="item.value"
                                    :is-active="item.value === currentPage">
                                    {{ item.value }}
                                </PaginationItem>
                                <PaginationEllipsis v-else :index="index" />
                            </template>
                            <PaginationNext />
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="bg-white rounded-2xl border border-gray-100 p-10 sm:p-16 text-center" data-aos="fade-up">
                <div class="max-w-xs mx-auto">
                    <div
                        class="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-3">
                        <Package class="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
                    <p class="text-sm text-gray-500 mb-8 leading-relaxed">
                        Your order history will appear here once you make your first purchase.
                    </p>
                    <NuxtLink to="/"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors font-semibold text-sm group">
                        Browse Products
                        <ArrowRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, watch, ref } from 'vue'
    import { MapPin, Package, ArrowRight, AlertCircle, RefreshCw } from 'lucide-vue-next'
    import {
        Pagination, PaginationContent, PaginationEllipsis,
        PaginationItem, PaginationNext, PaginationPrevious,
    } from '~/components/ui/pagination'
    import AOS from 'aos'
    import 'aos/dist/aos.css'

    definePageMeta({
        middleware: 'auth'
    })

    const {
        orders, isLoading, error,
        currentPage, lastPage, perPage, total,
        fetchOrders, goToPage,
    } = useOrders()

    // Local page model for the Pagination component
    const paginationPage = ref(1)

    // Watch pagination component changes and fetch from server
    watch(paginationPage, (newPage) => {
        if (newPage !== currentPage.value) {
            goToPage(newPage)
        }
    })

    // Sync server page back to pagination component
    watch(currentPage, (newPage) => {
        paginationPage.value = newPage
    })

    onMounted(() => {
        AOS.init({ duration: 600, once: true, offset: 30 })
        fetchOrders()
    })

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
        })
    }

    function formatStatus(status: string) {
        return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }

    function getStatusClass(status: string): string {
        const map: Record<string, string> = {
            pending: 'badge-yellow',
            processing: 'badge-blue',
            shipped: 'badge-purple',
            delivered: 'badge-green',
            completed: 'badge-green',
            cancelled: 'badge-red',
            refunded: 'badge-red',
        }
        return map[status.toLowerCase()] || 'badge-gray'
    }

    function getPaymentStatusClass(status: string): string {
        const map: Record<string, string> = {
            paid: 'badge-green',
            pending: 'badge-yellow',
            failed: 'badge-red',
            refunded: 'badge-red',
            expired: 'badge-gray',
        }
        return map[status.toLowerCase()] || 'badge-gray'
    }
</script>

<style scoped>
    @reference '~/assets/css/tailwind.css';

    .order-badge {
        @apply px-2.5 py-1 text-[11px] font-semibold rounded-full leading-none whitespace-nowrap;
    }

    .badge-yellow {
        @apply bg-amber-50 text-amber-700 ring-1 ring-amber-200/60;
    }

    .badge-blue {
        @apply bg-blue-50 text-blue-700 ring-1 ring-blue-200/60;
    }

    .badge-purple {
        @apply bg-purple-50 text-purple-700 ring-1 ring-purple-200/60;
    }

    .badge-green {
        @apply bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60;
    }

    .badge-red {
        @apply bg-red-50 text-red-700 ring-1 ring-red-200/60;
    }

    .badge-gray {
        @apply bg-gray-50 text-gray-600 ring-1 ring-gray-200/60;
    }
</style>
