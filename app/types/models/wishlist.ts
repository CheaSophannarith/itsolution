export interface WishlistProduct {
    uuid: string
    name: string
    slug: string
    short_description: string
    image: string
    brand: {
        uuid: string
        name: string
        slug: string
    }
    price: string
    compare_at_price: string | null
    in_stock: boolean
}

export interface WishlistItem {
    uuid: string
    notes: string | null
    product: WishlistProduct
    added_at: string
}

export interface WishlistData {
    uuid: string
    items_count: number
    items: WishlistItem[]
    created_at: string
    updated_at: string
}

export interface WishlistResponse {
    data: WishlistData
}

export interface WishlistCheckResponse {
    data: {
        in_wishlist: boolean
    }
}

export interface WishlistToggleResponse {
    data: {
        in_wishlist: boolean
        action: string
    }
}