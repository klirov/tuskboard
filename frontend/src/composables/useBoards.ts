import { computed, ref } from 'vue';
import type { Board } from '../../../shared/types';
import { useApi } from '../composables/useApi';

const BACKEND_URL = 'http://localhost:3000';

export function useBoards(userId: number | null) {
    const { requestApi } = useApi();

    const id = computed(() => {
        const id = Number(userId);
        return isNaN(id) ? null : id;
    });

    const boards = ref<Board[]>([]);
    const loading = ref(false);

    async function getBoards() {
        loading.value = true;
        try {
            const data = await requestApi<Board[]>(`${BACKEND_URL}/boards/${id.value}`, {
                method: 'GET',
            });
            if (data) {
                boards.value = data;
            }
        } catch (e) {
            throw new Error(`Failed to load user's boards: ${e}`);
        } finally {
            loading.value = false;
        }
    }

    async function createBoard(boardData: Partial<Board>) {
        try {
            await requestApi(`${BACKEND_URL}/boards/${id.value}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(boardData),
            });
        } catch (e) {
            throw new Error(`Error creating task: ${e}`);
        }
    }

    async function editBoard(boardData: Partial<Board>) {
        try {
            await requestApi(`${BACKEND_URL}/boards/${boardData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(boardData),
            });
        } catch (e) {
            throw new Error(`Error editing board: ${e}`);
        }
    }

    async function deleteBoard(boardId: number) {
        try {
            await requestApi(`${BACKEND_URL}/boards/${boardId}`, {
                method: 'DELETE',
            });
        } catch (e) {
            throw new Error(`Error deleting board: ${e}`);
        }
    }

    return {
        boards,
        loading,
        getBoards,
        createBoard,
        editBoard,
        deleteBoard,
    };
}
