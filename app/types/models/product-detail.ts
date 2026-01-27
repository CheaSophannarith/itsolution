import type { ProductBrand } from './product';

export interface ProductImage {
    original: string;
    thumb: string;
    preview: string;
    webp: string;
}

export interface ProductImages {
    featured: ProductImage;
    gallery: ProductImage[];
}

export interface ProductAttribute {
    uuid: string;
    name: string;
    slug: string;
}

export interface ProductAttributeOption {
    uuid: string;
    value: string;
    label: string;
    attribute: ProductAttribute;
}

export interface ProductSku {
    uuid: string;
    sku: string;
    name: string | null;
    price: string;
    compare_at_price: string | null;
    stock_quantity: number;
    is_in_stock: boolean;
    attribute_options: ProductAttributeOption[];
}

export interface ProductBreadcrumb {
    uuid: string;
    name: string;
    slug: string;
}

export interface ProductCategory {
    uuid: string;
    name: string;
    slug: string;
    breadcrumbs: ProductBreadcrumb[];
}

export interface ProductDetail {
    uuid: string;
    name: string;
    slug: string;
    short_description: string;
    description: string;
    meta_title: string | null;
    meta_description: string | null;
    is_active: boolean;
    is_featured: boolean;
    published_at: string | null;
    brand: ProductBrand;
    categories: ProductCategory[];
    skus: ProductSku[];
    images: ProductImages;
}

export interface ProductDetailResponse {
    data: ProductDetail;
}