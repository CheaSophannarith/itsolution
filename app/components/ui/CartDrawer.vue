<script setup lang="ts">
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-vue-next'
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

const open = ref(false)
const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart()
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

        <DrawerContent class="max-w-md w-full">
            <DrawerHeader class="relative border-b">
                <DrawerTitle class="text-lg">Shopping Cart</DrawerTitle>
                <DrawerDescription>
                    {{ totalItems > 0 ? `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart` : 'Your cart is empty' }}
                </DrawerDescription>
                <DrawerClose as-child>
                    <Button variant="ghost" size="icon-sm" class="absolute right-4 top-4 text-gray-400 hover:text-gray-700">
                        <X class="w-5 h-5" />
                    </Button>
                </DrawerClose>
            </DrawerHeader>

            <!-- Cart Items -->
            <div class="flex-1 overflow-y-auto px-4 py-2">
                <!-- Empty State -->
                <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
                    <ShoppingCart class="w-16 h-16 mb-4 stroke-1" />
                    <p class="text-base font-medium text-gray-500">Your cart is empty</p>
                    <p class="text-sm mt-1">Browse products and add items to get started.</p>
                </div>

                <!-- Items List -->
                <TransitionGroup v-else name="cart-item" tag="div">
                    <div
                        v-for="item in items"
                        :key="item.skuUuid"
                        class="flex gap-4 py-4 border-b border-gray-100 last:border-0"
                    >
                        <!-- Thumbnail -->
                        <NuxtLink
                            :to="`/products/${item.productSlug}`"
                            class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 hover:border-brand transition-colors"
                            @click="open = false"
                        >
                            <img
                                :src="item.image"
                                :alt="item.productName"
                                class="w-full h-full object-contain"
                                loading="lazy"
                            />
                        </NuxtLink>

                        <!-- Details -->
                        <div class="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                                <NuxtLink
                                    :to="`/products/${item.productSlug}`"
                                    class="font-semibold text-sm text-gray-800 line-clamp-2 hover:text-brand transition-colors"
                                    @click="open = false"
                                >
                                    {{ item.productName }}
                                </NuxtLink>
                                <p v-if="item.variantLabel" class="text-xs text-gray-500 mt-0.5 truncate">
                                    {{ item.variantLabel }}
                                </p>
                            </div>

                            <!-- Quantity + Price Row -->
                            <div class="flex items-center justify-between mt-2">
                                <!-- Quantity Controls -->
                                <div class="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        class="h-7 w-7"
                                        :disabled="item.quantity <= 1"
                                        @click="updateQuantity(item.skuUuid, item.quantity - 1)"
                                    >
                                        <Minus class="w-3 h-3" />
                                    </Button>
                                    <span class="text-sm font-medium w-8 text-center tabular-nums">
                                        {{ item.quantity }}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        class="h-7 w-7"
                                        :disabled="item.quantity >= item.maxQuantity"
                                        @click="updateQuantity(item.skuUuid, item.quantity + 1)"
                                    >
                                        <Plus class="w-3 h-3" />
                                    </Button>
                                </div>

                                <!-- Price -->
                                <span class="font-bold text-brand tabular-nums">
                                    ${{ (item.price * item.quantity).toFixed(2) }}
                                </span>
                            </div>
                        </div>

                        <!-- Remove Button -->
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            class="self-start text-gray-400 hover:text-red-500 shrink-0"
                            @click="removeItem(item.skuUuid)"
                        >
                            <Trash2 class="w-4 h-4" />
                        </Button>
                    </div>
                </TransitionGroup>
            </div>

            <!-- Footer -->
            <DrawerFooter v-if="items.length > 0" class="border-t">
                <div class="flex justify-between items-center text-sm text-gray-500 mb-1">
                    <span>Subtotal ({{ totalItems }} item{{ totalItems > 1 ? 's' : '' }})</span>
                    <button class="text-xs text-red-400 hover:text-red-600 transition-colors" @click="clearCart">
                        Clear cart
                    </button>
                </div>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-lg font-bold text-gray-800">Total</span>
                    <span class="text-lg font-bold text-gray-800 tabular-nums">${{ totalPrice.toFixed(2) }}</span>
                </div>
                <NuxtLink
                    to="/checkout"
                    class="w-full bg-brand text-white py-2.5 rounded-md hover:bg-brand/90 transition-colors text-center block font-semibold"
                    @click="open = false"
                >
                    Proceed to Checkout
                </NuxtLink>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
    transition: all 0.3s ease;
}
.cart-item-enter-from {
    opacity: 0;
    transform: translateX(20px);
}
.cart-item-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
.cart-item-move {
    transition: transform 0.3s ease;
}
</style>