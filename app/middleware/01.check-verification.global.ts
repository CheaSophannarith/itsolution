export default defineNuxtRouteMiddleware((to, from) => {
    // Only run on client-side (not during SSR)
    if (process.server) return;

    const authStore = useAuthStore();

    // List of paths that don't require email verification
    const excludedPaths = [
        '/signin',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/verify-email'
    ];

    // Check if current path is excluded
    const isExcluded = excludedPaths.some(path => to.path.startsWith(path));

    // If user is authenticated, email not verified, and trying to access a protected page
    if (authStore.isAuthenticated && !authStore.user?.email_verified_at && !isExcluded) {
        // Redirect to verify-email page
        return navigateTo('/verify-email');
    }
});