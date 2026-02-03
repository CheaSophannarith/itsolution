import type { WishlistItem, WishlistResponse, WishlistCheckResponse, WishlistToggleResponse } from '~/types'



export const useWishlist = () => {
    const config = useRuntimeConfig()
    const authStore = useAuthStore()
    const { addToast } = useToast()

    // Get all wishlist items
    const getWishlist = async (): Promise<WishlistItem[]> => {
        if (!authStore.isAuthenticated || !authStore.token) {
            throw new Error('User must be authenticated to access wishlist')
        }

        try {
            const response = await $fetch<WishlistResponse>(
                `${config.public.apiBaseUrl}/api/v1/wishlist`,
                {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                        Accept: 'application/json',
                    }
                }
            )
            return Array.isArray(response.data?.items) ? response.data.items : []
        } catch (error) {
            console.error('Failed to fetch wishlist:', error)
            return []
        }
    }

    // Check if a product is in wishlist
    const checkProduct = async (productUuid: string): Promise<{ exists: boolean; itemId?: string }> => {
        if (!authStore.isAuthenticated || !authStore.token) {
            return { exists: false }
        }

        try {
            const response = await $fetch<WishlistCheckResponse>(
                `${config.public.apiBaseUrl}/api/v1/wishlist/check/${productUuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                        Accept: 'application/json',
                    }
                }
            )
            return {
                exists: response.data.in_wishlist
            }
        } catch (error) {
            console.error('Failed to check wishlist product:', error)
            return { exists: false }
        }
    }

    // Toggle product in wishlist
    const toggleProduct = async (productUuid: string): Promise<{ added: boolean; message: string }> => {
        if (!authStore.isAuthenticated || !authStore.token) {
            addToast('Please sign in to add items to wishlist', 'error')
            return { added: false, message: 'Authentication required' }
        }

        try {
            const response = await $fetch<WishlistToggleResponse>(
                `${config.public.apiBaseUrl}/api/v1/wishlist/toggle/${productUuid}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                        Accept: 'application/json',
                    }
                }
            )

            const added = response.data.in_wishlist
            const message = response.data.action === 'added' ? 'Added to wishlist' : 'Removed from wishlist'
            addToast(message, 'success')

            return {
                added: added,
                message: message
            }
        } catch (error) {
            console.error('Failed to toggle wishlist product:', error)
            addToast('Failed to update wishlist', 'error')
            return { added: false, message: 'Failed to update wishlist' }
        }
    }

    // Remove item from wishlist by product UUID
    const removeItem = async (productUuid: string): Promise<boolean> => {
        if (!authStore.isAuthenticated || !authStore.token) {
            addToast('Please sign in to manage wishlist', 'error')
            return false
        }

        try {
            await $fetch<WishlistToggleResponse>(
                `${config.public.apiBaseUrl}/api/v1/wishlist/toggle/${productUuid}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                        Accept: 'application/json',
                    }
                }
            )

            addToast('Removed from wishlist', 'success')
            return true
        } catch (error) {
            console.error('Failed to remove wishlist item:', error)
            addToast('Failed to remove item from wishlist', 'error')
            return false
        }
    }

    return {
        getWishlist,
        checkProduct,
        toggleProduct,
        removeItem
    }
}