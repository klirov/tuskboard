import { storeToRefs } from 'pinia';
import { useUserStore, type User } from '../stores/useUserStore';
import { useRouter } from 'vue-router';
import { useApi, type Field } from './useApi';

const URL = 'http://localhost:3000';

export function useAuth() {
    const $userStore = useUserStore();
    const { user } = storeToRefs($userStore);
    const { fieldErrors, requestApi } = useApi();
    const router = useRouter();

    async function registerUser(
        email: string,
        password: string,
    ): Promise<Partial<Record<Field, string>> | null> {
        try {
            const data = await requestApi<User>(`${URL}/register`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (data) {
                user.value = data;
                router.push('/profile');
            }
            return null;
        } catch (e) {
            return fieldErrors.value ?? null;
        }
    }

    async function verifyUser(
        email: string,
        password: string,
    ): Promise<Partial<Record<Field, string>> | null> {
        try {
            const data = await requestApi<User>(`${URL}/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            if (data) {
                user.value = data;
                router.push('/profile');
            }
            return null;
        } catch (e) {
            return fieldErrors.value ?? null;
        }
    }

    async function fetchMe() {
        const data = await requestApi<User>(`${URL}/protected/me`);
        user.value = data;
    }

    async function logout() {
        await requestApi(`${URL}/logout`, {
            method: 'POST',
        });
        user.value = null;
    }

    return { registerUser, verifyUser, fetchMe, logout };
}
