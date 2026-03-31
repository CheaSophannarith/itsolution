<template>
    <div class="bg-white rounded-xl border border-gray-200 md:flex md:flex-col md:h-full">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                    <MapPin class="w-4 h-4 text-brand" />
                </div>
                <h2 class="text-base font-semibold text-gray-900">Addresses</h2>
            </div>
            <button v-if="!showAddressForm && addresses.length > 0" @click="startAddingAddress" type="button"
                class="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-sm font-medium flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Add New
            </button>
        </div>

        <div class="p-6">
            <!-- Loading -->
            <div v-if="isLoadingAddresses" class="flex items-center justify-center py-10">
                <Loader2 class="w-6 h-6 animate-spin text-brand" />
            </div>

            <!-- Address List -->
            <div v-else-if="!showAddressForm && addresses.length > 0" class="space-y-4">
                <div v-for="address in addresses" :key="address.uuid"
                    class="border border-gray-200 rounded-xl p-4 relative bg-white hover:border-gray-300 transition-all">
                    <!-- Default Badge -->
                    <div v-if="address.is_default"
                        class="absolute top-4 right-4 bg-brand text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        Default
                    </div>

                    <div class="pr-20">
                        <!-- Type & Label -->
                        <div class="flex items-center gap-2 mb-2">
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md"
                                :class="address.type === 'shipping' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'">
                                {{ address.type }}
                            </span>
                            <span v-if="address.label" class="text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
                                {{ address.label }}
                            </span>
                        </div>

                        <p class="font-semibold text-gray-900 mb-1">{{ address.full_name }}</p>
                        <p class="text-sm text-gray-600 leading-relaxed mb-2">{{ address.formatted_address }}</p>

                        <div class="flex flex-wrap gap-3 text-sm text-gray-500">
                            <span v-if="address.phone" class="flex items-center gap-1">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                {{ address.phone }}
                            </span>
                            <span v-if="address.email" class="flex items-center gap-1">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                {{ address.email }}
                            </span>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button @click="startEditingAddress(address)" type="button"
                            class="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium flex items-center justify-center gap-1.5">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                            Edit
                        </button>
                        <button v-if="!address.is_default" @click="handleSetDefault(address.uuid)" type="button"
                            :disabled="isSubmittingAddress"
                            class="px-3 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-xs font-medium disabled:opacity-50 flex items-center justify-center gap-1.5">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Set Default
                        </button>
                        <button @click="startDeletingAddress(address)" type="button"
                            class="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
                            :class="address.is_default ? 'col-span-2' : ''">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <!-- Address Form -->
            <form v-else @submit.prevent="handleAddressSubmit" class="space-y-4">
                <div class="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div class="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center">
                        <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="currentAddress" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900">{{ currentAddress ? 'Edit Address' : 'Add New Address' }}</h3>
                        <p class="text-xs text-gray-500">{{ currentAddress ? 'Update your address information' : 'Fill in the details below' }}</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Type <span class="text-red-500">*</span></label>
                        <div class="relative" @click.stop>
                            <button type="button" @click="typeDropdownOpen = !typeDropdownOpen"
                                class="w-full flex items-center justify-between gap-2 px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                                        :class="addressForm.type === 'shipping' ? 'bg-brand/10' : 'bg-purple-100'">
                                        <svg v-if="addressForm.type === 'shipping'" class="w-3.5 h-3.5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                                        </svg>
                                        <svg v-else class="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                                        </svg>
                                    </div>
                                    <span class="font-medium capitalize">{{ addressForm.type }}</span>
                                </div>
                                <svg class="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200" :class="typeDropdownOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                            <div v-show="typeDropdownOpen" class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                <button type="button" @click="handleTypeSelect('shipping')"
                                    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                    :class="addressForm.type === 'shipping' ? 'bg-brand/5' : ''">
                                    <div class="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                                        <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Shipping</p>
                                        <p class="text-xs text-gray-500">Delivery address</p>
                                    </div>
                                    <svg v-if="addressForm.type === 'shipping'" class="ml-auto w-4 h-4 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </button>
                                <div class="border-t border-gray-100 mx-3"></div>
                                <button type="button" @click="handleTypeSelect('billing')"
                                    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                    :class="addressForm.type === 'billing' ? 'bg-purple-50/50' : ''">
                                    <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                                        <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Billing</p>
                                        <p class="text-xs text-gray-500">Payment address</p>
                                    </div>
                                    <svg v-if="addressForm.type === 'billing'" class="ml-auto w-4 h-4 text-purple-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for="address_label" class="block text-sm font-medium text-gray-700 mb-1">Label</label>
                        <input v-model="addressForm.label" type="text" id="address_label" maxlength="50"
                            placeholder="e.g., Home, Office"
                            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">First Name <span class="text-red-500">*</span></label>
                        <input v-model="addressForm.first_name" type="text" id="first_name" required maxlength="100"
                            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                    </div>
                    <div>
                        <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">Last Name <span class="text-red-500">*</span></label>
                        <input v-model="addressForm.last_name" type="text" id="last_name" required maxlength="100"
                            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                    </div>
                </div>

                <div>
                    <label for="address_line_1" class="block text-sm font-medium text-gray-700 mb-1">Address Line 1 <span class="text-red-500">*</span></label>
                    <input v-model="addressForm.address_line_1" type="text" id="address_line_1" required maxlength="255"
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                </div>

                <div>
                    <label for="address_line_2" class="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                    <input v-model="addressForm.address_line_2" type="text" id="address_line_2" maxlength="255"
                        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Province <span class="text-red-500">*</span></label>
                    <div class="relative" @click.stop>
                        <button type="button" @click="provinceDropdownOpen = !provinceDropdownOpen"
                            class="w-full flex items-center justify-between gap-2 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                            :class="addressForm.province ? 'text-gray-900' : 'text-gray-400'">
                            <div class="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <span class="truncate">{{ addressForm.province || 'Select a province' }}</span>
                            <svg class="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200" :class="provinceDropdownOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                        </button>
                        <div v-show="provinceDropdownOpen" class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
                            <button v-for="province in cambodiaProvinces" :key="province" type="button"
                                @click="handleProvinceSelect(province)"
                                class="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-left"
                                :class="addressForm.province === province ? 'text-brand font-medium bg-brand/5' : 'text-gray-700'">
                                <span>{{ province }}</span>
                                <svg v-if="addressForm.province === province" class="w-4 h-4 text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone <span class="text-red-500">*</span></label>
                        <input v-model="addressForm.phone" type="tel" id="phone" required maxlength="20"
                            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                    </div>
                    <div>
                        <label for="address_email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="addressForm.email" type="email" id="address_email" maxlength="255"
                            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                    </div>
                </div>

                <div v-if="!currentAddress" class="flex items-center gap-2">
                    <input v-model="addressForm.is_default" type="checkbox" id="is_default"
                        class="w-4 h-4 text-brand border-gray-300 rounded focus:ring-2 focus:ring-brand">
                    <label for="is_default" class="text-sm text-gray-700">Set as default address</label>
                </div>

                <div class="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t border-gray-100">
                    <button v-if="addresses.length > 0" type="button" @click="cancelAddressForm"
                        class="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Cancel
                    </button>
                    <button type="submit" :disabled="isSubmittingAddress"
                        class="px-5 py-2.5 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50 text-sm font-semibold flex items-center justify-center gap-2">
                        <Loader2 v-if="isSubmittingAddress" class="w-4 h-4 animate-spin" />
                        <span>{{ currentAddress ? 'Update Address' : 'Save Address' }}</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Transition name="modal">
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showDeleteModal = false">
            <div class="absolute inset-0 bg-gray-900/70 backdrop-blur-md transition-opacity"></div>
            <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" @click.stop>
                <div class="px-6 pt-6 pb-4">
                    <div class="flex items-start gap-4">
                        <div class="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-gray-900 mb-1">Delete Address</h3>
                            <p class="text-sm text-gray-500">This action cannot be undone.</p>
                        </div>
                    </div>
                </div>
                <div class="px-6 py-4">
                    <p class="text-sm text-gray-700 mb-3">Are you sure you want to delete this address?</p>
                    <div class="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1">
                        <p class="font-semibold text-gray-900 text-sm">{{ currentAddress?.full_name }}</p>
                        <p class="text-sm text-gray-600">{{ currentAddress?.formatted_address }}</p>
                    </div>
                </div>
                <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                    <button type="button" @click="showDeleteModal = false"
                        class="px-5 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 text-sm">
                        Cancel
                    </button>
                    <button type="button" @click="confirmDelete" :disabled="isSubmittingAddress"
                        class="px-5 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 text-sm">
                        <Loader2 v-if="isSubmittingAddress" class="w-4 h-4 animate-spin" />
                        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        {{ isSubmittingAddress ? 'Deleting...' : 'Delete Address' }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Loader2, MapPin } from 'lucide-vue-next'
