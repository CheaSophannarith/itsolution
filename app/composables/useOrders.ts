import type { Order, OrdersResponse } from '~/types/models/order'

export function useOrders() {
    const api = useApi()

    const orders = ref<Order[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // Pagination state
    const currentPage = ref(1)
    const lastPage = ref(1)
    const perPage = ref(10)
    const total = ref(0)

    async function fetchOrders(page: number = 1) {
        isLoading.value = true
        error.value = null

        try {
            const response = await api.get<OrdersResponse>(
                `/api/v1/orders?page=${page}&per_page=${perPage.value}`
            )

            orders.value = response.data
            currentPage.value = response.meta.current_page
            lastPage.value = response.meta.last_page
            perPage.value = response.meta.per_page
            total.value = response.meta.total
        } catch (err: any) {
            error.value = err?.message || 'Failed to load orders. Please try again.'
        } finally {
            isLoading.value = false
        }
    }

    function goToPage(page: number) {
        if (page >= 1 && page <= lastPage.value) {
            fetchOrders(page)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return {
        orders,
        isLoading,
        error,
        currentPage,
        lastPage,
        perPage,
        total,
        fetchOrders,
        goToPage,
    }
}
