<template>
    <div
        class="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-brand via-brand/90 to-brand/80 relative overflow-hidden">
        <!-- Animated Background Shapes -->
        <div class="absolute inset-0">
            <div class="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div
                class="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000">
            </div>
            <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-bounce-slow">
            </div>
        </div>

        <!-- Form Card -->
        <div class="relative z-10 w-full max-w-xl my-2">
            <div class="backdrop-blur-md bg-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/20">


                <!-- Form Header -->
                <div class="mb-6 text-center">
                    <h1 class="text-3xl font-bold text-white mb-2">Create an account</h1>
                    <p class="text-white/70">Get started with your free account today</p>
                </div>

                <!-- Register Form -->
                <form @submit.prevent="handleRegister" class="space-y-4">
                    <!-- Name Fields -->
                    <div class="grid grid-cols-2 gap-3">
                        <div class="space-y-1.5">
                            <label for="firstName" class="block text-sm font-medium text-white/90">
                                First name
                            </label>
                            <input id="firstName" v-model="form.firstName" type="text" placeholder="John" required
                                class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200" />
                        </div>
                        <div class="space-y-1.5">
                            <label for="lastName" class="block text-sm font-medium text-white/90">
                                Last name
                            </label>
                            <input id="lastName" v-model="form.lastName" type="text" placeholder="Doe" required
                                class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200" />
                        </div>
                    </div>

                    <!-- Email Field -->
                    <div class="space-y-1.5">
                        <label for="email" class="block text-sm font-medium text-white/90">
                            Email address
                        </label>
                        <div class="relative">
                            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input id="email" v-model="form.email" type="email" placeholder="name@example.com" required
                                class="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200" />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div class="space-y-1.5">
                        <label for="password" class="block text-sm font-medium text-white/90">
                            Password
                        </label>
                        <div class="relative">
                            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Create a password" required
                                class="w-full pl-12 pr-12 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors">
                                <Eye v-if="!showPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                        <!-- Password Strength -->
                        <div class="flex gap-1 mt-2">
                            <div class="h-1 flex-1 rounded-full transition-all duration-300"
                                :class="passwordStrength >= 1 ? 'bg-red-400' : 'bg-white/20'"></div>
                            <div class="h-1 flex-1 rounded-full transition-all duration-300"
                                :class="passwordStrength >= 2 ? 'bg-orange-400' : 'bg-white/20'"></div>
                            <div class="h-1 flex-1 rounded-full transition-all duration-300"
                                :class="passwordStrength >= 3 ? 'bg-yellow-400' : 'bg-white/20'"></div>
                            <div class="h-1 flex-1 rounded-full transition-all duration-300"
                                :class="passwordStrength >= 4 ? 'bg-green-400' : 'bg-white/20'"></div>
                        </div>
                    </div>

                    <!-- Confirm Password Field -->
                    <div class="space-y-1.5">
                        <label for="confirmPassword" class="block text-sm font-medium text-white/90">
                            Confirm password
                        </label>
                        <div class="relative">
                            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input id="confirmPassword" v-model="form.confirmPassword"
                                :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm your password"
                                required
                                class="w-full pl-12 pr-12 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200"
                                :class="form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/30' : ''" />
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors">
                                <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                        <p v-if="form.confirmPassword && form.password !== form.confirmPassword"
                            class="flex items-center gap-1 text-xs text-red-300">
                            <AlertCircle class="w-3.5 h-3.5" />
                            Passwords do not match
                        </p>
                    </div>

                    <!-- Terms & Conditions -->
                    <div class="flex items-start gap-3">
                        <input id="terms" v-model="form.acceptTerms" type="checkbox" required
                            class="w-4 h-4 mt-0.5 bg-white/10 border-white/30 rounded focus:ring-white/20 cursor-pointer" />
                        <label for="terms" class="text-sm text-white/70 cursor-pointer leading-relaxed">
                            I agree to the
                            <NuxtLink to="/terms" class="text-white hover:text-white/80 transition-colors font-medium">
                                Terms of Service
                            </NuxtLink>
                            and
                            <NuxtLink to="/privacy"
                                class="text-white hover:text-white/80 transition-colors font-medium">
                                Privacy Policy
                            </NuxtLink>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit"
                        class="w-full flex items-center justify-center gap-2 bg-brand text-white py-3 rounded-xl font-semibold hover:bg-brand transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
                        <template v-else>
                            <span>Create account</span>
                            <ArrowRight class="w-5 h-5" />
                        </template>
                    </button>
                </form>

                <!-- Login Link -->
                <p class="mt-5 text-center text-white/70">
                    Already have an account?
                    <NuxtLink to="/signin" class="text-white font-semibold hover:text-white/80 transition-colors">
                        Sign in
                    </NuxtLink>
                </p>
            </div>

            <!-- Back to Home -->
            <div class="mt-6 text-center">
                <NuxtLink to="/"
                    class="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
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