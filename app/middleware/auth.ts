export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
        // Redirect to signin page with return URL
        return navigateTo({
            path: '/signin',
            query: { redirect: to.fullPath }
        });
    }

    // Check if email is verified (only if not already on verify-email page)
    if (!authStore.user?.email_verified_at && to.path !== '/verify-email') {
        // User is authenticated but email not verified
        // Redirect to verify-email page
        return navigateTo('/verify-email');
    }
});
