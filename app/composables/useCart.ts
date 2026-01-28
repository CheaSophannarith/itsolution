import { storeToRefs } from 'pinia';
import { useCartStore } from '~/stores/cart';

export function useCart() {
    const store = useCartStore();
    const { items, totalItems, totalPrice } = storeToRefs(store);

    return {
        items,
        totalItems,
        totalPrice,
        addItem: store.addItem,
        removeItem: store.removeItem,
        updateQuantity: store.updateQuantity,
        clearCart: store.clearCart,
    };
}
