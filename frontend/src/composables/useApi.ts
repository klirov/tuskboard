import { ref } from 'vue';

export type ApiResponse<T> = {
    ok: boolean;
    status: number;
    data: T;
    message?: string;
};

export type Field = 'email' | 'password';

export function useApi() {
    const loading = ref<boolean>(false);

    async function requestApi<T>(url: string, init?: RequestInit): Promise<T> {
        loading.value = true;

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
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        requestApi,
    };
}
