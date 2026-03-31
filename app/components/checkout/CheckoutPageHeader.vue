<template>
	<div class="mb-7">
		<!-- Breadcrumb -->
		<nav class="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
			<NuxtLink to="/" class="hover:text-brand transition-colors">Home</NuxtLink>
			<ChevronRight class="w-3 h-3" />
			<NuxtLink to="/cart" class="hover:text-brand transition-colors">Cart</NuxtLink>
			<ChevronRight class="w-3 h-3" />
			<span class="text-gray-900 font-semibold">Checkout</span>
		</nav>

		<!-- Step progress -->
		<div class="flex items-center mb-5">
			<div class="flex items-center gap-2">
				<span class="w-6 h-6 rounded-full bg-brand/20 text-brand text-xs font-bold flex items-center justify-center">
					<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
					</svg>
				</span>
				<span class="text-sm font-medium text-gray-400">Cart</span>
			</div>
			<div class="h-px w-8 sm:w-12 bg-brand mx-2"></div>
			<div class="flex items-center gap-2">
				<span class="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">2</span>
				<span class="text-sm font-semibold text-brand">Checkout</span>
			</div>
		</div>

		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Complete Your Order</h1>
	</div>
</template>

<script setup lang="ts">
	import { ChevronRight } from 'lucide-vue-next'
</script>