import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user';
import { type Router } from 'vue-router';
import { useApi } from './useApi';
import type { User } from '../../../shared/types';

const BACKEND_URL = 'http://localhost:3000';

export function useAuth(router: Router) {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const { requestApi } = useApi();

    async function registerUser(email: string, password: string) {
        try {
            const data = await requestApi<User>(`${BACKEND_URL}/register`, {
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
            const data = await requestApi<User>(`${BACKEND_URL}/login`, {
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
            const data = await requestApi<User>(`${BACKEND_URL}/protected/me`);
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
            await requestApi(`${BACKEND_URL}/logout`, {
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