import type { Address, AddressFormData } from '~/types/address'

const {
    addresses,
    isLoading: isLoadingAddresses,
    isSubmitting: isSubmittingAddress,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} = useAddresses()

const currentAddress = ref<Address | null>(null)
const showDeleteModal = ref(false)
const showAddressForm = ref(false)
const addressForm = ref<AddressFormData>({
    type: 'shipping',
    first_name: '',
    last_name: '',
    address_line_1: '',
    address_line_2: null,
    province: '',
    phone: '',
    email: null,
    label: null,
    is_default: false
})

function startAddingAddress() {
    resetAddressForm()
    showAddressForm.value = true
}

function startEditingAddress(address: Address) {
    currentAddress.value = address
    addressForm.value = {
        type: address.type,
        first_name: address.first_name,
        last_name: address.last_name,
        address_line_1: address.address_line_1,
        address_line_2: address.address_line_2,
        province: address.province,
        phone: address.phone,
        email: address.email,
        label: address.label,
        is_default: address.is_default
    }
    showAddressForm.value = true
}

function startDeletingAddress(address: Address) {
    currentAddress.value = address
    showDeleteModal.value = true
}

function resetAddressForm() {
    currentAddress.value = null
    addressForm.value = {
        type: 'shipping',
        first_name: '',
        last_name: '',
        address_line_1: '',
        address_line_2: null,
        province: '',
        phone: '',
        email: null,
        label: null,
        is_default: false
    }
}

