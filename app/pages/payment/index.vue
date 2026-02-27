<template>
	<div class="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50">
		<!-- Header -->
		<header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
				<NuxtLink to="/">
					<img src="/logo.png" alt="TanXLM" class="h-8 sm:h-10 hover:opacity-80 transition-opacity" />
				</NuxtLink>
			</div>
		</header>

		<div class="max-w-lg mx-auto px-4 sm:px-6 py-8 sm:py-12">

			<!-- Loading -->
			<div v-if="isLoading" class="text-center py-16">
				<div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
				<p class="mt-4 text-gray-600">Loading payment details...</p>
			</div>

			<!-- Error -->
			<div v-else-if="error" class="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
				<div class="text-4xl mb-4">❌</div>
				<h2 class="text-2xl font-bold text-red-900 mb-2">Payment Error</h2>
				<p class="text-red-700 mb-6">{{ error }}</p>
				<NuxtLink to="/"
					class="inline-block bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition-all">
					Return to Home
				</NuxtLink>
			</div>

			<!-- Payment Success -->
			<div v-else-if="paymentStatus === 'paid'"
				class="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
				<div class="inline-block p-4 bg-green-100 rounded-full mb-4">
					<svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h1 class="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h1>
				<p class="text-gray-600">Your order has been confirmed. Redirecting...</p>
			</div>

			<!-- QR Payment -->
			<div v-else class="space-y-4">
				<!-- Status card -->
				<div class="bg-white rounded-2xl border-2 border-blue-200 shadow-xl p-6 text-center">
					<div class="inline-block p-4 bg-blue-100 rounded-full mb-3">
						<svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h1 class="text-2xl font-bold text-gray-900 mb-1">Complete Your Payment</h1>
					<p class="text-gray-500 text-sm mb-4">Scan with any Cambodian banking app</p>
					<div
						class="inline-flex items-center gap-2 bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-200">
						<span class="text-sm font-semibold text-gray-600">Amount:</span>
						<span class="text-2xl font-bold text-brand">${{ paymentAmount }}</span>
					</div>
				</div>

				<!-- QR Code -->
				<div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 flex flex-col items-center">
					<h2 class="text-lg font-bold text-gray-900 mb-4">Scan KHQR Code</h2>
					<div class="bg-white p-4 rounded-2xl border-4 border-brand shadow-xl">
						<canvas ref="qrCanvas" class="w-56 h-56"></canvas>
					</div>

					<!-- Supported apps -->
					<div class="mt-4 flex flex-wrap justify-center gap-2">
						<span v-for="app in ['ABA Mobile', 'Wing', 'ACLEDA', 'Canadia']" :key="app"
							class="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
							{{ app }}
						</span>
					</div>
				</div>

				<!-- Timer -->
				<div class="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-center">
					<p class="text-sm text-amber-800 font-semibold">
						⏱ Time Remaining: <span class="font-mono text-lg">{{ formatTime(timeRemaining) }}</span>
					</p>
					<p class="text-xs text-amber-700 mt-1">Please complete payment within the time limit</p>
				</div>

				<!-- Connection status indicator -->
				<div v-if="isConnected" class="flex items-center justify-center gap-2 text-green-600 text-sm">
					<div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
					<span>Listening for payment confirmation...</span>
				</div>
				<div v-else-if="isPolling" class="flex items-center justify-center gap-2 text-blue-600 text-sm">
					<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
					<span>Checking payment status...</span>
				</div>

				<!-- Cancel -->
				<div class="text-center">
					<button @click="cancelPayment"
						class="text-gray-500 hover:text-gray-800 text-sm font-medium underline transition-colors">
						Cancel Payment
					</button>
				</div>
			</div>
		</div>

		<ToastContainer />
	</div>
</template>

<script setup lang="ts">
	import QRCode from 'qrcode'
	import type { PaymentStatusResponse } from '~/types/models/checkout'

	definePageMeta({
		layout: false,
		middleware: 'auth'
	})

	const router = useRouter()
	const route = useRoute()
	const api = useApi()

	const isLoading = ref(true)
	const error = ref('')
	const paymentAmount = ref('0.00')
	const paymentStatus = ref('pending')
	const isPolling = ref(false)
	const timeRemaining = ref(900)
	const qrCanvas = ref<HTMLCanvasElement | null>(null)

	let pollInterval: ReturnType<typeof setInterval> | null = null
	let timerInterval: ReturnType<typeof setInterval> | null = null
	const FALLBACK_POLL_INTERVAL = 3000

	const paymentUuid = route.query.payment_uuid as string

	// WebSocket listener — primary mechanism
	const { isConnected } = usePaymentChannel({
		paymentUuid,
		onStatusUpdate: (event) => {
			paymentStatus.value = event.status

			if (event.status === 'completed' || event.status === 'paid') {
				clearIntervals()
				setTimeout(() => router.push('/orders'), 2000)
			} else if (event.status === 'failed') {
				clearIntervals()
				error.value = 'Payment has expired or failed. Please create a new order.'
			}
		},
		onError: () => {
			startFallbackPolling()
		},
	})

	// Stop fallback polling when WebSocket reconnects
	watch(isConnected, (connected) => {
		if (connected && pollInterval) {
			clearInterval(pollInterval)
			pollInterval = null
		}
	})

	onMounted(async () => {
		if (!paymentUuid) {
			error.value = 'Invalid payment details. Please try again.'
			isLoading.value = false
			return
		}

		await loadPaymentStatus()
		isLoading.value = false

		startTimer()
	})

	onUnmounted(() => {
		clearIntervals()
	})

	async function loadPaymentStatus() {
		try {
			const response = await api.get<PaymentStatusResponse>(`/api/v1/payments/${paymentUuid}/status`)
			const { payment, status } = response.data

			paymentStatus.value = status
			paymentAmount.value = parseFloat(payment.amount).toFixed(2)

			if (payment.qr_string && qrCanvas.value) {
				await QRCode.toCanvas(qrCanvas.value, payment.qr_string, {
					width: 224,
					margin: 1,
					color: { dark: '#000000', light: '#ffffff' }
				})
			}
		} catch (err: any) {
			error.value = err?.message || 'Failed to load payment details.'
		}
	}

	async function pollStatus() {
		if (isPolling.value) return
		isPolling.value = true
		try {
			const response = await api.get<PaymentStatusResponse>(`/api/v1/payments/${paymentUuid}/status`)
			const { status } = response.data

			paymentStatus.value = status

			if (status === 'paid' || status === 'completed') {
				clearIntervals()
				setTimeout(() => router.push('/orders'), 2000)
			}
		} catch {
			// silently ignore polling errors
		} finally {
			isPolling.value = false
		}
	}

	function startFallbackPolling() {
		if (!pollInterval) {
			pollStatus()
			pollInterval = setInterval(pollStatus, FALLBACK_POLL_INTERVAL)
		}
	}

	function startTimer() {
		timerInterval = setInterval(() => {
			timeRemaining.value--
			if (timeRemaining.value <= 0) {
				clearIntervals()
				error.value = 'Payment time expired. Please create a new order.'
			}
		}, 1000)
	}

	function clearIntervals() {
		if (pollInterval) clearInterval(pollInterval)
		if (timerInterval) clearInterval(timerInterval)
	}

	function formatTime(seconds: number): string {
		const m = Math.floor(seconds / 60).toString().padStart(2, '0')
		const s = (seconds % 60).toString().padStart(2, '0')
		return `${m}:${s}`
	}

	function cancelPayment() {
		if (confirm('Are you sure you want to cancel this payment?')) {
			clearIntervals()
			router.push('/')
		}
	}
</script>
