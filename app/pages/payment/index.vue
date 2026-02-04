<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <!-- Header -->
        <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex items-center justify-center">
                    <NuxtLink to="/">
                        <img src="/logo.png" alt="TanXLM" class="h-8 sm:h-10 hover:opacity-80 transition-opacity" />
                    </NuxtLink>
                </div>
            </div>
        </header>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
                <p class="mt-4 text-gray-600">Loading payment details...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 text-center">
                <div class="text-4xl mb-4">❌</div>
                <h2 class="text-2xl font-bold text-red-900 mb-2">Payment Error</h2>
                <p class="text-red-700 mb-6">{{ error }}</p>
                <NuxtLink to="/" class="inline-block bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition-all">
                    Return to Home
                </NuxtLink>
            </div>

            <!-- Payment Content -->
            <div v-else class="space-y-6">
                <!-- Payment Status Card -->
                <div class="bg-white rounded-2xl border-2 border-blue-200 shadow-xl p-6 sm:p-8 text-center">
                    <div class="mb-4">
                        <div v-if="paymentStatus === 'pending'" class="inline-block p-4 bg-blue-100 rounded-full mb-3">
                            <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div v-else-if="paymentStatus === 'completed'" class="inline-block p-4 bg-green-100 rounded-full mb-3">
                            <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>

                    <h1 v-if="paymentStatus === 'pending'" class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
                    <h1 v-else-if="paymentStatus === 'completed'" class="text-2xl sm:text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>

                    <p v-if="paymentStatus === 'pending'" class="text-gray-600 mb-6">
                        Scan the QR code below with your banking app to complete the payment
                    </p>
                    <p v-else-if="paymentStatus === 'completed'" class="text-gray-600 mb-6">
                        Your order has been confirmed. Redirecting...
                    </p>

                    <div class="inline-flex items-center justify-center gap-3 bg-gray-50 px-6 py-3 rounded-xl border border-gray-200">
                        <span class="text-sm font-semibold text-gray-700">Amount to Pay:</span>
                        <span class="text-2xl font-bold text-brand">${{ orderAmount }}</span>
                    </div>
                </div>

                <!-- KHQR QR Code Card -->
                <div v-if="paymentStatus === 'pending'" class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-8">
                    <div class="text-center mb-6">
                        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Scan KHQR Code</h2>
                        <p class="text-sm text-gray-600">Use any Cambodian banking app (ABA, Wing, ACLEDA, etc.)</p>
                    </div>

                    <!-- QR Code Display -->
                    <div class="flex justify-center mb-6">
                        <div class="bg-white p-6 rounded-2xl border-4 border-brand shadow-xl">
                            <!-- Placeholder for QR Code - Replace with actual QR code generator -->
                            <div v-if="qrCodeData" class="w-64 h-64 flex items-center justify-center">
                                <img :src="qrCodeData" alt="KHQR Code" class="w-full h-full" />
                            </div>
                            <div v-else class="w-64 h-64 bg-gray-100 flex items-center justify-center">
                                <div class="text-center">
                                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand mb-2"></div>
                                    <p class="text-sm text-gray-600">Generating QR Code...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Banking Apps -->
                    <div class="mb-6">
                        <p class="text-sm font-semibold text-gray-700 text-center mb-3">Supported Banking Apps</p>
                        <div class="flex flex-wrap justify-center gap-3">
                            <span class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">ABA Mobile</span>
                            <span class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">Wing</span>
                            <span class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">ACLEDA</span>
                            <span class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">Canadia</span>
                        </div>
                    </div>

                    <!-- Timer -->
                    <div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-center">
                        <p class="text-sm text-amber-800">
                            <span class="font-bold">⏱️ Time Remaining:</span>
                            <span class="font-mono text-lg">{{ formatTime(timeRemaining) }}</span>
                        </p>
                        <p class="text-xs text-amber-700 mt-1">Please complete payment within the time limit</p>
                    </div>

                    <!-- Payment Instructions -->
                    <div class="mt-6 space-y-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p class="text-sm font-bold text-gray-900">Payment Steps:</p>
                        <ol class="text-sm text-gray-700 space-y-2 pl-5 list-decimal">
                            <li>Open your banking app</li>
                            <li>Select "Scan QR" or "KHQR"</li>
                            <li>Scan the QR code above</li>
                            <li>Verify the amount (${{ orderAmount }})</li>
                            <li>Confirm the payment</li>
                        </ol>
                    </div>

                    <!-- Checking Payment Status -->
                    <div v-if="isCheckingPayment" class="mt-6 flex items-center justify-center gap-3 text-blue-600">
                        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span class="text-sm font-medium">Checking payment status...</span>
                    </div>
                </div>

                <!-- Cancel Button -->
                <div v-if="paymentStatus === 'pending'" class="text-center">
                    <button @click="cancelPayment" class="text-gray-600 hover:text-gray-900 font-medium text-sm underline transition-colors">
                        Cancel Payment
                    </button>
                </div>
            </div>
        </div>

        <!-- Toast Notifications -->
        <ToastContainer />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
    layout: false,
    middleware: 'auth'
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const config = useRuntimeConfig()

