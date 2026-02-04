<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            <!-- Account Information Card -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div class="px-6 py-4 bg-linear-to-r from-brand to-brand/90 border-b border-brand flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-white">Account Information</h2>
                    <button v-if="!showProfileForm" @click="startProfileEdit" type="button"
                        class="px-4 py-2 bg-white text-brand rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Edit Profile
                    </button>
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="relative">
                            <div class="w-20 h-20 rounded-full overflow-hidden bg-brand flex items-center justify-center">
                                <img v-if="avatarUrl"
                                    :src="avatarUrl"
                                    alt="Profile avatar"
                                    class="w-full h-full object-cover">
                                <User v-else class="w-10 h-10 text-white" />
                            </div>
                            <div v-if="showProfileForm" class="absolute -bottom-1 -right-1 flex gap-1">
                                <label class="cursor-pointer bg-brand hover:bg-brand/90 text-white p-1.5 rounded-full shadow-lg transition-colors">
                                    <Upload class="w-4 h-4" />
                                    <input type="file" accept="image/*" @change="handleAvatarChange" class="hidden">
                                </label>
                                <button v-if="avatarUrl"
                                    @click="deleteAvatar"
                                    type="button"
                                    class="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-colors">
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold text-gray-900">{{ authStore.user?.name }}</h3>
                            <p class="text-gray-600">{{ authStore.user?.email }}</p>
                        </div>
                    </div>

                    <form v-if="showProfileForm" @submit.prevent="updateProfile" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input v-model="profileForm.name" type="text" id="name"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email
                                    Address</label>
                                <input v-model="profileForm.email" type="email" id="email"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                        </div>

                        <div class="flex justify-end gap-3 pt-4">
                            <button type="button" @click="handleCancelProfileEdit"
                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isUpdating"
                                class="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50 flex items-center gap-2">
                                <Loader2 v-if="isUpdating" class="w-4 h-4 animate-spin" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Change Password Card -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900">Change Password</h2>
                    <button v-if="!showPasswordForm" @click="startPasswordEdit" type="button"
                        class="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-sm font-medium">
                        Change Password
                    </button>
                </div>
                <div v-if="showPasswordForm" class="p-6">
                    <form @submit.prevent="updatePassword" class="space-y-4">
                        <div>
                            <label for="current_password" class="block text-sm font-medium text-gray-700 mb-1">Current
                                Password</label>
                            <div class="relative">
                                <input v-model="currentPassword"
                                    :type="showCurrentPassword ? 'text' : 'password'" id="current_password"
                                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                                <button type="button" @click="toggleCurrentPasswordVisibility"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Eye v-if="showCurrentPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label for="new_password" class="block text-sm font-medium text-gray-700 mb-1">New
                                Password</label>
                            <div class="relative">
                                <input v-model="newPassword" :type="showNewPassword ? 'text' : 'password'"
                                    id="new_password"
                                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                                <button type="button" @click="toggleNewPasswordVisibility"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Eye v-if="showNewPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                            <!-- Password Requirements -->
                            <div v-if="newPassword" class="mt-2 space-y-1 text-xs">
                                <p :class="passwordRequirements.minLength ? 'text-green-600' : 'text-gray-500'">
                                    {{ passwordRequirements.minLength ? '✓' : '○' }} At least 8 characters
                                </p>
                                <p :class="passwordRequirements.hasUppercase ? 'text-green-600' : 'text-gray-500'">
                                    {{ passwordRequirements.hasUppercase ? '✓' : '○' }} One uppercase letter
                                </p>
                                <p :class="passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-500'">
                                    {{ passwordRequirements.hasNumber ? '✓' : '○' }} One number
                                </p>
                            </div>
                        </div>
                        <div>
                            <label for="confirm_password" class="block text-sm font-medium text-gray-700 mb-1">Confirm
                                New Password</label>
                            <div class="relative">
                                <input v-model="confirmPassword"
                                    :type="showConfirmPassword ? 'text' : 'password'" id="confirm_password"
                                    :class="confirmPassword && newPassword !== confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brand focus:border-brand'"
                                    class="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 transition-colors">
                                <button type="button" @click="toggleConfirmPasswordVisibility"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Eye v-if="showConfirmPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                            <!-- Password Match Indicator -->
                            <p v-if="confirmPassword && newPassword !== confirmPassword"
                                class="flex items-center gap-1.5 mt-2 text-sm text-red-500 font-medium">
                                <CheckCircle class="w-4 h-4" />
                                Passwords do not match
                            </p>
                        </div>

                        <div class="flex justify-end gap-3 pt-4">
                            <button type="button" @click="cancelPasswordEdit"
                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isUpdatingPassword"
                                class="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50 flex items-center gap-2">
                                <Loader2 v-if="isUpdatingPassword" class="w-4 h-4 animate-spin" />
                                <span>Update Password</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Address Management Card -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900">Addresses</h2>
                    <button v-if="!showAddressForm && addresses.length > 0" @click="startAddingAddress" type="button"
                        class="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-sm font-medium">
                        Add New Address
                    </button>
                </div>

                <div class="p-6">
                    <!-- Loading State -->
                    <div v-if="isLoadingAddresses" class="flex items-center justify-center py-8">
                        <Loader2 class="w-6 h-6 animate-spin text-brand" />
                    </div>

                    <!-- Address List -->
                    <div v-else-if="!showAddressForm && addresses.length > 0" class="space-y-4">
                        <div v-for="address in addresses" :key="address.uuid"
                            class="border border-gray-200 rounded-lg p-4 hover:border-brand/50 transition-colors relative">
                            <!-- Default Badge -->
                            <div v-if="address.is_default"
                                class="absolute top-4 right-4 bg-brand text-white text-xs font-medium px-2 py-1 rounded">
                                Default
                            </div>

                            <div class="pr-20">
                                <!-- Address Type & Label -->
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="inline-block px-2 py-1 text-xs font-medium rounded"
                                        :class="address.type === 'shipping' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'">
                                        {{ address.type }}
                                    </span>
                                    <span v-if="address.label" class="text-sm font-medium text-gray-700">
                                        {{ address.label }}
                                    </span>
                                </div>

                                <!-- Full Name -->
                                <p class="font-semibold text-gray-900 mb-1">{{ address.full_name }}</p>

                                <!-- Company -->
                                <p v-if="address.company" class="text-sm text-gray-600 mb-1">{{ address.company }}</p>

                                <!-- Formatted Address -->
                                <p class="text-sm text-gray-600 leading-relaxed mb-2">{{ address.formatted_address }}</p>

                                <!-- Contact Info -->
                                <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <span v-if="address.phone">{{ address.phone }}</span>
                                    <span v-if="address.email">{{ address.email }}</span>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                <button @click="startEditingAddress(address)" type="button"
                                    class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                    Edit
                                </button>
                                <button v-if="!address.is_default" @click="handleSetDefault(address.uuid)" type="button"
                                    :disabled="isSubmittingAddress"
                                    class="flex-1 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors text-sm font-medium disabled:opacity-50">
                                    Set as Default
                                </button>
                                <button @click="startDeletingAddress(address)" type="button"
                                    class="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Address Form -->
                    <form v-else @submit.prevent="handleAddressSubmit" class="space-y-4">

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="address_type" class="block text-sm font-medium text-gray-700 mb-1">Type
                                    <span class="text-red-500">*</span></label>
                                <select v-model="addressForm.type" id="address_type" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                                    <option value="shipping">Shipping</option>
                                    <option value="billing">Billing</option>
                                </select>
                            </div>
                            <div>
                                <label for="address_label" class="block text-sm font-medium text-gray-700 mb-1">Label</label>
                                <input v-model="addressForm.label" type="text" id="address_label" maxlength="50"
                                    placeholder="e.g., Home, Office"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">First Name
                                    <span class="text-red-500">*</span></label>
                                <input v-model="addressForm.first_name" type="text" id="first_name" required
                                    maxlength="100"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                            <div>
                                <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">Last Name
                                    <span class="text-red-500">*</span></label>
                                <input v-model="addressForm.last_name" type="text" id="last_name" required
                                    maxlength="100"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                        </div>

                        <div>
                            <label for="company" class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input v-model="addressForm.company" type="text" id="company" maxlength="200"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                        </div>

                        <div>
                            <label for="address_line_1" class="block text-sm font-medium text-gray-700 mb-1">Address Line
                                1 <span class="text-red-500">*</span></label>
                            <input v-model="addressForm.address_line_1" type="text" id="address_line_1" required
                                maxlength="255"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                        </div>

                        <div>
                            <label for="address_line_2" class="block text-sm font-medium text-gray-700 mb-1">Address Line
                                2</label>
                            <input v-model="addressForm.address_line_2" type="text" id="address_line_2" maxlength="255"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City <span
                                        class="text-red-500">*</span></label>
                                <input v-model="addressForm.city" type="text" id="city" required maxlength="100"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                            <div>
                                <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input v-model="addressForm.state" type="text" id="state" maxlength="100"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                            <div>
                                <label for="postal_code" class="block text-sm font-medium text-gray-700 mb-1">Postal Code
                                    <span class="text-red-500">*</span></label>
                                <input v-model="addressForm.postal_code" type="text" id="postal_code" required
                                    maxlength="20"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                        </div>

                        <div>
                            <label for="country_code" class="block text-sm font-medium text-gray-700 mb-1">Country Code
                                (2 letters) <span class="text-red-500">*</span></label>
                            <input v-model="addressForm.country_code" type="text" id="country_code" required minlength="2"
                                maxlength="2" placeholder="e.g., US, GB, CA"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors uppercase">
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input v-model="addressForm.phone" type="tel" id="phone" maxlength="20"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                            <div>
                                <label for="address_email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input v-model="addressForm.email" type="email" id="address_email" maxlength="255"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                            </div>
                        </div>

                        <!-- Only show is_default checkbox when creating new address -->
                        <div v-if="!currentAddress" class="flex items-center">
                            <input v-model="addressForm.is_default" type="checkbox" id="is_default"
                                class="w-4 h-4 text-brand border-gray-300 rounded focus:ring-2 focus:ring-brand">
                            <label for="is_default" class="ml-2 text-sm text-gray-700">Set as default address</label>
                        </div>

                        <div class="flex justify-end gap-3 pt-4 border-t">
                            <button v-if="addresses.length > 0" type="button" @click="cancelAddressForm"
                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isSubmittingAddress"
                                class="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50 flex items-center gap-2">
                                <Loader2 v-if="isSubmittingAddress" class="w-4 h-4 animate-spin" />
                                <span>{{ currentAddress ? 'Update Address' : 'Save Address' }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <Transition name="modal">
            <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showDeleteModal = false">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"></div>

                <!-- Modal Content -->
                <div class="relative bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden" @click.stop>
                    <!-- Header -->
                    <div class="px-6 pt-6 pb-4 border-b border-gray-100">
                        <h3 class="text-xl font-semibold text-gray-900">Confirm Deletion</h3>
                    </div>

                    <!-- Body -->
                    <div class="px-6 py-5">
                        <p class="text-gray-700 mb-4">Are you sure you want to delete this address?</p>

                        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-1">
                            <p class="font-medium text-gray-900">{{ currentAddress?.full_name }}</p>
                            <p class="text-sm text-gray-600 leading-relaxed">{{ currentAddress?.formatted_address }}</p>
                        </div>

                        <div class="mt-4 flex items-start gap-2 text-sm text-gray-600">
                            <svg class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>This action is permanent and cannot be undone.</span>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                        <button type="button" @click="showDeleteModal = false"
                            class="px-5 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type="button" @click="confirmDelete" :disabled="isSubmittingAddress"
                            class="px-5 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center">
                            <Loader2 v-if="isSubmittingAddress" class="w-4 h-4 animate-spin" />
                            <span>{{ isSubmittingAddress ? 'Deleting...' : 'Delete' }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { User, CheckCircle, Eye, EyeOff, Loader2, Upload, Trash2 } from 'lucide-vue-next'
import type { Address, AddressFormData } from '~/types/address'

definePageMeta({
    middleware: 'auth'
})

const authStore = useAuthStore()

// Profile form composable
const {
    formData: profileForm,
    isEditing: showProfileForm,
    isSubmitting: isUpdating,
    startEdit: startProfileEdit,
    cancelEdit: cancelProfileEdit,
    updateProfileWithFormData,
} = useProfileForm()

// Avatar upload composable
const {
    avatarFile,
    shouldDeleteAvatar,
    handleFileChange: handleAvatarChange,
    markForDeletion: markAvatarForDeletion,
    getPreviewUrl,
    reset: resetAvatar,
} = useAvatarUpload()

// Computed property for avatar URL (ensures reactivity)
const avatarUrl = computed(() => getPreviewUrl(authStore.user?.avatar))

// Password form composable
const {
    currentPassword,
    newPassword,
    confirmPassword,
    isEditing: showPasswordForm,
    isSubmitting: isUpdatingPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    startEdit: startPasswordEdit,
    cancelEdit: cancelPasswordEdit,
    submitPasswordChange,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
} = usePasswordForm()

// Password requirements for display
const passwordRequirements = computed(() => ({
    minLength: newPassword.value.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword.value),
    hasNumber: /[0-9]/.test(newPassword.value)
}))

async function updateProfile() {
    try {
        await updateProfileWithFormData(avatarFile.value, shouldDeleteAvatar.value)
        resetAvatar()
    } catch (error) {
        // Error already handled by composable
    }
}

async function updatePassword() {
    await submitPasswordChange()
}

function deleteAvatar() {
    markAvatarForDeletion()
}

function handleCancelProfileEdit() {
    cancelProfileEdit()
    resetAvatar()
}

// Address management
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
    company: null,
    address_line_1: '',
    address_line_2: null,
    city: '',
    state: null,
    postal_code: '',
    country_code: '',
    phone: null,
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
        company: address.company,
        address_line_1: address.address_line_1,
        address_line_2: address.address_line_2,
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        country_code: address.country_code,
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
        company: null,
        address_line_1: '',
        address_line_2: null,
        city: '',
        state: null,
        postal_code: '',
        country_code: '',
        phone: null,
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
            // Update existing address - exclude is_default field
            const { is_default, ...updateData } = addressForm.value
            await updateAddress(currentAddress.value.uuid, updateData as AddressFormData)
        } else {
            // Create new address
            await createAddress(addressForm.value)
        }
        // Reload addresses and hide form
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
        await fetchAddresses()
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

// Fetch addresses on component mount
onMounted(async () => {
    await fetchAddresses()
    // Show form if no addresses exist
    if (addresses.value.length === 0) {
        showAddressForm.value = true
    }
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
    transition: transform 0.3s ease;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
    transform: scale(0.95);
}
</style>
