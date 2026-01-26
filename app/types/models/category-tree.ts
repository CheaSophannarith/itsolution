export interface CategoryTree {
    uuid: string;
    name: string;
    slug: string;
    sort_order: number;
    children: CategoryTree[];
}