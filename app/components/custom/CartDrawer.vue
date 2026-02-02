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

const open = ref(false)
const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart()
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
                    <span v-if="totalItems > 0"
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-in zoom-in">
                        {{ totalItems }}
                    </span>
                </Button>
            </slot>
        </DrawerTrigger>

        <DrawerContent class="!w-full sm:!max-w-md md:!max-w-lg lg:!max-w-xl h-full flex flex-col bg-white">
            <!-- Clean Minimal Header -->
            <DrawerHeader class="border-b border-gray-100 px-5 sm:px-8 py-5 sm:py-6">
                <div class="flex items-center justify-between">
                    <div>
                        <DrawerTitle class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            Cart
                        </DrawerTitle>
                        <DrawerDescription class="text-sm text-gray-500 mt-1 font-medium">
                            {{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }}
                        </DrawerDescription>
                    </div>
                    <DrawerClose as-child>
                        <button
                            @click="handleDrawerClose"
                            class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                            <X class="w-5 h-5 text-gray-600" />
                        </button>
                    </DrawerClose>
                </div>
            </DrawerHeader>

            <!-- Beautiful Cart Items -->
            <div class="flex-1 overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 beautiful-scrollbar bg-gray-50/30">
                <!-- Beautiful Empty State -->
                <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-full min-h-[400px]">
                    <div class="relative mb-8">
                        <!-- Animated background glow -->
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl animate-pulse"></div>

                        <!-- Icon container -->
                        <div class="relative w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-gray-100">
                            <ShoppingCart class="w-14 h-14 sm:w-16 sm:h-16 text-gray-300 stroke-[1.5]" />
                        </div>
                    </div>

                    <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                        Your cart is empty
                    </h3>
                    <p class="text-sm sm:text-base text-gray-500 text-center max-w-xs mb-8 leading-relaxed">
                        Start adding products you love and they'll appear here
                    </p>

                    <DrawerClose as-child>
                        <button @click="handleDrawerClose" class="px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg">
                            Start Shopping
                        </button>
                    </DrawerClose>
                </div>

                <!-- Clean Items List -->
                <TransitionGroup v-else name="cart-item" tag="div" class="space-y-4 sm:space-y-5">
                    <div
                        v-for="item in items"
                        :key="item.skuUuid"
                        class="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <div class="flex gap-4 sm:gap-5">
                            <!-- Premium Product Image -->
                            <NuxtLink
                                :to="`/products/${item.productSlug}`"
                                class="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 group-hover:scale-[1.02] transition-transform duration-300"
                                @click="handleDrawerClose"
                            >
                                <img
                                    :src="item.image"
                                    :alt="item.productName"
                                    class="w-full h-full object-contain p-3"
                                    loading="lazy"
                                />
                            </NuxtLink>

                            <!-- Product Info -->
                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between gap-3 mb-3">
                                    <div class="flex-1 min-w-0">
                                        <NuxtLink
                                            :to="`/products/${item.productSlug}`"
                                            class="font-semibold text-base sm:text-lg text-gray-900 line-clamp-2 hover:text-brand transition-colors leading-tight mb-1.5 block"
                                            @click="handleDrawerClose"
                                        >
                                            {{ item.productName }}
                                        </NuxtLink>
                                        <p v-if="item.variantLabel" class="text-sm text-gray-500 font-medium">
                                            {{ item.variantLabel }}
                                        </p>
                                    </div>

                                    <!-- Price -->
                                    <div class="text-right">
                                        <div class="font-bold text-lg sm:text-xl text-gray-900 tabular-nums">
                                            ${{ (item.price * item.quantity).toFixed(2) }}
                                        </div>
                                        <div v-if="item.quantity > 1" class="text-xs text-gray-400 mt-0.5 tabular-nums">
                                            ${{ item.price.toFixed(2) }} each
                                        </div>
                                    </div>
                                </div>

                                <!-- Controls Row -->
                                <div class="flex items-center justify-between gap-3 mt-4">
                                    <!-- Clean Quantity Controls -->
                                    <div class="inline-flex items-center bg-gray-50 rounded-full border border-gray-200">
                                        <button
                                            class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-l-full hover:bg-gray-100"
                                            :disabled="item.quantity <= 1"
                                            @click="updateQuantity(item.skuUuid, item.quantity - 1)"
                                        >
                                            <Minus class="w-4 h-4" />
                                        </button>
                                        <span class="px-4 text-sm sm:text-base font-bold text-gray-900 tabular-nums min-w-[2.5rem] text-center">
                                            {{ item.quantity }}
                                        </span>
                                        <button
                                            class="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-r-full hover:bg-gray-100"
                                            :disabled="item.quantity >= item.maxQuantity"
                                            @click="updateQuantity(item.skuUuid, item.quantity + 1)"
                                        >
                                            <Plus class="w-4 h-4" />
                                        </button>
                                    </div>

                                    <!-- Remove Button -->
                                    <button
                                        class="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5 group/remove"
                                        @click="removeItem(item.skuUuid)"
                                    >
                                        <Trash2 class="w-4 h-4 group-hover/remove:scale-110 transition-transform" />
                                        <span class="hidden sm:inline">Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>
            </div>

            <!-- Premium Footer -->
            <DrawerFooter v-if="items.length > 0" class="border-t border-gray-100 bg-white px-5 sm:px-8 py-5 sm:py-6 space-y-5">
                <!-- Subtotal -->
                <div class="flex justify-between items-center text-sm">
                    <span class="text-gray-600 font-medium">Subtotal</span>
                    <button
                        class="text-gray-400 hover:text-red-500 transition-colors font-medium text-sm flex items-center gap-1.5"
                        @click="clearCart"
                    >
                        <Trash2 class="w-3.5 h-3.5" />
                        Clear all
                    </button>
                </div>

                <!-- Total -->
                <div class="flex justify-between items-baseline py-4 border-t border-gray-100">
                    <span class="text-lg sm:text-xl font-bold text-gray-900">Total</span>
                    <div class="flex items-baseline gap-2">
                        <span class="text-xs text-gray-400 font-medium uppercase tracking-wider">USD</span>
                        <span class="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
                            ${{ totalPrice.toFixed(2) }}
                        </span>
                    </div>
                </div>

                <!-- Checkout Button -->
                <button
                    class="w-full bg-gray-900 hover:bg-black text-white py-4 sm:py-4.5 rounded-full font-bold text-base sm:text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
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
