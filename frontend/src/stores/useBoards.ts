import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Board } from '../../../shared/types';
import { useApi } from '../composables/useApi';
import { useNotifications } from '../composables/useNotifications';

const URL = 'http://localhost:3000';

export const useBoardsStore = defineStore('boards', () => {
    const { requestApi } = useApi();
    const { showNotification } = useNotifications();

    const userBoards = ref<Board[]>([]);
    const loading = ref(false);

    async function getUserBoards(userId: number) {
        loading.value = true;
        try {
            const data = await requestApi<Board[]>(`${URL}/boards/${userId}`, {
                method: 'GET',
            });
            if (data) {
                userBoards.value = data;
            }
        } catch {
            showNotification('error', "Failed to load user's boards.");
        } finally {
            loading.value = false;
        }
    }

    async function createBoard(userId: number, boardData: Partial<Board>) {
        try {
            await requestApi(`${URL}/boards/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(boardData),
            });
        } catch {
            showNotification('error', 'Error while creating board');
        }
    }

    return {
        userBoards,
        loading,
        getUserBoards,
        createBoard,
    };
});
