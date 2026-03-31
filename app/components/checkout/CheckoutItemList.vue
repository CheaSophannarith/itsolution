<template>
	<div class="lg:col-span-7 space-y-3 mb-6 lg:mb-0">
		<!-- Section title -->
		<div class="flex items-center justify-between mb-1">
			<h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">
				Items ({{ totalItems }})
			</h2>
			<NuxtLink to="/cart" class="text-xs text-brand font-medium hover:underline underline-offset-2 flex items-center gap-1">
				<ChevronRight class="w-3 h-3 rotate-180" />
				Edit cart
			</NuxtLink>
		</div>

		<!-- Stock Warnings -->
		<div v-if="stockWarnings.length > 0"
			class="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2">
			<div class="flex items-center gap-2">
				<AlertTriangle class="w-4 h-4 text-amber-500 shrink-0" />
				<p class="text-xs font-semibold text-amber-800">Some items are no longer available</p>
			</div>
			<ul class="space-y-1.5">
				<li v-for="warning in stockWarnings" :key="warning.sku_uuid"
					class="flex items-center justify-between gap-2 bg-white border border-amber-200 rounded-lg px-2.5 py-1.5">
					<span class="text-xs font-medium text-gray-800 truncate">{{ warning.name }}</span>
					<span v-if="warning.available === 0" class="shrink-0 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded px-1.5 py-0.5">Out of stock</span>
					<span v-else class="shrink-0 text-xs font-semibold text-amber-700 bg-amber-100 border border-amber-300 rounded px-1.5 py-0.5">Only {{ warning.available }} left</span>
				</li>
			</ul>
			<NuxtLink to="/cart" class="block text-xs font-semibold text-amber-700 underline hover:text-amber-900 transition-colors pt-1 border-t border-amber-200">
				Go back and update your cart
			</NuxtLink>
		</div>

		<!-- Items -->
		<div v-for="item in items" :key="item.uuid"
			class="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 hover:border-gray-200 hover:shadow-sm transition-all">
			<!-- Image -->
			<div class="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
				<img v-if="item.image_url" :src="item.image_url" :alt="item.product_name"
					class="w-full h-full object-contain p-1.5" loading="lazy"
					@error="(e: Event) => (e.target as HTMLImageElement).style.display = 'none'" />
				<div v-else class="w-full h-full flex items-center justify-center text-gray-300">
					<ImageOff class="w-7 h-7" />
				</div>
			</div>
			<!-- Details -->
			<div class="flex-1 min-w-0">
				<div class="flex justify-between gap-3">
					<div class="flex-1 min-w-0">
						<p class="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug mb-1">{{ item.product_name }}</p>
						<p v-if="item.variant_name" class="text-xs text-gray-400">{{ item.variant_name }}</p>
					</div>
					<div class="text-right shrink-0">
						<p class="font-bold text-sm text-gray-900 tabular-nums">${{ parseFloat(item.line_total).toFixed(2) }}</p>
						<p v-if="item.quantity > 1" class="text-xs text-gray-400 mt-0.5 tabular-nums">${{ parseFloat(item.unit_price).toFixed(2) }} each</p>
					</div>
				</div>
				<div class="mt-2 pt-2 border-t border-gray-50">
					<span class="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 rounded-lg px-2.5 py-1 border border-gray-100">
						Qty: {{ item.quantity }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ChevronRight, ImageOff, AlertTriangle } from 'lucide-vue-next'

	defineProps<{
		items: any[]
		totalItems: number
		stockWarnings: any[]
	}>()
</script>

<style scoped>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>