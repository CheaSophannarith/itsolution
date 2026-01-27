export interface ApiProductBrand {
    uuid: string;
    name: string;
    slug: string;
}

export interface ApiProduct {
    uuid: string;
    name: string;
    slug: string;
    short_description: string;
    image: string;
    brand: ApiProductBrand;
    price: string;
    compare_at_price: string | null;
    in_stock: boolean;
    is_featured: boolean;
}

export interface ApiProductsResponse {
    data: ApiProduct[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}
