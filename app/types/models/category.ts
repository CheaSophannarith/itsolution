import type { SubCategory } from "./sub-category";

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    subcategories: SubCategory[];
}