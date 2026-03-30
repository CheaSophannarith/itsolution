<template>
         <div class="bg-white rounded-xl border border-gray-200 overflow-hidden md:flex md:flex-col md:h-full">
                        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                                    <Lock class="w-4 h-4 text-brand" />
                                </div>
                                <h2 class="text-base font-semibold text-gray-900">Change Password</h2>
                            </div>
                        </div>

                        <div class="p-6">
                            <form @submit.prevent="updatePassword" class="space-y-4 max-w-md">
                                <div>
                                    <label for="current_password" class="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                                    <div class="relative">
                                        <input v-model="currentPassword" :type="showCurrentPassword ? 'text' : 'password'" id="current_password"
                                            class="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                                        <button type="button" @click="toggleCurrentPasswordVisibility"
                                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            <Eye v-if="showCurrentPassword" class="w-5 h-5" />
                                            <EyeOff v-else class="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label for="new_password" class="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                                    <div class="relative">
                                        <input v-model="newPassword" :type="showNewPassword ? 'text' : 'password'" id="new_password"
                                            class="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-sm">
                                        <button type="button" @click="toggleNewPasswordVisibility"
                                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            <Eye v-if="showNewPassword" class="w-5 h-5" />
                                            <EyeOff v-else class="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div v-if="newPassword" class="mt-2 space-y-1 text-xs">
                                        <p :class="passwordRequirements.minLength ? 'text-green-600' : 'text-gray-400'">
                                            {{ passwordRequirements.minLength ? '✓' : '○' }} At least 8 characters
                                        </p>
                                        <p :class="passwordRequirements.hasUppercase ? 'text-green-600' : 'text-gray-400'">
                                            {{ passwordRequirements.hasUppercase ? '✓' : '○' }} One uppercase letter
                                        </p>
                                        <p :class="passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-400'">
                                            {{ passwordRequirements.hasNumber ? '✓' : '○' }} One number
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label for="confirm_password" class="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                                    <div class="relative">
                                        <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" id="confirm_password"
                                            :class="confirmPassword && newPassword !== confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-brand focus:border-brand'"
                                            class="w-full px-4 py-2.5 pr-10 border rounded-lg focus:ring-2 transition-colors text-sm">
                                        <button type="button" @click="toggleConfirmPasswordVisibility"
                                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            <Eye v-if="showConfirmPassword" class="w-5 h-5" />
                                            <EyeOff v-else class="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p v-if="confirmPassword && newPassword !== confirmPassword"
                                        class="mt-1.5 text-xs text-red-500 font-medium">
                                        Passwords do not match
                                    </p>
                                </div>

                                <div class="flex justify-end pt-2 border-t border-gray-100">
                                    <button type="submit" :disabled="isUpdatingPassword"
                                        class="px-5 py-2.5 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50 text-sm font-semibold flex items-center gap-2">
                                        <Loader2 v-if="isUpdatingPassword" class="w-4 h-4 animate-spin" />
                                        Save Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
</template>

<script setup lang="ts">
//icon
import { Lock, Eye, EyeOff } from 'lucide-vue-next';
// Password form composable
const {
    currentPassword,
    newPassword,
    confirmPassword,
   
    isSubmitting: isUpdatingPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    submitPasswordChange,
    toggleCurrentPasswordVisibility,
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
} = usePasswordForm()

const passwordRequirements = computed(() => ({
    minLength: newPassword.value.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword.value),
    hasNumber: /[0-9]/.test(newPassword.value)
}))



async function updatePassword() {
    await submitPasswordChange()
}
</script>