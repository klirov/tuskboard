import { storeToRefs } from 'pinia';
import { useAuthStore } from './auth.store.ts';
import { type Router } from 'vue-router';
import { apiRequest } from '../../core/api';
import type { User } from '../../../../shared/types';

export function useAuth(router: Router) {
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);

    async function registerUser(email: string, password: string) {
        try {
            const data = await apiRequest<User>(`/register`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (data) {
                user.value = data;
                router.push('/profile');
            }
        } catch (e) {
            throw new Error(String(e));
        }
    }

    async function verifyUser(email: string, password: string) {
        try {
            const data = await apiRequest<User>(`/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            if (data) {
                user.value = data;
                router.push('/profile');
            }
        } catch (e) {
            throw new Error(String(e));
        }
    }

    async function fetchMe(): Promise<User | null> {
        try {
            const data = await apiRequest<User>(`/protected/me`);
            if (data) {
                user.value = data;
            }
            return data;
        } catch {
            return null;
        }
    }

    async function logout() {
        try {
            await apiRequest(`/logout`, {
                method: 'POST',
            });
            user.value = null;
            router.push('/login');
        } catch {
            throw new Error('Логаут не удался');
        }
    }

    return { registerUser, verifyUser, fetchMe, logout };
}
