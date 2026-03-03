export interface Brand {
    uuid: string;
    name: string;
    slug: string;
    logo: string | null;
}

export interface BrandsResponse {
    data: Brand[];
}