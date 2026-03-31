<template>
	<Dialog :open="open" @update:open="emit('update:open', $event)">
		<DialogContent :show-close-button="false"
			class="p-0 overflow-hidden w-75 rounded-2xl border-0 shadow-[0_0_16px_rgba(0,0,0,0.10)]">
			<!-- Card body -->
			<div class="bg-[#FFFFFF] flex flex-col" style="height: 435px;">
				<!-- Red Header -->
				<div class="shrink-0 flex items-center justify-center"
					style="background-color: #E1232E; height: 52px;">
					<img src="/KHQR Logo.png" alt="KHQR" class="h-6 object-contain brightness-0 invert" />
				</div>
				<!-- Merchant name + amount -->
				<div style="padding: 35px 44px 16px 44px;">
					<p class="text-xs font-medium" style="color: #000000; opacity: 0.5;">TanXLM</p>
					<p class="text-2xl font-bold mt-1" style="color: #000000;">
						$ {{ payment ? parseFloat(payment.amount).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00' }}
					</p>
				</div>
				<!-- Dashed divider -->
				<div style="margin: 0 44px; border-top: 1px dashed #D1D5DB;"></div>
				<!-- QR Code -->
				<div class="flex flex-1 items-center justify-center" style="padding: 35px 44px;">
					<canvas ref="qrCanvas"></canvas>
				</div>
			</div>
			<!-- Cancel link -->
			<div class="bg-white py-3 text-center border-t border-gray-100">
				<button @click="emit('update:open', false)"
					class="text-xs text-gray-400 hover:text-gray-600 transition-colors">
					Cancel payment
				</button>
			</div>
		</DialogContent>
	</Dialog>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue'
	import QRCode from 'qrcode'
	import {
		Dialog, DialogContent,
	} from '@/components/ui/dialog'

	const props = defineProps<{
		open: boolean
		payment: { amount: string; qr_string: string } | null
	}>()

	const emit = defineEmits<{
		'update:open': [value: boolean]
	}>()

	const qrCanvas = ref<HTMLCanvasElement | null>(null)

	watch(qrCanvas, async (canvas) => {
		if (canvas && props.payment?.qr_string) {
			await QRCode.toCanvas(canvas, props.payment.qr_string, {
				width: 224,
				margin: 1,
				color: { dark: '#000000', light: '#ffffff' }
			})
		}
	})
</script>