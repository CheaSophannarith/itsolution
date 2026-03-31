<template>
	<div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 animate-pulse">
		<!-- Left skeleton -->
		<div class="order-2 lg:order-1 lg:col-span-7 space-y-4">
			<!-- Address card -->
			<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
				<div class="flex items-center gap-3 mb-4">
					<div class="w-8 h-8 bg-gray-200 rounded-full shrink-0"></div>
					<div class="h-5 bg-gray-200 rounded w-40"></div>
				</div>
				<div class="border-2 border-gray-100 rounded-xl p-4 space-y-3">
					<div class="flex items-center gap-2">
						<div class="w-5 h-5 bg-gray-200 rounded-full shrink-0"></div>
						<div class="h-4 bg-gray-200 rounded w-36"></div>
					</div>
					<div class="h-3 bg-gray-200 rounded w-56 ml-7"></div>
					<div class="h-3 bg-gray-200 rounded w-24 ml-7"></div>
				</div>
			</div>
			<!-- Payment card -->
			<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4">
				<div class="flex items-center gap-3 mb-4">
					<div class="w-8 h-8 bg-gray-200 rounded-full shrink-0"></div>
					<div class="h-5 bg-gray-200 rounded w-36"></div>
				</div>
				<div class="border-2 border-gray-100 rounded-xl p-3">
					<div class="h-14 bg-gray-200 rounded-xl"></div>
				</div>
			</div>
			<!-- Button -->
			<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4">
				<div class="h-12 bg-gray-200 rounded-2xl w-full"></div>
			</div>
		</div>
		<!-- Right skeleton -->
		<div class="order-1 lg:order-2 lg:col-span-5 mb-4 lg:mb-0">
			<div class="bg-white rounded-2xl border border-gray-100 shadow-lg p-3 sm:p-4 space-y-3">
				<div class="h-6 bg-gray-200 rounded w-36"></div>
				<div class="space-y-2 pt-4 border-t border-gray-200">
					<div class="flex justify-between">
						<div class="h-3 bg-gray-200 rounded w-20"></div>
						<div class="h-3 bg-gray-200 rounded w-16"></div>
					</div>
					<div class="flex justify-between">
						<div class="h-3 bg-gray-200 rounded w-16"></div>
						<div class="h-3 bg-gray-200 rounded w-12"></div>
					</div>
				</div>
				<div class="flex justify-between pt-4 border-t border-gray-200">
					<div class="h-4 bg-gray-200 rounded w-12"></div>
					<div class="h-4 bg-gray-200 rounded w-20"></div>
				</div>
				<div class="space-y-3 pt-4 border-t-2 border-gray-200">
					<div class="h-5 bg-gray-200 rounded w-28"></div>
					<div v-for="i in 2" :key="i" class="flex gap-3 p-3 rounded-2xl border-2 border-gray-100">
						<div class="w-16 h-16 bg-gray-200 rounded-xl shrink-0"></div>
						<div class="flex-1 space-y-2 pt-1">
							<div class="h-4 bg-gray-200 rounded w-3/4"></div>
							<div class="h-3 bg-gray-200 rounded w-1/2"></div>
							<div class="h-3 bg-gray-200 rounded w-1/3"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>