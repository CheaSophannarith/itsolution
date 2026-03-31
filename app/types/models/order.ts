export interface OrderAddress {
    full_name: string
    company: string | null
    address_line_1: string
    address_line_2: string | null
    city: string
    state: string | null
    postal_code: string
    country_code: string
    phone: string | null
    province: string
}

export interface OrderItem {
    uuid: string
    sku_code: string
    product_name: string
    variant_name: string | null
    quantity: number
    unit_price: string
    subtotal: string
    attributes: any[]
}

export interface OrderPayment {
    uuid: string
    payment_method: string
    payment_provider: string
    amount: string
    currency_code: string
    status: string
    qr_string: string | null
    expires_at: string | null
    paid_at: string | null
}

export interface Order {
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
    shipping_address: OrderAddress
    billing_address: OrderAddress
    notes: string | null
    items: OrderItem[]
    payment: OrderPayment
    created_at: string
    updated_at: string
}

export interface OrdersMeta {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export interface OrdersResponse {
    data: Order[]
    meta: OrdersMeta
}
