export function useCartDrawer() {
    const open = useState<boolean>('cart-drawer-open', () => false);

    return {
        open,
        openCartDrawer: () => { open.value = true; },
        closeCartDrawer: () => { open.value = false; },
    };
}