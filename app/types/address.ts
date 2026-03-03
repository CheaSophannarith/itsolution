export interface Address {
    uuid: string;
    type: 'shipping' | 'billing';
    first_name: string;
    last_name: string;
    full_name: string;
    address_line_1: string;
    address_line_2: string | null;
    province: string;
    phone: string;
    email: string | null;
    label: string | null;
    is_default: boolean;
    formatted_address: string;
}

export interface AddressFormData {
    type: 'shipping' | 'billing';
    first_name: string;
    last_name: string;
    address_line_1: string;
    address_line_2?: string | null;
    province: string;
    phone: string;
    email?: string | null;
    label?: string | null;
    is_default: boolean;
}

export interface AddressResponse {
    data: Address;
    message: string;
}

export interface AddressListResponse {
    data: Address[];
}
