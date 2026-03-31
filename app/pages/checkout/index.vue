<template>
	<div class="min-h-screen bg-gray-50 flex flex-col">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">

			<CheckoutPageHeader />

			<!-- Full-page skeleton while fetching -->
			<CheckoutSkeleton v-if="isPageLoading" />

			<!-- Real content once everything is loaded -->
			<div v-else class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">

				<!-- Left Column: Items -->
				<CheckoutItemList
					:items="previewItems"
					:total-items="totalItems"
					:stock-warnings="stockWarnings"
				/>

				<!-- Right Column: Form + Pay -->
				<div class="lg:col-span-5">
					<div class="lg:sticky lg:top-6 space-y-4">

						<CheckoutShippingAddress
							v-model="selectedAddress"
							:addresses="addresses"
							:is-submitting="isSubmittingAddress"
							@create-address="handleCreateAddress"
						/>

						<CheckoutPaymentMethod />

						<CheckoutOrderSummary
							:subtotal="subtotal"
							:discount-amount="discountAmount"
							:shipping-amount="shippingAmount"
							:tax-amount="taxAmount"
							:total="total"
							:is-placing-order="isPlacingOrder"
							:stock-warnings="stockWarnings"
							@place-order="placeOrder"
						/>

					</div>
				</div>
			</div>
		</div>

		<CheckoutPaymentDialog
			v-model:open="showPaymentDialog"
			:payment="payment"
		/>

		<ToastContainer />
	</div>
</template>

<script setup lang="ts">
	import { computed, ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
	import { useRouter } from 'vue-router'
	import { useAuthStore } from '~/stores/auth'
	import { useCartStore } from '~/stores/cart'
	import type { Address, AddressFormData } from '~/types/address'

	definePageMeta({
		pageTransition: {
			name: 'scale',
			mode: 'out-in'
		}
	})

	useSeoMeta({ title: 'Checkout', robots: 'noindex, nofollow' })

	const router = useRouter()
	const authStore = useAuthStore()
	const cartStore = useCartStore()

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
	const { addresses, isLoading: isLoadingAddresses, isSubmitting: isSubmittingAddress, fetchAddresses, createAddress } = useAddresses()
	const selectedAddress = ref<Address | null>(null)

	const isPageLoading = computed(() => isLoadingAddresses.value || isLoadingPreview.value)

	onMounted(async () => {
		if (!authStore.isAuthenticated) {
			router.push('/login')
			return
		}

		await Promise.all([fetchAddresses(), fetchPreview()])

		const defaultAddress = addresses.value.find(addr => addr.is_default && addr.type === 'shipping')
		if (defaultAddress) {
			selectedAddress.value = defaultAddress
		} else {
			const firstShipping = addresses.value.find(a => a.type === 'shipping')
			if (firstShipping) selectedAddress.value = firstShipping
		}
	})

	async function handleCreateAddress(form: AddressFormData, onSuccess: (created: Address) => void) {
		try {
			const hasNoShippingAddresses = addresses.value.filter(a => a.type === 'shipping').length === 0
			if (hasNoShippingAddresses) form.is_default = true
			const created = await createAddress(form)
			onSuccess(created)
		} catch {
			// Error already handled by composable toast
		}
	}

	const { isPlacingOrder, error: orderError, payment, placeOrder: submitOrder } = useCheckout()
	const showPaymentDialog = ref(false)

	let pollInterval: ReturnType<typeof setInterval> | null = null
	let paymentChannelDisconnect: (() => void) | null = null
	const FALLBACK_POLL_INTERVAL = 3000

	async function placeOrder() {
		if (!selectedAddress.value) {
			alert('Please select a shipping address.')
			return
		}
		await submitOrder(selectedAddress.value.uuid)
		if (orderError.value) {
			alert(orderError.value)
			return
		}
		showPaymentDialog.value = true
		startPaymentListener()
	}

	function startPaymentListener() {
		if (!payment.value?.uuid) return

		const echo = useEcho()
		let errorFired = false

		try {
			const channel = echo.private(`payment.${payment.value.uuid}`)

			channel.listen('.payment.status.updated', (event: any) => {
				if (event.status === 'paid' || event.status === 'completed') {
					if (pollInterval) clearInterval(pollInterval)
					cartStore.clearCart()
					showPaymentDialog.value = false
					router.push('/orders')
				} else if (event.status === 'failed') {
					if (pollInterval) clearInterval(pollInterval)
					showPaymentDialog.value = false
					alert('Payment has expired or failed. Please try again.')
				}
			})

			channel.error(() => {
				if (!errorFired) {
					errorFired = true
					startFallbackPolling()
				}
			})

			const unsubscribeConnection = echo.connector.onConnectionChange((status: string) => {
				if (status === 'failed' && !errorFired) {
					errorFired = true
					startFallbackPolling()
				}
			})

			if (echo.connector.connectionStatus() === 'failed' && !errorFired) {
				errorFired = true
				startFallbackPolling()
			}

			paymentChannelDisconnect = () => {
				unsubscribeConnection()
				echo.leave(`payment.${payment.value!.uuid}`)
			}
		} catch {
			startFallbackPolling()
		}
	}

	function startFallbackPolling() {
		if (!payment.value?.uuid || pollInterval) return

		const doPoll = async () => {
			try {
				const api = useApi()
				const res = await api.get<any>(`/api/v1/payments/${payment.value!.uuid}/status`)
				const status = res.data.status
				if (status === 'paid' || status === 'completed') {
					if (pollInterval) clearInterval(pollInterval)
					pollInterval = null
					cartStore.clearCart()
					showPaymentDialog.value = false
					router.push('/orders')
				}
			} catch { /* silent */ }
		}

		doPoll()
		pollInterval = setInterval(doPoll, FALLBACK_POLL_INTERVAL)
	}

	onUnmounted(() => {
		if (pollInterval) clearInterval(pollInterval)
		if (paymentChannelDisconnect) paymentChannelDisconnect()
	})

	onBeforeUnmount(() => {
		// nothing extra needed here
	})
</script>