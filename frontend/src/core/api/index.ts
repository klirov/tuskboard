import type { ApiResponse } from '../../../../shared/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function apiRequest<T>(endpoint: string, init?: RequestInit): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...init?.headers,
            },
            ...init,
        });

        if (!response.ok && response.status >= 500) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const body = (await response.json()) as ApiResponse<T>;

        if (!body.ok) {
            throw new Error(body.message ?? `HTTP ${body.status}`);
        }

        return body.data as T;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
