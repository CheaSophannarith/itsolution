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
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { User, CheckCircle, Eye, EyeOff, Loader2, Upload, Trash2 } from 'lucide-vue-next'

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
</script>
