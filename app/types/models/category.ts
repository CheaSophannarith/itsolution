import type { SubCategory } from "./sub-category";
export interface Category {
    id: number;
    name: string;
    image: string;
    slug?: string;
    subCategories?: SubCategory [];
}