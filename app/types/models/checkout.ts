export interface CheckoutPreviewItem {
    uuid: string
    sku_uuid: string
    product_name: string
    variant_name: string | null
    quantity: number
    unit_price: string
    line_total: string
}

export interface CheckoutPreview {
    items: CheckoutPreviewItem[]
    subtotal: string
    discount_amount: string
    shipping_amount: string
    tax_amount: string
    total: string
    coupon: any | null
    stock_warnings: string[]
}

export interface CheckoutPreviewResponse {
    data: CheckoutPreview
}
