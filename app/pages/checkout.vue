<template>
    <div class="min-h-screen bg-white">
        <!-- Checkout Header -->
        <header class="bg-brand text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <NuxtLink to="/">
                    <img src="/SHI_LOGO.png" alt="SHI" class="h-6 brightness-0 invert" />
                </NuxtLink>
                <NuxtLink to="/hardware" class="flex items-center gap-2 text-sm hover:underline">
                    <ShoppingCart class="w-4 h-4" />
                    View cart
                </NuxtLink>
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
                                            class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label for="lastName"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Last Name
                                            *</label>
                                        <input id="lastName" v-model="form.lastName" type="text"
                                            class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label for="address"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Address 1 -
                                            Street or P.O. Box *</label>
                                        <input id="address" v-model="form.address" type="text"
                                            class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label for="address2"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Address 2 -
                                            Apt, Suite, Floor</label>
                                        <input id="address2" v-model="form.address2" type="text"
                                            placeholder="Leave blank if P.O. Box in Address 1"
                                            class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label for="zip"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Zip Code
                                            *</label>
                                        <input id="zip" v-model="form.zip" type="text"
                                            class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label for="city"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">City
                                            *</label>
                                        <input id="city" v-model="form.city" type="text"
                                            class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
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
                                    class="mt-4 bg-brand text-white px-6 py-3 font-semibold hover:bg-brand/90 transition-colors">
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
                                    class="flex items-center gap-3 p-4 border cursor-pointer hover:border-brand transition-colors"
                                    :class="selectedShipping === option.id ? 'border-brand bg-blue-50' : 'border-gray-200'">
                                    <input type="radio" v-model="selectedShipping" :value="option.id"
                                        class="w-4 h-4 text-brand" />
                                    <div class="flex-1">
                                        <div class="font-medium">{{ option.name }}</div>
                                        <div class="text-sm text-gray-500">{{ option.description }}</div>
                                    </div>
                                    <div class="font-semibold">{{ option.price === 0 ? 'FREE' :
                                        `$${option.price.toFixed(2)}` }}</div>
                                </label>
                            </div>
                            <button @click="nextStep"
                                class="mt-4 bg-brand text-white px-6 py-3 font-semibold hover:bg-brand/90 transition-colors">
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
                                        class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                </div>
                                <div>
                                    <label for="cardNumber"
                                        class="block text-xs font-medium text-gray-700 mb-1 uppercase">Card Number
                                        *</label>
                                    <input id="cardNumber" v-model="form.cardNumber" type="text"
                                        placeholder="1234 5678 9012 3456"
                                        class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label for="expiry"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">Expiry Date
                                            *</label>
                                        <input id="expiry" v-model="form.expiry" type="text" placeholder="MM/YY"
                                            class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                    </div>
                                    <div>
                                        <label for="cvv"
                                            class="block text-xs font-medium text-gray-700 mb-1 uppercase">CVV *</label>
                                        <input id="cvv" v-model="form.cvv" type="text" placeholder="123"
                                            class="w-full px-3 py-2 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                    </div>
                                </div>
                                <button @click="nextStep"
                                    class="mt-4 bg-brand text-white px-6 py-3 font-semibold hover:bg-brand/90 transition-colors">
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
                                <div class="bg-gray-50 p-4 rounded">
                                    <h3 class="font-semibold mb-2">Order Summary</h3>
                                    <div class="text-sm space-y-1">
                                        <p><span class="text-gray-600">Ship to:</span> {{ form.firstName }} {{
                                            form.lastName }}, {{ form.address }}, {{ form.city }}, {{ form.state }} {{
                                                form.zip }}</p>
                                        <p><span class="text-gray-600">Shipping:</span> {{
                                            shippingOptions.find(o => o.id === selectedShipping)?.name}}</p>
                                        <p><span class="text-gray-600">Payment:</span> Card ending in {{
                                            form.cardNumber.slice(-4) }}</p>
                                    </div>
                                </div>
                                <button @click="placeOrder"
                                    class="w-full bg-brand text-white px-6 py-3 font-semibold hover:bg-brand/90 transition-colors">
                                    Place Order - ${{ total.toFixed(2) }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Summary -->
                <div class="lg:col-span-5 mt-8 lg:mt-0">
                    <div class="bg-gray-50 p-6 sticky top-4">
                        <h2 class="text-xl font-bold text-gray-900 mb-4">Summary</h2>

                        <!-- Promo Code -->
                        <div class="mb-4">
                            <label class="block text-xs text-gray-600 mb-1">Promo code <span class="text-gray-400">3 per
                                    order maximum</span></label>
                            <div class="flex">
                                <input v-model="promoCode" type="text" placeholder="Enter code"
                                    class="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent" />
                                <button class="bg-brand text-white px-4 py-2 hover:bg-brand/90 transition-colors">
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
                            <div class="space-y-4">
                                <div v-for="item in cartItems" :key="item.id" class="flex gap-3">
                                    <div
                                        class="w-16 h-16 flex-shrink-0 bg-white border border-gray-200 rounded overflow-hidden">
                                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover"
                                            loading="lazy"
                                            @error="(e: Event) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=No+Image'" />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex justify-between">
                                            <div class="font-semibold text-sm">{{ item.name }}</div>
                                            <div class="font-semibold text-sm">${{ item.price.toFixed(2) }}</div>
                                        </div>
                                        <div class="text-xs text-gray-500 mt-1">
                                            <p>{{ item.description }}</p>
                                            <p>Quantity: {{ item.quantity }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Need Help -->
                        <div class="border-t border-gray-200 pt-4 mt-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-bold mb-2">Need help?</h4>
                                    <a href="#" class="text-brand underline text-sm block mb-1">Visit our Help
                                        Center</a>
                                    <p class="text-sm text-gray-600">Call us</p>
                                    <p class="text-sm font-semibold">888-764-8888</p>
                                    <p class="text-xs text-gray-500">Mon-Fri 6am-5pm PST</p>
                                </div>
                                <div class="text-right">
                                    <div
                                        class="border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 inline-block">
                                        <div class="font-semibold text-green-700">✓ Secure</div>
                                        <div>& Trusted</div>
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
    import { computed, ref } from 'vue'
    import { useRouter } from 'vue-router'

    // Disable default layout
    definePageMeta({
        layout: false
    })

    const router = useRouter()

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

    // Example cart items - replace with your store logic
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
        }
    ])

    const totalItems = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0))
    const subtotal = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
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
        router.push('/')
    }
</script>
