export interface User {
    uuid: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
    device_name?: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
}

export interface AuthResponse {
    data: {
        user: User;
        token: string;
    };
}