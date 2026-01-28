export const useApi = () => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    async function request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...options.headers,
        };

        // Get token from auth store if it exists
        const authStore = useAuthStore();
        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`;
        }

        const response = await fetch(`${apiBaseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return response.json();
    }

    return {
        get: <T>(endpoint: string, options?: RequestInit) =>
            request<T>(endpoint, { ...options, method: 'GET' }),

        post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
            request<T>(endpoint, {
                ...options,
                method: 'POST',
                body: JSON.stringify(body),
            }),

        put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
            request<T>(endpoint, {
                ...options,
                method: 'PUT',
                body: JSON.stringify(body),
            }),

        delete: <T>(endpoint: string, options?: RequestInit) =>
            request<T>(endpoint, { ...options, method: 'DELETE' }),
    };
};