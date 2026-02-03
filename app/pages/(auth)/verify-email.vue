<template>
    <div
        class="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-white relative overflow-hidden">
        <!-- Animated Background Shapes -->
        <div class="absolute inset-0">
            <div class="absolute top-20 -left-20 w-96 h-96 bg-gray-100 rounded-full blur-3xl animate-pulse"></div>
            <div
                class="absolute bottom-20 -right-20 w-125 h-125 bg-gray-50 rounded-full blur-3xl animate-pulse delay-1000">
            </div>
            <div class="absolute top-1/2 left-1/2 w-80 h-80 bg-gray-100 rounded-full blur-3xl animate-bounce-slow">
            </div>
        </div>

        <!-- Content Card -->
        <div class="relative z-10 w-full max-w-md">
            <div class="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

                <!-- VERIFICATION IN PROGRESS STATE (when clicked link from email) -->
                <div v-if="isVerifying" class="text-center">
                    <NuxtLink to="/" class="inline-block mb-4">
                        <img src="/logo.png" alt="TanXLM" class="h-18 mx-auto" />
                    </NuxtLink>
                    <div class="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Loader2 class="w-10 h-10 text-gray-900 animate-spin" />
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-3">Verifying your email</h1>
                    <p class="text-gray-600 text-base">
                        Please wait while we verify your email address...
                    </p>
                </div>

                <!-- VERIFICATION SUCCESS STATE -->
                <div v-else-if="verificationSuccess" class="text-center">
                    <NuxtLink to="/" class="inline-block mb-4">
                        <img src="/logo.png" alt="TanXLM" class="h-18 mx-auto" />
                    </NuxtLink>
                    <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle class="w-10 h-10 text-green-600" />
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-3">Email verified!</h1>
                    <p class="text-gray-600 text-base mb-6">
                        Your email has been successfully verified. You can now access all features.
                    </p>

                    <button
                        @click="navigateTo('/')"
                        class="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <span>Continue to Home</span>
                        <ArrowRight class="w-5 h-5" />
                    </button>
                </div>

                <!-- VERIFICATION FAILED STATE -->
                <div v-else-if="verificationFailed" class="text-center">
                    <NuxtLink to="/" class="inline-block mb-4">
                        <img src="/logo.png" alt="TanXLM" class="h-18 mx-auto" />
                    </NuxtLink>
                    <div class="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <XCircle class="w-10 h-10 text-red-600" />
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900 mb-3">Verification failed</h1>
                    <p class="text-gray-600 text-base mb-6">
                        {{ errorMessage || 'This verification link is invalid or has expired.' }}
                    </p>

                    <div class="space-y-3">
                        <button
                            @click="resetToResendState"
                            class="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            <RefreshCw class="w-5 h-5" />
                            <span>Request new verification email</span>
                        </button>
                    </div>
                </div>

                <!-- DEFAULT STATE: WAITING FOR VERIFICATION (show resend option) -->
                <div v-else>
                    <!-- Email Icon -->
                    <div class="mb-6 text-center">
                        <NuxtLink to="/" class="inline-block mb-4">
                            <img src="/logo.png" alt="TanXLM" class="h-18 mx-auto" />
                        </NuxtLink>
                        <div class="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Mail class="w-10 h-10 text-gray-900" />
                        </div>
                        <h1 class="text-3xl font-bold text-gray-900 mb-3">Verify your email</h1>
                        <p class="text-gray-600 text-base">
                            We've sent a verification email to
                        </p>
                        <p class="text-gray-900 font-semibold text-lg mt-1">
                            {{ authStore.user?.email }}
                        </p>
                    </div>

                    <!-- Instructions -->
                    <div class="bg-gray-50 rounded-xl p-5 mb-6">
                        <p class="text-sm text-gray-700 leading-relaxed">
                            Please check your inbox and click the verification link to activate your account. If you don't see the email, check your spam folder.
                        </p>
                    </div>

                    <!-- Success Message -->
                    <Transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
                        leave-to-class="opacity-0 -translate-y-2">
                        <div v-if="emailResent"
                            class="mb-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 flex items-start gap-3">
                            <CheckCircle class="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <div>
                                <p class="text-sm font-medium text-green-800">Email sent!</p>
                                <p class="text-sm text-green-700 mt-1">Check your inbox for the verification link.</p>
                            </div>
                        </div>
                    </Transition>

                    <!-- Resend Button -->
                    <button
                        @click="handleResend"
                        :disabled="isResending || cooldownActive"
                        class="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <Loader2 v-if="isResending" class="w-5 h-5 animate-spin" />
                        <template v-else>
                            <RefreshCw class="w-5 h-5" />
                            <span v-if="cooldownActive">Resend in {{ cooldownSeconds }}s</span>
                            <span v-else>Resend verification email</span>
                        </template>
                    </button>

                    <!-- Back to Home -->
                    <div class="mt-6 text-center">
                        <button
                            @click="handleLogout"
                            class="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <ToastContainer />
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Mail, RefreshCw, Loader2, ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-vue-next'

definePageMeta({
    layout: false
})

const route = useRoute()
const authStore = useAuthStore()

// Use email verification composable
const {
    isVerifying,
    verificationSuccess,
    verificationFailed,
    errorMessage,
    isResending,
    emailResent,
    cooldownActive,
    cooldownSeconds,
    verifyEmail,
    resendVerificationEmail,
    resetVerificationState,
    stopCooldown
} = useEmailVerification()

onMounted(async () => {
    // Check if this is a verification link (has id and hash query params)
    const id = route.query.id as string
    const hash = route.query.hash as string
    const signature = route.query.signature as string
    const expires = route.query.expires as string

    if (id && hash) {
        // This is a verification attempt from email link
        // Check if user is authenticated first
        if (!authStore.isAuthenticated) {
            // User must sign in before verifying email
            // Redirect to signin with the verification link as redirect param
            const currentUrl = route.fullPath
            navigateTo({
                path: '/signin',
                query: { redirect: currentUrl }
            })
            return
        }

        // User is authenticated, proceed with verification
        await verifyEmail(id, hash, signature, expires)
    } else {
        // Regular verify email page - check if user is authenticated
        if (!authStore.isAuthenticated) {
            navigateTo('/signin')
            return
        }

        // Check if already verified
        if (authStore.user?.email_verified_at) {
            navigateTo('/')
        }
    }
})

function resetToResendState() {
    resetVerificationState()
}

async function handleResend() {
    await resendVerificationEmail()
}

async function handleLogout() {
    await authStore.logout()
    navigateTo('/signin')
}

onUnmounted(() => {
    stopCooldown()
})
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