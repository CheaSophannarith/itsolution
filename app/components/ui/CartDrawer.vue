<template>
    <Drawer v-model:open="open" direction="right">
        <DrawerTrigger as-child>
            <slot name="trigger">
                <button class="relative p-2 text-brand hover:text-white hover:bg-brand rounded-md transition-all"
                    @click="open = true">
                    <ShoppingCart class="w-5 h-5" />
                    <span
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                </button>
            </slot>
        </DrawerTrigger>
        <DrawerContent class="max-w-md w-full">
            <DrawerHeader class="relative">
                <DrawerTitle>Your Cart</DrawerTitle>
                <DrawerDescription>Review your selected items</DrawerDescription>
                <DrawerClose class="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </DrawerClose>
            </DrawerHeader>
            <div class="flex-1 overflow-y-auto px-4 py-2">
                <!-- Cart items go here -->
                <div v-if="cartItems.length === 0" class="text-center text-gray-500 py-8">
                    Your cart is empty.
                </div>
                <div v-else>
                    <div v-for="item in cartItems" :key="item.id"
                        class="flex items-center gap-4 py-4 border-b last:border-0 group hover:bg-gray-50 transition">
                        <div
                            class="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" loading="lazy"
                                @error="e => e.target.src = 'https://via.placeholder.com/64x64?text=No+Image'" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-base truncate">{{ item.name }}</div>
                            <div class="text-xs text-gray-500 truncate">{{ item.description }}</div>
                            <div class="text-xs text-gray-400 mt-1">Qty: <span class="font-medium text-gray-700">{{
                                item.quantity }}</span></div>
                        </div>
                        <div class="font-bold text-right text-brand text-lg min-w-[70px]">${{ item.price.toFixed(2) }}
                        </div>
                    </div>
                </div>
            </div>
            <DrawerFooter>
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold">Total</span>
                    <span class="font-bold text-lg">${{ total }}</span>
                </div>
                <NuxtLink to="/checkout" @click="open = false"
                    class="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark transition text-center block">
                    Checkout
                </NuxtLink>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
</template>

<script setup lang="ts">
    import { ShoppingCart } from 'lucide-vue-next'
    import { computed, ref } from 'vue'
    import Drawer from './drawer/Drawer.vue'
    import DrawerClose from './drawer/DrawerClose.vue'
    import DrawerContent from './drawer/DrawerContent.vue'
    import DrawerDescription from './drawer/DrawerDescription.vue'
    import DrawerFooter from './drawer/DrawerFooter.vue'
    import DrawerHeader from './drawer/DrawerHeader.vue'
    import DrawerTitle from './drawer/DrawerTitle.vue'
    import DrawerTrigger from './drawer/DrawerTrigger.vue'

    const open = ref(false)
    // Example cart items, replace with your store logic
    const cartItems = ref([
        {
            id: 1,
            name: 'Wireless Mouse',
            description: 'Ergonomic, 2.4GHz, Black',
            image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800',
            quantity: 2,
            price: 25.99
        },
        {
            id: 2,
            name: 'Mechanical Keyboard',
            description: 'RGB, Blue Switches',
            image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800',
            quantity: 1,
            price: 89.99
        },
        {
            id: 3,
            name: 'USB-C Hub',
            description: '6-in-1, Aluminum',
            image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800',
            quantity: 1,
            price: 39.99
        }
    ])
    const total = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
</script>
