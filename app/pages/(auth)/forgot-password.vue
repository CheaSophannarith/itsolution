<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full">
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <!-- Logo/Header -->
                <div class="text-center mb-8">
                    <NuxtLink to="/" class="inline-block mb-6">
                        <img src="/logo.png" alt="TanXLM" class="h-18 mx-auto" />
                    </NuxtLink>
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                    <p class="text-gray-600">Enter your email to reset your password</p>
                </div>

                <!-- Success Message -->
                <div v-if="emailSent" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div class="flex items-start gap-3">
                        <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p class="text-sm font-medium text-green-800">Reset link sent!</p>
                            <p class="text-sm text-green-700 mt-1">Check your email for password reset instructions.</p>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <form v-if="!emailSent" @submit.prevent="handleSubmit" class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail class="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                v-model="form.email"
                                type="email"
                                id="email"
                                required
                                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
                        <span>Send Reset Link</span>
                    </button>
                </form>

                <!-- Back to Sign In -->
                <div class="mt-6 text-center">
                    <NuxtLink
                        to="/signin"
                        class="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
                    >
                        <ArrowLeft class="w-4 h-4" />
                        Back to Sign In
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-vue-next'

definePageMeta({
    layout: false,
    middleware: 'guest'
})

const form = ref({
    email: ''
})

const loading = ref(false)
const emailSent = ref(false)

async function handleSubmit() {
    loading.value = true
    try {
        // TODO: Implement forgot password API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        emailSent.value = true
    } catch (error) {
        console.error('Failed to send reset email:', error)
    } finally {
        loading.value = false
    }
}
</script>