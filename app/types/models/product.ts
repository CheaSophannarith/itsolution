import type { DescriptionItem } from './description-item';

export interface Product {
    id: number;
    name: string;
    description: DescriptionItem[];
    price: number;
    manufacturer_id: number;
    brand_id: number;
    category_id: number;
    subcategory_ids: number[];
    type_ids: number[];
    image: string;
    stock: number;
    rating: number;
    featured: boolean;
}
