<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">

            <!-- Page Header -->
            <div class="mb-8" data-aos="fade-down">
                <div class="flex items-center gap-2 text-xs text-gray-400 mb-4 font-medium tracking-wide">
                    <NuxtLink to="/" class="hover:text-brand transition-colors">Home</NuxtLink>
                    <ChevronRight class="w-3 h-3" />
                    <span class="text-gray-600">My Orders</span>
                </div>
                <div class="flex items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Order History</h1>
                        <p class="text-sm text-gray-500 mt-1">
                            <template v-if="total > 0">Showing {{ orders.length }} of {{ total }} order{{ total !== 1 ? 's' : '' }}</template>
                            <template v-else>Track and manage your purchases</template>
                        </p>
                    </div>
                    <div v-if="!isLoading && total > 0"
                        class="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <ShoppingBag class="w-4 h-4 text-brand" />
                        <span class="text-sm font-bold text-gray-800">{{ total }}</span>
                        <span class="text-sm text-gray-500 hidden sm:inline">Orders</span>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="space-y-4">
                <div v-for="n in 3" :key="n"
                    class="bg-white rounded-2xl border border-l-4 border-gray-100 border-l-gray-200 shadow-sm overflow-hidden animate-pulse">
                    <div class="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div class="flex items-center gap-5">
                            <div class="space-y-2">
                                <div class="h-2.5 w-12 bg-gray-200 rounded-full"></div>
                                <div class="h-4 w-28 bg-gray-200 rounded-full"></div>
                            </div>
                            <div class="w-px h-8 bg-gray-100"></div>
                            <div class="space-y-2">
                                <div class="h-2.5 w-10 bg-gray-200 rounded-full"></div>
                                <div class="h-4 w-24 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <div class="h-6 w-20 bg-gray-200 rounded-full"></div>
                            <div class="h-6 w-16 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    <div class="px-6 sm:px-10 py-4 bg-gray-50/70 border-b border-gray-100">
                        <div class="flex items-center gap-1">
                            <div class="w-6 h-6 bg-gray-200 rounded-full shrink-0"></div>
                            <div class="flex-1 h-px bg-gray-200"></div>
                            <div class="w-6 h-6 bg-gray-200 rounded-full shrink-0"></div>
                            <div class="flex-1 h-px bg-gray-200"></div>
                            <div class="w-6 h-6 bg-gray-200 rounded-full shrink-0"></div>
                            <div class="flex-1 h-px bg-gray-200"></div>
                            <div class="w-6 h-6 bg-gray-200 rounded-full shrink-0"></div>
                        </div>
                    </div>
                    <div class="px-5 sm:px-6 py-4 space-y-2.5">
                        <div class="h-2.5 w-16 bg-gray-200 rounded-full"></div>
                        <div class="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                            <div class="w-11 h-11 bg-gray-200 rounded-xl shrink-0"></div>
                            <div class="flex-1 space-y-2">
                                <div class="h-3.5 w-40 bg-gray-200 rounded-full"></div>
                                <div class="h-3 w-24 bg-gray-100 rounded-full"></div>
                            </div>
                            <div class="h-4 w-14 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                    <div class="px-5 sm:px-6 py-3.5 bg-gray-50/70 border-t border-gray-100 flex justify-between items-center">
                        <div class="h-3 w-44 bg-gray-200 rounded-full"></div>
                        <div class="h-6 w-20 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error"
                class="bg-white rounded-2xl border border-red-100 shadow-sm p-10 sm:p-14 text-center"
                data-aos="fade-up">
                <div class="max-w-sm mx-auto">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <AlertCircle class="w-8 h-8 text-red-400" />
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Something went wrong</h3>
                    <p class="text-sm text-gray-500 mb-6 leading-relaxed">{{ error }}</p>
                    <button @click="fetchOrders(1)"
                        class="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand/90 transition-colors shadow-sm">
                        <RefreshCw class="w-4 h-4" />
                        Try Again
                    </button>
                </div>
            </div>

            <!-- Orders List -->
            <div v-else-if="orders.length > 0" class="space-y-4">
                <div v-for="(order, index) in orders" :key="order.uuid"
                    class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300"
                    :class="getCardAccentClass(order.status)"
                    data-aos="fade-up" :data-aos-delay="index * 80">

                    <!-- Order Header -->
                    <div class="px-5 sm:px-6 py-4 border-b border-gray-100">
                        <div class="flex flex-wrap items-center justify-between gap-3">
                            <div class="flex items-center gap-4 sm:gap-5">
                                <div>
                                    <p class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">Order</p>
                                    <p class="font-bold text-gray-900 text-sm font-mono tracking-tight">{{ order.order_number }}</p>
                                </div>
                                <div class="w-px h-8 bg-gray-200"></div>
                                <div>
                                    <p class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">Placed</p>
                                    <p class="text-sm font-medium text-gray-700">{{ formatDate(order.created_at) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <span :class="['order-badge', getStatusClass(order.status)]">
                                    <span :class="['inline-block w-1.5 h-1.5 rounded-full mr-1.5 shrink-0', getStatusDotClass(order.status)]"></span>
                                    {{ formatStatus(order.status) }}
                                </span>
                                <span :class="['order-badge', getPaymentStatusClass(order.payment_status)]">
                                    {{ formatStatus(order.payment_status) }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Status Progress Stepper -->
                    <div v-if="!['cancelled', 'refunded'].includes(order.status.toLowerCase())"
                        class="px-6 sm:px-10 py-3.5 bg-gray-50/70 border-b border-gray-100">
                        <div class="flex items-center">
                            <template v-for="(step, i) in getStatusSteps(order.status)" :key="step.label">
                                <div class="flex flex-col items-center shrink-0">
                                    <div :class="['w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300',
                                        step.done ? 'bg-brand' : step.current ? 'bg-brand ring-4 ring-brand/15' : 'bg-gray-200']">
                                        <Check v-if="step.done" class="w-3.5 h-3.5 text-white" stroke-width="3" />
                                        <div v-else-if="step.current" class="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <span :class="['text-[10px] mt-1.5 font-semibold whitespace-nowrap tracking-wide',
                                        step.done || step.current ? 'text-brand' : 'text-gray-400']">
                                        {{ step.label }}
                                    </span>
                                </div>
                                <div v-if="i < getStatusSteps(order.status).length - 1"
                                    :class="['flex-1 h-px mb-4 mx-1 transition-colors duration-300', step.done ? 'bg-brand' : 'bg-gray-200']">
                                </div>
                            </template>
                        </div>
                    </div>

                    <!-- Cancelled / Refunded Banner -->
                    <div v-else class="px-5 sm:px-6 py-2.5 bg-red-50/80 border-b border-red-100 flex items-center gap-2">
                        <XCircle class="w-4 h-4 text-red-400 shrink-0" />
                        <p class="text-xs font-semibold text-red-600">
                            This order was {{ formatStatus(order.status).toLowerCase() }}.
                        </p>
                    </div>

                    <!-- Order Items -->
                    <div class="px-5 sm:px-6 py-4">
                        <p class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3">
                            {{ order.items.length }} Item{{ order.items.length !== 1 ? 's' : '' }}
                        </p>

                        <div class="space-y-2">
                            <div v-for="item in order.items" :key="item.uuid"
                                class="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100/70 transition-colors group/item">
                                <div
                                    class="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover/item:border-brand/30 transition-colors shadow-sm">
                                    <Package class="w-5 h-5 text-gray-300 group-hover/item:text-brand/40 transition-colors" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-sm font-semibold text-gray-800 truncate">{{ item.product_name }}</h4>
                                    <div class="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                        <span v-if="item.variant_name" class="text-xs text-gray-500">{{ item.variant_name }}</span>
                                        <span v-if="item.variant_name" class="text-xs text-gray-300">·</span>
                                        <span class="text-xs text-gray-400">{{ item.quantity }} × ${{ item.unit_price }}</span>
                                    </div>
                                </div>
                                <p class="text-sm font-bold text-gray-900 shrink-0">${{ item.subtotal }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Order Footer -->
                    <div class="px-5 sm:px-6 py-3.5 bg-gray-50/70 border-t border-gray-100">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div class="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
                                <MapPin class="w-3.5 h-3.5 shrink-0 text-gray-400" />
                                <span class="truncate">
                                    {{ order.shipping_address.full_name }},
                                    {{ order.shipping_address.address_line_1 }},
                                    {{ order.shipping_address.city }}
                                </span>
                            </div>
                            <div class="flex items-center gap-5 shrink-0">
                                <div v-if="parseFloat(order.discount_amount) > 0" class="text-right">
                                    <p class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Saved</p>
                                    <p class="text-xs font-bold text-emerald-600">-${{ order.discount_amount }}</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Total</p>
                                    <p class="text-lg font-extrabold text-brand">${{ order.total }}</p>
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
            <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 sm:p-16 text-center"
                data-aos="fade-up">
                <div class="max-w-xs mx-auto">
                    <div class="relative w-24 h-24 mx-auto mb-6">
                        <div class="absolute inset-0 bg-brand/10 rounded-3xl rotate-6"></div>
                        <div class="absolute inset-0 bg-brand/5 rounded-3xl -rotate-3"></div>
                        <div
                            class="relative w-24 h-24 bg-white border-2 border-gray-100 rounded-3xl flex items-center justify-center shadow-sm">
                            <ShoppingBag class="w-10 h-10 text-gray-300" />
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
                    <p class="text-sm text-gray-500 mb-8 leading-relaxed">
                        Your order history will appear here once you make your first purchase.
                    </p>
                    <NuxtLink to="/"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-xl hover:bg-brand/90 transition-all font-semibold text-sm group shadow-sm hover:shadow-md hover:shadow-brand/20">
                        Start Shopping
                        <ArrowRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </NuxtLink>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, watch, ref } from 'vue'
    import {
        MapPin, Package, ArrowRight, AlertCircle, RefreshCw,
        ChevronRight, ShoppingBag, Check, XCircle,
    } from 'lucide-vue-next'
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

    const paginationPage = ref(1)

    watch(paginationPage, (newPage) => {
        if (newPage !== currentPage.value) {
            goToPage(newPage)
        }
    })

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

    function getStatusSteps(status: string) {
        const steps = [
            { key: 'pending', label: 'Placed' },
            { key: 'processing', label: 'Processing' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'delivered', label: 'Delivered' },
        ]
        const statusLower = status.toLowerCase()
        const isCompleted = statusLower === 'completed'
        const currentIndex = isCompleted ? steps.length : steps.findIndex(s => s.key === statusLower)
        const activeIndex = currentIndex === -1 ? 0 : currentIndex

        return steps.map((step, i) => ({
            label: step.label,
            done: i < activeIndex || isCompleted,
            current: i === activeIndex && !isCompleted,
        }))
    }

    function getCardAccentClass(status: string): string {
        const map: Record<string, string> = {
            pending: 'border-l-4 border-l-amber-400',
            processing: 'border-l-4 border-l-blue-400',
            shipped: 'border-l-4 border-l-purple-400',
            delivered: 'border-l-4 border-l-emerald-400',
            completed: 'border-l-4 border-l-emerald-400',
            cancelled: 'border-l-4 border-l-red-400',
            refunded: 'border-l-4 border-l-red-400',
        }
        return map[status.toLowerCase()] || 'border-l-4 border-l-gray-300'
    }

    function getStatusDotClass(status: string): string {
        const map: Record<string, string> = {
            pending: 'bg-amber-500',
            processing: 'bg-blue-500',
            shipped: 'bg-purple-500',
            delivered: 'bg-emerald-500',
            completed: 'bg-emerald-500',
            cancelled: 'bg-red-500',
            refunded: 'bg-red-500',
        }
        return map[status.toLowerCase()] || 'bg-gray-400'
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
        @apply inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full leading-none whitespace-nowrap;
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
