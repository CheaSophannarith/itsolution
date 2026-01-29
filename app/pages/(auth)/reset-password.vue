<template>
    <div
        class="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-white relative overflow-hidden">
        <!-- Animated Background Shapes -->
        <div class="absolute inset-0">
            <div class="absolute top-20 -left-20 w-96 h-96 bg-gray-100 rounded-full blur-3xl animate-pulse"></div>
            <div
                class="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-gray-50 rounded-full blur-3xl animate-pulse delay-1000">
            </div>
            <div class="absolute top-1/2 left-1/2 w-80 h-80 bg-gray-100 rounded-full blur-3xl animate-bounce-slow">
            </div>
        </div>

        <!-- Form Card -->
        <div class="relative z-10 w-full max-w-md">
            <div class="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <!-- Form Header -->
                <div class="mb-6 text-center">
                    <NuxtLink to="/" class="inline-block mb-4">
                        <img src="/logo.png" alt="TanXLM" class="h-18 mx-auto" />
                    </NuxtLink>
                    <h1 class="text-3xl font-bold text-gray-900 mb-3">Reset your password</h1>
                    <p class="text-gray-600 text-base">Enter your new password below</p>
                </div>

                <!-- Reset Password Form -->
                <form @submit.prevent="handleResetPassword" class="space-y-5">
                    <!-- Error Alert Banner -->
                    <Transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 -translate-y-2">
                        <div v-if="errorMessage"
                            class="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div class="flex-1">
                                <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
                            </div>
                            <button @click="errorMessage = ''" type="button"
                                class="text-red-400 hover:text-red-600 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </Transition>

                    <!-- Email Field (readonly) -->
                    <div>
                        <div class="relative">
                            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                v-model="form.email"
                                type="email"
                                placeholder="Email"
                                readonly
                                class="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <div class="relative">
                            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                v-model="form.password"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="New Password"
                                required
                                class="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 hover:border-gray-300"
                            />
                            <button
                                type="button"
                                @click="showPassword = !showPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <Eye v-if="showPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                        <!-- Password Strength -->
                        <div v-if="form.password" class="flex gap-1.5 mt-2">
                            <div class="h-1.5 flex-1 rounded-full transition-all duration-300"
                                :class="passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-200'"></div>
                            <div class="h-1.5 flex-1 rounded-full transition-all duration-300"
                                :class="passwordStrength >= 2 ? 'bg-orange-500' : 'bg-gray-200'"></div>
                            <div class="h-1.5 flex-1 rounded-full transition-all duration-300"
                                :class="passwordStrength >= 3 ? 'bg-yellow-500' : 'bg-gray-200'"></div>
                            <div class="h-1.5 flex-1 rounded-full transition-all duration-300"
                                :class="passwordStrength >= 4 ? 'bg-green-500' : 'bg-gray-200'"></div>
                        </div>
                        <!-- Password Requirements -->
                        <div v-if="form.password" class="mt-2 space-y-1 text-xs">
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

                    <!-- Confirm Password Field -->
                    <div>
                        <div class="relative">
                            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                v-model="form.confirmPassword"
                                :type="showConfirmPassword ? 'text' : 'password'"
                                placeholder="Confirm New Password"
                                required
                                class="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-gray-300"
                                :class="form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900 focus:border-gray-900'"
                            />
                            <button
                                type="button"
                                @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <Eye v-if="showConfirmPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                        <p v-if="form.confirmPassword && form.password !== form.confirmPassword"
                            class="flex items-center gap-1.5 text-sm text-red-500 font-medium mt-1">
                            <AlertCircle class="w-4 h-4" />
                            Passwords do not match
                        </p>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        :disabled="isLoading || !isFormValid"
                        class="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
                        <template v-else>
                            <span>Reset Password</span>
                        </template>
                    </button>
                </form>

                <!-- Back to Sign In -->
                <div class="mt-6 text-center">
                    <NuxtLink to="/signin"
                        class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
                        <ArrowLeft class="w-4 h-4" />
                        Back to Sign In
                    </NuxtLink>
                </div>
            </div>
        </div>

        <ToastContainer />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Eye, EyeOff, Loader2, ArrowLeft, Mail, Lock, AlertCircle } from 'lucide-vue-next'

definePageMeta({
    layout: false,
    middleware: 'guest'
})

const route = useRoute()
const authStore = useAuthStore()
const { addToast } = useToast()

const form = ref({
    token: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// Get token and email from query params
onMounted(() => {
    form.value.token = route.query.token as string || ''
    form.value.email = route.query.email as string || ''

    if (!form.value.token || !form.value.email) {
        errorMessage.value = 'Invalid password reset link. Please request a new one.'
    }
})

const passwordRequirements = computed(() => ({
    minLength: form.value.password.length >= 8,
    hasUppercase: /[A-Z]/.test(form.value.password),
    hasNumber: /[0-9]/.test(form.value.password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(form.value.password)
}))

const passwordStrength = computed(() => {
    let strength = 0
    if (passwordRequirements.value.minLength) strength++
    if (passwordRequirements.value.hasUppercase) strength++
    if (passwordRequirements.value.hasNumber) strength++
    if (passwordRequirements.value.hasSpecial) strength++
    return strength
})

const isFormValid = computed(() => {
    return form.value.token &&
        form.value.email &&
        form.value.password &&
        form.value.confirmPassword &&
        form.value.password === form.value.confirmPassword &&
        passwordRequirements.value.minLength &&
        passwordRequirements.value.hasUppercase &&
        passwordRequirements.value.hasNumber
})

async function handleResetPassword() {
    if (!isFormValid.value) {
        if (!passwordRequirements.value.minLength) {
            errorMessage.value = 'Password must be at least 8 characters long.'
            return
        }
        if (!passwordRequirements.value.hasUppercase) {
            errorMessage.value = 'Password must contain at least one uppercase letter.'
            return
        }
        if (!passwordRequirements.value.hasNumber) {
            errorMessage.value = 'Password must contain at least one number.'
            return
        }
        if (form.value.password !== form.value.confirmPassword) {
            errorMessage.value = 'Passwords do not match.'
            return
        }
        return
    }

    isLoading.value = true
    errorMessage.value = ''

    try {
        await authStore.resetPassword({
            token: form.value.token,
            email: form.value.email,
            password: form.value.password,
            password_confirmation: form.value.confirmPassword
        })

        addToast('Password reset successfully! Please sign in with your new password.', 'success')

        // Redirect to sign in page
        setTimeout(() => {
            navigateTo('/signin')
        }, 1500)
    } catch (error: any) {
        console.error('Password reset failed:', error)

        if (error.errors && typeof error.errors === 'object') {
            const errors = Object.values(error.errors).flat()
            errorMessage.value = errors[0] as string || 'Failed to reset password.'
        } else if (error.message) {
            if (error.message.includes('token') || error.message.includes('invalid')) {
                errorMessage.value = 'This password reset link is invalid or has expired. Please request a new one.'
            } else if (error.message.includes('429') || error.message.toLowerCase().includes('too many')) {
                errorMessage.value = 'Too many attempts. Please wait a moment before trying again.'
            } else {
                errorMessage.value = error.message
            }
        } else {
            errorMessage.value = 'Failed to reset password. Please try again.'
        }

        addToast(errorMessage.value, 'error')
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
.animate-bounce-slow {
    animation: bounce-slow 6s ease-in-out infinite;
}

@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

.delay-1000 {
    animation-delay: 1s;
}
</style>