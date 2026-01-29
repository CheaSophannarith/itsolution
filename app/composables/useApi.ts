export const useApi = () => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    async function request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: Record<string, string> = {
            Accept: 'application/json',
            ...(options.headers as Record<string, string>),
        };

        // Only add Content-Type for non-FormData requests
        if (!(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }

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

        post: <T>(endpoint: string, body?: any, options?: RequestInit) => {
            const isFormData = body instanceof FormData;
            return request<T>(endpoint, {
                ...options,
                method: 'POST',
                body: isFormData ? body : JSON.stringify(body),
            });
        },

        put: <T>(endpoint: string, body?: any, options?: RequestInit) => {
            const isFormData = body instanceof FormData;
            return request<T>(endpoint, {
                ...options,
                method: 'PUT',
                body: isFormData ? body : JSON.stringify(body),
            });
        },

        delete: <T>(endpoint: string, options?: RequestInit) =>
            request<T>(endpoint, { ...options, method: 'DELETE' }),
    };
};