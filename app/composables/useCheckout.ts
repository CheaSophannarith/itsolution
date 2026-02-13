import type { CheckoutOrderResponse, CheckoutPayment } from '~/types/models/checkout'

export const useCheckout = () => {
    const api = useApi()

    const isPlacingOrder = ref(false)
    const error = ref<string | null>(null)
    const payment = ref<CheckoutPayment | null>(null)

    async function placeOrder(shippingAddressUuid: string, notes: string = '') {
        isPlacingOrder.value = true
        error.value = null
        payment.value = null

        try {
            const response = await api.post<CheckoutOrderResponse>('/api/v1/checkout', {
                shipping_address_uuid: shippingAddressUuid,
                use_shipping_for_billing: true,
                payment_method: 'bakong_khqr',
                currency: 'USD',
                notes,
            })

            payment.value = response.data.payment
        } catch (err: any) {
            error.value = err?.message || 'Failed to create order. Please try again.'
        } finally {
            isPlacingOrder.value = false
        }
    }

    return {
        isPlacingOrder,
        error,
        payment,
        placeOrder,
    }
}
