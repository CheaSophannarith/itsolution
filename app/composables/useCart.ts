import { storeToRefs } from 'pinia';
import { useCartStore } from '~/stores/cart';

export function useCart() {
    const store = useCartStore();
    const {
        items,
        ItemCount,
        totalPrice,
        subtotalPrice,
        discountAmount,
        hasItems,
        hasCoupon,
        coupon,
        isLoading,
        isSyncing,
    } = storeToRefs(store);

    return {
        // State
        items,
        ItemCount,
        totalPrice,
        subtotalPrice,
        discountAmount,
        hasItems,
        hasCoupon,
        coupon,
        isLoading,
        isSyncing,

        // Actions
        fetchCart: store.fetchCart,
        addItem: store.addItem,
        removeItem: store.removeItem,
        updateQuantity: store.updateQuantity,
        clearCart: store.clearCart,
        applyCoupon: store.applyCoupon,
        removeCoupon: store.removeCoupon,
    };
}
