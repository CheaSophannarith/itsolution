export default defineNuxtPlugin(() => {
    const authStore = useAuthStore();
    const cartStore = useCartStore();

    // Fetch cart when authenticated
    if (authStore.isAuthenticated) {
        cartStore.fetchCart().catch((error) => {
            console.error('Failed to fetch cart on init:', error);
        });
    }

    // Watch for auth changes
    watch(
        () => authStore.isAuthenticated,
        async (isAuthenticated, wasAuthenticated) => {
            if (isAuthenticated && !wasAuthenticated) {
                // User just logged in - fetch cart from server
                await cartStore.fetchCart().catch((error) => {
                    console.error('Failed to fetch cart after login:', error);
                });
            } else if (!isAuthenticated && wasAuthenticated) {
                // User just logged out - clear cart state
                cartStore.clearCartState();
            }
        }
    );
});
