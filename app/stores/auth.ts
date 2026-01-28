import { defineStore } from 'pinia';
import type { User, AuthState, LoginRequest, RegisterRequest, AuthResponse } from '~/types';

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        currentUser: (state) => state.user,
    },

    actions: {
        setAuth(user: User, token: string) {
            this.user = user;
            this.token = token;
        },

        clearAuth() {
            this.user = null;
            this.token = null;
        },

        async register(data: RegisterRequest) {
            const api = useApi();
            const response = await api.post<AuthResponse>('/api/v1/auth/register', data);

            this.setAuth(response.data.user, response.data.token);
            return response;
        },

        async login(data: LoginRequest) {
            const api = useApi();
            const response = await api.post<AuthResponse>('/api/v1/auth/login', {
                email: data.email,
                password: data.password,
                device_name: data.device_name || 'web',
            });

            this.setAuth(response.data.user, response.data.token);
            return response;
        },

        async logout() {
            try {
                const api = useApi();
                await api.post('/api/v1/auth/logout');
            } catch (error) {
                console.error('Logout error:', error);
            } finally {
                this.clearAuth();
            }
        },

        async fetchUser() {
            if (!this.token) return;

            try {
                const api = useApi();
                const response = await api.get<{ data: User }>('/api/v1/auth/user');
                this.user = response.data;
            } catch (error) {
                console.error('Fetch user error:', error);
                this.clearAuth();
            }
        },

        async resendVerificationEmail() {
            const api = useApi();
            await api.post('/api/v1/auth/email/resend');
        },

        async verifyEmail(id: string, hash: string) {
            const api = useApi();
            const response = await api.get(`/api/v1/auth/email/verify/${id}/${hash}`);

            // Refresh user data to get updated email_verified_at
            await this.fetchUser();

            return response;
        },

        async forgotPassword(email: string) {
            const api = useApi();
            await api.post('/api/v1/auth/forgot-password', { email });
        },

        async resetPassword(data: { token: string; email: string; password: string; password_confirmation: string }) {
            const api = useApi();
            await api.post('/api/v1/auth/reset-password', data);
        },

        async changePassword(data: { current_password: string; password: string; password_confirmation: string }) {
            const api = useApi();
            await api.post('/api/v1/auth/change-password', data);
        },
    },

    persist: true,
});