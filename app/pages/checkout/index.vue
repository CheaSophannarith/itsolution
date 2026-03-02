<template>
	<div class="min-h-screen bg-gray-50 flex flex-col">
		<!-- User-Friendly Checkout Header -->
		<header class="bg-white border-b border-gray-200 sticky top-0 z-50">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
				<div class="flex items-center justify-between">
					<!-- Back Button -->
					<NuxtLink to="/"
						class="flex items-center gap-2 text-gray-600 hover:text-brand transition-colors group">
						<ChevronRight class="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
						<span class="text-sm font-medium hidden sm:inline">Continue Shopping</span>
						<span class="text-sm font-medium sm:hidden">Back</span>
					</NuxtLink>

					<!-- Logo -->
					<NuxtLink to="/" class="absolute left-1/2 -translate-x-1/2">
						<img src="/logo.jpg" alt="TanXLM" class="h-8 sm:h-10 hover:opacity-80 transition-opacity" />
					</NuxtLink>
				</div>
			</div>
		</header>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1">

			<!-- Title Row -->
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2 mt-6">
				<div>
					<h1 class="text-xl sm:text-2xl font-bold text-gray-900">Complete Your Order</h1>
				</div>
			</div>

			<!-- Full-page skeleton while fetching -->
			<div v-if="isPageLoading" class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8 animate-pulse">
				<!-- Left skeleton -->
				<div class="order-2 lg:order-1 lg:col-span-7 space-y-4">
					<!-- Address card -->
					<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4">
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

			<!-- Real content once everything is loaded -->
			<div v-else class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8">
				<!-- Left Column - Checkout Form -->
				<div class="order-2 lg:order-1 lg:col-span-7">
					<div class="space-y-4">
						<!-- Shipping Address Section -->
						<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-5">
							<div class="flex items-center gap-3 mb-3">
								<span
									class="flex items-center justify-center w-7 h-7 rounded-full bg-brand text-white text-xs font-bold shrink-0">1</span>
								<h2 class="text-base sm:text-lg font-bold text-gray-900">Shipping Address</h2>
							</div>

							<!-- State 1: Show selected/default address -->
							<div v-if="selectedAddress && !showAddressSelector && !showNewAddressForm">
								<div class="border-2 border-brand bg-brand/5 rounded-xl p-3">
									<div class="flex items-center gap-2 mb-2">
										<MapPin class="w-5 h-5 text-brand shrink-0" />
										<span class="font-semibold text-gray-900">{{ selectedAddress.full_name }}</span>
										<span v-if="selectedAddress.is_default"
											class="px-2 py-0.5 bg-brand text-white text-xs font-medium rounded">
											Default
										</span>
									</div>
									<p class="text-sm text-gray-700 ml-7 mb-3">{{ selectedAddress.formatted_address }}
									</p>
									<div class="ml-7">
										<button @click="openAddressSelector" type="button"
											class="text-brand hover:text-brand/80 text-sm font-medium flex items-center gap-1">
											<Edit2 class="w-4 h-4" />
											Change address
										</button>
									</div>
								</div>
							</div>

							<!-- State 2: Address selector list -->
							<div v-else-if="showAddressSelector && !showNewAddressForm" class="space-y-3">
								<div class="flex items-center justify-between">
									<p class="text-sm font-medium text-gray-700">Select a shipping address:</p>
									<button v-if="selectedAddress" @click="showAddressSelector = false" type="button"
										class="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
										<ChevronRight class="w-4 h-4 rotate-180" />
										Back
									</button>
								</div>
								<div class="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
									<button v-for="address in addresses.filter(a => a.type === 'shipping')"
										:key="address.uuid" @click="selectAddress(address)" type="button"
										class="w-full text-left border-2 rounded-xl p-2.5 hover:border-brand hover:bg-brand/5 transition-all"
										:class="selectedAddress?.uuid === address.uuid ? 'border-brand bg-brand/5' : 'border-gray-200'">
										<div class="flex items-center gap-2 mb-1">
											<MapPin class="w-4 h-4 shrink-0"
												:class="selectedAddress?.uuid === address.uuid ? 'text-brand' : 'text-gray-400'" />
											<span class="font-semibold text-gray-900">{{ address.full_name }}</span>
											<span v-if="address.is_default"
												class="px-2 py-0.5 bg-brand text-white text-xs font-medium rounded shrink-0">
												Default
											</span>
										</div>
										<p class="text-sm text-gray-600 ml-6">{{ address.formatted_address }}</p>
									</button>
								</div>
								<div class="pt-2">
									<button @click="openNewAddressForm" type="button"
										class="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-brand hover:text-brand hover:bg-brand/5 transition-all font-medium flex items-center justify-center gap-2">
										<Plus class="w-4 h-4" />
										Add New Address
									</button>
								</div>
							</div>

							<!-- State 3: New address inline form -->
							<div v-else-if="showNewAddressForm" class="space-y-4">
								<div class="flex items-center justify-between pb-1 border-b border-gray-100">
									<p class="text-sm font-semibold text-gray-700">New Shipping Address</p>
									<button @click="cancelNewAddressForm" type="button"
										class="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1">
										<ChevronRight class="w-4 h-4 rotate-180" />
										Back
									</button>
								</div>
								<p class="text-xs text-gray-500">* Required field</p>

								<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label for="new_first_name"
											class="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
										<input id="new_first_name" v-model="newAddressForm.first_name" type="text"
											required maxlength="100"
											class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
									</div>
									<div>
										<label for="new_last_name"
											class="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
										<input id="new_last_name" v-model="newAddressForm.last_name" type="text"
											required maxlength="100"
											class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
									</div>
								</div>

								<div>
									<label for="new_phone"
										class="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
									<input id="new_phone" v-model="newAddressForm.phone" type="tel" maxlength="20"
										placeholder="e.g., +855 12 345 678"
										class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
								</div>

								<div>
									<label for="new_address_line_1"
										class="block text-sm font-semibold text-gray-700 mb-2">Street Address *</label>
									<input id="new_address_line_1" v-model="newAddressForm.address_line_1" type="text"
										required maxlength="255" placeholder="Street or P.O. Box"
										class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
								</div>

								<div>
									<label for="new_address_line_2"
										class="block text-sm font-semibold text-gray-700 mb-2">Apartment, Suite,
										Floor</label>
									<input id="new_address_line_2" v-model="newAddressForm.address_line_2" type="text"
										maxlength="255" placeholder="Optional"
										class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
								</div>

								<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label for="new_city"
											class="block text-sm font-semibold text-gray-700 mb-2">City *</label>
										<input id="new_city" v-model="newAddressForm.city" type="text" required
											maxlength="100"
											class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
									</div>
									<div>
										<label for="new_state"
											class="block text-sm font-semibold text-gray-700 mb-2">Province *</label>
										<select id="new_state" v-model="newAddressForm.state"
											class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand bg-white transition-all duration-200 hover:border-gray-300 cursor-pointer">
											<option :value="null" class="text-gray-500">Select Province...</option>
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

								<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label for="new_postal_code"
											class="block text-sm font-semibold text-gray-700 mb-2">Postal Code *</label>
										<input id="new_postal_code" v-model="newAddressForm.postal_code" type="text"
											required maxlength="20"
											class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300" />
									</div>
									<div>
										<label for="new_country_code"
											class="block text-sm font-semibold text-gray-700 mb-2">Country Code
											*</label>
										<input id="new_country_code" v-model="newAddressForm.country_code" type="text"
											required minlength="2" maxlength="2" placeholder="KH"
											class="w-full px-4 py-2.5 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all duration-200 hover:border-gray-300 uppercase" />
									</div>
								</div>

								<div
									class="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3 border-t border-gray-200">
									<button @click="cancelNewAddressForm" type="button"
										class="w-full sm:w-auto px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
										Cancel
									</button>
									<button @click="saveNewAddress" :disabled="isSubmittingAddress" type="button"
										class="w-full sm:w-auto px-6 py-2.5 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50">
										<Loader2 v-if="isSubmittingAddress" class="w-4 h-4 animate-spin" />
										Save & Use This Address
									</button>
								</div>
							</div>

							<!-- State 4: No addresses at all, show form directly -->
							<div
								v-else-if="!selectedAddress && addresses.filter(a => a.type === 'shipping').length === 0 && !showNewAddressForm">
								<p class="text-sm text-gray-500 mb-3">No shipping addresses found. Add one to continue.
								</p>
								<button @click="openNewAddressForm" type="button"
									class="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-brand hover:text-brand hover:bg-brand/5 transition-all font-medium flex items-center justify-center gap-2">
									<Plus class="w-5 h-5" />
									Add Shipping Address
								</button>
							</div>
						</div>

						<!-- Payment Section -->
						<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-5">
							<div class="flex items-center gap-3 mb-3">
								<span
									class="flex items-center justify-center w-7 h-7 rounded-full bg-brand text-white text-xs font-bold shrink-0">2</span>
								<h2 class="text-base sm:text-lg font-bold text-gray-900">Payment Method</h2>
							</div>

							<div>
								<div class="space-y-4">
									<!-- Payment Method Display -->
									<div class="space-y-3">
										<label class="block text-sm font-semibold text-gray-700 mb-3">Payment
											Method</label>

										<!-- KHQR Option (Selected by default) -->
										<div
											class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 border-2 rounded-xl border-brand bg-brand/5 shadow-sm">
											<div class="flex-1 min-w-0">
												<div class="font-bold text-gray-900 text-sm sm:text-base">KHQR Payment
												</div>
												<div class="text-xs sm:text-sm text-gray-600 mt-0.5">Pay with any
													Cambodian banking app (ABA, Wing, ACLEDA, etc.)</div>
											</div>
											<div class="text-2xl sm:text-3xl">🇰🇭</div>
										</div>

									</div>
								</div>
							</div>
						</div>

						<!-- Place Order Button -->
						<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4">
							<button @click="placeOrder" :disabled="isPlacingOrder"
								class="w-full bg-brand text-white px-6 py-3 rounded-2xl font-bold text-base sm:text-lg hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/25 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100">
								<span class="flex items-center justify-center gap-3">
									<ShoppingCart v-if="!isPlacingOrder" class="w-5 h-5 sm:w-6 sm:h-6" />
									<svg v-else class="animate-spin h-5 w-5 sm:h-6 sm:w-6"
										xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
											stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
										</path>
									</svg>
									{{ isPlacingOrder ? 'Processing...' : `Proceed to Payment - $${total.toFixed(2)}` }}
								</span>
							</button>
						</div>
					</div>
				</div>

				<!-- Right Column - Summary -->
				<div class="order-1 lg:order-2 lg:col-span-5 mb-4 lg:mb-0">
					<div
						class="bg-white rounded-2xl border border-gray-100 shadow-lg p-3 sm:p-5">
						<h2 class="text-base sm:text-lg font-bold text-gray-900 mb-3">Order Summary</h2>

						<!-- Stock Warnings -->
						<div v-if="stockWarnings.length > 0" class="mb-2 space-y-1">
							<p v-for="warning in stockWarnings" :key="warning"
								class="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
								⚠️ {{ warning }}
							</p>
						</div>

						<!-- Totals -->
						<div class="space-y-1.5 py-3 border-t border-gray-200">
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

						<div class="flex justify-between py-3 border-t border-gray-200">
							<span class="font-bold text-sm">Total</span>
							<span class="font-bold text-sm">${{ total.toFixed(2) }}</span>
						</div>

						<!-- Items -->
						<div class="border-t-2 border-gray-200 pt-3">
							<h3 class="font-semibold text-sm text-gray-900 mb-2.5 flex items-center gap-2">
								<ShoppingCart class="w-4 h-4" />
								Items ({{ totalItems }} {{ totalItems === 1 ? 'Item' : 'Items' }})
							</h3>
							<div class="space-y-2 max-h-64 sm:max-h-80 overflow-y-auto custom-scrollbar">
								<div v-for="item in previewItems" :key="item.uuid"
									class="flex gap-2.5 p-2.5 rounded-xl border border-gray-100 bg-white hover:shadow-sm hover:border-gray-200 transition-all duration-200">
									<!-- Product image -->
									<div
										class="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
										<img v-if="item.image_url" :src="item.image_url" :alt="item.product_name"
											class="w-full h-full object-contain p-1" loading="lazy"
											@error="(e: Event) => (e.target as HTMLImageElement).style.display = 'none'" />
										<div v-else
											class="w-full h-full flex items-center justify-center text-gray-300 border border-gray-200 rounded-lg">
											<ImageOff class="w-6 h-6" />
										</div>
									</div>
									<!-- Item details -->
									<div class="flex-1 min-w-0">
										<div class="flex justify-between items-start mb-0.5">
											<div
												class="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 pr-1">
												{{ item.product_name }}</div>
											<div class="font-bold text-xs sm:text-sm text-brand ml-1.5 shrink-0">${{
												parseFloat(item.line_total).toFixed(2) }}</div>
										</div>
										<div class="text-xs text-gray-500 space-y-0.5">
											<p v-if="item.variant_name" class="text-gray-600">{{
												item.variant_name }}</p>
											<p>Qty: {{ item.quantity }} × ${{ parseFloat(item.unit_price).toFixed(2)
											}}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Professional Checkout Footer -->
		<footer class="bg-white border-t border-gray-200 mt-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<!-- Footer Links -->
				<div class="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500 mb-2.5">
					<NuxtLink to="/terms-and-conditions" class="hover:text-brand transition-colors">Terms & Conditions
					</NuxtLink>
					<span class="text-gray-300">|</span>
					<NuxtLink to="/privacy-policy" class="hover:text-brand transition-colors">Privacy Policy</NuxtLink>
					<span class="text-gray-300">|</span>
					<NuxtLink to="/contact" class="hover:text-brand transition-colors">Contact Support</NuxtLink>
				</div>

				<!-- Copyright -->
				<div class="text-center text-xs text-gray-400">
					© {{ new Date().getFullYear() }} TanXLM. All rights reserved.
				</div>
			</div>
		</footer>

		<!-- Payment Dialog -->
		<Dialog :open="showPaymentDialog" @update:open="showPaymentDialog = $event">
			<!--
                KHQR Card ratio 20:29 — card width 300px → height 435px
                Header   = 12% of 435 = 52px
                LR margin = 10% of 435 = 44px  → px-11
                TB margin =  8% of 435 = 35px  → ~py-9
            -->
			<DialogContent :show-close-button="false"
				class="p-0 overflow-hidden w-75 rounded-2xl border-0 shadow-[0_0_16px_rgba(0,0,0,0.10)]">
				<!-- Card body -->
				<div class="bg-[#FFFFFF] flex flex-col" style="height: 435px;">

					<!-- Red Header — 52px, KHQR logo centered white -->
					<div class="shrink-0 flex items-center justify-center"
						style="background-color: #E1232E; height: 52px;">
						<img src="/KHQR Logo.png" alt="KHQR" class="h-6 object-contain brightness-0 invert" />
					</div>

					<!-- Merchant name + USD amount — LR 44px, top 35px -->
					<div style="padding: 35px 44px 16px 44px;">
						<p class="text-xs font-medium" style="color: #000000; opacity: 0.5;">TanXLM</p>
						<p class="text-2xl font-bold mt-1" style="color: #000000;">
							$ {{ payment ? parseFloat(payment.amount).toLocaleString('en-US', {
								minimumFractionDigits: 2
							}) :
								'0.00' }}
						</p>
					</div>

					<!-- Dashed divider — LR 44px -->
					<div style="margin: 0 44px; border-top: 1px dashed #D1D5DB;"></div>

					<!-- QR Code — LR 44px, TB 35px, fills remaining height -->
					<div class="flex flex-1 items-center justify-center" style="padding: 35px 44px;">
						<canvas ref="qrCanvas"></canvas>
					</div>

				</div>

				<!-- Cancel link below card -->
				<div class="bg-white py-3 text-center border-t border-gray-100">
					<button @click="showPaymentDialog = false"
						class="text-xs text-gray-400 hover:text-gray-600 transition-colors">
						Cancel payment
					</button>
				</div>
			</DialogContent>
		</Dialog>

		<!-- Toast Notifications -->
		<ToastContainer />
	</div>
