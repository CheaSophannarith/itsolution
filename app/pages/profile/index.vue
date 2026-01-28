<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-4xl mx-auto px-4 sm:px-6">
            <!-- Page Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">My Account</h1>
                <p class="text-gray-600 mt-2">Manage your account information and preferences</p>
            </div>

            <!-- Account Information Card -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div class="px-6 py-4 bg-gradient-to-r from-brand to-brand/90 border-b border-brand flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-white">Account Information</h2>
                    <button v-if="!showProfileForm" @click="showProfileForm = true" type="button"
                        class="px-4 py-2 bg-white text-brand rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Edit Profile
                    </button>
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-20 h-20 bg-brand rounded-full flex items-center justify-center">
                            <User class="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold text-gray-900">{{ authStore.user?.name }}</h3>
                            <p class="text-gray-600">{{ authStore.user?.email }}</p>
                            <span v-if="authStore.user?.email_verified_at"
                                class="inline-flex items-center gap-1 mt-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                                <CheckCircle class="w-3 h-3" />
                                Verified
                            </span>
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
                            <button type="button" @click="cancelProfileEdit"
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
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900">Change Password</h2>
                    <button v-if="!showPasswordForm" @click="showPasswordForm = true" type="button"
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
                                <input v-model="passwordForm.current_password"
                                    :type="showCurrentPassword ? 'text' : 'password'" id="current_password"
                                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                                <button type="button" @click="showCurrentPassword = !showCurrentPassword"
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
                                <input v-model="passwordForm.new_password" :type="showNewPassword ? 'text' : 'password'"
                                    id="new_password"
                                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                                <button type="button" @click="showNewPassword = !showNewPassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Eye v-if="showNewPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label for="confirm_password" class="block text-sm font-medium text-gray-700 mb-1">Confirm
                                New Password</label>
                            <div class="relative">
                                <input v-model="passwordForm.confirm_password"
                                    :type="showConfirmPassword ? 'text' : 'password'" id="confirm_password"
                                    class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors">
                                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <Eye v-if="showConfirmPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User, CheckCircle, Eye, EyeOff, Loader2 } from 'lucide-vue-next'

definePageMeta({
    middleware: 'auth'
})

const authStore = useAuthStore()
const { addToast } = useToast()

// Form visibility
const showProfileForm = ref(false)
const showPasswordForm = ref(false)

// Profile form
const profileForm = ref({
    name: '',
    email: ''
})

const isUpdating = ref(false)

// Password form
const passwordForm = ref({
    current_password: '',
    new_password: '',
    confirm_password: ''
})

const isUpdatingPassword = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

onMounted(() => {
    if (authStore.user) {
        profileForm.value.name = authStore.user.name
        profileForm.value.email = authStore.user.email
    }
})

function resetForm() {
    if (authStore.user) {
        profileForm.value.name = authStore.user.name
        profileForm.value.email = authStore.user.email
    }
}

function cancelProfileEdit() {
    resetForm()
    showProfileForm.value = false
}

function resetPasswordForm() {
    passwordForm.value = {
        current_password: '',
        new_password: '',
        confirm_password: ''
    }
}

function cancelPasswordEdit() {
    resetPasswordForm()
    showPasswordForm.value = false
}

async function updateProfile() {
    isUpdating.value = true
    try {
        // TODO: Implement profile update API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        addToast('Profile updated successfully!', 'success')
        showProfileForm.value = false
    } catch (error) {
        console.error('Update failed:', error)
        addToast('Failed to update profile. Please try again.', 'error')
    } finally {
        isUpdating.value = false
    }
}

async function updatePassword() {
    if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
        addToast('New passwords do not match.', 'error')
        return
    }

    if (passwordForm.value.new_password.length < 8) {
        addToast('Password must be at least 8 characters long.', 'error')
        return
    }

    isUpdatingPassword.value = true
    try {
        // TODO: Implement password update API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        addToast('Password updated successfully!', 'success')
        resetPasswordForm()
        showPasswordForm.value = false
    } catch (error) {
        console.error('Password update failed:', error)
        addToast('Failed to update password. Please try again.', 'error')
    } finally {
        isUpdatingPassword.value = false
    }
}

</script>
