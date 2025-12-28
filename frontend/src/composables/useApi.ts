import type { ApiResponse } from '../../../shared/types';

export function useApi() {
    async function requestApi<T>(url: string, init?: RequestInit): Promise<T> {
        try {
            const response = await fetch(url, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...init?.headers,
                },
                ...init,
            });
            const body = (await response.json()) as ApiResponse<T>;

            if (!body.ok) {
                throw new Error(body.message ?? `HTTP ${body.status}`);
            }

            return body.data as T;
        } catch (err) {
            throw new Error(String(err));
        }
    }

    return { requestApi };
}
