import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';
import { useApi } from './useApi';
import type { User } from '../../../shared/types';

const URL = 'http://localhost:3000';

export function useAuth() {
    const userStore = useUserStore();
    const { user } = storeToRefs(userStore);
    const { requestApi } = useApi();
    const router = useRouter();

    async function registerUser(email: string, password: string) {
        try {
            const data = await requestApi<User>(`${URL}/register`, {
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
            const data = await requestApi<User>(`${URL}/login`, {
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

    async function fetchMe() {
        try {
            const data = await requestApi<User>(`${URL}/protected/me`);
            if (data) {
                user.value = data;
                router.push('/profile');
            }
        } catch {
            return null;
        }
    }

    async function logout() {
        try {
            await requestApi(`${URL}/logout`, {
                method: 'POST',
            });
            user.value = null;
        } catch {
            throw new Error('Логаут не удался');
        }
    }

    return { registerUser, verifyUser, fetchMe, logout };
}
