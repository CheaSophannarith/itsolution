export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // Check if user is already authenticated
    if (authStore.isAuthenticated) {
        // Check if email is verified
        if (!authStore.user?.email_verified_at) {
            // If not verified, redirect to verify-email page
            return navigateTo('/verify-email');
        }

        // If authenticated and verified, redirect to home
        return navigateTo('/');
    }
});