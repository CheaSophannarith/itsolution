<template>
	<div class="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
		<div class="p-4 sm:p-5 space-y-3">
			<!-- Breakdown -->
			<div class="space-y-2">
				<div class="flex justify-between text-sm text-gray-600">
					<span>Subtotal</span>
					<span class="font-medium text-gray-900">${{ subtotal.toFixed(2) }}</span>
				</div>
				<div v-if="discountAmount > 0" class="flex justify-between text-sm text-green-600">
					<span>Discount</span>
					<span class="font-semibold">-${{ discountAmount.toFixed(2) }}</span>
				</div>
				<div v-if="shippingAmount > 0" class="flex justify-between text-sm text-gray-600">
					<span>Shipping</span>
					<span class="font-medium text-gray-900">${{ shippingAmount.toFixed(2) }}</span>
				</div>
				<div v-if="taxAmount > 0" class="flex justify-between text-sm text-gray-600">
					<span>Tax</span>
					<span class="font-medium text-gray-900">${{ taxAmount.toFixed(2) }}</span>
				</div>
			</div>
			<!-- Total -->
			<div class="border-t-2 border-gray-100 pt-3 flex justify-between items-center">
				<span class="font-bold text-gray-900">Total</span>
				<div class="flex items-baseline gap-1">
					<span class="text-xs text-gray-400 font-medium uppercase tracking-wider">USD</span>
					<span class="text-xl font-extrabold text-brand tabular-nums">${{ total.toFixed(2) }}</span>
				</div>
			</div>
			<!-- Pay Button -->
			<button @click="emit('place-order')" :disabled="isPlacingOrder || stockWarnings.length > 0"
				class="w-full bg-brand text-white py-3.5 rounded-xl font-bold text-base hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100 flex items-center justify-center gap-2.5">
				<AlertTriangle v-if="stockWarnings.length > 0" class="w-5 h-5" />
				<svg v-else-if="isPlacingOrder" class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<span>{{ isPlacingOrder ? 'Processing...' : stockWarnings.length > 0 ? 'Unavailable items in cart' : 'Proceed to Payment' }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { AlertTriangle } from 'lucide-vue-next'

	defineProps<{
		subtotal: number
		discountAmount: number
		shippingAmount: number
		taxAmount: number
		total: number
		isPlacingOrder: boolean
		stockWarnings: any[]
	}>()

	const emit = defineEmits<{
		'place-order': []
	}>()
</script>