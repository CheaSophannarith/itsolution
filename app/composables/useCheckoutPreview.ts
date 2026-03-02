import type { CheckoutPreview, CheckoutPreviewResponse, StockWarning } from '~/types/models/checkout'

export const useCheckoutPreview = () => {
    const api = useApi()

    const preview = ref<CheckoutPreview | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    async function fetchPreview() {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.post<CheckoutPreviewResponse>('/api/v1/checkout/preview', { currency: 'USD' })
            preview.value = response.data
        } catch (err: any) {
            error.value = err?.message || 'Failed to load checkout preview'
        } finally {
            isLoading.value = false
        }
    }

    const items = computed(() => preview.value?.items ?? [])
    const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
    const subtotal = computed(() => parseFloat(preview.value?.subtotal ?? '0'))
    const discountAmount = computed(() => parseFloat(preview.value?.discount_amount ?? '0'))
    const shippingAmount = computed(() => parseFloat(preview.value?.shipping_amount ?? '0'))
    const taxAmount = computed(() => parseFloat(preview.value?.tax_amount ?? '0'))
    const total = computed(() => parseFloat(preview.value?.total ?? '0'))
    const stockWarnings = computed(() => preview.value?.stock_warnings ?? [])
    const coupon = computed(() => preview.value?.coupon ?? null)

    return {
        preview,
        isLoading,
        error,
        fetchPreview,
        items,
        totalItems,
        subtotal,
        discountAmount,
        shippingAmount,
        taxAmount,
        total,
        stockWarnings,
        coupon,
    }
}
