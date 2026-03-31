<template>
	<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
		<div class="flex items-center gap-3 mb-4">
			<span class="flex items-center justify-center w-7 h-7 rounded-full bg-brand text-white text-xs font-bold shrink-0">2</span>
			<h2 class="text-sm font-bold text-gray-900">Payment Method</h2>
		</div>
		<div class="relative flex items-center gap-3 p-3.5 border-2 rounded-xl border-brand bg-brand/5 cursor-default">
			<div class="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full bg-brand flex items-center justify-center">
				<svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
			</div>
			<div class="w-10 h-10 rounded-xl bg-[#E1232E] flex items-center justify-center shrink-0 text-white text-sm font-bold shadow-sm">KH</div>
			<div class="flex-1 min-w-0">
				<div class="font-bold text-gray-900 text-sm">KHQR Payment</div>
				<div class="text-xs text-gray-500 mt-0.5">ABA, Wing, ACLEDA, or any Cambodian banking app</div>
			</div>
		</div>
	</div>
</template>