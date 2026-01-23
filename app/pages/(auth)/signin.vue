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
        <div class="relative z-10 w-full max-w-md">
            <div class="backdrop-blur-md bg-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/20">
                <!-- Form Header -->
                <div class="mb-8 text-center">
                    <h1 class="text-3xl font-bold text-white mb-2">Welcome back</h1>
                    <p class="text-white/70">Sign in to your account to continue</p>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="space-y-5">
                    <!-- Email Field -->
                    <div class="space-y-2">
                        <label for="email" class="block text-sm font-medium text-white/90">
                            Email address
                        </label>
                        <div class="relative">
                            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input id="email" v-model="form.email" type="email" placeholder="name@example.com" required
                                class="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200" />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm font-medium text-white/90">
                                Password
                            </label>
                            <NuxtLink to="/forgot-password"
                                class="text-sm text-white/70 hover:text-white transition-colors font-medium">
                                Forgot password?
                            </NuxtLink>
                        </div>
                        <div class="relative">
                            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Enter your password" required
                                class="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors">
                                <Eye v-if="!showPassword" class="w-5 h-5" />
                                <EyeOff v-else class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center gap-3">
                        <input id="remember" v-model="form.rememberMe" type="checkbox"
                            class="w-4 h-4 bg-white/10 border-white/30 rounded focus:ring-white/20 cursor-pointer" />
                        <label for="remember" class="text-sm text-white/70 cursor-pointer">
                            Remember me for 30 days
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full flex items-center justify-center gap-2 bg-brand text-white py-3.5 rounded-xl font-semibold hover:bg-brand transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
                        <template v-else>
                            <span>Sign in</span>
                            <ArrowRight class="w-5 h-5" />
                        </template>
                    </button>
                </form>

                <!-- Register Link -->
                <p class="mt-6 text-center text-white/70">
                    Don't have an account?
                    <NuxtLink to="/signup" class="text-white font-semibold hover:text-white/80 transition-colors">
                        Create an account
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
    import { ref } from 'vue'
    import { Eye, EyeOff, Loader2, ArrowLeft, ArrowRight, Mail, Lock } from 'lucide-vue-next'

    definePageMeta({
        layout: false
    })

    const form = ref({
        email: '',
        password: '',
        rememberMe: false
    })

    const showPassword = ref(false)
    const isLoading = ref(false)

    async function handleLogin() {
        isLoading.value = true

        try {
            // TODO: Implement actual login logic
            console.log('Login attempt:', form.value)

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Redirect to home or dashboard after successful login
            navigateTo('/')
        } catch (error) {
            console.error('Login failed:', error)
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