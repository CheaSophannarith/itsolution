export interface Category {
    uuid: string;
    name: string;
    slug: string;
    description: string | null;
    image: string;
    is_popular: boolean;
}