function cancelAddressForm() {
    resetAddressForm()
    showAddressForm.value = false
}

async function handleAddressSubmit() {
    try {
        if (currentAddress.value) {
            const { is_default, ...updateData } = addressForm.value
            await updateAddress(currentAddress.value.uuid, updateData as AddressFormData)
        } else {
            const formData = { ...addressForm.value }
            if (addresses.value.length === 0) {
                formData.is_default = true
            }
            await createAddress(formData)
        }
        await fetchAddresses()
        showAddressForm.value = false
        resetAddressForm()
    } catch (error) {
        // Error already handled by composable
    }
}

async function handleSetDefault(uuid: string) {
    try {
        await setDefaultAddress(uuid)
    } catch (error) {
        // Error already handled by composable
    }
}

async function confirmDelete() {
    if (!currentAddress.value) return
    try {
        await deleteAddress(currentAddress.value.uuid)
        showDeleteModal.value = false
        resetAddressForm()
        await fetchAddresses()
    } catch (error) {
        // Error already handled by composable
    }
}

const cambodiaProvinces = [
    'Banteay Meanchey', 'Battambang', 'Kampong Cham', 'Kampong Chhnang',
    'Kampong Speu', 'Kampong Thom', 'Kampot', 'Kandal', 'Kep', 'Koh Kong',
    'Kratie', 'Mondulkiri', 'Oddar Meanchey', 'Pailin', 'Phnom Penh',
    'Preah Sihanouk', 'Preah Vihear', 'Prey Veng', 'Pursat', 'Ratanakiri',
    'Siem Reap', 'Stung Treng', 'Svay Rieng', 'Takeo', 'Tboung Khmum',
]

const typeDropdownOpen = ref(false)
const provinceDropdownOpen = ref(false)

function handleTypeSelect(value: 'shipping' | 'billing') {
    addressForm.value.type = value
    typeDropdownOpen.value = false
}

function handleProvinceSelect(value: string) {
    addressForm.value.province = value
    provinceDropdownOpen.value = false
}

function closeAllDropdowns() {
    typeDropdownOpen.value = false
    provinceDropdownOpen.value = false
}

onMounted(async () => {
    await fetchAddresses()
    if (addresses.value.length === 0) {
        showAddressForm.value = true
    }
    document.addEventListener('click', closeAllDropdowns)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', closeAllDropdowns)
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
    transform: scale(0.9) translateY(-20px);
    opacity: 0;
}
</style>