</template>

<script setup lang="ts">
	import { ChevronRight, ShoppingCart, MapPin, Plus, Edit2, Loader2, ImageOff } from 'lucide-vue-next'
	import { computed, ref, onMounted, nextTick, watch } from 'vue'
	import { useRouter } from 'vue-router'
	import { useAuthStore } from '~/stores/auth'
	import { useCartStore } from '~/stores/cart'
	import QRCode from 'qrcode'
	import type { Address, AddressFormData } from '~/types/address'
	import {
		Dialog, DialogContent, DialogHeader,
		DialogTitle, DialogDescription,
	} from '@/components/ui/dialog'

	// Disable default layout and add custom transition
	definePageMeta({
		layout: false,
		pageTransition: {
			name: 'scale',
			mode: 'out-in'
		}
	})

	useSeoMeta({ title: 'Checkout', robots: 'noindex, nofollow' })

	const router = useRouter()
	const authStore = useAuthStore()
	const cartStore = useCartStore()
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
	const { addresses, isLoading: isLoadingAddresses, isSubmitting: isSubmittingAddress, fetchAddresses, createAddress } = useAddresses()
	const selectedAddress = ref<Address | null>(null)
	const showAddressSelector = ref(false)
	const showNewAddressForm = ref(false)

	// Page is ready only when both fetches are done
	const isPageLoading = computed(() => isLoadingAddresses.value || isLoadingPreview.value)

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
		} else {
			// If no default, pick the first shipping address
			const firstShipping = addresses.value.find(a => a.type === 'shipping')
			if (firstShipping) {
				selectedAddress.value = firstShipping
			}
		}
	})

	// New address form data (matches AddressFormData structure)
	const newAddressForm = ref<AddressFormData>({
		type: 'shipping',
		first_name: '',
		last_name: '',
		company: null,
		address_line_1: '',
		address_line_2: null,
		city: '',
		state: null,
		postal_code: '',
		country_code: 'KH',
		phone: null,
		email: null,
		label: null,
		is_default: false,
	})

	function resetNewAddressForm() {
		newAddressForm.value = {
			type: 'shipping',
			first_name: '',
			last_name: '',
			company: null,
			address_line_1: '',
			address_line_2: null,
			city: '',
			state: null,
			postal_code: '',
			country_code: 'KH',
			phone: null,
			email: null,
			label: null,
			is_default: false,
		}
	}

	// Helper functions for address management
	function selectAddress(address: Address) {
		selectedAddress.value = address
		showAddressSelector.value = false
		showNewAddressForm.value = false
	}

	function openAddressSelector() {
		showAddressSelector.value = true
		showNewAddressForm.value = false
	}

	function openNewAddressForm() {
		resetNewAddressForm()
		showNewAddressForm.value = true
		showAddressSelector.value = false
	}

	function cancelNewAddressForm() {
		showNewAddressForm.value = false
		// If we had a selected address, go back to showing it
		if (selectedAddress.value) {
			showAddressSelector.value = false
		} else {
			showAddressSelector.value = true
		}
	}

	async function saveNewAddress() {
		try {
			// If this is the user's first shipping address, make it the default
			const hasNoShippingAddresses = addresses.value.filter(a => a.type === 'shipping').length === 0
			if (hasNoShippingAddresses) {
				newAddressForm.value.is_default = true
			}
			const created = await createAddress(newAddressForm.value)
			// Auto-select the newly created address
			selectedAddress.value = created
			showNewAddressForm.value = false
			showAddressSelector.value = false
		} catch {
			// Error already handled by composable toast
		}
	}

	function navigateToProfile() {
		router.push('/profile')
	}

	// Form data (kept for payment method only)
	const form = ref({
		paymentMethod: 'khqr' // Default to KHQR
	})

	const { isPlacingOrder, error: orderError, payment, placeOrder: submitOrder } = useCheckout()
	const showPaymentDialog = ref(false)
	const qrCanvas = ref<HTMLCanvasElement | null>(null)

	let pollInterval: ReturnType<typeof setInterval> | null = null
	let paymentChannelDisconnect: (() => void) | null = null
	const FALLBACK_POLL_INTERVAL = 3000

	// Watch for qrCanvas to be mounted (dialog transition finishes rendering)
	watch(qrCanvas, async (canvas) => {
		if (canvas && payment.value?.qr_string) {
			await QRCode.toCanvas(canvas, payment.value.qr_string, {
				width: 224,
				margin: 1,
				color: { dark: '#000000', light: '#ffffff' }
			})
		}
	})

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

			// Monitor transport-level connection failures.
			// channel.error() only fires for subscription errors, not when the
			// WebSocket server is unreachable. After ~10s Pusher reports "failed".
			const unsubscribeConnection = echo.connector.onConnectionChange((status: string) => {
				if (status === 'failed' && !errorFired) {
					errorFired = true
					startFallbackPolling()
				}
			})

			// Check current status immediately — Pusher may have already entered
			// "unavailable" state before the user clicked "Proceed to Payment".
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
