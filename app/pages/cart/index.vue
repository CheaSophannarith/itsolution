<template>
	<div class="min-h-screen bg-gray-50 flex flex-col">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">

			<!-- Page Header -->
			<div class="mb-7">
				<!-- Breadcrumb -->
				<nav class="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
					<NuxtLink to="/" class="hover:text-brand transition-colors">Home</NuxtLink>
					<ChevronRight class="w-3 h-3" />
					<span class="text-gray-900 font-semibold">Cart</span>
				</nav>

				<!-- Step progress -->
				<div class="flex items-center mb-5">
					<div class="flex items-center gap-2">
						<span class="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">1</span>
						<span class="text-sm font-semibold text-brand">Cart</span>
					</div>
					<div class="h-px w-8 sm:w-12 bg-gray-300 mx-2"></div>
					<div class="flex items-center gap-2">
						<span class="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center">2</span>
						<span class="text-sm font-medium text-gray-400">Checkout</span>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Your Cart</h1>
					<button v-if="items.length > 0" @click="clearCart"
						class="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors">
						<Trash2 class="w-4 h-4" />
						Clear all
					</button>
				</div>
			</div>

			<!-- Empty State -->
			<div v-if="items.length === 0"
				class="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 text-center">
				<div class="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
					<ShoppingCart class="w-8 h-8 text-gray-300 stroke-[1.5]" />
				</div>
				<h2 class="text-lg font-bold text-gray-900 mb-1.5">Your cart is empty</h2>
				<p class="text-sm text-gray-400 mb-6 max-w-xs">Start adding products you love and they'll appear here</p>
				<NuxtLink to="/"
					class="inline-flex items-center gap-2 px-6 py-2.5 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-brand/90 transition-all shadow-sm hover:shadow-md">
					<ShoppingCart class="w-4 h-4" />
					Start Shopping
				</NuxtLink>
			</div>

			<!-- Cart Content -->
			<div v-else class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">

				<!-- Left: Items -->
				<div class="lg:col-span-7 space-y-3 mb-6 lg:mb-0">
					<TransitionGroup name="cart-item" tag="div" class="space-y-3">
						<div v-for="item in items" :key="item.uuid"
							class="bg-white rounded-2xl border p-4 transition-all duration-200"
							:class="(!item.sku.is_in_stock || item.sku.stock_quantity === 0)
								? 'border-red-200 bg-red-50/30'
								: 'border-gray-100 hover:border-brand/20 hover:shadow-sm'">

							<div class="flex gap-4">
								<!-- Image -->
								<NuxtLink :to="`/products/${item.sku.product.slug}`"
									class="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
									<img v-if="item.sku.product.image" :src="item.sku.product.image"
										:alt="item.sku.product.name" class="w-full h-full object-contain p-1.5"
										loading="lazy" />
									<div v-else class="w-full h-full flex items-center justify-center text-gray-300">
										<ImageOff class="w-8 h-8" />
									</div>
								</NuxtLink>

								<!-- Info -->
								<div class="flex-1 min-w-0">
									<div class="flex justify-between gap-3">
										<div class="flex-1 min-w-0">
											<NuxtLink :to="`/products/${item.sku.product.slug}`"
												class="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 hover:text-brand transition-colors leading-snug block mb-1">
												{{ item.sku.product.name }}
											</NuxtLink>
											<p v-if="item.sku.attribute_options.length > 0" class="text-xs text-gray-500 mb-1.5">
												{{ item.sku.attribute_options.map((o: any) => o.label).join(' / ') }}
											</p>
											<span v-if="!item.sku.is_in_stock || item.sku.stock_quantity === 0"
												class="inline-flex items-center text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-2 py-0.5">
												Out of Stock
											</span>
											<span v-else-if="item.quantity > item.sku.stock_quantity"
												class="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-2 py-0.5">
												Only {{ item.sku.stock_quantity }} left
											</span>
										</div>

										<!-- Price -->
										<div class="text-right shrink-0">
											<div class="font-bold text-sm sm:text-base text-gray-900 tabular-nums">
												${{ parseFloat(item.line_total).toFixed(2) }}
											</div>
											<div v-if="item.quantity > 1" class="text-xs text-gray-400 mt-0.5 tabular-nums">
												${{ parseFloat(item.sku.price).toFixed(2) }} each
											</div>
										</div>
									</div>

									<!-- Controls -->
									<div class="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
										<div class="inline-flex items-center bg-gray-50 rounded-xl border border-gray-200">
											<button
												class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-l-xl hover:bg-gray-100"
												:disabled="item.quantity <= 1"
												@click="updateQuantity(item.uuid, item.quantity - 1)">
												<Minus class="w-3.5 h-3.5" />
											</button>
											<span class="px-3 text-sm font-bold text-gray-900 tabular-nums min-w-[2.5rem] text-center select-none">
												{{ item.quantity }}
											</span>
											<button
												class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-r-xl hover:bg-gray-100"
												:disabled="item.quantity >= item.sku.stock_quantity"
												@click="updateQuantity(item.uuid, item.quantity + 1)">
												<Plus class="w-3.5 h-3.5" />
											</button>
										</div>

										<button @click="removeItem(item.uuid)"
											class="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors">
											<Trash2 class="w-3.5 h-3.5" />
											Remove
										</button>
									</div>
								</div>
							</div>
						</div>
					</TransitionGroup>

					<!-- Continue Shopping -->
					<div class="pt-1">
						<NuxtLink to="/"
							class="inline-flex items-center gap-1.5 text-sm text-brand font-medium hover:underline underline-offset-2">
							<ChevronLeft class="w-4 h-4" />
							Continue Shopping
						</NuxtLink>
					</div>
				</div>

				<!-- Right: Order Summary -->
				<div class="lg:col-span-5">
					<div class="lg:sticky lg:top-6 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
						<!-- Header -->
						<div class="bg-gray-50 border-b border-gray-100 px-5 py-4">
							<h2 class="text-sm font-bold text-gray-900 flex items-center gap-2">
								<ShoppingCart class="w-4 h-4 text-brand" />
								Order Summary
								<span class="ml-auto text-xs font-medium text-gray-400 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">
									{{ ItemCount }} {{ ItemCount === 1 ? 'item' : 'items' }}
								</span>
							</h2>
						</div>

						<div class="p-5 space-y-4">
							<!-- Out of stock warning -->
							<div v-if="hasOutOfStockItems"
								class="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-xs text-red-700">
								<AlertTriangle class="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
								<span>Some items are out of stock. Remove them before checking out.</span>
							</div>

							<!-- Pricing -->
							<div class="space-y-2">
								<div class="flex justify-between text-sm text-gray-600">
									<span>Subtotal</span>
									<span class="font-medium text-gray-900">${{ totalPrice.toFixed(2) }}</span>
								</div>
								<div class="flex justify-between text-sm text-gray-500">
									<span>Shipping</span>
									<span class="font-medium text-green-600">Calculated at checkout</span>
								</div>
							</div>

							<!-- Total -->
							<div class="border-t-2 border-gray-100 pt-4 flex justify-between items-center">
								<span class="font-bold text-gray-900">Total</span>
								<div class="flex items-baseline gap-1">
									<span class="text-xs text-gray-400 font-medium uppercase tracking-wider">USD</span>
									<span class="text-xl font-extrabold text-brand tabular-nums">${{ totalPrice.toFixed(2) }}</span>
								</div>
							</div>

							<!-- CTA Button -->
							<button @click="handleCheckout" :disabled="hasOutOfStockItems"
								class="w-full bg-brand text-white py-3.5 rounded-xl font-bold text-base hover:bg-brand/90 transition-all shadow-sm hover:shadow-lg hover:shadow-brand/20 active:scale-[0.98] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100">
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Minus, Plus, ShoppingCart, Trash2, ChevronRight, ChevronLeft, ArrowRight, ImageOff, AlertTriangle } from 'lucide-vue-next'

useSeoMeta({ title: 'Cart | IT Solution Digital' })

const router = useRouter()
const authStore = useAuthStore()
const { items, ItemCount, totalPrice, removeItem, updateQuantity, clearCart } = useCart()

const hasOutOfStockItems = computed(() =>
	items.value.some(item => !item.sku.is_in_stock || item.sku.stock_quantity === 0)
)

const handleCheckout = () => {
	if (!authStore.isAuthenticated) {
		router.push({ path: '/signin', query: { redirect: '/checkout' } })
	} else {
		router.push('/checkout')
	}
}
</script>

<style scoped>
.cart-item-enter-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.cart-item-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.cart-item-enter-from { opacity: 0; transform: translateY(14px); }
.cart-item-leave-to { opacity: 0; transform: translateX(-14px) scale(0.97); }
.cart-item-move { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
</style>