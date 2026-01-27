export interface FilterBreadcrumb {
    uuid: string;
    name: string;
    slug: string;
}

export interface FilterBrand {
    uuid: string;
    name: string;
    slug: string;
    count: number;
}

export interface FilterAttributeOption {
    uuid: string;
    value: string;
    label: string;
    count: number;
}

export interface FilterAttribute {
    uuid: string;
    name: string;
    slug: string;
    type: string;
    options: FilterAttributeOption[];
}

export interface FilterPriceRange {
    min: number;
    max: number;
}

export interface CategoryFilterData {
    category: {
        uuid: string;
        name: string;
        slug: string;
        description: string | null;
        image: string;
        breadcrumbs: FilterBreadcrumb[];
    };
    filters: {
        brands: FilterBrand[];
        attributes: FilterAttribute[];
        price_range: FilterPriceRange;
    };
}

export interface CategoryFilterResponse {
    data: CategoryFilterData;
}
