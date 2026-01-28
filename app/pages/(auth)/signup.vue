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
        <div class="relative z-10 w-full max-w-xl my-2">
            <div class="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">


                <!-- Form Header -->
                <div class="mb-2 text-center">
                    <NuxtLink to="/" class="inline-block mb-1">
                        <img src="/logo.png" alt="TanXLM" class="h-18 mx-auto" />
                    </NuxtLink>
                    <h1 class="text-4xl font-bold text-gray-900 mb-3">Create an account</h1>
                    <p class="text-gray-500 text-lg">Get started with your free account today</p>
                </div>

                <!-- Register Form -->
                <form @submit.prevent="handleRegister" class="space-y-5">
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

                    <!-- Name Fields -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <input id="firstName" v-model="form.firstName" type="text" placeholder="First Name" required
                                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 hover:border-gray-300" />
                        </div>
                        <div>
                            <input id="lastName" v-model="form.lastName" type="text" placeholder="Last Name" required
                                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 hover:border-gray-300" />
                        </div>
                    </div>

                    <!-- Email Field -->
                    <div>
                        <div class="relative">
                            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input id="email" v-model="form.email" type="email" placeholder="Email" required
                                class="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 hover:border-gray-300" />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <div class="relative">
                            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Password" required
                                class="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-200 hover:border-gray-300" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors">
                                <Eye v-if="showPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                        <!-- Password Strength -->
                        <div class="flex gap-1.5 mt-2">
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
                            <input id="confirmPassword" v-model="form.confirmPassword"
                                :type="showConfirmPassword ? 'text' : 'password'" placeholder="Re-enter your password"
                                required
                                class="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 hover:border-gray-300"
                                :class="form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900 focus:border-gray-900'" />
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors">
                                <Eye v-if="showConfirmPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                        <p v-if="form.confirmPassword && form.password !== form.confirmPassword"
                            class="flex items-center gap-1.5 text-sm text-red-500 font-medium">
                            <AlertCircle class="w-4 h-4" />
                            Passwords do not match
                        </p>
                    </div>

                    <!-- Terms & Conditions -->
                    <div class="flex items-start gap-3 pt-2">
                        <input id="terms" v-model="form.acceptTerms" type="checkbox" required
                            class="w-5 h-5 mt-0.5 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 cursor-pointer" />
                        <label for="terms" class="text-sm text-gray-600 cursor-pointer leading-relaxed">
                            I agree all
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit"
                        class="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
                        <template v-else>
                            <span>Create account</span>
                        </template>
                    </button>
                </form>

                <!-- Login Link -->
                <p class="mt-6 text-center text-gray-600">
                    Already have an account?
                    <NuxtLink to="/signin" class="text-gray-900 font-bold hover:text-gray-700 transition-colors ml-1">
                        Sign in
                    </NuxtLink>
                </p>
            </div>

            <!-- Back to Home -->
            <div class="mt-6 text-center">
                <NuxtLink to="/"
                    class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    <ArrowLeft class="w-4 h-4" />
                    Back to Home
                </NuxtLink>
            </div>
        </div>

        <ToastContainer />
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { Eye, EyeOff, Loader2, ArrowLeft, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-vue-next'

    definePageMeta({
        layout: false
    })

    const authStore = useAuthStore()
    const { addToast } = useToast()

    const form = ref({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    })

    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref('')

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
        return form.value.firstName &&
            form.value.lastName &&
            form.value.email &&
            form.value.password &&
            form.value.confirmPassword &&
            form.value.password === form.value.confirmPassword &&
            form.value.acceptTerms &&
            passwordRequirements.value.minLength &&
            passwordRequirements.value.hasUppercase &&
            passwordRequirements.value.hasNumber
    })

    async function handleRegister() {
        // Validate form before submission
        if (!isFormValid.value) {
            // Check what's missing and show appropriate error
            if (!form.value.firstName || !form.value.lastName) {
                errorMessage.value = 'Please enter your first and last name.'
                return
            }
            if (!form.value.email) {
                errorMessage.value = 'Please enter your email address.'
                return
            }
            if (!form.value.password) {
                errorMessage.value = 'Please enter a password.'
                return
            }
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
            if (!form.value.acceptTerms) {
                errorMessage.value = 'Please accept the terms and conditions.'
                return
            }
            return
        }

        isLoading.value = true
        errorMessage.value = ''

        try {
            await authStore.register({
                name: `${form.value.firstName} ${form.value.lastName}`,
                email: form.value.email,
                password: form.value.password,
                password_confirmation: form.value.confirmPassword
            })

            addToast('Account created! Welcome to TanXLM!', 'success')

            // Redirect to home after successful registration (user is already logged in)
            navigateTo('/')
        } catch (error: any) {
            console.error('Registration failed:', error)

            // Handle validation errors from Laravel
            if (error.errors && typeof error.errors === 'object') {
                // Get all error messages
                const errors = Object.values(error.errors).flat()
                const firstError = errors[0]

                // Map common Laravel errors to friendly messages
                if (typeof firstError === 'string') {
                    if (firstError.toLowerCase().includes('email') && firstError.toLowerCase().includes('taken')) {
                        errorMessage.value = 'This email is already registered. Please sign in or use a different email.'
                    } else if (firstError.toLowerCase().includes('password')) {
                        errorMessage.value = firstError
                    } else {
                        errorMessage.value = firstError
                    }
                } else {
                    errorMessage.value = 'Please check your information and try again.'
                }
            } else if (error.message) {
                // Handle network and other errors with friendly messages
                if (error.message.includes('fetch') || error.message.includes('Network')) {
                    errorMessage.value = 'Cannot connect to server. Please check your internet connection and try again.'
                } else if (error.message.includes('429') || error.message.includes('Too Many')) {
                    errorMessage.value = 'Too many registration attempts. Please wait a few minutes and try again.'
                } else if (error.message.includes('500') || error.message.includes('Server Error')) {
                    errorMessage.value = 'Server error. Please try again later or contact support if the problem persists.'
                } else {
                    errorMessage.value = error.message
                }
            } else {
                errorMessage.value = 'Unable to create account. Please try again later.'
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