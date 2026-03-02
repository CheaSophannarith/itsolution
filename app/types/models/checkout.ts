export interface CheckoutPreviewItem {
    uuid: string
    sku_uuid: string
    product_name: string
    variant_name: string | null
    quantity: number
    unit_price: string
    line_total: string
    image_url: string | null
}

export interface StockWarning {
    sku_uuid: string
    name: string
    requested: number
    available: number
}

export interface CheckoutPreview {
    items: CheckoutPreviewItem[]
    subtotal: string
    discount_amount: string
    shipping_amount: string
    tax_amount: string
    total: string
    coupon: any | null
    stock_warnings: StockWarning[]
}

export interface CheckoutPreviewResponse {
    data: CheckoutPreview
}

export interface CheckoutPayment {
    uuid: string
    payment_method: string
    payment_provider: string
    amount: string
    currency_code: string
    status: string
    qr_string: string
    expires_at: string
    paid_at: string | null
}

export interface CheckoutOrderAddress {
    full_name: string
    company: string | null
    address_line_1: string
    address_line_2: string | null
    city: string
    state: string | null
    postal_code: string
    country_code: string
    phone: string | null
}

export interface CheckoutOrderItem {
    uuid: string
    sku_code: string
    product_name: string
    variant_name: string | null
    quantity: number
    unit_price: string
    subtotal: string
    attributes: any[]
}

export interface CheckoutOrder {
    uuid: string
    order_number: string
    status: string
    payment_status: string
    subtotal: string
    discount_amount: string
    shipping_amount: string
    tax_amount: string
    total: string
    currency_code: string
    shipping_address: CheckoutOrderAddress
    billing_address: CheckoutOrderAddress
    notes: string | null
    items: CheckoutOrderItem[]
    payment: CheckoutPayment
    created_at: string
    updated_at: string
}

export interface CheckoutOrderResponse {
    data: CheckoutOrder
    message: string
}

export interface PaymentStatusResponse {
    data: {
        payment: CheckoutPayment
        status: string
        message: string
    }
}
