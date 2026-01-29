import { ref } from 'vue';

export const useEmailVerification = () => {
    const authStore = useAuthStore();
    const { addToast } = useToast();

    const isVerifying = ref(false);
    const verificationSuccess = ref(false);
    const verificationFailed = ref(false);
    const errorMessage = ref('');

    const isResending = ref(false);
    const emailResent = ref(false);
    const cooldownActive = ref(false);
    const cooldownSeconds = ref(60);
    let cooldownInterval: NodeJS.Timeout | null = null;

    /**
     * Verify email using the verification link parameters
     */
    async function verifyEmail(id: string, hash: string, signature?: string, expires?: string) {
        isVerifying.value = true;
        verificationSuccess.value = false;
        verificationFailed.value = false;

        // If user is logged in and already verified, show success immediately
        if (authStore.isAuthenticated && authStore.user?.email_verified_at) {
            isVerifying.value = false;
            verificationSuccess.value = true;
            addToast('Your email is already verified!', 'success');

            // Redirect to home after 2 seconds with full page reload
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
            return;
        }

        try {
            // Build the API URL with query parameters for Laravel signed URL
            const api = useApi();
            let verifyUrl = `/api/v1/auth/email/verify/${id}/${hash}`;

            // Add signature and expires if present (for Laravel signed URLs)
            const params = new URLSearchParams();
            if (signature) params.append('signature', signature);
            if (expires) params.append('expires', expires);

            if (params.toString()) {
                verifyUrl += `?${params.toString()}`;
            }

            await api.get(verifyUrl);

            // Refresh user data if logged in
            if (authStore.isAuthenticated) {
                await authStore.fetchUser();
            }

            isVerifying.value = false;
            verificationSuccess.value = true;
            addToast('Email verified successfully!', 'success');

            // Redirect to home after 2 seconds with full page reload
            // This ensures the middleware sees the updated user data
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error: any) {
            console.error('Email verification failed:', error);

            isVerifying.value = false;

            // Extract error message from various error formats
            const errorMsg = error?.message || error?.error || JSON.stringify(error);

            // Check if email is already verified (this should be treated as success)
            if (errorMsg.toLowerCase().includes('already verified') ||
                errorMsg.toLowerCase().includes('email has been verified')) {
                verificationSuccess.value = true;
                addToast('Your email is already verified!', 'success');

                // Refresh user data if logged in
                if (authStore.isAuthenticated) {
                    await authStore.fetchUser();
                }

                // Redirect to home after 2 seconds with full page reload
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
                return;
            }

            // For other errors, show failure state
            verificationFailed.value = true;

            if (error.message) {
                if (error.message.includes('403') || error.message.toLowerCase().includes('invalid signature') ||
                    error.message.toLowerCase().includes('forbidden')) {
                    errorMessage.value = 'This verification link is invalid or has expired.';
                } else if (error.message.includes('404') || error.message.toLowerCase().includes('not found')) {
                    errorMessage.value = 'User not found. Please contact support.';
                } else {
                    errorMessage.value = error.message;
                }
            } else {
                errorMessage.value = 'Failed to verify email. Please try again or request a new verification link.';
            }

            addToast(errorMessage.value, 'error');
        }
    }

    /**
     * Resend verification email
     */
    async function resendVerificationEmail() {
        if (cooldownActive.value || isResending.value) return;

        isResending.value = true;
        emailResent.value = false;

        try {
            await authStore.resendVerificationEmail();
            emailResent.value = true;
            addToast('Verification email sent successfully!', 'success');

            // Start cooldown
            startCooldown();
        } catch (error: any) {
            console.error('Failed to resend email:', error);

            // Extract error message from various error formats
            const errorMessage = error?.message || error?.error || JSON.stringify(error);

            // Check if already verified
            if (errorMessage.toLowerCase().includes('already verified') ||
                errorMessage.toLowerCase().includes('email has been verified')) {
                // This is actually good news - show success
                addToast('Your email is already verified!', 'success');

                // Refresh user and redirect with full page reload
                await authStore.fetchUser();
                if (authStore.user?.email_verified_at) {
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                }
                return;
            }

            // For actual errors
            let errorMsg = 'Failed to resend verification email. Please try again.';

            if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('too many')) {
                errorMsg = 'Too many requests. Please wait a moment before trying again.';
            } else if (errorMessage) {
                errorMsg = errorMessage;
            }

            addToast(errorMsg, 'error');
        } finally {
            isResending.value = false;
        }
    }

    /**
     * Reset verification state
     */
    function resetVerificationState() {
        verificationFailed.value = false;
        isVerifying.value = false;
        verificationSuccess.value = false;
    }

    /**
     * Start resend cooldown timer
     */
    function startCooldown() {
        cooldownActive.value = true;
        cooldownSeconds.value = 60;

        cooldownInterval = setInterval(() => {
            cooldownSeconds.value--;

            if (cooldownSeconds.value <= 0) {
                stopCooldown();
            }
        }, 1000);
    }

    /**
     * Stop resend cooldown timer
     */
    function stopCooldown() {
        if (cooldownInterval) {
            clearInterval(cooldownInterval);
            cooldownInterval = null;
        }
        cooldownActive.value = false;
        cooldownSeconds.value = 60;
    }

    /**
     * Check if user needs verification
     */
    function needsVerification() {
        return authStore.isAuthenticated && !authStore.user?.email_verified_at;
    }

    return {
        // State
        isVerifying,
        verificationSuccess,
        verificationFailed,
        errorMessage,
        isResending,
        emailResent,
        cooldownActive,
        cooldownSeconds,

        // Methods
        verifyEmail,
        resendVerificationEmail,
        resetVerificationState,
        startCooldown,
        stopCooldown,
        needsVerification
    };
};