import { defineStore } from 'pinia';
import type { Cart, CartItem, CartCoupon, CartResponse, AddToCartRequest, UpdateCartItemRequest, ApplyCouponRequest, RemoveItemResponse } from '~/types';

interface CartState {
    uuid: string | null;
    items: CartItem[];
    items_count: number;
    total_items: number;
    subtotal: string;
    discount: string;
    total: string;
    coupon: CartCoupon | null;
    isLoading: boolean;
    isSyncing: boolean;
}

export const useCartStore = defineStore('cart', {
    state: (): CartState => ({
        uuid: null,
        items: [],
        items_count: 0,
        total_items: 0,
        subtotal: '0.00',
        discount: '0.00',
        total: '0.00',
        coupon: null,
        isLoading: false,
        isSyncing: false,
    }),

    getters: {
        ItemCount: (state) => state.items_count,
        totalPrice: (state) => parseFloat(state.total),
        subtotalPrice: (state) => parseFloat(state.subtotal),
        discountAmount: (state) => parseFloat(state.discount),
        hasItems: (state) => state.items.length > 0,
        hasCoupon: (state) => !!state.coupon,
    },

    actions: {
        // Fetch cart from API
        async fetchCart() {
            const authStore = useAuthStore();
            if (!authStore.isAuthenticated) return;

            try {
                this.isLoading = true;
                const api = useApi();
                const response = await api.get<CartResponse>('/api/v1/cart');
                this.setCartData(response.data);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        // Add item to cart
        async addItem(skuUuid: string, quantity = 1) {
            const authStore = useAuthStore();

            if (!authStore.isAuthenticated) {
                // Redirect to login page with return URL
                navigateTo({
                    path: '/signin',
                    query: { redirect: useRoute().fullPath }
                });
                throw new Error('Please sign in to add items to cart');
            }

            try {
                this.isSyncing = true;
                const api = useApi();
                const payload: AddToCartRequest = {
                    sku_uuid: skuUuid,
                    quantity,
                };

                // Add item to cart
                await api.post<CartResponse>('/api/v1/cart/items', payload);

                // Always fetch fresh cart data to ensure UI is in sync
                await this.fetchCart();
            } catch (error) {
                console.error('Failed to add item to cart:', error);
                throw error;
            } finally {
                this.isSyncing = false;
            }
        },

        // Update item quantity
        async updateQuantity(itemUuid: string, quantity: number) {
            const authStore = useAuthStore();

            if (!authStore.isAuthenticated) {
                navigateTo('/signin');
                throw new Error('Must be logged in to update cart');
            }

            // Validate quantity
            if (quantity < 1 || quantity > 99) {
                throw new Error('Quantity must be between 1 and 99');
            }

            try {
                this.isSyncing = true;
                const api = useApi();
                const payload: UpdateCartItemRequest = { quantity };

                // Update quantity
                await api.put<CartResponse>(`/api/v1/cart/items/${itemUuid}`, payload);

                // Fetch fresh cart data
                await this.fetchCart();
            } catch (error) {
                console.error('Failed to update item quantity:', error);
                throw error;
            } finally {
                this.isSyncing = false;
            }
        },

        // Remove item from cart
        async removeItem(itemUuid: string) {
            const authStore = useAuthStore();

            if (!authStore.isAuthenticated) {
                navigateTo('/signin');
                throw new Error('Must be logged in to remove items from cart');
            }

            try {
                this.isSyncing = true;
                const api = useApi();
                await api.delete<RemoveItemResponse>(`/api/v1/cart/items/${itemUuid}`);

                // Fetch full cart to get updated state
                await this.fetchCart();
            } catch (error) {
                console.error('Failed to remove item from cart:', error);
                throw error;
            } finally {
                this.isSyncing = false;
            }
        },

        // Clear entire cart
        async clearCart() {
            const authStore = useAuthStore();

            if (!authStore.isAuthenticated) {
                navigateTo('/signin');
                throw new Error('Must be logged in to clear cart');
            }

            try {
                this.isSyncing = true;
                const api = useApi();
                await api.delete('/api/v1/cart');

                // Reset cart state
                this.clearCartState();
            } catch (error) {
                console.error('Failed to clear cart:', error);
                throw error;
            } finally {
                this.isSyncing = false;
            }
        },

        // Apply coupon
        async applyCoupon(code: string) {
            const authStore = useAuthStore();
            if (!authStore.isAuthenticated) {
                navigateTo('/signin');
                throw new Error('Must be logged in to apply coupons');
            }

            try {
                this.isSyncing = true;
                const api = useApi();
                const payload: ApplyCouponRequest = { code };

                // Apply coupon
                await api.post<CartResponse>('/api/v1/cart/coupon', payload);

                // Fetch fresh cart data
                await this.fetchCart();
            } catch (error) {
                console.error('Failed to apply coupon:', error);
                throw error;
            } finally {
                this.isSyncing = false;
            }
        },

        // Remove coupon
        async removeCoupon() {
            const authStore = useAuthStore();
            if (!authStore.isAuthenticated) return;

            try {
                this.isSyncing = true;
                const api = useApi();

                // Remove coupon
                await api.delete<CartResponse>('/api/v1/cart/coupon');

                // Fetch fresh cart data
                await this.fetchCart();
            } catch (error) {
                console.error('Failed to remove coupon:', error);
                throw error;
            } finally {
                this.isSyncing = false;
            }
        },

        // Helper: Set cart data from API response
        setCartData(data: Cart) {
            // Use $patch for better reactivity
            this.$patch({
                uuid: data.uuid,
                items: data.items || [],
                items_count: data.items_count || 0,
                total_items: data.total_items || 0,
                subtotal: data.subtotal || '0.00',
                discount: data.discount || '0.00',
                total: data.total || '0.00',
                coupon: data.coupon || null,
            });
        },

        // Helper: Clear cart state
        clearCartState() {
            // Use $patch for better reactivity
            this.$patch({
                uuid: null,
                items: [],
                items_count: 0,
                total_items: 0,
                subtotal: '0.00',
                discount: '0.00',
                total: '0.00',
                coupon: null,
            });
        },
    },

    // Note: No persistence - cart is always fetched from API
});