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
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { Eye, EyeOff, Loader2, ArrowLeft, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-vue-next'

    definePageMeta({
        layout: false
    })

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
        if (!isFormValid.value) return

        isLoading.value = true

        try {
            // TODO: Implement actual registration logic
            console.log('Registration attempt:', form.value)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Redirect to signin or dashboard after successful registration
            navigateTo('/signin')
        } catch (error) {
            console.error('Registration failed:', error)
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