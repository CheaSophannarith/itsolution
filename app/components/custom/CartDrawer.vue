<script setup lang="ts">
import { Minus, Plus, ShoppingCart, Trash2, X, ArrowRight, Sparkles } from 'lucide-vue-next'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { watch } from 'vue'

const { open } = useCartDrawer()
const { items, ItemCount, totalPrice, removeItem, updateQuantity, clearCart } = useCart()
const authStore = useAuthStore()
const router = useRouter()
const { forceUnlockScroll } = useScrollLock()

// Force unlock scroll on component mount and when closing
onMounted(() => {
    forceUnlockScroll()
})

// Watch for drawer close and force unlock scroll
watch(open, (isOpen) => {
    if (!isOpen) {
        // Small delay to ensure drawer close animation completes
        setTimeout(() => {
            forceUnlockScroll()
        }, 100)
    }
})

// Cleanup on unmount
onUnmounted(() => {
    forceUnlockScroll()
})

// Function to handle drawer closing - ensures scroll is restored
const handleDrawerClose = () => {
    open.value = false
    // Force immediate scroll restoration
    setTimeout(() => {
        forceUnlockScroll()
    }, 50)
}

const handleCheckout = () => {
    // Close drawer and restore scroll before navigation
    open.value = false
    forceUnlockScroll()
    
    if (!authStore.isAuthenticated) {
        router.push({
            path: '/signin',
            query: { redirect: '/checkout' }
        })
    } else {
        router.push('/checkout')
    }
}
</script>

