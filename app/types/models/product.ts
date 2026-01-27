export interface ProductBrand {
    uuid: string;
    name: string;
    slug: string;
}

export interface Product {
    uuid: string;
    name: string;
    slug: string;
    short_description: string;
    image: string;
    brand: ProductBrand;
    price: string;
    compare_at_price: string | null;
    in_stock: boolean;
    is_featured: boolean;
}

export interface ProductsResponse {
    data: Product[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}