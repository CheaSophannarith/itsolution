<template>
	<div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
		<div class="flex items-center gap-3 mb-4">
			<span class="flex items-center justify-center w-7 h-7 rounded-full bg-brand text-white text-xs font-bold shrink-0">1</span>
			<h2 class="text-sm font-bold text-gray-900">Shipping Address</h2>
		</div>

		<!-- State 1: Selected address -->
		<div v-if="modelValue && !showAddressSelector && !showNewAddressForm">
			<div class="border-2 border-brand bg-brand/5 rounded-xl p-3">
				<div class="flex items-center gap-2 mb-1.5">
					<MapPin class="w-4 h-4 text-brand shrink-0" />
					<span class="font-semibold text-sm text-gray-900">{{ modelValue.full_name }}</span>
					<span v-if="modelValue.is_default" class="px-2 py-0.5 bg-brand text-white text-xs font-medium rounded">Default</span>
				</div>
				<p class="text-xs text-gray-600 ml-6 mb-2.5">{{ modelValue.formatted_address }}</p>
				<div class="ml-6">
					<button @click="openAddressSelector" type="button"
						class="text-brand hover:text-brand/80 text-xs font-medium flex items-center gap-1">
						<Edit2 class="w-3.5 h-3.5" />
						Change address
					</button>
				</div>
			</div>
		</div>

		<!-- State 2: Address selector -->
		<div v-else-if="showAddressSelector && !showNewAddressForm" class="space-y-3">
			<div class="flex items-center justify-between">
				<p class="text-xs font-medium text-gray-700">Select a shipping address:</p>
				<button v-if="modelValue" @click="showAddressSelector = false" type="button"
					class="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
					<ChevronRight class="w-3.5 h-3.5 rotate-180" />Back
				</button>
			</div>
			<div class="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
				<button v-for="address in shippingAddresses" :key="address.uuid"
					@click="selectAddress(address)" type="button"
					class="w-full text-left border-2 rounded-xl p-2.5 hover:border-brand hover:bg-brand/5 transition-all"
					:class="modelValue?.uuid === address.uuid ? 'border-brand bg-brand/5' : 'border-gray-200'">
					<div class="flex items-center gap-2 mb-0.5">
						<MapPin class="w-3.5 h-3.5 shrink-0" :class="modelValue?.uuid === address.uuid ? 'text-brand' : 'text-gray-400'" />
						<span class="font-semibold text-xs text-gray-900">{{ address.full_name }}</span>
						<span v-if="address.is_default" class="px-1.5 py-0.5 bg-brand text-white text-[10px] font-medium rounded shrink-0">Default</span>
					</div>
					<p class="text-xs text-gray-500 ml-5">{{ address.formatted_address }}</p>
				</button>
			</div>
			<button @click="openNewAddressForm" type="button"
				class="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-brand hover:text-brand hover:bg-brand/5 transition-all text-xs font-medium flex items-center justify-center gap-2">
				<Plus class="w-3.5 h-3.5" />Add New Address
			</button>
		</div>

		<!-- State 3: New address form -->
		<div v-else-if="showNewAddressForm" class="space-y-3">
			<div class="flex items-center justify-between pb-1 border-b border-gray-100">
				<p class="text-xs font-semibold text-gray-700">New Shipping Address</p>
				<button @click="cancelNewAddressForm" type="button"
					class="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1">
					<ChevronRight class="w-3.5 h-3.5 rotate-180" />Back
				</button>
			</div>
			<p class="text-[11px] text-gray-400">* Required field</p>
			<div>
				<label class="block text-xs font-semibold text-gray-700 mb-1.5">Type *</label>
				<div class="relative" @click.stop>
					<button type="button" @click="typeDropdownOpen = !typeDropdownOpen"
						class="w-full flex items-center justify-between gap-2 px-3 py-2 border-2 border-gray-200 rounded-xl bg-white text-xs text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all">
						<div class="flex items-center gap-2">
							<div class="w-5 h-5 rounded flex items-center justify-center shrink-0" :class="form.type === 'shipping' ? 'bg-brand/10' : 'bg-purple-100'">
								<svg v-if="form.type === 'shipping'" class="w-3 h-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
								<svg v-else class="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
							</div>
							<span class="font-medium capitalize">{{ form.type }}</span>
						</div>
						<svg class="w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform" :class="typeDropdownOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
					</button>
					<div v-show="typeDropdownOpen" class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
						<button type="button" @click="selectType('shipping')" class="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left" :class="form.type === 'shipping' ? 'bg-brand/5' : ''">
							<div class="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center shrink-0"><svg class="w-3.5 h-3.5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg></div>
							<div><p class="text-xs font-medium text-gray-900">Shipping</p><p class="text-[10px] text-gray-400">Delivery address</p></div>
							<svg v-if="form.type === 'shipping'" class="ml-auto w-3.5 h-3.5 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
						</button>
						<div class="border-t border-gray-100 mx-3"></div>
						<button type="button" @click="selectType('billing')" class="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left" :class="form.type === 'billing' ? 'bg-purple-50/50' : ''">
							<div class="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center shrink-0"><svg class="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg></div>
							<div><p class="text-xs font-medium text-gray-900">Billing</p><p class="text-[10px] text-gray-400">Payment address</p></div>
							<svg v-if="form.type === 'billing'" class="ml-auto w-3.5 h-3.5 text-purple-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
						</button>
					</div>
				</div>
			</div>
			<div>
				<label class="block text-xs font-semibold text-gray-700 mb-1.5">Label *</label>
				<input v-model="form.label" type="text" required maxlength="20" placeholder="Home, Office, etc." class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all hover:border-gray-300" />
			</div>
			<div class="grid grid-cols-2 gap-3">
				<div>
					<label class="block text-xs font-semibold text-gray-700 mb-1.5">First Name *</label>
					<input v-model="form.first_name" type="text" required maxlength="100" class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all hover:border-gray-300" />
				</div>
				<div>
					<label class="block text-xs font-semibold text-gray-700 mb-1.5">Last Name *</label>
					<input v-model="form.last_name" type="text" required maxlength="100" class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all hover:border-gray-300" />
				</div>
			</div>
			<div>
				<label class="block text-xs font-semibold text-gray-700 mb-1.5">Phone *</label>
				<input v-model="form.phone" type="tel" required maxlength="20" placeholder="+855 12 345 678" class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all hover:border-gray-300" />
			</div>
			<div>
				<label class="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
				<input v-model="form.email" type="email" maxlength="100" placeholder="user@gmail.com" class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all hover:border-gray-300" />
			</div>
			<div>
				<label class="block text-xs font-semibold text-gray-700 mb-1.5">Address Line 1 *</label>
				<input v-model="form.address_line_1" type="text" required maxlength="255" placeholder="Address Line 1" class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all hover:border-gray-300" />
			</div>
			<div>
				<label class="block text-xs font-semibold text-gray-700 mb-1.5">Address Line 2 <span class="text-gray-400 font-normal">(Optional)</span></label>
				<input v-model="form.address_line_2" type="text" maxlength="255" placeholder="Apartment, suite, etc." class="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all hover:border-gray-300" />
			</div>
			<div>
				<label class="block text-xs font-semibold text-gray-700 mb-1.5">Province *</label>
				<div class="relative" @click.stop>
					<button type="button" @click="provinceDropdownOpen = !provinceDropdownOpen"
						class="w-full flex items-center justify-between gap-2 pl-8 pr-3 py-2 border-2 border-gray-200 rounded-xl bg-white text-xs hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
						:class="form.province ? 'text-gray-900' : 'text-gray-400'">
						<div class="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-gray-400">
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
						</div>
						<span class="truncate">{{ form.province || 'Select a province' }}</span>
						<svg class="w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform" :class="provinceDropdownOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
					</button>
					<div v-show="provinceDropdownOpen" class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
						<button v-for="province in cambodiaProvinces" :key="province" type="button"
							@click="selectProvince(province)"
							class="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-gray-50 transition-colors text-left"
							:class="form.province === province ? 'text-brand font-medium bg-brand/5' : 'text-gray-700'">
							<span>{{ province }}</span>
							<svg v-if="form.province === province" class="w-3.5 h-3.5 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
						</button>
					</div>
				</div>
			</div>
			<div class="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2 border-t border-gray-100">
				<button @click="cancelNewAddressForm" type="button" class="w-full sm:w-auto px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-xs font-medium">Cancel</button>
				<button @click="saveAddress" :disabled="isSubmitting" type="button" class="w-full sm:w-auto px-4 py-2 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-50">
					<Loader2 v-if="isSubmitting" class="w-3.5 h-3.5 animate-spin" />
					Save & Use This Address
				</button>
			</div>
		</div>

		<!-- State 4: No addresses -->
		<div v-else-if="!modelValue && shippingAddresses.length === 0 && !showNewAddressForm">
			<p class="text-xs text-gray-500 mb-3">No shipping addresses found. Add one to continue.</p>
			<button @click="openNewAddressForm" type="button"
				class="w-full px-4 py-2.5 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-brand hover:text-brand hover:bg-brand/5 transition-all text-xs font-medium flex items-center justify-center gap-2">
				<Plus class="w-4 h-4" />Add Shipping Address
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
	import { MapPin, Edit2, Plus, ChevronRight, Loader2 } from 'lucide-vue-next'
	import type { Address, AddressFormData } from '~/types/address'

	const props = defineProps<{
		modelValue: Address | null
		addresses: Address[]
		isSubmitting: boolean
	}>()

	const emit = defineEmits<{
		'update:modelValue': [address: Address]
		'create-address': [form: AddressFormData, onSuccess: (created: Address) => void]
	}>()

	const showAddressSelector = ref(false)
	const showNewAddressForm = ref(false)
	const typeDropdownOpen = ref(false)
	const provinceDropdownOpen = ref(false)

	const shippingAddresses = computed(() => props.addresses.filter(a => a.type === 'shipping'))

	const cambodiaProvinces = [
		'Banteay Meanchey', 'Battambang', 'Kampong Cham', 'Kampong Chhnang',
		'Kampong Speu', 'Kampong Thom', 'Kampot', 'Kandal', 'Kep', 'Koh Kong',
		'Kratie', 'Mondulkiri', 'Oddar Meanchey', 'Pailin', 'Phnom Penh',
		'Preah Sihanouk', 'Preah Vihear', 'Prey Veng', 'Pursat', 'Ratanakiri',
		'Siem Reap', 'Stung Treng', 'Svay Rieng', 'Takeo', 'Tboung Khmum',
	]

	const defaultForm = (): AddressFormData => ({
		type: 'shipping',
		first_name: '',
		last_name: '',
		address_line_1: '',
		address_line_2: null,
		province: '',
		phone: '',
		email: null,
		label: null,
		is_default: false,
	})

	const form = ref<AddressFormData>(defaultForm())

	function selectAddress(address: Address) {
		emit('update:modelValue', address)
		showAddressSelector.value = false
		showNewAddressForm.value = false
	}

	function openAddressSelector() {
		showAddressSelector.value = true
		showNewAddressForm.value = false
	}

	function openNewAddressForm() {
		form.value = defaultForm()
		showNewAddressForm.value = true
		showAddressSelector.value = false
	}

	function cancelNewAddressForm() {
		showNewAddressForm.value = false
		showAddressSelector.value = props.modelValue ? false : true
	}

	function selectType(value: 'shipping' | 'billing') {
		form.value.type = value
		typeDropdownOpen.value = false
	}

	function selectProvince(value: string) {
		form.value.province = value
		provinceDropdownOpen.value = false
	}

	function closeDropdowns() {
		typeDropdownOpen.value = false
		provinceDropdownOpen.value = false
	}

	function saveAddress() {
		emit('create-address', form.value, (created: Address) => {
			emit('update:modelValue', created)
			showNewAddressForm.value = false
			showAddressSelector.value = false
		})
	}

	onMounted(() => {
		document.addEventListener('click', closeDropdowns)
	})

	onBeforeUnmount(() => {
		document.removeEventListener('click', closeDropdowns)
	})
</script>

<style scoped>
	.custom-scrollbar::-webkit-scrollbar { width: 6px; }
	.custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 3px; }
	.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
	.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>