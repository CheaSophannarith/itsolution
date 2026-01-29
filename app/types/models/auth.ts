export interface User {
    uuid: string;
    name: string;
    email: string;
    avatar?: string | null;
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

export interface ProfileFormData {
    name: string;
    email: string;
}