<template>
    <Drawer v-model:open="open" direction="right">
        <DrawerTrigger as-child>
            <slot name="trigger">
                <Button variant="ghost" size="icon" class="relative text-brand hover:text-white hover:bg-brand">
                    <ShoppingCart class="w-5 h-5" />
                    <span v-if="ItemCount > 0"
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-in zoom-in">
                        {{ ItemCount }}
                    </span>
                </Button>
            </slot>
        </DrawerTrigger>

        <DrawerContent class="w-full! sm:max-w-sm! md:max-w-md! lg:max-w-lg! h-full flex flex-col bg-white">
            <!-- Clean Minimal Header -->
            <DrawerHeader class="border-b border-gray-100 px-3 sm:px-4 py-2">
                <div class="flex items-center justify-between">
                    <div>
                        <DrawerTitle class="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                            Cart
                        </DrawerTitle>
                        <DrawerDescription class="text-xs text-gray-500 mt-0.5 font-medium">
                            {{ ItemCount }} {{ ItemCount === 1 ? 'item' : 'items' }}
                        </DrawerDescription>
                    </div>
                    <DrawerClose as-child>
                        <button
                            @click="handleDrawerClose"
                            class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                            <X class="w-4 h-4 text-gray-600" />
                        </button>
                    </DrawerClose>
                </div>
            </DrawerHeader>

            <!-- Beautiful Cart Items -->
            <div class="flex-1 overflow-y-auto px-3 sm:px-4 py-2 sm:py-3 beautiful-scrollbar bg-gray-50/30">
                <!-- Beautiful Empty State -->
                <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-full min-h-[400px]">
                    <div class="mb-6">
                        <ShoppingCart class="w-10 h-10 sm:w-12 sm:h-12 text-blue-950 stroke-[1.5]" />
                    </div>

                    <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 tracking-tight">
                        Your cart is empty
                    </h3>
                    <p class="text-xs sm:text-sm text-gray-500 text-center max-w-xs mb-6 leading-relaxed">
                        Start adding products you love and they'll appear here
                    </p>

                    <DrawerClose as-child>
                        <button @click="handleDrawerClose" class="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold text-xs transition-all hover:scale-105 active:scale-95 shadow-lg">
                            Start Shopping
                        </button>
                    </DrawerClose>
                </div>

                <!-- Clean Items List -->
                <TransitionGroup v-else name="cart-item" tag="div" class="space-y-2 sm:space-y-3">
                    <div
                        v-for="item in items"
                        :key="item.uuid"
                        class="group relative bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 hover:border-brand transition-all duration-300 border border-brand/10"
                    >
                        <div class="flex gap-2.5 sm:gap-3">
                            <!-- Premium Product Image -->
                            <NuxtLink
                                :to="`/products/${item.sku.product.slug}`"
                                class="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-gray-50 group-hover:scale-[1.02] transition-transform duration-300"
                                @click="handleDrawerClose"
                            >
                                <img
                                    :src="item.sku.product.image"
                                    :alt="item.sku.product.name"
                                    class="w-full h-full object-contain"
                                    loading="lazy"
                                />
                            </NuxtLink>

                            <!-- Product Info -->
                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between gap-2 mb-2">
                                    <div class="flex-1 min-w-0">
                                        <NuxtLink
                                            :to="`/products/${item.sku.product.slug}`"
                                            class="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 hover:text-brand transition-colors leading-tight mb-1 block"
                                            @click="handleDrawerClose"
                                        >
                                            {{ item.sku.product.name }}
                                        </NuxtLink>
                                        <p v-if="item.sku.attribute_options.length > 0" class="text-xs text-gray-500 font-medium">
                                            {{ item.sku.attribute_options.map(o => o.label).join(' / ') }}
                                        </p>
                                    </div>

                                    <!-- Price -->
                                    <div class="text-right">
                                        <div class="font-bold text-sm sm:text-base text-gray-900 tabular-nums">
                                            ${{ parseFloat(item.line_total).toFixed(2) }}
                                        </div>
                                        <div v-if="item.quantity > 1" class="text-[10px] text-gray-400 mt-0.5 tabular-nums">
                                            ${{ parseFloat(item.sku.price).toFixed(2) }} each
                                        </div>
                                    </div>
                                </div>

                                <!-- Controls Row -->
                                <div class="flex items-center justify-between gap-2 mt-2">
                                    <!-- Clean Quantity Controls -->
                                    <div class="inline-flex items-center bg-gray-50 rounded-full border border-gray-200">
                                        <button
                                            class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-l-full hover:bg-gray-100"
                                            :disabled="item.quantity <= 1"
                                            @click="updateQuantity(item.uuid, item.quantity - 1)"
                                        >
                                            <Minus class="w-3 h-3" />
                                        </button>
                                        <span class="px-3 text-xs sm:text-sm font-bold text-gray-900 tabular-nums min-w-[2rem] text-center">
                                            {{ item.quantity }}
                                        </span>
                                        <button
                                            class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-r-full hover:bg-gray-100"
                                            :disabled="item.quantity >= item.sku.stock_quantity"
                                            @click="updateQuantity(item.uuid, item.quantity + 1)"
                                        >
                                            <Plus class="w-3 h-3" />
                                        </button>
                                    </div>

                                    <!-- Remove Button -->
                                    <button
                                        class="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 group/remove"
                                        @click="removeItem(item.uuid)"
                                    >
                                        <Trash2 class="w-3.5 h-3.5 group-hover/remove:scale-110 transition-transform" />
                                        <span class="hidden sm:inline">Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>
            </div>

            <!-- Premium Footer -->
            <DrawerFooter v-if="items.length > 0" class="border-t border-gray-100 bg-white px-3 sm:px-4 py-3 sm:py-4 space-y-3">
                <!-- Subtotal -->
                <div class="flex justify-between items-center text-xs">
                    <span class="text-gray-600 font-medium">Subtotal</span>
                    <button
                        class="text-gray-400 hover:text-red-500 transition-colors font-medium text-xs flex items-center gap-1"
                        @click="clearCart"
                    >
                        <Trash2 class="w-3 h-3" />
                        Clear all
                    </button>
                </div>

                <!-- Total -->
                <div class="flex justify-between items-baseline py-2 border-t border-gray-100">
                    <span class="text-base sm:text-lg font-bold text-gray-900">Total</span>
                    <div class="flex items-baseline gap-1.5">
                        <span class="text-[10px] text-gray-400 font-medium uppercase tracking-wider">USD</span>
                        <span class="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums tracking-tight">
                            ${{ totalPrice.toFixed(2) }}
                        </span>
                    </div>
                </div>

                <!-- Checkout Button -->
                <button
                    class="w-full bg-gray-900 hover:bg-black text-white py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    @click="handleCheckout"
                >
                    <span>Proceed to Checkout</span>
                </button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>

<style scoped>
/* Smooth, elegant animations */
.cart-item-enter-active {
    transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.cart-item-leave-active {
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.cart-item-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.cart-item-leave-to {
    opacity: 0;
    transform: translateX(-20px) scale(0.95);
}

.cart-item-move {
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Beautiful minimal scrollbar */
.beautiful-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.beautiful-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    margin: 8px 0;
}

.beautiful-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
    transition: background 0.2s;
}

.beautiful-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}

/* Smooth focus states */
button:focus-visible {
    outline: 2px solid #000;
    outline-offset: 2px;
}
</style>
