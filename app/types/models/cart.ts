import type { ProductAttributeOption } from './product-detail';

// Cart Product (minimal product info in cart items)
export interface CartProduct {
    uuid: string;
    name: string;
    slug: string;
    image: string;
}

// Cart SKU (SKU details in cart items)
export interface CartSku {
    uuid: string;
    sku: string;
    name: string | null;
    price: string;
    compare_at_price: string | null;
    is_in_stock: boolean;
    stock_quantity: number;
    attribute_options: ProductAttributeOption[];
    product: CartProduct;
}

// Cart Item (individual item in the cart)
export interface CartItem {
    uuid: string;
    quantity: number;
    line_total: string;
    sku: CartSku;
    added_at: string;
}

// Coupon information
export interface CartCoupon {
    code: string;
    discount: string;
    type: string;
}

// Main Cart data
export interface Cart {
    uuid: string;
    items_count: number;
    total_items: number;
    subtotal: string;
    discount: string;
    total: string;
    coupon: CartCoupon | null;
    items: CartItem[];
    created_at: string;
    updated_at: string;
}

// API Response wrapper
export interface CartResponse {
    data: Cart;
}

// Add to cart request
export interface AddToCartRequest {
    sku_uuid: string;
    quantity: number;
}

// Update cart item request
export interface UpdateCartItemRequest {
    quantity: number;
}

// Apply coupon request
export interface ApplyCouponRequest {
    code: string;
}

// Remove item response
export interface RemoveItemResponse {
    data: object;
    message: string;
    meta: {
        cart_subtotal: string;
        cart_total_items: string;
    };
}
