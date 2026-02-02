<template>
    <div class="min-h-screen bg-white">
        <!-- Checkout Header -->
        <header class="bg-brand text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <NuxtLink to="/">
                    <img src="/SHI_LOGO.png" alt="SHI" class="h-6 brightness-0 invert" />
                </NuxtLink>
                <!-- <NuxtLink to="/hardware" class="flex items-center gap-2 text-sm hover:underline">
                    <ShoppingCart class="w-4 h-4" />
                    View cart
                </NuxtLink> -->
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Title Row -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-2">
                <h1 class="text-3xl font-bold text-gray-900">Checkout</h1>
                <p class="text-gray-600">Order subtotal ({{ totalItems }} items): <span class="font-semibold">${{
                    subtotal.toFixed(2) }}</span></p>
            </div>

            <div class="lg:grid lg:grid-cols-12 lg:gap-12">
                <!-- Left Column - Accordion Steps -->
                <div class="lg:col-span-7">
                    <!-- Step 1: Shipping Address -->
                    <div class="border-b border-gray-200">
                        <button @click="toggleStep(1)"
                            class="w-full flex items-start gap-4 py-6 text-left focus:outline-none">
                            <span
                                :class="['flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0', currentStep >= 1 ? 'bg-brand text-white' : 'bg-gray-200 text-gray-600']">1</span>
                            <div class="flex-1">
                                <h2 class="text-xl font-semibold text-gray-900">Shipping address</h2>
                                <p v-if="currentStep > 1 && form.firstName" class="text-sm text-gray-500 mt-1">
                                    {{ form.firstName }} {{ form.lastName }}, {{ form.address }}, {{ form.city }}, {{
                                        form.state }} {{ form.zip }}
                                </p>
                            </div>
                        </button>

                        <!-- Step 1 Content -->
                        <div v-show="currentStep === 1" class="pb-6 pl-12">
                            <p class="text-xs text-gray-500 mb-4">*Indicates required field</p>
                            <div class="space-y-4">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label for="firstName"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">First Name
                                            *</label>
                                        <input id="firstName" v-model="form.firstName" type="text"
                                            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                    </div>
                                    <div>
                                        <label for="lastName"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Last Name
                                            *</label>
                                        <input id="lastName" v-model="form.lastName" type="text"
                                            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label for="address"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Address 1 -
                                            Street or P.O. Box *</label>
                                        <input id="address" v-model="form.address" type="text"
                                            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                    </div>
                                    <div>
                                        <label for="address2"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Address 2 -
                                            Apt, Suite, Floor</label>
                                        <input id="address2" v-model="form.address2" type="text"
                                            placeholder="Leave blank if P.O. Box in Address 1"
                                            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label for="zip"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Zip Code
                                            *</label>
                                        <input id="zip" v-model="form.zip" type="text"
                                            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                    </div>
                                    <div>
                                        <label for="city"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">City
                                            *</label>
                                        <input id="city" v-model="form.city" type="text"
                                            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                    </div>
                                    <div>
                                        <label for="state"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">State
                                            *</label>
                                        <select id="state" v-model="form.state"
                                            class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent bg-white">
                                            <option value="">Select...</option>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="NY">New York</option>
                                            <option value="TX">Texas</option>
                                            <option value="WA">Washington</option>
                                        </select>
                                    </div>
                                </div>
                                <button @click="nextStep"
                                    class="mt-4 bg-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 transition-all duration-300 active:scale-[0.98]">
                                    Continue to shipping method
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2: Shipping Method -->
                    <div class="border-b border-gray-200">
                        <button @click="toggleStep(2)"
                            class="w-full flex items-start gap-4 py-6 text-left focus:outline-none"
                            :disabled="currentStep < 2">
                            <span
                                :class="['flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0', currentStep >= 2 ? 'bg-brand text-white' : 'bg-gray-200 text-gray-600']">2</span>
                            <div class="flex-1">
                                <h2
                                    :class="['text-xl font-semibold', currentStep >= 2 ? 'text-gray-900' : 'text-gray-400']">
                                    Shipping method</h2>
                                <p v-if="currentStep > 2 && selectedShipping" class="text-sm text-gray-500 mt-1">
                                    {{shippingOptions.find(o => o.id === selectedShipping)?.name}}
                                </p>
                            </div>
                        </button>

                        <!-- Step 2 Content -->
                        <div v-show="currentStep === 2" class="pb-6 pl-12">
                            <div class="space-y-3">
                                <label v-for="option in shippingOptions" :key="option.id"
                                    class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-brand hover:shadow-md transition-all duration-300"
                                    :class="selectedShipping === option.id ? 'border-brand bg-blue-50 shadow-md' : 'border-gray-200'">
                                    <input type="radio" v-model="selectedShipping" :value="option.id"
                                        class="w-4 h-4 text-brand" />
                                    <div class="flex-1">
                                        <div class="font-semibold text-gray-900">{{ option.name }}</div>
                                        <div class="text-sm text-gray-500">{{ option.description }}</div>
                                    </div>
                                    <div class="font-bold" :class="option.price === 0 ? 'text-green-600' : 'text-gray-900'">{{ option.price === 0 ? 'FREE' :
                                        `$${option.price.toFixed(2)}` }}</div>
                                </label>
                            </div>
                            <button @click="nextStep"
                                class="mt-4 bg-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 transition-all duration-300 active:scale-[0.98]">
                                Continue to payment
                            </button>
                        </div>
                    </div>

                    <!-- Step 3: Payment -->
                    <div class="border-b border-gray-200">
                        <button @click="toggleStep(3)"
                            class="w-full flex items-start gap-4 py-6 text-left focus:outline-none"
                            :disabled="currentStep < 3">
                            <span
                                :class="['flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0', currentStep >= 3 ? 'bg-brand text-white' : 'bg-gray-200 text-gray-600']">3</span>
                            <div class="flex-1">
                                <h2
                                    :class="['text-xl font-semibold', currentStep >= 3 ? 'text-gray-900' : 'text-gray-400']">
                                    Payment</h2>
                                <p v-if="currentStep > 3 && form.cardNumber" class="text-sm text-gray-500 mt-1">
                                    Card ending in {{ form.cardNumber.slice(-4) }}
                                </p>
                            </div>
                        </button>

                        <!-- Step 3 Content -->
                        <div v-show="currentStep === 3" class="pb-6 pl-12">
                            <div class="space-y-4">
                                <div>
                                    <label for="cardName"
                                        class="block text-xs font-medium text-gray-700 mb-1 uppercase">Name on Card
                                        *</label>
                                    <input id="cardName" v-model="form.cardName" type="text"
                                        class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <label for="cardNumber"
                                        class="block text-xs font-medium text-gray-700 mb-1 uppercase">Card Number
                                        *</label>
                                    <input id="cardNumber" v-model="form.cardNumber" type="text"
                                        placeholder="1234 5678 9012 3456"
                                        class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="expiry"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Expiry Date
                                            *</label>
                                        <input id="expiry" v-model="form.expiry" type="text" placeholder="MM/YY"
                                            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                    </div>
                                    <div>
                                        <label for="cvv"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">CVV *</label>
                                        <input id="cvv" v-model="form.cvv" type="text" placeholder="123"
                                            class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                    </div>
                                </div>
                                <button @click="nextStep"
                                    class="mt-4 bg-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 transition-all duration-300 active:scale-[0.98]">
                                    Continue to review
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4: Review & Place Order -->
                    <div class="border-b border-gray-200">
                        <button @click="toggleStep(4)"
                            class="w-full flex items-start gap-4 py-6 text-left focus:outline-none"
                            :disabled="currentStep < 4">
                            <span
                                :class="['flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold flex-shrink-0', currentStep >= 4 ? 'bg-brand text-white' : 'bg-gray-200 text-gray-600']">4</span>
                            <div class="flex-1">
                                <h2
                                    :class="['text-xl font-semibold', currentStep >= 4 ? 'text-gray-900' : 'text-gray-400']">
                                    Review & place order</h2>
                            </div>
                        </button>

                        <!-- Step 4 Content -->
                        <div v-show="currentStep === 4" class="pb-6 pl-12">
                            <div class="space-y-4">
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100/50 p-5 rounded-xl border border-gray-200">
                                    <h3 class="font-bold text-gray-900 mb-3">Order Summary</h3>
                                    <div class="text-sm space-y-2">
                                        <p class="flex flex-col sm:flex-row gap-1"><span class="font-semibold text-gray-700">Ship to:</span> <span class="text-gray-600">{{ form.firstName }} {{
                                            form.lastName }}, {{ form.address }}, {{ form.city }}, {{ form.state }} {{
                                                form.zip }}</span></p>
                                        <p><span class="font-semibold text-gray-700">Shipping:</span> <span class="text-gray-600">{{
                                            shippingOptions.find(o => o.id === selectedShipping)?.name}}</span></p>
                                        <p><span class="font-semibold text-gray-700">Payment:</span> <span class="text-gray-600">Card ending in {{
                                            form.cardNumber.slice(-4) }}</span></p>
                                    </div>
                                </div>
                                <button @click="placeOrder"
                                    class="w-full bg-brand text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 active:scale-[0.98]">
                                    Place Order - ${{ total.toFixed(2) }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Summary -->
                <div class="lg:col-span-5 mt-8 lg:mt-0">
                    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-4">
                        <h2 class="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>

                        <!-- Promo Code -->
                        <div class="mb-5">
                            <label class="block text-xs font-medium text-gray-600 mb-2">Promo code <span class="text-gray-400">3 per
                                    order maximum</span></label>
                            <div class="flex gap-2">
                                <input v-model="promoCode" type="text" placeholder="Enter code"
                                    class="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all" />
                                <button class="bg-brand text-white px-4 py-2.5 rounded-xl hover:bg-brand/90 hover:shadow-md transition-all duration-300">
                                    <ChevronRight class="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <!-- Totals -->
                        <div class="space-y-2 py-4 border-t border-gray-200">
                            <div class="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span class="font-medium">${{ subtotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span class="font-medium text-green-600">{{ shippingCost === 0 ? 'FREE' :
                                    `$${shippingCost.toFixed(2)}` }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span>Estimated tax <span class="text-gray-400 cursor-help">ⓘ</span></span>
                                <span class="font-medium">--</span>
                            </div>
                        </div>

                        <div class="flex justify-between py-4 border-t border-gray-200">
                            <span class="font-bold">Total</span>
                            <span class="font-bold">${{ total.toFixed(2) }}</span>
                        </div>

                        <!-- Cart Items -->
                        <div class="border-t border-gray-200 pt-4">
                            <h3 class="font-bold mb-4 flex items-center gap-2">
                                <ShoppingCart class="w-4 h-4" />
                                Cart ({{ totalItems }} Items)
                            </h3>
                            <div class="space-y-3">
                                <div v-for="item in cartItems" :key="item.skuUuid"
                                    class="flex gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300">
                                    <div
                                        class="w-16 h-16 flex-shrink-0 bg-gray-50/50 border border-gray-100 rounded-lg overflow-hidden">
                                        <img :src="item.image" :alt="item.productName" class="w-full h-full object-contain p-1"
                                            loading="lazy"
                                            @error="(e: Event) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=No+Image'" />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex justify-between items-start mb-1">
                                            <div class="font-semibold text-sm text-gray-900 line-clamp-1">{{ item.productName }}</div>
                                            <div class="font-bold text-sm text-pink-600 ml-2">${{ (item.price * item.quantity).toFixed(2) }}</div>
                                        </div>
                                        <div class="text-xs text-gray-500 space-y-0.5">
                                            <p v-if="item.category" class="text-brand font-medium">{{ item.category }}</p>
                                            <p v-if="item.variantLabel" class="text-gray-600">{{ item.variantLabel }}</p>
                                            <p class="text-gray-400">Qty: {{ item.quantity }} × ${{ item.price.toFixed(2) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Need Help -->
                        <div class="border-t border-gray-100 pt-5 mt-5">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-bold mb-3 text-gray-900">Need help?</h4>
                                    <a href="#" class="text-brand hover:text-brand/80 font-medium text-sm block mb-2 transition-colors">Visit our Help
                                        Center</a>
                                    <p class="text-sm text-gray-600 mb-0.5">Call us</p>
                                    <p class="text-sm font-semibold text-gray-900">888-764-8888</p>
                                    <p class="text-xs text-gray-500 mt-1">Mon-Fri 6am-5pm PST</p>
                                </div>
                                <div class="text-right">
                                    <div
                                        class="border-2 border-green-200 bg-green-50 rounded-lg px-3 py-2 text-xs inline-block">
                                        <div class="font-bold text-green-700">✓ Secure</div>
                                        <div class="text-green-600">& Trusted</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronRight, ShoppingCart } from 'lucide-vue-next'
    import { computed, ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useCartStore } from '~/stores/cart'
    import { useAuthStore } from '~/stores/auth'

    // Disable default layout
    definePageMeta({
        layout: false
    })

    const router = useRouter()
    const cartStore = useCartStore()
    const authStore = useAuthStore()

    // Check authentication on mount
    onMounted(() => {
        if (!authStore.isAuthenticated) {
            router.push('/login')
        }
    })

    // Current step in the checkout process
    const currentStep = ref(1)

    // Form data
    const form = ref({
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    })

    // Promo code
    const promoCode = ref('')

    // Shipping options
    const shippingOptions = ref([
        { id: 'standard', name: 'Standard Shipping', description: '5-7 business days', price: 0 },
        { id: 'express', name: 'Express Shipping', description: '2-3 business days', price: 9.99 },
        { id: 'overnight', name: 'Overnight Shipping', description: '1 business day', price: 19.99 }
    ])
    const selectedShipping = ref('standard')

    // Use cart store items
    const cartItems = computed(() => cartStore.items)
    const totalItems = computed(() => cartStore.totalItems)
    const subtotal = computed(() => cartStore.totalPrice)
    const shippingCost = computed(() => shippingOptions.value.find(o => o.id === selectedShipping.value)?.price || 0)
    const total = computed(() => subtotal.value + shippingCost.value)

    function toggleStep(step: number) {
        if (step <= currentStep.value) {
            currentStep.value = step
        }
    }

    function nextStep() {
        if (currentStep.value < 4) {
            currentStep.value++
        }
    }

    function placeOrder() {
        // TODO: Implement order placement logic
        alert('Order placed successfully!')
        cartStore.clearCart()
        router.push('/')
    }
</script>