// State
const isLoading = ref(true)
const error = ref('')
const orderId = ref('')
const orderAmount = ref('0.00')
const qrCodeData = ref('')
const paymentStatus = ref<'pending' | 'completed' | 'failed'>('pending')
const isCheckingPayment = ref(false)
const timeRemaining = ref(900) // 15 minutes in seconds

let paymentCheckInterval: NodeJS.Timeout | null = null
let timerInterval: NodeJS.Timeout | null = null

onMounted(async () => {
    // Get order details from query params
    orderId.value = route.query.order_id as string
    orderAmount.value = route.query.amount as string

    if (!orderId.value || !orderAmount.value) {
        error.value = 'Invalid payment details. Please try again.'
        isLoading.value = false
        return
    }

    try {
        // Fetch KHQR code from backend
        const response = await $fetch<any>(
            `${config.public.apiBaseUrl}/api/v1/orders/${orderId.value}/payment/khqr`,
            {
                headers: {
                    'Authorization': `Bearer ${authStore.token}`
                }
            }
        )

        qrCodeData.value = response.data.qr_code_url || response.data.qr_code

        // Start checking payment status
        startPaymentStatusCheck()

        // Start countdown timer
        startTimer()

        isLoading.value = false
    } catch (err: any) {
        console.error('Failed to load payment details:', err)
        error.value = err.message || 'Failed to load payment details. Please try again.'
        isLoading.value = false
    }
})

onUnmounted(() => {
    // Clean up intervals
    if (paymentCheckInterval) {
        clearInterval(paymentCheckInterval)
    }
    if (timerInterval) {
        clearInterval(timerInterval)
    }
})

function startPaymentStatusCheck() {
    // Check payment status every 3 seconds
    paymentCheckInterval = setInterval(async () => {
        isCheckingPayment.value = true
        try {
            const response = await $fetch<any>(
                `${config.public.apiBaseUrl}/api/v1/orders/${orderId.value}/payment/status`,
                {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`
                    }
                }
            )

            if (response.data.status === 'completed' || response.data.status === 'paid') {
                paymentStatus.value = 'completed'

                // Stop checking
                if (paymentCheckInterval) {
                    clearInterval(paymentCheckInterval)
                }
                if (timerInterval) {
                    clearInterval(timerInterval)
                }

                // Redirect to order confirmation after 2 seconds
                setTimeout(() => {
                    router.push(`/orders`)
                }, 2000)
            }
        } catch (err) {
            console.error('Failed to check payment status:', err)
        } finally {
            isCheckingPayment.value = false
        }
    }, 3000)
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining.value--

        if (timeRemaining.value <= 0) {
            // Time expired
            if (timerInterval) {
                clearInterval(timerInterval)
            }
            if (paymentCheckInterval) {
                clearInterval(paymentCheckInterval)
            }
            error.value = 'Payment time expired. Please create a new order.'
        }
    }, 1000)
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function cancelPayment() {
    if (confirm('Are you sure you want to cancel this payment?')) {
        router.push('/')
    }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
