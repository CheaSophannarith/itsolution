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
});
