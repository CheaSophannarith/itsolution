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
                <div class="mb-2 text-center">
                    <NuxtLink to="/" class="inline-block mb-1">
                        <img src="/logo.png" alt="TanXLM" class="h-18 mx-auto" />
                    </NuxtLink>
                    <h1 class="text-4xl font-bold text-gray-900 mb-3">Welcome back</h1>
                    <p class="text-gray-500 text-lg">Sign in to your account to continue</p>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="space-y-5">
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
                        <div class="text-right mt-2">
                            <NuxtLink to="/forgot-password"
                                class="text-sm text-gray-900 hover:text-gray-700 transition-colors font-semibold">
                                Forgot password?
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center gap-3">
                        <input id="remember" v-model="form.rememberMe" type="checkbox"
                            class="w-5 h-5 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 cursor-pointer" />
                        <label for="remember" class="text-sm text-gray-600 cursor-pointer font-medium">
                            Remember me
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
                        <template v-else>
                            <span>Sign in</span>
                        </template>
                    </button>
                </form>

                <!-- Register Link -->
                <p class="mt-6 text-center text-gray-600">
                    Don't have an account?
                    <NuxtLink to="/signup" class="text-gray-900 font-bold hover:text-gray-700 transition-colors ml-1">
                        Create an account
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
    import { ref } from 'vue'
    import { Eye, EyeOff, Loader2, ArrowLeft, ArrowRight, Mail, Lock } from 'lucide-vue-next'

    definePageMeta({
        layout: false,
        middleware: 'guest'
    })

    const authStore = useAuthStore()
    const { addToast } = useToast()
    const route = useRoute()

    const form = ref({
        email: '',
        password: '',
        rememberMe: false
    })

    const showPassword = ref(false)
    const isLoading = ref(false)
    const errorMessage = ref('')

    async function handleLogin() {
        isLoading.value = true
        errorMessage.value = ''

        try {
            await authStore.login({
                email: form.value.email,
                password: form.value.password,
            })

            addToast('Welcome back! You have successfully signed in.', 'success')

            // Get redirect URL if present (e.g., from verification link)
            const redirect = route.query.redirect as string

            // Check if email verification is required
            if (!authStore.user?.email_verified_at) {
                // If there's a redirect URL (like verification link), go there
                if (redirect) {
                    navigateTo(redirect)
                } else {
                    // Otherwise redirect to verify email page
                    addToast('Please verify your email address to continue.', 'info')
                    navigateTo('/verify-email')
                }
            } else {
                // Email is verified, redirect to the page user was trying to access, or home
                navigateTo(redirect || '/')
            }
        } catch (error: any) {
            console.error('Login failed:', error)

            // Handle validation errors from Laravel
            if (error.errors) {
                const firstError = Object.values(error.errors)[0]
                errorMessage.value = Array.isArray(firstError) ? firstError[0] : firstError
            } else if (error.message) {
                errorMessage.value = error.message
            } else {
                errorMessage.value = 'An error occurred. Please try again.'
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