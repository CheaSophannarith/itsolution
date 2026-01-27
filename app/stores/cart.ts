import { defineStore } from 'pinia';

export interface CartItem {
    skuUuid: string;
    productUuid: string;
    productName: string;
    productSlug: string;
    variantLabel: string;
    image: string;
    price: number;
    quantity: number;
    maxQuantity: number;
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
    }),

    getters: {
        totalItems: (state) =>
            state.items.reduce((sum, item) => sum + item.quantity, 0),

        totalPrice: (state) =>
            state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    },

    actions: {
        addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
            const existing = this.items.find(i => i.skuUuid === item.skuUuid);
            if (existing) {
                existing.quantity = Math.min(existing.quantity + quantity, item.maxQuantity);
            } else {
                this.items.push({ ...item, quantity });
            }
        },

        removeItem(skuUuid: string) {
            this.items = this.items.filter(i => i.skuUuid !== skuUuid);
        },

        updateQuantity(skuUuid: string, quantity: number) {
            const item = this.items.find(i => i.skuUuid === skuUuid);
            if (item) {
                item.quantity = Math.max(1, Math.min(quantity, item.maxQuantity));
            }
        },

        clearCart() {
            this.items = [];
        },
    },

    persist: true,
});