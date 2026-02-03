import { defineStore } from 'pinia'
import type { WishlistItem } from '~/types'

interface WishlistState {
    items: WishlistItem[]
    loading: boolean
    initialized: boolean
}

export const useWishlistStore = defineStore('wishlist', {
    state: (): WishlistState => ({
        items: [],
        loading: false,
        initialized: false
    }),

    getters: {
        totalItems: (state) => Array.isArray(state.items) ? state.items.length : 0,
        
        itemIds: (state) => Array.isArray(state.items) ? state.items.map(item => item?.uuid).filter(Boolean) : [],
        
        productSlugs: (state) => Array.isArray(state.items) ? state.items.map(item => item?.product?.slug).filter(Boolean) : [],
        
        isInWishlist: (state) => (productSlug: string) => {
            if (!Array.isArray(state.items)) return false
            return state.items.some(item => item?.product?.slug === productSlug)
        },
        
        getItemByProduct: (state) => (productSlug: string) => {
            if (!Array.isArray(state.items)) return undefined
            return state.items.find(item => item?.product?.slug === productSlug)
        }
    },

    actions: {
        async initializeWishlist() {
            if (this.initialized) return

            const authStore = useAuthStore()
            if (!authStore.isAuthenticated) {
                this.items = []
                this.initialized = true
                return
            }

            this.loading = true
            try {
                const { getWishlist } = useWishlist()
                const result = await getWishlist()
                this.items = Array.isArray(result) ? result : []
            } catch (error) {
                console.error('Failed to initialize wishlist:', error)
                this.items = []
            } finally {
                this.loading = false
                this.initialized = true
            }
        },

        async toggleProduct(productUuid: string, productSlug: string) {
            const { toggleProduct } = useWishlist()

            this.loading = true
            try {
                const result = await toggleProduct(productUuid)

                if (result.added) {
                    // Product was added, refresh the wishlist to get the new item
                    await this.refreshWishlist()
                } else {
                    // Product was removed, remove it from local state
                    if (Array.isArray(this.items)) {
                        const index = this.items.findIndex(item => item?.product?.slug === productSlug)
                        if (index > -1) {
                            this.items.splice(index, 1)
                        }
                    }
                }

                return result
            } finally {
                this.loading = false
            }
        },

        async removeItem(productUuid: string, productSlug: string) {
            const { removeItem } = useWishlist()

            this.loading = true
            try {
                const success = await removeItem(productUuid)
                if (success && Array.isArray(this.items)) {
                    const index = this.items.findIndex(item => item?.product?.slug === productSlug)
                    if (index > -1) {
                        this.items.splice(index, 1)
                    }
                }
                return success
            } finally {
                this.loading = false
            }
        },

        async refreshWishlist() {
            const authStore = useAuthStore()
            if (!authStore.isAuthenticated) {
                this.items = []
                return
            }

            this.loading = true
            try {
                const { getWishlist } = useWishlist()
                const result = await getWishlist()
                this.items = Array.isArray(result) ? result : []
            } catch (error) {
                console.error('Failed to refresh wishlist:', error)
                this.items = []
            } finally {
                this.loading = false
            }
        },

        clearWishlist() {
            this.items = []
            this.initialized = false
        }
    }
})