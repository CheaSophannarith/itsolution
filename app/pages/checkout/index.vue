<template>
    <div class="min-h-screen bg-white">
        <!-- User-Friendly Checkout Header -->
        <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex items-center justify-between">
                    <!-- Back Button -->
                    <NuxtLink to="/" class="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors group">
                        <ChevronRight class="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        <span class="text-sm font-medium hidden sm:inline">Continue Shopping</span>
                        <span class="text-sm font-medium sm:hidden">Back</span>
                    </NuxtLink>

                    <!-- Logo -->
                    <NuxtLink to="/" class="absolute left-1/2 -translate-x-1/2">
                        <img src="/logo.png" alt="TanXLM" class="h-8 sm:h-10 hover:opacity-80 transition-opacity" />
                    </NuxtLink>

                </div>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <!-- Title Row -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <div>
                    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{{ isBuyNowMode ? 'Quick Checkout' : 'Complete Your Order' }}</h1>
                </div>
            </div>

            <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8">
                <!-- Left Column - Checkout Form -->
                <div class="order-2 lg:order-1 lg:col-span-7">
                    <div class="space-y-6">
                        <!-- Shipping Address Section -->
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white text-sm font-bold shrink-0">1</span>
                                <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Shipping Address</h2>
                            </div>

                            <!-- Saved Address Display or Selector -->
                            <div v-if="!useManualAddress && (selectedAddress || addresses.length > 0)" class="mb-4">
                                <!-- Selected Address Display -->
                                <div v-if="selectedAddress && !showAddressSelector"
                                    class="border-2 border-brand bg-brand/5 rounded-xl p-4">
                                    <div class="flex items-start justify-between mb-2">
                                        <div class="flex items-center gap-2">
                                            <MapPin class="w-5 h-5 text-brand" />
                                            <span class="font-semibold text-gray-900">{{ selectedAddress.full_name }}</span>
                                            <span v-if="selectedAddress.is_default"
                                                class="px-2 py-0.5 bg-brand text-white text-xs font-medium rounded">
                                                Default
                                            </span>
                                        </div>
                                        <button @click="showAddressSelector = true" type="button"
                                            class="text-brand hover:text-brand/80 text-sm font-medium flex items-center gap-1">
                                            <Edit2 class="w-4 h-4" />
                                            Change
                                        </button>
                                    </div>
                                    <p class="text-sm text-gray-700 ml-7">{{ selectedAddress.formatted_address }}</p>
                                    <button @click="useNewAddress" type="button"
                                        class="mt-3 ml-7 text-sm text-brand hover:text-brand/80 font-medium flex items-center gap-1">
                                        <Plus class="w-4 h-4" />
                                        Use a different address
                                    </button>
                                </div>

                                <!-- Address Selector -->
                                <div v-if="showAddressSelector || (!selectedAddress && addresses.length > 0)"
                                    class="space-y-3">
                                    <p class="text-sm font-medium text-gray-700">Select a saved address:</p>
                                    <div class="space-y-2 max-h-60 overflow-y-auto">
                                        <button v-for="address in addresses.filter(a => a.type === 'shipping')"
                                            :key="address.uuid" @click="selectAddress(address)" type="button"
                                            class="w-full text-left border-2 rounded-xl p-3 hover:border-brand hover:bg-brand/5 transition-all"
                                            :class="selectedAddress?.uuid === address.uuid ? 'border-brand bg-brand/5' : 'border-gray-200'">
                                            <div class="flex items-center gap-2 mb-1">
                                                <span class="font-semibold text-gray-900">{{ address.full_name }}</span>
                                                <span v-if="address.is_default"
                                                    class="px-2 py-0.5 bg-brand text-white text-xs font-medium rounded">
                                                    Default
                                                </span>
                                            </div>
                                            <p class="text-sm text-gray-600">{{ address.formatted_address }}</p>
                                        </button>
                                    </div>
                                    <div class="flex gap-3 pt-2">
                                        <button @click="useNewAddress" type="button"
                                            class="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                                            <Plus class="w-4 h-4" />
                                            Add New Address
                                        </button>
                                        <button @click="navigateToProfile" type="button"
                                            class="flex-1 px-4 py-2 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors font-medium">
                                            Manage Addresses
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Manual Address Form -->
                            <div v-if="useManualAddress || !selectedAddress">
                                <div v-if="useManualAddress" class="mb-4">
                                    <button @click="() => { useManualAddress = false; showAddressSelector = true }" type="button"
                                        class="text-sm text-brand hover:text-brand/80 font-medium flex items-center gap-1">
                                        <ChevronRight class="w-4 h-4 rotate-180" />
                                        Back to saved addresses
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 mb-4">*Indicates required field</p>
                                <div class="space-y-4">
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label for="firstName"
                                                class="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                                            <input id="firstName" v-model="form.firstName" type="text"
                                                class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
                                        </div>
                                        <div>
                                            <label for="lastName"
                                                class="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                                            <input id="lastName" v-model="form.lastName" type="text"
                                                class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
                                        </div>
                                    </div>
                                    <div class="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                                        <div class="sm:col-span-2">
                                            <label for="address"
                                                class="block text-sm font-semibold text-gray-700 mb-2">Street Address *</label>
                                            <input id="address" v-model="form.address" type="text"
                                                placeholder="Street or P.O. Box"
                                                class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for="address2"
                                                class="block text-sm font-semibold text-gray-700 mb-2">Apartment, Suite, Floor (Optional)</label>
                                            <input id="address2" v-model="form.address2" type="text"
                                                placeholder="Leave blank if P.O. Box in Address 1"
                                                class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label for="city"
                                                class="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                                            <input id="city" v-model="form.city" type="text"
                                                class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
                                        </div>
                                        <div>
                                            <label for="province"
                                                class="block text-sm font-semibold text-gray-700 mb-2">Province *</label>
                                            <select id="province" v-model="form.province"
                                                class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-white transition-all duration-200 hover:border-gray-300 cursor-pointer">
                                                <option value="" class="text-gray-500">Select Province...</option>
                                            <option value="Phnom Penh">Phnom Penh</option>
                                            <option value="Siem Reap">Siem Reap</option>
                                            <option value="Battambang">Battambang</option>
                                            <option value="Sihanoukville">Sihanoukville</option>
                                            <option value="Kampong Cham">Kampong Cham</option>
                                            <option value="Kampong Speu">Kampong Speu</option>
                                            <option value="Kampot">Kampot</option>
                                            <option value="Kandal">Kandal</option>
                                            <option value="Kep">Kep</option>
                                            <option value="Koh Kong">Koh Kong</option>
                                            <option value="Kratié">Kratié</option>
                                            <option value="Mondulkiri">Mondulkiri</option>
                                            <option value="Oddar Meanchey">Oddar Meanchey</option>
                                            <option value="Pailin">Pailin</option>
                                            <option value="Preah Vihear">Preah Vihear</option>
                                            <option value="Prey Veng">Prey Veng</option>
                                            <option value="Pursat">Pursat</option>
                                            <option value="Ratanakiri">Ratanakiri</option>
                                            <option value="Stung Treng">Stung Treng</option>
                                            <option value="Svay Rieng">Svay Rieng</option>
                                            <option value="Takéo">Takéo</option>
                                            <option value="Banteay Meanchey">Banteay Meanchey</option>
                                            <option value="Kampong Chhnang">Kampong Chhnang</option>
                                            <option value="Kampong Thom">Kampong Thom</option>
                                            <option value="Preah Sihanouk">Preah Sihanouk</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Payment Section -->
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white text-sm font-bold shrink-0">2</span>
                                <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Payment Method</h2>
                            </div>

                            <div>
                                <div class="space-y-4">
                                    <!-- Payment Method Display -->
                                    <div class="space-y-3">
                                        <label class="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>

                                        <!-- KHQR Option (Selected by default) -->
                                        <div
                                            class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border-2 rounded-2xl border-brand bg-brand/5 shadow-lg">
                                            <div class="flex-1 min-w-0">
                                                <div class="font-bold text-gray-900 text-base sm:text-lg">KHQR Payment</div>
                                                <div class="text-sm sm:text-base text-gray-600 mt-1">Pay with any Cambodian banking app (ABA, Wing, ACLEDA, etc.)</div>
                                            </div>
                                            <div class="text-3xl sm:text-4xl">🇰🇭</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Place Order Button -->
                        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                            <button @click="placeOrder"
                                :disabled="isPlacingOrder"
                                class="w-full bg-brand text-white px-6 py-1 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100">
                                <span class="flex items-center justify-center gap-3">
                                    <ShoppingCart v-if="!isPlacingOrder" class="w-5 h-5 sm:w-6 sm:h-6" />
                                    <svg v-else class="animate-spin h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ isPlacingOrder ? 'Processing...' : `Proceed to Payment - $${total.toFixed(2)}` }}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Summary -->
                <div class="order-1 lg:order-2 lg:col-span-5 mb-6 lg:mb-0">
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-4 sm:p-6 lg:sticky lg:top-6">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>

                        <!-- Loading Preview -->
                        <div v-if="isLoadingPreview" class="py-4 text-center text-sm text-gray-500">
                            <div class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-brand mb-2"></div>
                            <p>Loading order summary...</p>
                        </div>

                        <template v-else>
                            <!-- Stock Warnings -->
                            <div v-if="stockWarnings.length > 0" class="mb-3 space-y-1">
                                <p v-for="warning in stockWarnings" :key="warning"
                                    class="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                    ⚠️ {{ warning }}
                                </p>
                            </div>

                            <!-- Totals -->
                            <div class="space-y-2 py-4 border-t border-gray-200">
                                <div class="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
                                </div>
                                <div v-if="discountAmount > 0" class="flex justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span class="font-medium">-${{ discountAmount.toFixed(2) }}</span>
                                </div>
                                <div v-if="shippingAmount > 0" class="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span class="font-medium">${{ shippingAmount.toFixed(2) }}</span>
                                </div>
                                <div v-if="taxAmount > 0" class="flex justify-between text-sm">
                                    <span>Tax</span>
                                    <span class="font-medium">${{ taxAmount.toFixed(2) }}</span>
                                </div>
                            </div>

                            <div class="flex justify-between py-4 border-t border-gray-200">
                                <span class="font-bold">Total</span>
                                <span class="font-bold">${{ total.toFixed(2) }}</span>
                            </div>

                            <!-- Items -->
                            <div class="border-t-2 border-gray-200 pt-4">
                                <h3 class="font-bold text-lg sm:text-xl text-gray-900 mb-4 flex items-center gap-3">
                                    <ShoppingCart class="w-5 h-5 sm:w-6 sm:h-6" />
                                    Items ({{ totalItems }} {{ totalItems === 1 ? 'Item' : 'Items' }})
                                </h3>
                                <div class="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto custom-scrollbar">
                                    <div v-for="item in previewItems" :key="item.uuid"
                                        class="flex gap-3 p-3 rounded-2xl border-2 border-gray-100 bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                                        <div class="flex-1 min-w-0">
                                            <div class="flex justify-between items-start mb-1">
                                                <div class="font-bold text-sm sm:text-base text-gray-900 line-clamp-2 pr-2">{{ item.product_name }}</div>
                                                <div class="font-bold text-sm sm:text-lg text-brand ml-2 shrink-0">${{ parseFloat(item.line_total).toFixed(2) }}</div>
                                            </div>
                                            <div class="text-xs sm:text-sm text-gray-500 space-y-1">
                                                <p v-if="item.variant_name" class="text-gray-600 font-medium">{{ item.variant_name }}</p>
                                                <p>Qty: {{ item.quantity }} × ${{ parseFloat(item.unit_price).toFixed(2) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Professional Checkout Footer -->
        <footer class="bg-white border-t border-gray-200 mt-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <!-- Footer Links -->
                <div class="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 mb-4">
                    <NuxtLink to="/terms-and-conditions" class="hover:text-brand transition-colors">Terms & Conditions</NuxtLink>
                    <span class="text-gray-300">|</span>
                    <NuxtLink to="/privacy-policy" class="hover:text-brand transition-colors">Privacy Policy</NuxtLink>
                    <span class="text-gray-300">|</span>
                    <NuxtLink to="/contact" class="hover:text-brand transition-colors">Contact Support</NuxtLink>
                </div>

                <!-- Copyright -->
                <div class="text-center text-sm text-gray-500">
                    © {{ new Date().getFullYear() }} TanXLM. All rights reserved.
                </div>
            </div>
        </footer>

        <!-- Toast Notifications -->
        <ToastContainer />
    </div>
</template>

<script setup lang="ts">
    import { ChevronRight, ShoppingCart, MapPin, Plus, Edit2 } from 'lucide-vue-next'
    import { computed, ref, onMounted, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useCartStore } from '~/stores/cart'
    import { useAuthStore } from '~/stores/auth'
    import type { CartItem } from '~/types'
    import type { Address } from '~/types/address'

    // Disable default layout and add custom transition
    definePageMeta({
        layout: false,
        pageTransition: {
            name: 'scale',
            mode: 'out-in'
        }
    })

    const router = useRouter()
    const route = useRoute()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const config = useRuntimeConfig()

    // Checkout preview
    const {
        items: previewItems,
        totalItems,
        subtotal,
        discountAmount,
        shippingAmount,
        taxAmount,
        total,
        stockWarnings,
        isLoading: isLoadingPreview,
        fetchPreview,
    } = useCheckoutPreview()

    // Address management
    const { addresses, isLoading: isLoadingAddresses, fetchAddresses } = useAddresses()
    const selectedAddress = ref<Address | null>(null)
    const showAddressSelector = ref(false)
    const useManualAddress = ref(false)

    // Buy Now mode
    const isBuyNowMode = computed(() => route.query.buyNow === 'true')
    const buyNowSku = ref<string>('')
    const buyNowQty = ref<number>(1)
    const buyNowItem = ref<CartItem | null>(null)
    const buyNowLoading = ref(false)

    // Check authentication on mount
    onMounted(async () => {
        if (!authStore.isAuthenticated) {
            router.push('/login')
            return
        }

        // Fetch addresses and preview in parallel
        await Promise.all([fetchAddresses(), fetchPreview()])

        // Set default address if available
        const defaultAddress = addresses.value.find(addr => addr.is_default && addr.type === 'shipping')
        if (defaultAddress) {
            selectedAddress.value = defaultAddress
            populateFormWithAddress(defaultAddress)
        }

        // Handle Buy Now mode - fetch product details directly (does NOT use cart)
        if (isBuyNowMode.value) {
            buyNowLoading.value = true
            try {
                const slug = route.query.slug as string
                buyNowSku.value = route.query.sku as string
                buyNowQty.value = parseInt(route.query.qty as string) || 1

                // Fetch product details
                const res = await $fetch<any>(
                    `${config.public.apiBaseUrl}/api/v1/products/${slug}`
                )
                const product = res.data
                const sku = product.skus.find((s: any) => s.uuid === buyNowSku.value)

                if (!sku) {
                    console.error('SKU not found')
                    router.push('/')
                    return
                }

                // Create a mock cart item for display (not actually in cart)
                buyNowItem.value = {
                    uuid: 'buy-now-temp',
                    quantity: buyNowQty.value,
                    line_total: (parseFloat(sku.price) * buyNowQty.value).toFixed(2),
                    sku: {
                        uuid: sku.uuid,
                        sku: sku.sku,
                        name: sku.name,
                        price: sku.price,
                        compare_at_price: sku.compare_at_price,
                        is_in_stock: sku.is_in_stock,
                        stock_quantity: sku.stock_quantity,
                        attribute_options: sku.attribute_options,
                        product: {
                            uuid: product.uuid,
                            name: product.name,
                            slug: product.slug,
                            image: product.images.featured.thumb
                        }
                    },
                    added_at: new Date().toISOString()
                }
            } catch (error) {
                console.error('Failed to fetch product for Buy Now:', error)
                router.push('/')
            } finally {
                buyNowLoading.value = false
            }
        }
    })

    // Helper functions for address management
    function populateFormWithAddress(address: Address) {
        form.value.firstName = address.first_name
        form.value.lastName = address.last_name
        form.value.address = address.address_line_1
        form.value.address2 = address.address_line_2 || ''
        form.value.city = address.city
        form.value.province = address.state || ''
    }

    function selectAddress(address: Address) {
        selectedAddress.value = address
        populateFormWithAddress(address)
        showAddressSelector.value = false
        useManualAddress.value = false
    }

    function useNewAddress() {
        selectedAddress.value = null
        useManualAddress.value = true
        showAddressSelector.value = false
        // Clear form
        form.value.firstName = ''
        form.value.lastName = ''
        form.value.address = ''
        form.value.address2 = ''
        form.value.city = ''
        form.value.province = ''
    }

    function navigateToProfile() {
        router.push('/profile')
    }

    // Form data
    const form = ref({
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        city: '',
        province: '',
        paymentMethod: 'khqr' // Default to KHQR
    })

    // Loading state for order placement
    const isPlacingOrder = ref(false)

    async function placeOrder() {
        if (isPlacingOrder.value) return

        try {
            isPlacingOrder.value = true

            // Prepare order data
            const orderData = {
                shipping_address: {
                    first_name: form.value.firstName,
                    last_name: form.value.lastName,
                    address: form.value.address,
                    address2: form.value.address2,
                    city: form.value.city,
                    province: form.value.province
                },
                payment_method: 'khqr',
                items: isBuyNowMode.value && buyNowItem.value
                    ? [{
                        sku_uuid: buyNowItem.value.sku.uuid,
                        quantity: buyNowItem.value.quantity,
                        price: buyNowItem.value.sku.price
                    }]
                    : cartStore.items.map(item => ({
                        sku_uuid: item.sku.uuid,
                        quantity: item.quantity,
                        price: item.sku.price
                    })),
                subtotal: subtotal.value,
                total: total.value
            }

            // Create order via API
            const response = await $fetch<any>(
                `${config.public.apiBaseUrl}/api/v1/orders`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authStore.token}`
                    },
                    body: JSON.stringify(orderData)
                }
            )

            // Navigate to payment page with order details
            router.push({
                path: '/payment',
                query: {
                    order_id: response.data.uuid || response.data.id,
                    amount: total.value.toFixed(2)
                }
            })

            // Only clear cart after successful order creation (not in Buy Now mode)
            if (!isBuyNowMode.value) {
                cartStore.clearCart()
            }

        } catch (error: any) {
            console.error('Failed to create order:', error)
            alert(error.message || 'Failed to create order. Please try again.')
        } finally {
            isPlacingOrder.value = false
        }
    }
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Line clamp utility */
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Mobile first responsive adjustments */
@media (max-width: 640px) {
    .sticky {
        position: static;
    }
}

/* Ensure proper spacing on very small screens */
@media (max-width: 360px) {
    .px-4 {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }
    
    .gap-4 {
        gap: 0.75rem;
    }
}
</style>
